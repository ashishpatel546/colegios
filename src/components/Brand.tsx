import Image from "next/image";
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

/**
 * The Colegios mark: the school roof and the family held inside the C, cut
 * from the supplied logo artwork (company data/Logos/Colegios-logo.png) with
 * the background, wordmark and watermark removed. The file is a transparent
 * PNG, so it keeps the artwork's blue-to-teal gradients.
 *
 * The figures are teal on a transparent ground, so on a dark surface the mark
 * needs something light behind it — `plate` puts it on a white rounded tile,
 * which is what the footer uses.
 */
export function ColegiosMark({
  size = 40,
  plate = false,
}: {
  size?: number;
  /** Sit the mark on a white rounded tile, for dark backgrounds. */
  plate?: boolean;
}) {
  const glyphSize = plate ? Math.round(size * 0.8) : size;
  const glyph = (
    <Image
      src="/logo/colegios-mark.png"
      alt=""
      aria-hidden
      width={glyphSize}
      height={glyphSize}
      className="shrink-0 object-contain"
      style={{ width: glyphSize, height: glyphSize }}
    />
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
