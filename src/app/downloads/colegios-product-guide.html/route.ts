import fs from "node:fs";
import path from "node:path";
import { GUIDE_CSS, enhanceGuide } from "@/lib/guideAssets";
import { getProductGuide } from "@/lib/productGuide";
import { site } from "@/lib/site";

// Built once at deploy time from content/product-guide.md.
export const dynamic = "force-static";

const escape = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const PAGE_CSS = String.raw`
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
body {
  margin: 0;
  background: #f5f8fd;
  color: #0b1b33;
  font-family: "Plus Jakarta Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  -webkit-font-smoothing: antialiased;
}
:root { --font-display: "Bricolage Grotesque", ui-sans-serif, system-ui, sans-serif; --font-mono: "JetBrains Mono", ui-monospace, monospace; }
.bar {
  position: sticky; top: 0; z-index: 10;
  display: flex; align-items: center; justify-content: space-between; gap: 1rem;
  padding: 0.75rem 16px;
  background: rgba(255, 255, 255, 0.92); backdrop-filter: blur(12px);
  border-bottom: 1px solid #e3e9f4;
}
.brand { display: inline-flex; align-items: center; gap: 0.55rem; color: #0b1b33; font-family: var(--font-display); font-weight: 800; font-size: 1.15rem; letter-spacing: -0.03em; text-decoration: none; }
.brand svg { width: 30px; height: 30px; }
.actions { display: flex; gap: 0.5rem; }
.btn { display: inline-flex; align-items: center; min-height: 2.5rem; padding: 0 1rem; border-radius: 999px; border: 1px solid #e3e9f4; background: #fff; color: #16253f; font: inherit; font-size: 0.875rem; font-weight: 700; text-decoration: none; cursor: pointer; white-space: nowrap; }
.btn:hover { border-color: #93b4ff; color: #0f3ba8; }
.btn-primary { border-color: transparent; background: linear-gradient(135deg, #ffab54, #ff9933 55%, #ef8412); color: #0b1b33; }
.hero { padding: 3.5rem 16px 2.5rem; background: linear-gradient(to bottom, #eef4ff, #f5f8fd); }
.hero-inner, .layout { max-width: 76rem; margin: 0 auto; }
.eyebrow { font-family: var(--font-mono); font-size: 0.6875rem; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: #626f88; margin: 0; }
.hero h1 { margin: 0.9rem 0 0; max-width: 52rem; font-family: var(--font-display); font-weight: 800; font-size: clamp(2.1rem, 1.3rem + 3.6vw, 3.9rem); line-height: 1; letter-spacing: -0.04em; text-wrap: balance; }
.hero p.lede { margin: 1.25rem 0 0; max-width: 40rem; color: #3c4b67; font-size: clamp(1.05rem, 1rem + 0.3vw, 1.2rem); line-height: 1.65; }
.layout { display: grid; gap: 2.5rem; padding: 1rem 16px 4rem; }
.toc-side { display: none; }
.toc-side nav { position: sticky; top: 5rem; max-height: calc(100vh - 6rem); overflow-y: auto; }
.toc ol { list-style: none; margin: 0; padding: 0; font-size: 0.875rem; }
.toc a { display: block; padding: 0.4rem 0.75rem; border-left: 2px solid transparent; border-radius: 0.5rem; color: #55647e; line-height: 1.35; text-decoration: none; }
.toc a:hover { color: #0f3ba8; }
.toc a[aria-current="true"] { border-left-color: #1a54d6; background: #eef4ff; color: #0f3ba8; font-weight: 600; }
.toc-side .eyebrow { padding: 0 0.75rem 0.75rem; }
details.toc-drop { margin-bottom: 2rem; border: 1px solid #e3e9f4; border-radius: 1rem; background: #fff; }
details.toc-drop summary { padding: 0.85rem 1rem; font-weight: 700; cursor: pointer; }
details.toc-drop nav { padding: 0.5rem; border-top: 1px solid #eef2f9; }
main { min-width: 0; max-width: 48rem; }
footer.foot { border-top: 1px solid #e3e9f4; background: #fff; padding: 2rem 16px; color: #55647e; font-size: 0.9rem; }
footer.foot div { max-width: 76rem; margin: 0 auto; display: flex; flex-wrap: wrap; gap: 0.5rem 1.5rem; justify-content: space-between; }
footer.foot a { color: #1a54d6; font-weight: 600; }
@media (min-width: 640px) { .bar, .hero, .layout, footer.foot { padding-inline: 2rem; } }
@media (min-width: 1024px) {
  .layout { grid-template-columns: 15.5rem minmax(0, 1fr); gap: 4rem; }
  .toc-side { display: block; }
  details.toc-drop { display: none; }
}
@media (max-width: 479px) { .bar .btn:not(.btn-primary) { display: none; } }
@media print {
  body { background: #fff; }
  .bar, .toc-side, details.toc-drop { display: none !important; }
  .hero { padding-top: 0; background: none; }
  .layout { display: block; padding: 0; }
  main { max-width: none; }
}
`;

function markSvg() {
  try {
    const svg = fs.readFileSync(path.join(process.cwd(), "public", "logo", "colegios-mark.svg"), "utf8");
    return svg.replace(/<\?xml[^>]*\?>/, "").replace(/<svg\b/, '<svg aria-hidden="true"');
  } catch {
    return "";
  }
}

export function GET() {
  const guide = getProductGuide("download");
  const online = `${site.url}/product-guide`;
  const toc = `<ol>${guide.sections
    .map((s) => `<li><a href="#${s.id}">${escape(s.label)}</a></li>`)
    .join("")}</ol>`;
  const phone = site.phones[0];

  const html = `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(guide.title)}</title>
<meta name="description" content="${escape(guide.subtitle)}">
<link rel="canonical" href="${online}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700;800&family=JetBrains+Mono:wght@500&family=Plus+Jakarta+Sans:wght@400;600;700&display=swap">
<style>${PAGE_CSS}${GUIDE_CSS}</style>
</head>
<body>
<header class="bar">
  <a class="brand" href="${site.url}">${markSvg()}Colegios</a>
  <div class="actions">
    <button class="btn" type="button" onclick="window.print()">Print / Save as PDF</button>
    <a class="btn btn-primary" href="https://wa.me/${site.whatsapp}">Book a demo</a>
  </div>
</header>
<section class="hero"><div class="hero-inner">
  <p class="eyebrow">Product guide</p>
  <h1>${escape(guide.title)}</h1>
  <p class="lede">${escape(guide.subtitle)}</p>
</div></section>
<div class="layout">
  <aside class="toc-side"><nav id="guide-toc" class="toc" aria-label="Guide contents"><p class="eyebrow">Contents</p>${toc}</nav></aside>
  <main>
    <details class="toc-drop"><summary>Contents</summary><nav class="toc" aria-label="Guide contents">${toc}</nav></details>
    <div class="guide-prose" id="guide">${guide.html}</div>
  </main>
</div>
<footer class="foot"><div>
  <span>${escape(site.company)} · <a href="tel:${phone.replace(/[^+\d]/g, "")}">${escape(phone)}</a> · <a href="mailto:${site.email}">${site.email}</a> · <a href="mailto:${site.supportEmail}">${site.supportEmail}</a></span>
  <span>Latest version: <a href="${online}">${online.replace(/^https?:\/\//, "")}</a></span>
</div></footer>
<script>(${enhanceGuide.toString()})(document.getElementById("guide"), document.getElementById("guide-toc"));</script>
</body>
</html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": 'attachment; filename="colegios-product-guide.html"',
    },
  });
}
