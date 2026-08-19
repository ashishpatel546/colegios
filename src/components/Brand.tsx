import Link from "next/link";

/**
 * The AppMeSoft wordmark, set the way the logo is: App in blue, Me in green,
 * Soft in saffron. Every appearance of the parent company uses this component
 * so the colour split never drifts.
 */
export function AppMeSoft({
  className = "",
  suffix = "Private Limited",
}: {
  className?: string;
  suffix?: string | null;
}) {
  return (
    <span className={`font-bold tracking-tight whitespace-nowrap ${className}`}>
      <span className="text-brand-700">App</span>
      <span className="text-leaf-700">Me</span>
      <span className="text-saffron-700">Soft</span>
      {suffix ? <span className="text-ink-600 font-semibold"> {suffix}</span> : null}
    </span>
  );
}

/** Same wordmark tuned for dark navy surfaces, where the AA-safe shades flip. */
export function AppMeSoftOnDark({
  className = "",
  suffix = "Private Limited",
}: {
  className?: string;
  suffix?: string | null;
}) {
  return (
    <span className={`font-bold tracking-tight whitespace-nowrap ${className}`}>
      <span className="text-brand-300">App</span>
      <span className="text-leaf-300">Me</span>
      <span className="text-saffron-400">Soft</span>
      {suffix ? <span className="text-white/70 font-semibold"> {suffix}</span> : null}
    </span>
  );
}

/* Brand navy and cyan read off the supplied artwork rather than the site
   palette, so the mark stays exactly on brand wherever it appears. */
export const LOGO_NAVY = "#16124F";
export const LOGO_CYAN = "#00B9E8";

/* Vectorised from public/logo/colegios-logo.png by scripts/trace-logo.cjs.
   Re-run that script if the artwork is ever reissued. */
const MARK_NAVY_PATH =
  "M27.05 1.71L73.29 1.71L90.07 18.84L90.75 20.55L74.66 36.99L73.63 36.99L65.41 28.77L62.67 25L38.01 25L24.66 40.07L24.66 46.92L21.58 47.95L13.01 43.49L10.96 45.89L9.93 45.89L6.51 48.63L5.14 50.68L4.11 50.68L0 53.77L0 32.88ZM11.99 46.23L14.38 46.23L19.18 47.95L19.52 50L16.44 51.71L16.1 53.08L25 59.59L26.03 58.9L22.95 55.82L19.18 53.77L18.49 52.05L19.18 51.03L26.37 48.29L31.16 51.71L39.38 59.93L43.49 65.41L46.23 71.58L47.6 72.95L48.97 78.42L50.34 79.79L50.34 87.67L60.62 79.45L63.36 79.11L69.52 76.03L78.77 75L81.16 73.97L91.44 75.34L92.12 79.11L93.84 81.85L93.15 83.56L80.14 82.88L70.21 83.9L57.53 88.7L54.45 90.75L53.08 92.12L53.42 92.81L63.36 87.33L79.45 83.56L95.55 85.27L94.18 80.82L95.89 80.14L98.29 81.51L100 93.84L98.63 94.52L85.96 91.44L72.26 91.44L70.21 92.47L60.62 93.49L50.68 97.26L49.66 97.26L49.66 96.23L52.74 93.49L52.05 92.81L47.26 96.58L46.23 94.18L46.23 88.7L43.84 82.19L43.15 83.22L44.52 85.96L45.55 91.78L45.55 93.15L44.52 93.49L42.81 90.07L40.07 87.67L40.41 86.99L36.64 80.82L30.14 74.66L27.4 70.89L12.67 59.93L7.19 57.88L3.08 54.79L6.16 51.03L7.53 50.68ZM13.36 46.58L3.77 54.79L13.36 59.59L29.45 71.92L39.04 82.88L44.52 92.12L42.12 82.53L35.62 71.23L27.05 61.99L13.7 52.4L18.15 50L18.49 48.97ZM25.68 48.97L19.18 52.74L28.08 59.25L34.93 66.1L40.07 72.95L45.21 83.22L47.6 95.55L56.85 88.36L68.84 83.56L77.4 82.19L92.81 82.88L90.41 75.68L77.4 75.34L70.55 76.71L63.01 79.45L57.19 82.88L50 89.04L48.63 78.77L43.84 67.47L38.36 59.93L31.51 53.08ZM0 55.82L4.79 58.22L7.19 58.56L7.19 59.25L7.88 58.9L8.22 59.93L16.1 64.04L29.45 75.34L38.01 86.64L39.04 86.99L44.52 98.29L27.05 98.29L0 67.47ZM27.05 59.59L26.37 60.62L28.08 62.67L32.53 67.12L33.9 68.15L34.93 67.81L32.53 64.38ZM73.63 62.33L81.51 69.18L84.25 72.6L75.68 72.95L65.07 75.68L60.62 77.74L59.93 79.11L58.9 78.77L57.19 79.79L52.4 83.9L51.71 83.56L50 74.66L62.33 74.66ZM35.27 67.81L34.59 69.18L36.64 71.23L36.99 70.21ZM37.67 71.23L36.99 72.26L41.78 79.79L41.44 76.37ZM43.15 80.82L42.47 81.16L42.81 81.85ZM95.55 80.82L95.21 81.85L96.58 86.3L88.01 84.93L72.6 85.62L61.64 89.04L54.79 92.81L50.68 96.23L62.33 92.47L73.63 90.75L87.67 91.1L99.32 93.84L97.95 82.19ZM75.34 93.15L77.4 93.15L77.4 93.84L73.29 98.29L53.77 98.29L53.77 97.6L56.51 96.92L56.51 96.23Z";

const MARK_CYAN_PATH =
  "M13.01 46.58L18.49 48.97L18.15 50L13.7 52.4L27.05 61.99L35.62 71.23L42.12 82.53L44.52 92.12L39.04 82.88L29.45 71.92L18.49 63.01L10.96 58.22L3.77 54.79ZM25.34 48.97L31.51 53.08L38.36 59.93L43.84 67.47L47.95 76.37L49.32 81.51L50 89.04L60.27 80.82L68.15 77.4L77.4 75.34L90.41 75.68L92.81 82.88L77.4 82.19L68.84 83.56L56.85 88.36L47.6 95.55L46.23 86.3L40.07 72.95L34.93 66.1L28.08 59.25L19.18 52.74ZM95.21 80.82L97.95 82.19L99.32 93.84L87.67 91.1L73.63 90.75L62.33 92.47L50.68 96.23L54.79 92.81L61.64 89.04L72.6 85.62L88.01 84.93L96.58 86.3Z";

/**
 * The Colegios mark: the faceted C with an open book, vectorised from the
 * supplied logo artwork. Drawn as paths rather than shipped as the PNG so it
 * is transparent, crisp at any size and recolourable.
 *
 * The book's page separations are white gaps in the artwork, so on a dark
 * surface the mark needs something light behind it — `plate` puts it on a
 * white rounded tile, which is what the footer uses.
 */
export function ColegiosMark({
  size = 40,
  plate = false,
}: {
  size?: number;
  /** Sit the mark on a white rounded tile, for dark backgrounds. */
  plate?: boolean;
}) {
  const glyph = (
    <svg
      viewBox="0 0 100 100"
      width={plate ? Math.round(size * 0.78) : size}
      height={plate ? Math.round(size * 0.78) : size}
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path fill={LOGO_NAVY} fillRule="evenodd" d={MARK_NAVY_PATH} />
      <path fill={LOGO_CYAN} fillRule="evenodd" d={MARK_CYAN_PATH} />
    </svg>
  );

  if (!plate) return glyph;

  return (
    <span
      aria-hidden
      className="inline-grid shrink-0 place-items-center rounded-[26%] bg-white shadow-[0_6px_18px_-8px_rgba(0,0,0,0.55)]"
      style={{ width: size, height: size }}
    >
      {glyph}
    </span>
  );
}

export function Wordmark({
  onDark = false,
  size = 40,
}: {
  onDark?: boolean;
  size?: number;
}) {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="Colegios, home">
      <ColegiosMark size={size} plate={onDark} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.35rem] font-extrabold tracking-[-0.04em] transition-colors duration-300 sm:text-[1.55rem] ${
            onDark ? "text-white" : "text-brand-800 group-hover:text-brand-600"
          }`}
        >
          Colegios
        </span>
        {/* Says what it is, in the words a principal would search for. */}
        <span
          className={`mt-1.5 font-mono text-[0.4375rem] font-medium tracking-[0.16em] whitespace-nowrap uppercase sm:text-[0.5rem] ${
            onDark ? "text-white/65" : "text-ink-400"
          }`}
        >
          School Management System
        </span>
      </span>
    </Link>
  );
}
