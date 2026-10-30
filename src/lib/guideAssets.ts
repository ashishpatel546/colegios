/* ------------------------------------------------------------------
   Styling and behaviour for the rendered product guide. Both live in
   one place because they ship twice: inside the /product-guide page,
   and inlined into the standalone HTML that marketing downloads and
   sends to schools, which has to work offline with no site around it.
   ------------------------------------------------------------------ */

export const GUIDE_CSS = String.raw`
.guide-prose {
  --g-ink: #0b1b33; --g-ink-2: #3c4b67; --g-muted: #626f88;
  --g-line: #e3e9f4; --g-line-soft: #eef2f9; --g-surface: #fff; --g-ground: #f5f8fd;
  --g-brand: #1a54d6; --g-brand-soft: #eef4ff; --g-brand-line: #c2d5ff;
  --g-leaf: #0c7a45; --g-leaf-soft: #e9f8f0; --g-leaf-line: #74d6a4;
  --g-saffron: #ff9933; --g-saffron-soft: #fff6ea; --g-saffron-line: #ffd8a8;
  color: var(--g-ink-2);
  font-size: 1rem;
  line-height: 1.7;
  overflow-wrap: break-word;
}
.guide-prose > * + * { margin-top: 1.1rem; }
.guide-prose h2, .guide-prose h3 {
  color: var(--g-ink);
  font-family: var(--font-display, "Bricolage Grotesque", ui-sans-serif, system-ui, sans-serif);
  scroll-margin-top: 6.5rem;
  text-wrap: balance;
}
.guide-prose h2 {
  margin-top: 3.5rem;
  padding-top: 2.25rem;
  border-top: 1px solid var(--g-line);
  font-size: clamp(1.5rem, 1.2rem + 1.2vw, 2.1rem);
  font-weight: 700;
  line-height: 1.12;
  letter-spacing: -0.03em;
}
.guide-prose > h2:first-child { margin-top: 0; }
.guide-prose h3 {
  margin-top: 2.25rem;
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.015em;
}
.guide-prose h2 + *, .guide-prose h3 + * { margin-top: 0.85rem; }
.guide-prose hr { display: none; }
.guide-prose strong { color: var(--g-ink); font-weight: 700; }
.guide-prose a { color: var(--g-brand); font-weight: 600; text-decoration: underline; text-underline-offset: 3px; }
.guide-prose sub {
  display: block;
  margin-top: 3rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--g-line);
  color: var(--g-muted);
  font-size: 0.78rem;
  line-height: 1.6;
  vertical-align: baseline;
}
.guide-prose ul, .guide-prose ol { padding-left: 1.25rem; }
.guide-prose li + li { margin-top: 0.35rem; }

/* Callouts: every blockquote in the guide is an offer or a verdict. */
.guide-prose blockquote {
  margin-inline: 0;
  padding: 1.25rem 1.4rem;
  border: 1px solid var(--g-saffron-line);
  border-left: 4px solid var(--g-saffron);
  border-radius: 1rem;
  background: var(--g-saffron-soft);
  color: var(--g-ink-2);
}
.guide-prose blockquote > * + * { margin-top: 0.75rem; }
.guide-prose blockquote h3 { margin-top: 0; font-size: 1.1rem; }
.guide-prose blockquote p:first-child { margin-top: 0; }

/* Tables scroll inside their own box on phones instead of the page. */
.guide-prose .guide-table {
  overflow-x: auto;
  border: 1px solid var(--g-line);
  border-radius: 1rem;
  background: var(--g-surface);
  -webkit-overflow-scrolling: touch;
}
.guide-prose table { width: 100%; border-collapse: collapse; font-size: 0.925rem; line-height: 1.5; }
.guide-prose th, .guide-prose td { padding: 0.7rem 0.9rem; border-bottom: 1px solid var(--g-line-soft); vertical-align: top; }
.guide-prose th { background: var(--g-ground); color: var(--g-ink); font-weight: 700; text-align: left; white-space: nowrap; }
.guide-prose tr:last-child td { border-bottom: 0; }
.guide-prose td[align="center"], .guide-prose th[align="center"] { text-align: center; }
.guide-prose tbody tr:hover td { background: var(--g-brand-soft); }
.guide-prose blockquote .guide-table { border-color: var(--g-saffron-line); }
.guide-prose td:empty, .guide-prose th:empty { padding: 0; }

/* Self-check lists become tappable. */
.guide-prose ul.contains-task-list { list-style: none; padding: 0; display: grid; gap: 0.5rem; }
.guide-prose li.task-list-item { margin: 0; }
.guide-prose li.task-list-item label {
  display: flex; gap: 0.75rem; align-items: flex-start;
  padding: 0.75rem 1rem;
  border: 1px solid var(--g-line);
  border-radius: 0.85rem;
  background: var(--g-surface);
  cursor: pointer;
  transition: border-color 160ms ease, background-color 160ms ease;
}
.guide-prose li.task-list-item label:hover { border-color: var(--g-brand-line); }
.guide-prose li.task-list-item input { flex: none; width: 1.15rem; height: 1.15rem; margin-top: 0.2rem; accent-color: var(--g-leaf); cursor: pointer; }
.guide-prose li.task-list-item.is-ticked label { border-color: var(--g-leaf-line); background: var(--g-leaf-soft); color: var(--g-ink); }
.guide-prose .guide-tally {
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, monospace);
  font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--g-muted);
}
.guide-prose .guide-tally b { color: var(--g-leaf); }
.guide-prose blockquote.guide-verdict { transition: box-shadow 240ms ease, border-color 240ms ease, background-color 240ms ease; }
.guide-prose blockquote.guide-verdict.is-hit {
  border-color: var(--g-leaf-line); border-left-color: var(--g-leaf); background: var(--g-leaf-soft);
  box-shadow: 0 18px 40px -24px rgba(12, 122, 69, 0.55);
}

@media print {
  .guide-prose h2 { break-before: auto; }
  .guide-prose h2, .guide-prose h3 { break-after: avoid; }
  .guide-prose blockquote, .guide-prose .guide-table, .guide-prose li.task-list-item { break-inside: avoid; }
  .guide-prose .guide-table { overflow: visible; }
  .guide-prose .guide-tally { display: none; }
}
`;

/**
 * Wraps tables for scrolling, turns the GFM task lists into working
 * checklists with a live tally, and lights up the "Ticked 2 or more?"
 * verdict that follows each one. Also tracks the section in view for the
 * contents list. Must stay self-contained (no imports, no closures over
 * module scope): the standalone HTML inlines it via Function#toString.
 */
export function enhanceGuide(root: HTMLElement, toc: HTMLElement | null) {
  const THRESHOLD = 2;

  root.querySelectorAll("table").forEach((table) => {
    if (table.parentElement && table.parentElement.classList.contains("guide-table")) return;
    const wrap = document.createElement("div");
    wrap.className = "guide-table";
    table.parentNode!.insertBefore(wrap, table);
    wrap.appendChild(table);
  });

  root.querySelectorAll("ul.contains-task-list").forEach((list) => {
    if (list.getAttribute("data-enhanced")) return;
    list.setAttribute("data-enhanced", "1");

    const items = Array.from(list.querySelectorAll("li.task-list-item"));
    items.forEach((item) => {
      const box = item.querySelector("input");
      if (!box) return;
      box.removeAttribute("disabled");
      const label = document.createElement("label");
      while (item.firstChild) label.appendChild(item.firstChild);
      item.appendChild(label);
    });

    const tally = document.createElement("p");
    tally.className = "guide-tally";
    tally.setAttribute("aria-live", "polite");
    list.parentNode!.insertBefore(tally, list.nextSibling);

    let verdict = tally.nextElementSibling;
    if (verdict && verdict.tagName !== "BLOCKQUOTE") verdict = null;
    if (verdict) verdict.classList.add("guide-verdict");

    const update = () => {
      let ticked = 0;
      items.forEach((item) => {
        const box = item.querySelector("input");
        const on = !!box && box.checked;
        item.classList.toggle("is-ticked", on);
        if (on) ticked++;
      });
      tally.innerHTML = "<b>" + ticked + "</b> of " + items.length + " ticked";
      if (verdict) verdict.classList.toggle("is-hit", ticked >= THRESHOLD);
    };
    list.addEventListener("change", update);
    update();
  });

  if (!toc) return () => {};

  const links = new Map<string, Element>();
  toc.querySelectorAll('a[href^="#"]').forEach((a) => {
    links.set(decodeURIComponent(a.getAttribute("href")!.slice(1)), a);
  });
  const headings = Array.from(root.querySelectorAll("h2[id]"));

  // The active section is the last heading above the line 40% down the
  // viewport. A scroll listener rather than an IntersectionObserver, because
  // a jump from the contents list can skip a heading past any observed band.
  let frame = 0;
  const sync = () => {
    frame = 0;
    let current: Element | undefined = headings[0];
    for (const h of headings) {
      if (h.getBoundingClientRect().top < window.innerHeight * 0.4) current = h;
    }
    links.forEach((a, id) => {
      if (current && id === current.id) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  };
  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(sync);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  sync();
  return () => {
    window.removeEventListener("scroll", onScroll);
    cancelAnimationFrame(frame);
  };
}
