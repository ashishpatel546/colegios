import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

import CtaBand from "@/components/CtaBand";
import ModuleCard from "@/components/ModuleCard";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SectionNav from "@/components/SectionNav";
import { moduleCount, moduleGroups, newCapabilities } from "@/lib/site";

export const metadata: Metadata = {
  title: "Modules",
  description:
    "Every Colegios module: admissions, student records, attendance, exams, the fee engine, payroll, library, inventory management, visitor management, QR ID cards and secure student pickup.",
  alternates: { canonical: "/features" },
};

export default function FeaturesPage() {
  return (
    <>
      <PageHeader
        eyebrow="The catalogue"
        title={
          <>
            {moduleCount} modules. <span className="text-brand-600">One record</span> underneath
            all of them.
          </>
        }
        lede="Switch on what your school needs this term and add the rest later. Because everything shares the same student, staff and finance record, a module you turn on next year already knows your data."
        aside={
          <div className="card overflow-hidden p-6">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-saffron-600" />
              <p className="eyebrow">Newest additions</p>
            </div>
            <ul className="mt-4 space-y-2.5">
              {newCapabilities.map((capability) => (
                <li key={capability.slug}>
                  <Link
                    href={`/security#${capability.slug}`}
                    className="group flex items-center justify-between gap-3 text-[0.9375rem] font-semibold text-ink-700 transition-colors hover:text-brand-700"
                  >
                    <span className="flex items-center gap-2.5">
                      <capability.icon size={17} strokeWidth={1.75} className="text-brand-600" />
                      {capability.name}
                    </span>
                    <ArrowUpRight
                      size={15}
                      strokeWidth={2.25}
                      className="shrink-0 text-ink-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-600"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        }
      />

      <SectionNav
        items={moduleGroups.map((group) => ({ id: group.id, label: group.title }))}
      />

      {moduleGroups.map((group, groupIndex) => (
        <section
          key={group.id}
          id={group.id}
          className={`section scroll-mt-40 ${
            groupIndex % 2 === 1 ? "border-y border-line bg-white/60" : ""
          }`}
        >
          <div className="shell">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading eyebrow={`0${groupIndex + 1} — ${group.modules.length} modules`} title={group.title} lede={group.intent} />
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {group.modules.map((module, index) => (
                <Reveal key={module.name} index={index}>
                  <ModuleCard module={module} accent={group.accent} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section">
        <div className="shell">
          <Reveal>
            <div className="card overflow-hidden p-8 sm:p-10 lg:p-12">
              <span className="rail mb-6" />
              <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-14">
                <div>
                  <h2 className="headline">Not seeing something your school does?</h2>
                  <p className="lede mt-4">
                    Schools are not identical, and Colegios is not fixed. Fee structures, grading
                    schemes, report card formats and approval chains are configured to match what
                    you already do — and where a module genuinely does not exist, we build it.
                  </p>
                </div>
                <ul className="grid gap-4 sm:grid-cols-2 lg:content-center">
                  {[
                    ["Your grading scheme", "Marks, grades, CCE or a scheme of your own"],
                    ["Your fee heads", "Any frequency, any concession, any fine"],
                    ["Your report card", "Laid out the way your board expects it"],
                    ["Your approvals", "Who signs off on what, and in which order"],
                  ].map(([title, detail]) => (
                    <li key={title} className="rounded-2xl border border-line bg-ground/70 p-5">
                      <p className="font-display text-base font-bold text-brand-900">{title}</p>
                      <p className="mt-1.5 text-sm leading-snug text-ink-500">{detail}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Pick the modules, and we will show you them running."
        body="Tell us which parts of the school hurt most right now. The demo starts there, with your fee structure and your class list, not a sample database."
      />
    </>
  );
}
