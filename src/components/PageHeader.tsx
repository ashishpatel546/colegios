import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function PageHeader({
  eyebrow,
  title,
  lede,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  lede: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-32 pb-14 sm:pt-36 lg:pt-40 lg:pb-16">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50/90 via-ground to-ground" />
        <div className="grid-paper absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,#000,transparent_80%)]" />
        <div className="animate-drift absolute -top-32 right-[-6rem] h-[26rem] w-[26rem] rounded-full bg-brand-200/40 blur-[110px]" />
        <div className="absolute -bottom-48 left-[-8rem] h-[24rem] w-[24rem] rounded-full bg-saffron-100/60 blur-[110px]" />
      </div>

      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div>
            <Reveal>
              <span className="rail mb-5" />
              <p className="eyebrow">{eyebrow}</p>
              <h1 className="display mt-4 max-w-4xl">{title}</h1>
            </Reveal>
            <Reveal index={1}>
              <p className="lede mt-6 max-w-2xl">{lede}</p>
            </Reveal>
          </div>
          {aside ? (
            <Reveal index={2} direction="right">
              {aside}
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
