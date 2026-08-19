/**
 * Vectorise the Colegios mark (the faceted C plus the open book) out of the
 * supplied PNG, dropping the white background and the "colegios" wordmark.
 *
 * The wordmark letters are the components that sit entirely inside the text
 * band; everything else belongs to the mark. The book's strokes cut the navy C
 * into several pieces, so the mark is a group of components, not one blob —
 * getting that wrong is what made earlier attempts trace only the top arm.
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "..", "public", "logo", "colegios-logo.png");
const EPS = 1.5; // RDP tolerance in source pixels

const isWhite = (r, g, b) => r > 246 && g > 246 && b > 246;
const isCyan = (r, g, b) => b > 140 && g > 110 && r < 130 && g - r > 40;

(async () => {
  const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height;

  const solid = new Uint8Array(W * H);
  const cyan = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) {
    const o = i * 4, r = data[o], g = data[o + 1], b = data[o + 2];
    if (isWhite(r, g, b)) continue;
    solid[i] = 1;
    if (isCyan(r, g, b)) cyan[i] = 1;
  }

  // ---- connected components ----
  const label = new Int32Array(W * H).fill(-1);
  const stack = new Int32Array(W * H);
  const comps = [];
  for (let s = 0; s < W * H; s++) {
    if (!solid[s] || label[s] >= 0) continue;
    const id = comps.length;
    let sp = 0; stack[sp++] = s; label[s] = id;
    let n = 0, minX = W, minY = H, maxX = -1, maxY = -1;
    while (sp) {
      const p = stack[--sp]; n++;
      const x = p % W, y = (p / W) | 0;
      if (x < minX) minX = x; if (x > maxX) maxX = x;
      if (y < minY) minY = y; if (y > maxY) maxY = y;
      if (x > 0 && solid[p - 1] && label[p - 1] < 0) { label[p - 1] = id; stack[sp++] = p - 1; }
      if (x < W - 1 && solid[p + 1] && label[p + 1] < 0) { label[p + 1] = id; stack[sp++] = p + 1; }
      if (y > 0 && solid[p - W] && label[p - W] < 0) { label[p - W] = id; stack[sp++] = p - W; }
      if (y < H - 1 && solid[p + W] && label[p + W] < 0) { label[p + W] = id; stack[sp++] = p + W; }
    }
    comps.push({ id, n, minX, minY, maxX, maxY });
  }

  // A wordmark letter sits wholly inside the text band and is narrow.
  const isLetter = (c) =>
    c.minX >= 415 && c.minY >= 475 && c.maxY <= 575 && c.maxX - c.minX <= 70;
  const markIds = new Set(comps.filter((c) => c.n > 80 && !isLetter(c)).map((c) => c.id));

  const inMark = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) if (label[i] >= 0 && markIds.has(label[i])) inMark[i] = 1;

  const navyMask = new Uint8Array(W * H);
  const cyanMask = new Uint8Array(W * H);
  let minX = W, minY = H, maxX = -1, maxY = -1;
  for (let i = 0; i < W * H; i++) {
    if (!inMark[i]) continue;
    (cyan[i] ? cyanMask : navyMask)[i] = 1;
    const x = i % W, y = (i / W) | 0;
    if (x < minX) minX = x; if (x > maxX) maxX = x;
    if (y < minY) minY = y; if (y > maxY) maxY = y;
  }

  // ---- boundary tracing: directed cell edges, resolved by planar face order ----
  const contours = (mask) => {
    const has = (x, y) => x >= 0 && y >= 0 && x < W && y < H && mask[y * W + x] === 1;
    const key = (x, y) => x * 4096 + y;
    const out = new Map();
    const add = (x1, y1, x2, y2, dir) => {
      const k = key(x1, y1);
      if (!out.has(k)) out.set(k, []);
      out.get(k).push({ x: x2, y: y2, dir, used: false });
    };
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        if (!has(x, y)) continue;
        if (!has(x, y - 1)) add(x, y, x + 1, y, 0);
        if (!has(x + 1, y)) add(x + 1, y, x + 1, y + 1, 1);
        if (!has(x, y + 1)) add(x + 1, y + 1, x, y + 1, 2);
        if (!has(x - 1, y)) add(x, y + 1, x, y, 3);
      }
    }
    const loops = [];
    for (const [startKey, list] of out) {
      for (const seed of list) {
        if (seed.used) continue;
        seed.used = true;
        const sx = Math.floor(startKey / 4096), sy = startKey % 4096;
        const loop = [[sx, sy]];
        let cx = seed.x, cy = seed.y, din = seed.dir;
        for (let guard = 0; guard < 1e6; guard++) {
          loop.push([cx, cy]);
          if (cx === sx && cy === sy) break;
          const cand = out.get(key(cx, cy));
          if (!cand) break;
          const back = (din + 2) % 4;
          let best = null, bestTurn = 9;
          for (const e of cand) {
            if (e.used) continue;
            const turn = (e.dir - back + 4) % 4 || 4;
            if (turn < bestTurn) { bestTurn = turn; best = e; }
          }
          if (!best) break;
          best.used = true;
          cx = best.x; cy = best.y; din = best.dir;
        }
        if (loop.length > 10) loops.push(loop);
      }
    }
    return loops;
  };

  const rdpOpen = (pts, eps) => {
    if (pts.length < 3) return pts;
    let maxD = -1, idx = 0;
    const [ax, ay] = pts[0], [bx, by] = pts[pts.length - 1];
    const dx = bx - ax, dy = by - ay, len = Math.hypot(dx, dy);
    for (let i = 1; i < pts.length - 1; i++) {
      const [px, py] = pts[i];
      const d = len === 0 ? Math.hypot(px - ax, py - ay)
                          : Math.abs(dy * px - dx * py + bx * ay - by * ax) / len;
      if (d > maxD) { maxD = d; idx = i; }
    }
    if (maxD <= eps) return [pts[0], pts[pts.length - 1]];
    return [...rdpOpen(pts.slice(0, idx + 1), eps).slice(0, -1), ...rdpOpen(pts.slice(idx), eps)];
  };
  const rdpClosed = (ring, eps) => {
    const pts = ring.slice();
    const a = pts[0], b = pts[pts.length - 1];
    if (a[0] === b[0] && a[1] === b[1]) pts.pop();
    if (pts.length < 4) return pts;
    let far = 0, farD = -1;
    for (let i = 1; i < pts.length; i++) {
      const d = Math.hypot(pts[i][0] - pts[0][0], pts[i][1] - pts[0][1]);
      if (d > farD) { farD = d; far = i; }
    }
    return rdpOpen(pts.slice(0, far + 1), eps).slice(0, -1)
      .concat(rdpOpen(pts.slice(far).concat([pts[0]]), eps).slice(0, -1));
  };

  const w = maxX - minX + 1, h = maxY - minY + 1;
  const VB = 100;
  const S = VB / Math.max(w, h);
  const offX = (VB - w * S) / 2, offY = (VB - h * S) / 2;
  const f = (n) => Math.round(n * 100) / 100;
  const toPath = (mask) =>
    contours(mask)
      .map((l) => rdpClosed(l, EPS))
      .filter((l) => l.length > 2)
      .map((l) => "M" + l.map(([x, y]) =>
        `${f((x - minX) * S + offX)} ${f((y - minY) * S + offY)}`).join("L") + "Z")
      .join("");

  const navyPath = toPath(navyMask);
  const cyanPath = toPath(cyanMask);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VB} ${VB}" fill="none">
  <path fill="#16124F" fill-rule="evenodd" d="${navyPath}"/>
  <path fill="#00B9E8" fill-rule="evenodd" d="${cyanPath}"/>
</svg>
`;
  fs.writeFileSync(path.join(__dirname, "..", "public", "logo", "colegios-mark.svg"), svg);
  fs.writeFileSync(path.join(__dirname, "logo-paths.json"), JSON.stringify({ navyPath, cyanPath }, null, 1));

  console.log(JSON.stringify({
    comps: comps.length,
    markComps: markIds.size,
    letters: comps.filter(isLetter).length,
    bbox: { minX, minY, maxX, maxY, w, h },
    navyChars: navyPath.length,
    cyanChars: cyanPath.length,
  }, null, 1));
})();
