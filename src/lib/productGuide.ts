import fs from "node:fs";
import path from "node:path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";

/* ------------------------------------------------------------------
   The product guide is written by marketing as Markdown (the same file
   they export to PDF). content/product-guide.md is the single source:
   the /product-guide page, the downloadable HTML and the .md download
   are all built from it. Run `npm run sync:guide` after they edit it.
   ------------------------------------------------------------------ */

export const GUIDE_SOURCE = path.join(process.cwd(), "content", "product-guide.md");

export const guideDownloads = {
  pdf: "/downloads/colegios-product-guide.pdf",
  html: "/downloads/colegios-product-guide.html",
  md: "/downloads/colegios-product-guide.md",
} as const;

export type GuideSection = { id: string; label: string };

export type ProductGuide = {
  title: string;
  subtitle: string;
  sections: GuideSection[];
  html: string;
};

type HastNode = {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

const EMOJI = /[\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}\u{FE0F}\u{20E3}\u{200D}]/gu;

const textOf = (node: HastNode): string =>
  node.type === "text" ? (node.value ?? "") : (node.children ?? []).map(textOf).join("");

const cleanLabel = (text: string) =>
  text.replace(EMOJI, "").replace(/ /g, " ").replace(/\s+/g, " ").trim();

const slugify = (text: string) =>
  cleanLabel(text)
    .toLowerCase()
    .replace(/₹/g, "rs")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export function readGuideMarkdown() {
  return fs.readFileSync(GUIDE_SOURCE, "utf8");
}

// A link to colegios.in, with or without www.
const SELF_LINK = String.raw`\[[^\]]*\]\(https?:\/\/(?:www\.)?colegios\.in\/?\)`;

/**
 * Strip the puppeteer front matter and the <style> block that only the PDF
 * export uses, and the byline's link back to colegios.in, which is either the
 * page the reader is on or the site the downloaded file's header links to.
 * `onSite` also drops the "Website" row from the contact table; the offline
 * HTML keeps it.
 */
function webMarkdown(source: string, onSite: boolean) {
  let md = source
    .replace(/^---\n[\s\S]*?\n---\n/, "")
    .replace(/<style>[\s\S]*?<\/style>/g, "")
    .replace(new RegExp(`(\\*\\*Developed by[^\\n]*?)\\s*·\\s*${SELF_LINK}`), "$1");
  if (onSite) md = md.replace(new RegExp(`^\\|[^\\n]*\\|\\s*${SELF_LINK}\\s*\\|[ \\t]*\\n`, "m"), "");
  return md.trim();
}

/**
 * Gives every h2/h3 a stable id, collects the section list (h2s, plus the
 * one mid-document h1 "Signature Features", demoted to h2), and pulls the
 * opening h1 + tagline out so each page can set its own header.
 */
function structure(sections: GuideSection[], meta: { title: string; subtitle: string }) {
  return () => (tree: HastNode) => {
    const seen = new Map<string, number>();
    const body: HastNode[] = [];
    let sawTitle = false;
    let sawSubtitle = false;

    for (const node of tree.children ?? []) {
      if (node.type === "element" && node.tagName === "h1" && !sawTitle) {
        meta.title = cleanLabel(textOf(node));
        sawTitle = true;
        continue;
      }
      if (node.type === "element" && node.tagName === "h3" && sawTitle && !sawSubtitle) {
        meta.subtitle = cleanLabel(textOf(node));
        sawSubtitle = true;
        continue;
      }
      if (node.type === "element" && node.tagName === "h1") node.tagName = "h2";

      if (node.type === "element" && (node.tagName === "h2" || node.tagName === "h3")) {
        const base = slugify(textOf(node)) || "section";
        const n = seen.get(base) ?? 0;
        seen.set(base, n + 1);
        const id = n ? `${base}-${n}` : base;
        node.properties = { ...node.properties, id };
        if (node.tagName === "h2") sections.push({ id, label: cleanLabel(textOf(node)) });
      }
      body.push(node);
    }

    // Whitespace left behind by the removed title and tagline.
    while (body[0]?.type === "text") body.shift();
    tree.children = body;
  };
}

const cache = new Map<string, { mtime: number; guide: ProductGuide }>();

/** `variant: "download"` is the standalone HTML file, read away from the site. */
export function getProductGuide(variant: "site" | "download" = "site"): ProductGuide {
  const stat = fs.statSync(GUIDE_SOURCE);
  const hit = cache.get(variant);
  if (hit && hit.mtime === stat.mtimeMs) return hit.guide;

  const sections: GuideSection[] = [];
  const meta = { title: "Colegios product guide", subtitle: "" };

  const html = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(structure(sections, meta))
    .use(rehypeStringify)
    .processSync(webMarkdown(readGuideMarkdown(), variant === "site"))
    .toString();

  const guide = { ...meta, sections, html };
  cache.set(variant, { mtime: stat.mtimeMs, guide });
  return guide;
}
