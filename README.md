# Colegios

The marketing site for **Colegios**, the school operating system by **AppMeSoft Private Limited**.

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS v4 · framer-motion.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build — all routes prerender static
npm run lint
```

## Pages

| Route | What it does |
|---|---|
| `/` | The pitch: hero, the four new capabilities, the school-day signature, module overview, audiences, FAQ |
| `/features` | The full module catalogue, grouped and indexed with a sticky section nav |
| `/security` | Campus safety in depth — QR ID cards, secure pickup, visitors, inventory |
| `/contact` | Contact channels and a demo-request form that hands off to WhatsApp |
| `not-found` | 404 |

## Design system

The full rationale lives in [`design-system/MASTER.md`](design-system/MASTER.md). The short
version:

- **Palette from the wordmark.** AppMeSoft is App (blue), Me (green), Soft (saffron), so the
  site is built on those three rather than a generic SaaS blue. Navy is structure, saffron is
  action, green is proof. Everything sits on a pale cool ground (`--color-ground`) rather than
  pure white, so long reading sessions stay easy on the eyes.
- **Tokens live in `src/app/globals.css`** inside Tailwind's `@theme`, so every colour is
  available as a utility (`text-brand-700`, `bg-saffron-50`, …). Component classes (`.card`,
  `.btn`, `.chip`, `.rail`) are wrapped in `@layer components` and base element styles use
  `:where()`, so a utility class always wins over them.
- **Type.** Bricolage Grotesque for display, Plus Jakarta Sans for body, JetBrains Mono for
  eyebrows, clock times and module codes.
- **The tricolour rail** (`.rail`, `.rail-edge`) is the one bold structural device — section
  heads, card top edges and the footer, nowhere else.
- **Content is centralised** in `src/lib/site.ts`. Modules, capabilities, the school-day
  timeline, FAQs and contact details all come from there, so the pages cannot drift apart.

### The logo

The supplied artwork (`public/logo/colegios-logo.png`) is flat colour on an opaque white
background, which is unusable over the site's tinted surfaces. `scripts/trace-logo.cjs`
vectorises it: it flood-fills the white in from the border, groups the components that
belong to the mark — the open book splits the navy C into five pieces, and the "colegios"
letters have to be excluded — traces the boundaries and simplifies them. Output:

- `public/logo/colegios-mark.svg` — the mark alone, transparent
- the same paths inlined in `ColegiosMark` (`src/components/Brand.tsx`), so it can be
  resized and recoloured without a network request
- `src/app/icon.svg` — the favicon
- `public/logo/colegios-mark.png` and `colegios-lockup.png` — transparent raster copies
  from `scripts/extract-logo.cjs`, for decks, email signatures and anywhere raster is
  needed

Re-run either script if the artwork is reissued. Brand navy is `#16124F` and cyan
`#00B9E8`, exported as `LOGO_NAVY` / `LOGO_CYAN`; they are deliberately the artwork's own
values, not the site palette. The book's page separations are white gaps, so on dark
surfaces the mark is set on a white tile — `<ColegiosMark plate />`, as the footer does.

### Signature elements

- **`SchoolDay`** — a live bell-schedule timeline on the home page. A marker walks 07:00→17:00
  and each module appears at the hour it actually happens. Real times replace decorative
  01 / 02 / 03 numbering.
- **`SignedIdCard`** — an interactive HMAC QR card on `/security` that re-signs itself on a
  countdown, with a gate reader you can point at a live card or a stale screenshot.

### Accessibility and motion

- All body text meets WCAG AA (4.5:1) on every page; `--color-ink-300` is reserved for
  non-text use.
- Saffron never carries white text — the primary button is ink on saffron (≈9:1).
- `useReducedMotionSafe` (`src/lib/useReducedMotionSafe.ts`) reads the media query through
  `useSyncExternalStore`, so reduced-motion users get a matching hydration tree. Use it rather
  than framer-motion's `useReducedMotion`, which tears hydration apart.
- `useNowSeconds` does the same for the clock, keeping `Date.now()` out of render.
- Verified at 390 / 768 / 1024 / 1440 / 1920.
