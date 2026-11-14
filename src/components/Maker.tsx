import { ArrowUpRight, Globe2, Layers, UserRound, Zap, type LucideIcon } from "lucide-react";
import { site } from "@/lib/site";
import { AppMeSoft } from "./Brand";
import Reveal from "./Reveal";

// Each point is a fact about AppMeSoft taken from the product guide. Keep it
// that way: claims a principal can check are what make this section persuasive.
const facts: { title: string; line: string; icon: LucideIcon }[] = [
  {
    title: "International clients",
    line: "Products built for clients in India and overseas, to the standards those markets expect.",
    icon: Globe2,
  },
  {
    title: "Technology for the EV industry",
    line: "Software where reliability is not optional. The same engineering discipline goes into Colegios.",
    icon: Zap,
  },
  {
    title: "A growing family of products",
    line: "A diversified company, so the platform your school runs on is supported for years to come.",
    icon: Layers,
  },
  {
    title: "Founder-led",
    line: "Leadership stays close to every school we serve, and decisions do not wait in a queue.",
    icon: UserRound,
  },
];

export default function Maker() {
  return (
    <section id="makers" className="section scroll-mt-28">
      <div className="shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-line bg-white p-7 shadow-soft sm:p-10 lg:p-12">
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand-600 via-leaf-500 to-saffron-500" />
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
              <div>
                <p className="eyebrow">From the makers</p>
                <h2 className="headline mt-4">
                  Colegios is the flagship product of{" "}
                  <AppMeSoft className="whitespace-normal" suffix="Private Limited" />.
                </h2>
                <p className="lede mt-5">
                  A technology company that builds products for clients across
                  industries and borders, and brings that same craft to Indian schools.
                </p>
                <a
                  href={site.parentSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-quiet mt-8 w-full sm:w-auto"
                >
                  Visit AppMeSoft
                  <ArrowUpRight size={16} strokeWidth={2.25} />
                </a>
              </div>

              <ul className="grid gap-4 sm:grid-cols-2">
                {facts.map((fact) => (
                  <li key={fact.title} className="rounded-2xl border border-line bg-ground/70 p-5">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-brand-100 bg-brand-50 text-brand-700">
                      <fact.icon size={18} strokeWidth={1.75} />
                    </span>
                    <p className="font-display mt-4 text-base font-bold text-ink-900">{fact.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{fact.line}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
