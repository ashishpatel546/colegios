const replaces = [
  "Attendance registers",
  "Fee counters and receipt books",
  "Visitor diaries at the gate",
  "Stock ledgers in the store room",
  "Report card files",
  "Admission enquiry notebooks",
  "Library issue cards",
  "Gate pass slips",
  "Salary sheets in a spreadsheet",
  "Circulars in a school bag",
];

/**
 * What Colegios replaces, stated as objects a school actually keeps. No borrowed
 * client logos — the honest version of a trust strip.
 */
export default function Marquee() {
  return (
    <section aria-label="What Colegios replaces" className="border-y border-line bg-white/70 py-5">
      <p className="shell mb-4 text-center font-mono text-[0.625rem] tracking-[0.22em] text-ink-400 uppercase">
        One system, in place of
      </p>
      <div
        className="group relative flex overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        {/* The track carries two identical copies and travels exactly one copy
            width, so the loop has no seam. */}
        <div className="animate-marquee flex w-max group-hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center gap-10 pr-10 sm:gap-14 sm:pr-14"
            >
              {replaces.map((item) => (
                <li
                  key={item}
                  className="flex shrink-0 items-center gap-3 text-[0.9375rem] font-semibold whitespace-nowrap text-ink-400"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-saffron-400" />
                  {item}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
