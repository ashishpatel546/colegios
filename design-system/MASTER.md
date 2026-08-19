# Colegios — Design System (Master)

Product: Colegios, a school operating system (ERP) by AppMeSoft Private Limited.
Audience: principals, trustees, school administrators in Indian K-12 schools.
Page job: make a school trust Colegios enough to request a demo.

## Direction: "Civic Institutional, softened"

AppMeSoft's logo already carries the palette of the Indian flag — **App** in blue,
**Me** in green, **Soft** in saffron. The product's stated mission is digitalising the
nation from the root of education. So the site is built on that palette, not on a
generic SaaS blue: navy is the structure, saffron is the action, green is the proof.
Everything is desaturated one notch and set on a pale cool ground so long reading
sessions stay easy on the eyes.

### The risk we're taking
A recurring **tricolour rail** — a 3-segment hairline (saffron / white / green) anchored
in navy — is the structural marker for every section heading, card top edge and the
footer. It is the one bold move; everything around it stays quiet.

## Color

| Token | Hex | Use |
|---|---|---|
| `--ink-900` | `#0B1B33` | Headings, text on saffron |
| `--ink-700` | `#233350` | Body strong |
| `--ink-500` | `#55647E` | Body / muted |
| `--ink-300` | `#8B99B1` | Captions, disabled |
| `--line` | `#E3E9F4` | Hairlines |
| `--ground` | `#F5F8FD` | Page background (pale cool, never pure white) |
| `--surface` | `#FFFFFF` | Cards |
| `--blue-600` | `#1A54D6` | Primary structural, links |
| `--blue-700` | `#0F3BA8` | Deep navy fields |
| `--green-600` | `#12A05B` | Live / verified / success |
| `--saffron-500` | `#FF9933` | Primary CTA fill (ink text on it) |
| `--saffron-700` | `#B5620A` | Saffron text on light (AA) |

Contrast rules: saffron is never a text colour on white below `--saffron-700`; the
saffron CTA carries `--ink-900` text (≈9:1), not white.

## Type

- **Display — Bricolage Grotesque** (700/800, tracking −0.03em, leading 0.98).
  Characterful grotesque with real optical sizing; used only for h1/h2 and the
  signature numerals.
- **Body — Plus Jakarta Sans** (400/500/600/700). Humanist geometric, warm, high
  x-height — comfortable at 17px.
- **Utility — JetBrains Mono** (500, uppercase, tracking 0.18em) for eyebrows, clock
  times and module codes. The mono is what makes the schedule read as a schedule.

## Layout

Container 1200px, gutters 20 / 32 / 48. Section rhythm `clamp(4.5rem, 8vw, 8rem)`.
Spacing scale 4/8/12/16/24/32/48/64/96. Radius scale 12 / 20 / 28 / full.
Breakpoints 390 / 768 / 1024 / 1440 / 1920.

## Logo

The mark is the client's own: a faceted C holding an open book, in `#16124F` navy and
`#00B9E8` cyan. It is vectorised out of the supplied PNG rather than redrawn, so the
brand is untouched. Lockup: mark + "Colegios" in the display face + the descriptor
**School Management System** set in mono small caps — the words a principal would
actually search for.

Note the mark's navy is a shade more indigo than the site's `--color-brand-900`. That is
intentional: the logo keeps its own values, the interface keeps the palette.

## Signature elements

1. **"A day at Colegios"** — a live bell-schedule timeline on the home page. A marker
   walks the school day (07:30 → 16:00) and each module appears at the hour it actually
   happens: gate scan, attendance, visitor check-in, fee receipt, stock issue, secure
   pickup. Times are real information, so they replace the usual 01 / 02 / 03 markers.
2. **The signed ID card** — an interactive HMAC QR card on /security that re-signs
   itself on a countdown ring, demonstrating the rotating-signature claim instead of
   asserting it.

## Motion

Tokens: `--ease-out: cubic-bezier(0.16,1,0.3,1)`, enter 420ms, exit 260ms, micro 180ms.
Scroll reveals travel 16px and stagger 60ms. Only transform/opacity animate.
`prefers-reduced-motion` disables travel and the timeline auto-advance everywhere.

## Avoid

Cream + serif + terracotta. Black + acid green. Full-bleed saturated blue gradients.
Emoji as icons. Animation without a cause.
