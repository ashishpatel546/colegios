/**
 * Lift the Colegios logo off its white background.
 *
 * The source PNG is flat artwork on opaque white. We flood-fill the white in
 * from the border, so only the *outside* becomes transparent and the white
 * page-gaps inside the book stay white, the way the artwork intends. The mask
 * is cut at full 1024px resolution and then downsampled, which hands the
 * anti-aliasing to sharp's resampler and gives clean edges for free.
 */
const sharp = require("sharp");
const path = require("path");

const SRC = path.join(__dirname, "..", "public", "logo", "colegios-logo.png");
const OUT_DIR = path.join(__dirname, "..", "public", "logo");

const isWhite = (r, g, b) => r > 246 && g > 246 && b > 246;

(async () => {
  const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  const px = (x, y) => (y * W + x) * 4;

  // ---- flood fill the outside ----
  const bg = new Uint8Array(W * H);
  const queue = new Int32Array(W * H);
  let qh = 0, qt = 0;
  const seed = (x, y) => {
    const i = y * W + x;
    if (bg[i]) return;
    const o = px(x, y);
    if (!isWhite(data[o], data[o + 1], data[o + 2])) return;
    bg[i] = 1;
    queue[qt++] = i;
  };
  for (let x = 0; x < W; x++) { seed(x, 0); seed(x, H - 1); }
  for (let y = 0; y < H; y++) { seed(0, y); seed(W - 1, y); }
  while (qh < qt) {
    const i = queue[qh++];
    const x = i % W, y = (i / W) | 0;
    if (x > 0) seed(x - 1, y);
    if (x < W - 1) seed(x + 1, y);
    if (y > 0) seed(x, y - 1);
    if (y < H - 1) seed(x, y + 1);
  }

  // ---- ink mask + components, so we can isolate the mark from the wordmark ----
  const ink = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) ink[i] = bg[i] ? 0 : 1;
  // an enclosed white area is ink for masking purposes but not for the bbox
  const solid = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) {
    const o = i * 4;
    solid[i] = !bg[i] && !isWhite(data[o], data[o + 1], data[o + 2]) ? 1 : 0;
  }

  const seen = new Uint8Array(W * H);
  const stack = new Int32Array(W * H);
  const comps = [];
  for (let s = 0; s < W * H; s++) {
    if (!solid[s] || seen[s]) continue;
    let sp = 0;
    stack[sp++] = s; seen[s] = 1;
    let n = 0, minX = W, minY = H, maxX = -1, maxY = -1;
    while (sp) {
      const p = stack[--sp];
      n++;
      const x = p % W, y = (p / W) | 0;
      if (x < minX) minX = x; if (x > maxX) maxX = x;
      if (y < minY) minY = y; if (y > maxY) maxY = y;
      if (x > 0 && solid[p - 1] && !seen[p - 1]) { seen[p - 1] = 1; stack[sp++] = p - 1; }
      if (x < W - 1 && solid[p + 1] && !seen[p + 1]) { seen[p + 1] = 1; stack[sp++] = p + 1; }
      if (y > 0 && solid[p - W] && !seen[p - W]) { seen[p - W] = 1; stack[sp++] = p - W; }
      if (y < H - 1 && solid[p + W] && !seen[p + W]) { seen[p + W] = 1; stack[sp++] = p + W; }
    }
    comps.push({ n, minX, minY, maxX, maxY });
  }
  comps.sort((a, b) => b.n - a.n);

  const c = comps[0]; // the faceted C
  const markParts = comps.filter(
    (k) => k.minX >= c.minX - 4 && k.maxX <= c.maxX + 4 && k.minY >= c.minY - 4 && k.maxY <= c.maxY + 4,
  );
  const box = (list) => list.reduce(
    (a, k) => ({
      minX: Math.min(a.minX, k.minX), minY: Math.min(a.minY, k.minY),
      maxX: Math.max(a.maxX, k.maxX), maxY: Math.max(a.maxY, k.maxY),
    }),
    { minX: 1e9, minY: 1e9, maxX: -1, maxY: -1 },
  );
  const markBox = box(markParts);
  const fullBox = box(comps);

  // ---- write RGBA with the outside knocked out ----
  const out = Buffer.alloc(W * H * 4);
  for (let i = 0; i < W * H; i++) {
    const o = i * 4;
    if (bg[i]) { out[o] = out[o + 1] = out[o + 2] = out[o + 3] = 0; }
    else { out[o] = data[o]; out[o + 1] = data[o + 1]; out[o + 2] = data[o + 2]; out[o + 3] = 255; }
  }

  const pad = 6;
  const clampBox = (b) => ({
    left: Math.max(0, b.minX - pad),
    top: Math.max(0, b.minY - pad),
    width: Math.min(W, b.maxX + pad) - Math.max(0, b.minX - pad) + 1,
    height: Math.min(H, b.maxY + pad) - Math.max(0, b.minY - pad) + 1,
  });

  const base = sharp(out, { raw: { width: W, height: H, channels: 4 } });

  const mk = clampBox(markBox);
  await base.clone().extract(mk)
    .resize({ width: 512, height: 512, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT_DIR, "colegios-mark.png"));

  const fb = clampBox(fullBox);
  await base.clone().extract(fb)
    .resize({ width: 1400, fit: "inside" })
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT_DIR, "colegios-lockup.png"));

  console.log(JSON.stringify({
    imageSize: [W, H],
    components: comps.length,
    markBox, fullBox,
    markCrop: mk, lockupCrop: fb,
    markPartCount: markParts.length,
  }, null, 1));
})();
