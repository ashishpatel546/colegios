import { Check } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { standards, standardsChips } from "@/lib/site";

/**
 * The credibility section, written as a specification sheet rather than a row
 * of trust badges — standards are documents, so it reads like one. Every claim
 * here is an engineering commitment about how the product is built; none of it
 * asserts a third-party certification.
 */
export default function Standards() {
  return (
    <section id="standards" className="section scroll-mt-28 border-y border-line bg-white/60">
      <div className="shell">
        <SectionHeading
          eyebrow="Built to standard"
          title={
            <>
              Held to the standard school software is held to{" "}
              <span className="text-brand-600">anywhere in the world</span>.
            </>
          }
          lede="An Indian school should not have to accept less than a school in Singapore or Stockholm. Colegios is engineered against the same specifications — in how it signs an identity, protects a record, handles a script it has never seen, and stays usable for everyone."
          align="center"
          className="mb-14"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {standards.map((standard, index) => (
            <Reveal key={standard.title} index={index}>
              <div className="card group flex h-full flex-col overflow-hidden p-7">
                <span className="rail-edge" />
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-brand-100 bg-brand-50 text-brand-700 transition-transform duration-300 group-hover:scale-105">
                  <standard.icon size={21} strokeWidth={1.75} />
                </span>

                <h3 className="font-display mt-5 text-lg font-bold">{standard.title}</h3>
                {/* fixed height so the rules under each description line up
                    across the row, whatever the copy length */}
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-500 sm:min-h-[6rem]">
                  {standard.line}
                </p>

                <ul className="mt-5 space-y-2 border-t border-line-soft pt-5">
                  {standard.specs.map((spec) => (
                    <li key={spec} className="flex items-start gap-2.5">
                      <Check
                        size={13}
                        strokeWidth={3}
                        className="mt-[0.3rem] shrink-0 text-leaf-600"
                      />
                      <span className="font-mono text-[0.6875rem] leading-relaxed tracking-wide text-ink-600">
                        {spec}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* The spec strip — the acronyms, stated plainly and once */}
        <Reveal index={2}>
          <div className="mt-10 rounded-[1.5rem] border border-line bg-ground/70 px-6 py-7 sm:px-8">
            <p className="eyebrow mb-5 text-center">Specifications observed</p>
            <ul className="flex flex-wrap items-center justify-center gap-2.5">
              {standardsChips.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-line bg-white px-3.5 py-1.5 font-mono text-[0.6875rem] tracking-wide text-ink-600 shadow-soft"
                >
                  {chip}
                </li>
              ))}
            </ul>
            <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-ink-400">
              These are engineering commitments, not badges. We would rather tell you how the
              product is built than show you a logo you cannot check.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
