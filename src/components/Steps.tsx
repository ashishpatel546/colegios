import Reveal from "./Reveal";

export type Step = { title: string; detail: string };

const accents = {
  brand: "border-brand-200 bg-brand-50 text-brand-700",
  leaf: "border-leaf-100 bg-leaf-50 text-leaf-700",
  saffron: "border-saffron-200 bg-saffron-50 text-saffron-700",
} as const;

/**
 * Numbered steps. The numbers are kept because these really are sequences —
 * a scan cannot happen before a pass is issued — not as decoration.
 */
export default function Steps({
  steps,
  accent = "brand",
}: {
  steps: Step[];
  accent?: keyof typeof accents;
}) {
  return (
    <ol className="relative flex min-w-0 flex-col gap-5">
      <span
        aria-hidden
        className="absolute top-5 bottom-5 left-[1.1875rem] w-px bg-line"
      />
      {steps.map((step, index) => (
        <Reveal key={step.title} index={index}>
          <li className="relative flex min-w-0 gap-5">
            <span
              className={`tnum relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border font-mono text-sm font-semibold ${accents[accent]}`}
            >
              {index + 1}
            </span>
            <div className="min-w-0 pt-1">
              <h3 className="font-display text-lg leading-snug font-bold">{step.title}</h3>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-500">{step.detail}</p>
            </div>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}
