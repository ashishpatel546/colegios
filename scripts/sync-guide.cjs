/**
 * Copy the product guide from the marketing team's folder into the site.
 * content/product-guide.md feeds the /product-guide page and the HTML and
 * Markdown downloads; the PDF is served as-is, so re-export it from the
 * Markdown before syncing or the two will disagree.
 *
 *   npm run sync:guide
 *   MARKETING_DOCS_DIR="/path/to/Marketing Docs" npm run sync:guide
 */
const fs = require("fs");
const os = require("os");
const path = require("path");

const SRC_DIR =
  process.env.MARKETING_DOCS_DIR ||
  path.join(os.homedir(), "Documents", "Ashish", "AppMe", "Marketing Docs");
const ROOT = path.join(__dirname, "..");

const files = [
  ["COLEGIOS_PRODUCT_GUIDE.md", "content/product-guide.md"],
  ["COLEGIOS_PRODUCT_GUIDE.pdf", "public/downloads/colegios-product-guide.pdf"],
];

for (const [from, to] of files) {
  const src = path.join(SRC_DIR, from);
  if (!fs.existsSync(src)) {
    console.error(`Missing ${src}`);
    process.exit(1);
  }
  fs.mkdirSync(path.dirname(path.join(ROOT, to)), { recursive: true });
  fs.copyFileSync(src, path.join(ROOT, to));
  console.log(`${from} -> ${to}`);
}

const md = fs.statSync(path.join(SRC_DIR, files[0][0])).mtimeMs;
const pdf = fs.statSync(path.join(SRC_DIR, files[1][0])).mtimeMs;
if (pdf < md) console.warn("Warning: the PDF is older than the Markdown. Re-export it so the downloads match.");
