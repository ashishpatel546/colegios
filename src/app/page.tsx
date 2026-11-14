import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Gift } from "lucide-react";

import CtaBand from "@/components/CtaBand";
import Faq from "@/components/Faq";
import LiveNow from "@/components/LiveNow";
import Marquee from "@/components/Marquee";
import ModuleCard from "@/components/ModuleCard";
import Maker from "@/components/Maker";
import Reveal from "@/components/Reveal";
import SafetyStory from "@/components/SafetyStory";
import SchoolDay from "@/components/SchoolDay";
import SectionHeading from "@/components/SectionHeading";
import Standards from "@/components/Standards";
import {
  audiences,
  moduleCount,
  moduleGroups,
  newCapabilities,
  offer,
  outcomes,
  pricing,
  site,
  spotlights,
} from "@/lib/site";

const accentBadge = {
  brand: "bg-brand-50 text-brand-700 border-brand-100",
  leaf: "bg-leaf-50 text-leaf-700 border-leaf-100",
  saffron: "bg-saffron-50 text-saffron-700 border-saffron-200",
} as const;

export default function Home() {
  return (
    <>
      {/* ============================== Hero ============================== */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-36 lg:pt-44 lg:pb-24">
        {/* Soft light, never a saturated slab */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-50/80 via-ground to-ground" />
          <div className="grid-paper absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]" />
          <div className="animate-drift absolute -top-24 -right-24 h-[30rem] w-[30rem] rounded-full bg-brand-200/40 blur-[110px]" />
          <div className="absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-saffron-100/70 blur-[110px]" />
        </div>

        <div className="shell">
          <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
            {/* ---- Left: the thesis ---- */}
            <div>
              <Reveal>
                <a
                  href="#offers"
                  className="group inline-flex items-center gap-2 rounded-full border border-saffron-200 bg-white/85 py-1.5 pr-4 pl-1.5 text-sm shadow-soft backdrop-blur transition-colors hover:border-saffron-300"
                >
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-saffron-100">
                    <Gift size={13} className="text-saffron-700" />
                  </span>
                  <span className="font-semibold text-ink-700">
                    Offer running: four premium modules free
                  </span>
                  <ArrowRight
                    size={14}
                    strokeWidth={2.25}
                    className="text-saffron-700 transition-transform group-hover:translate-x-0.5"
                  />
                </a>
              </Reveal>

              <Reveal index={1}>
                {/* No hard line break: the closing full stop must stay welded to
                    the highlighted phrase, or it orphans onto its own line. */}
                <h1 className="display mt-7 max-w-[15ch]">
                  Every part of the school day, on{" "}
                  {/* The wrapper carries padding below the text so the marker can
                      be anchored to a box edge rather than guessed from font
                      metrics — it lands on the baseline at every size. */}
                  <span className="relative inline-block pb-[0.15em] whitespace-nowrap">
                    <span className="relative z-10">one system.</span>
                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-[0.02em] -z-0 h-[0.22em] rounded-[2px] bg-saffron-200/80"
                    />
                  </span>
                </h1>
              </Reveal>

              <Reveal index={2}>
                <p className="lede mt-6 max-w-xl">
                  Colegios runs admissions, fees, attendance, exams, transport, events and campus
                  safety off a single record. Nothing is entered twice, and nobody is waiting on a
                  file.
                </p>
              </Reveal>

              <Reveal index={3}>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link href="/contact" className="btn btn-primary w-full sm:w-auto">
                    Book a demo
                    <ArrowRight size={17} strokeWidth={2.25} />
                  </Link>
                  <Link href="/features" className="btn btn-quiet w-full sm:w-auto">
                    See every feature
                  </Link>
                </div>
              </Reveal>

              <Reveal index={4}>
                <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
                  {[
                    `Plans from ${pricing.from} per student a month`,
                    "Live attendance updates for parents, at no extra cost",
                    "Live in two to four weeks",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-ink-500">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-leaf-50">
                        <Check size={12} strokeWidth={3} className="text-leaf-700" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* ---- Right: a real classroom, and what is happening in it ---- */}
            <Reveal index={2} direction="right" travel={24}>
              <div className="relative mx-auto w-full max-w-lg pb-24 sm:pb-16 lg:max-w-none lg:pb-12">
                {/* The frame itself does not clip: the inner picture has its own
                    rounding, which leaves the live panel free to hang past the
                    bottom-left corner. */}
                <div className="relative aspect-[4/3] rounded-[1.75rem] border border-white/70 bg-white p-2 shadow-float">
                  <div className="relative h-full w-full overflow-hidden rounded-[1.35rem]">
                    <Image
                      src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1600&auto=format&fit=crop"
                      alt="A class in session, students at their desks"
                      fill
                      priority
                      sizes="(max-width: 1024px) 90vw, 44vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950/55 via-brand-950/5 to-transparent" />
                  </div>

                  {/* Gate chip, tucked into the frame */}
                  <div className="glass absolute top-5 right-5 rounded-full px-3.5 py-2 shadow-lift">
                    <p className="flex items-center gap-2 text-[0.6875rem] font-bold text-ink-800">
                      <span className="h-1.5 w-1.5 rounded-full bg-leaf-500" />
                      Gate 1 · open
                    </p>
                  </div>

                  {/* Anchored to the picture, not to the column, so the overlap
                      holds at every width. */}
                  <div className="absolute right-6 -bottom-14 left-2 sm:right-auto sm:-bottom-10 sm:left-[-1.5rem] sm:w-[62%] lg:left-[-2.75rem] lg:w-[58%]">
                    <LiveNow />
                  </div>
                </div>

                <div
                  className="animate-drift absolute right-[-0.5rem] bottom-16 hidden rounded-2xl border border-line bg-white px-4 py-3 shadow-lift sm:block lg:right-[-2rem]"
                  style={{ animationDelay: "-6s" }}
                >
                  <p className="font-mono text-[0.5625rem] tracking-[0.2em] text-ink-400 uppercase">
                    Dismissal
                  </p>
                  <p className="font-display text-base leading-tight font-bold text-brand-800">
                    Guardian matched
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Marquee />

      <SafetyStory />

      {/* ============================== Offers ============================== */}
      {/* Linked from the main menu as /#offers. No end date on purpose: the
          offer reads as running now, and the copy asks for action today. */}
      <section id="offers" className="section scroll-mt-28">
        <div className="shell">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-saffron-200 bg-gradient-to-br from-saffron-50 via-white to-brand-50 p-6 shadow-lift sm:p-10 lg:p-12">
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-saffron-500 via-leaf-500 to-brand-600" />
              <div
                aria-hidden
                className="pointer-events-none absolute -top-28 -right-24 h-80 w-80 rounded-full bg-saffron-200/50 blur-[100px]"
              />

              <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-saffron-300 bg-white px-3.5 py-1.5 text-xs font-bold tracking-wide text-saffron-800 uppercase">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-saffron-500 opacity-70 motion-safe:animate-ping" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-saffron-600" />
                    </span>
                    Offer running now · limited period
                  </span>

                  <h2 className="headline mt-6">
                    Four premium modules,{" "}
                    <span className="text-saffron-700">free until your first renewal.</span>
                  </h2>
                  <p className="lede mt-4 max-w-xl">
                    {offer.terms} Enrol while the offer is open and your school runs the full
                    campus suite from day one, at no extra cost.
                  </p>

                  <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                    {offer.freeModules.map((module) => (
                      <li
                        key={module.name}
                        className="flex items-start gap-3 rounded-2xl border border-line bg-white/90 p-4"
                      >
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-leaf-100 bg-leaf-50 text-leaf-700">
                          <module.icon size={19} strokeWidth={1.75} />
                        </span>
                        <span className="min-w-0">
                          <span className="flex flex-wrap items-center gap-2">
                            <span className="font-display text-base leading-tight font-bold text-ink-900">
                              {module.name}
                            </span>
                            <span className="chip chip-live py-0.5">Free</span>
                            {"tag" in module ? (
                              <span className="chip chip-new py-0.5">{module.tag}</span>
                            ) : null}
                          </span>
                          <span className="mt-1 block text-sm leading-snug text-ink-500">
                            {module.line}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Link href="/contact" className="btn btn-primary w-full sm:w-auto">
                      Claim the offer
                      <ArrowRight size={17} strokeWidth={2.25} />
                    </Link>
                    <a
                      href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
                        "Hi, we would like to claim the Colegios offer for our school.",
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-quiet w-full sm:w-auto"
                    >
                      Ask on WhatsApp
                    </a>
                  </div>
                  <p className="mt-4 text-sm font-semibold text-ink-600">
                    Want to try it first? Our team will set up a trial around your school.
                  </p>
                </div>

                <div className="flex flex-col gap-5">
                  <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-brand-800 via-brand-900 to-ink-900 p-6 text-white sm:p-7">
                    <p className="font-mono text-[0.6875rem] tracking-[0.2em] text-white/55 uppercase">
                      Plans from
                    </p>
                    <p className="font-display tnum mt-2 text-[3.25rem] leading-none font-extrabold tracking-[-0.04em]">
                      {pricing.from}
                    </p>
                    <p className="mt-2 text-[0.9375rem] font-semibold text-brand-100/85">
                      {pricing.unit}
                    </p>
                    <p className="mt-4 inline-flex rounded-full bg-white/10 px-3 py-1.5 text-sm font-bold text-saffron-300 ring-1 ring-white/15">
                      That is {pricing.perDay}
                    </p>
                  </div>

                  <div className="rounded-[1.5rem] border border-line bg-white/90 p-5 sm:p-6">
                    <p className="eyebrow">Also new, and yours to try</p>
                    <ul className="mt-4 space-y-1">
                      {offer.alsoNew.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className="group -mx-2 flex items-center gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-ground"
                          >
                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
                              <item.icon size={17} strokeWidth={1.75} />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-[0.9375rem] leading-tight font-semibold text-ink-800 group-hover:text-brand-700">
                                {item.name}
                              </span>
                              <span className="block text-[0.8125rem] text-ink-400">{item.line}</span>
                            </span>
                            <span
                              className={`chip shrink-0 py-0.5 ${
                                item.status === "Beta" ? "chip-brand" : "chip-live"
                              }`}
                            >
                              {item.status}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <p className="relative mt-8 border-t border-saffron-200/70 pt-5 text-xs leading-relaxed text-ink-400">
                {pricing.note} The free modules are billed from your first renewal. Beta features
                are switched on by request. T&amp;C apply.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================ Just launched ============================ */}
      <section className="section border-y border-line bg-white/60">
        <div className="shell">
          <SectionHeading
            eyebrow="Just launched"
            title={
              <>
                Two new answers to the questions parents ask most:{" "}
                <span className="text-brand-700">where is the bus, and who is at the gate</span>.
              </>
            }
            lede="Transport is already the feature schools ask for first. Event management brings the same control to annual days, sports meets and PTMs, when the gate is busiest."
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {spotlights.map((spotlight, index) => (
              <Reveal key={spotlight.id} index={index}>
                <article className="card flex h-full flex-col overflow-hidden p-7 sm:p-9">
                  <span className="rail-edge" />
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl border ${accentBadge[spotlight.accent]}`}
                    >
                      <spotlight.icon size={25} strokeWidth={1.75} />
                    </span>
                    <span className="chip chip-new">{spotlight.eyebrow}</span>
                  </div>

                  <h3 className="font-display mt-6 text-2xl leading-tight font-bold sm:text-[1.65rem]">
                    {spotlight.name}
                  </h3>
                  <p className="mt-2 text-[1.0625rem] leading-relaxed font-semibold text-ink-600">
                    {spotlight.line}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {spotlight.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-ink-600">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-leaf-50">
                          <Check size={12} strokeWidth={3} className="text-leaf-700" />
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-8">
                    <Link href="/contact" className="btn btn-ink min-h-11 px-5 text-sm">
                      See it in a demo
                    </Link>
                    <Link
                      href={spotlight.href}
                      className="link-underline inline-flex items-center gap-1 text-sm font-semibold text-brand-700"
                    >
                      In the catalogue
                      <ArrowUpRight size={14} strokeWidth={2.25} />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= New capabilities ========================= */}
      <section className="section">
        <div className="shell">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Also new in Colegios"
              title={
                <>
                  Four more additions, all pointed at the same thing:{" "}
                  <span className="text-brand-700">who is on campus, and what is on it</span>.
                </>
              }
              lede="Schools already trusted us with records. These four extend that to the gate, the store room and the dismissal line."
            />
            <Reveal index={1}>
              <Link
                href="/security"
                className="btn btn-quiet shrink-0"
              >
                See them working
                <ArrowUpRight size={16} strokeWidth={2.25} />
              </Link>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {newCapabilities.map((capability, index) => (
              <Reveal key={capability.slug} index={index}>
                <Link
                  href={`/security#${capability.slug}`}
                  className="card card-hover group flex h-full flex-col overflow-hidden p-6"
                >
                  <span className="rail-edge" />
                  <span
                    className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl border transition-transform duration-300 group-hover:scale-105 ${accentBadge[capability.accent]}`}
                  >
                    <capability.icon size={22} strokeWidth={1.75} />
                  </span>

                  <p className="eyebrow mt-5">{capability.kicker}</p>
                  <h3 className="font-display mt-2 text-lg leading-snug font-bold">
                    {capability.name}
                  </h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-500">
                    {capability.summary}
                  </p>

                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand-700">
                    How it works
                    <ArrowUpRight
                      size={15}
                      strokeWidth={2.25}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== The signature: a school day ===================== */}
      <section id="a-day" className="section scroll-mt-28 border-y border-line bg-white/60">
        <div className="shell">
          <SectionHeading
            eyebrow="07:00 — 17:00"
            title="A day at a school running Colegios."
            lede="Not a feature list. The same Tuesday, module by module, at the hour each one actually earns its place."
            align="center"
            className="mb-14"
          />
          <SchoolDay />
        </div>
      </section>

      {/* ========================== Module overview ========================== */}
      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="The catalogue"
            title={`${moduleCount} modules. One record underneath them.`}
            lede="Switch on what your school needs today and add the rest later — the data already knows about it."
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {moduleGroups.map((group, index) => (
              <Reveal key={group.id} index={index}>
                <div className="card group h-full overflow-hidden p-7 sm:p-8">
                  <span className="rail-edge" />
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-display text-xl font-bold sm:text-2xl">{group.title}</h3>
                    <Link
                      href={`/features#${group.id}`}
                      className="link-underline inline-flex items-center gap-1 text-sm font-semibold text-brand-700"
                    >
                      Open
                      <ArrowUpRight size={14} strokeWidth={2.25} />
                    </Link>
                  </div>
                  <p className="mt-2 text-[0.9375rem] text-ink-500">{group.intent}</p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {group.modules.map((module) => (
                      <li
                        key={module.name}
                        className={`chip border ${
                          module.isNew
                            ? "chip-new"
                            : "border-line bg-ground text-ink-600"
                        }`}
                      >
                        {module.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal index={2} className="mt-10 flex justify-center">
            <Link href="/features" className="btn btn-ink">
              Browse every feature
              <ArrowRight size={17} strokeWidth={2.25} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ====================== Who it changes the day for ====================== */}
      <section className="section border-y border-line bg-white/60">
        <div className="shell grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Who it is for"
              title="Four people open it every morning, for four different reasons."
              lede="A system only sticks if every role gets something back on day one. Colegios is built role by role, not screen by screen."
            />

            <Reveal index={2}>
              <div className="mt-10 grid grid-cols-2 gap-4">
                {outcomes.map((outcome) => (
                  <div key={outcome.label} className="card p-5">
                    <outcome.icon size={20} strokeWidth={1.75} className="text-brand-600" />
                    <p className="font-display mt-4 text-2xl leading-none font-extrabold text-ink-900">
                      {outcome.stat}
                      <span className="ml-1 text-sm font-bold text-ink-400">{outcome.unit}</span>
                    </p>
                    <p className="mt-2 text-[0.8125rem] leading-snug font-semibold text-ink-700">
                      {outcome.label}
                    </p>
                    <p className="mt-1.5 text-[0.8125rem] leading-snug text-ink-400">
                      {outcome.detail}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <ul className="flex flex-col gap-4">
            {audiences.map((audience, index) => (
              <Reveal key={audience.role} index={index} direction="right">
                <li className="card card-hover group flex items-start gap-5 overflow-hidden p-6 sm:p-7">
                  <span className="rail-edge" />
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-brand-100 bg-brand-50 text-brand-700 transition-transform duration-300 group-hover:scale-105">
                    <audience.icon size={21} strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg leading-snug font-bold">{audience.role}</h3>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-500">
                      {audience.line}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================ Campus safety ============================ */}
      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Campus, transport and safety"
            title="The part parents ask about first."
            lede="The bus on a live map, identity at the gate, a matched guardian at dismissal, passes for event day, and a visitor register that closes itself."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {moduleGroups[0].modules.map((module, index) => (
              <Reveal key={module.name} index={index}>
                <ModuleCard module={module} accent="saffron" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Standards />

      <Maker />

      {/* ================================ FAQ ================================ */}
      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <SectionHeading
            eyebrow="Before you ask"
            title="The questions every school asks us."
            lede="If yours is not here, put it in a message and you will get a straight answer, not a brochure."
          />
          <Reveal index={1}>
            <Faq />
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
