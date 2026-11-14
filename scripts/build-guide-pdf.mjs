/**
 * Rebuild the product guide PDF from content/product-guide.md, in the same
 * compact A4 style marketing has used (Markdown Preview Enhanced look).
 * Needs Google Chrome installed. Writes content/colegios-product-guide.pdf
 * and, when it exists, the copy in the marketing folder that sync:guide reads.
 *
 *   npm run pdf:guide
 */
import { execFileSync } from "node:child_process";
import os from "node:os";
import path from "node:path";
import fs from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(process.cwd() + "/package.json");
const load = (m) => import(require.resolve(m));
const { unified } = await load("unified");
const remarkParse = (await load("remark-parse")).default;
const remarkGfm = (await load("remark-gfm")).default;
const remarkRehype = (await load("remark-rehype")).default;
const rehypeRaw = (await load("rehype-raw")).default;
const rehypeStringify = (await load("rehype-stringify")).default;

const ROOT = process.cwd();
const src = path.join(ROOT, "content", "product-guide.md");
const out = path.join(os.tmpdir(), "colegios-product-guide.html");
const md = fs.readFileSync(src, "utf8").replace(/^---[\s\S]*?\n---\n/, "");
// Markdown Preview Enhanced (which made the original PDF) breaks lines on a
// single newline. Mark those breaks explicitly, outside tables and lists.
const isText = (l) => l.trim() && !/^\s*(>\s*)?(\||#|[-*]\s|\d+\.\s|<|---)/.test(l) && !/^\s*>\s*$/.test(l);
const lines = md.split("\n");
const mdBroken = lines.map((l, i) => (isText(l) && lines[i + 1] && isText(lines[i + 1]) ? l + "  " : l)).join("\n");
const body = String(
  await unified().use(remarkParse).use(remarkGfm).use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw).use(rehypeStringify).process(mdBroken),
);
const base = `
body { margin: 0; font-family: -apple-system, "Helvetica Neue", Helvetica, Arial, sans-serif; color: #24292e; }
.markdown-preview { line-height: 1.4; }
h1, h2, h3 { font-weight: 700; color: #111; }
h1 { border-bottom: 1px solid #ddd; }
a { color: #0366d6; text-decoration: none; }
table { border-collapse: collapse; width: 100%; }
th, td { border: 1px solid #d0d7de; text-align: left; vertical-align: middle; }
th { text-align: center; background: #fff; }
tr:nth-child(2n) td { background: #f6f8fa; }
blockquote { margin-left: 0; margin-right: 0; background: #f0f0f0; border-left: 4px solid #d0d0d0; color: #555; }
blockquote strong { color: #222; }
hr { border: 0; background: #e1e4e8; }
ul.contains-task-list { list-style: none; padding-left: 0.2em; }
input[type=checkbox] { margin: 0 0.45em 0 0; }
sub { font-size: 9px; line-height: 1.35; color: #666; display: block; }
`;
fs.writeFileSync(out, `<!doctype html><html><head><meta charset="utf-8"><style>${base}</style></head><body><div class="markdown-preview">${body}</div></body></html>`);

const pdf = path.join(ROOT, "content", "colegios-product-guide.pdf");
const chrome =
  process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
execFileSync(chrome, [
  "--headless=new",
  "--disable-gpu",
  "--no-pdf-header-footer",
  `--print-to-pdf=${pdf}`,
  `file://${out}`,
], { stdio: "ignore" });
console.log(`Wrote ${path.relative(ROOT, pdf)}`);

const marketing = path.join(
  process.env.MARKETING_DOCS_DIR || path.join(os.homedir(), "Documents", "Ashish", "AppMe", "Marketing Docs"),
  "COLEGIOS_PRODUCT_GUIDE.pdf",
);
if (fs.existsSync(path.dirname(marketing))) {
  fs.copyFileSync(pdf, marketing);
  console.log(`Copied to ${marketing}`);
}
