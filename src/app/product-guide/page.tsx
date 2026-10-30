import type { Metadata } from "next";
import { ChevronDown, FileDown, FileText, MonitorSmartphone } from "lucide-react";

import CtaBand from "@/components/CtaBand";
import GuideBody from "@/components/GuideBody";
import PageHeader from "@/components/PageHeader";
import { GUIDE_CSS } from "@/lib/guideAssets";
import { getProductGuide, guideDownloads } from "@/lib/productGuide";

export const metadata: Metadata = {
  title: "Product guide",
  description:
    "The complete Colegios product guide: current offers, signature features, pricing from ₹5.26 per student per month, plan comparison and how to get started. Read it online or download it as PDF or interactive HTML.",
  alternates: { canonical: "/product-guide" },
};

const TOC_ID = "guide-toc";

const downloads = [
  {
    href: guideDownloads.pdf,
    file: "colegios-product-guide.pdf",
    label: "PDF",
    detail: "Print-ready A4, for email and WhatsApp",
    icon: FileDown,
  },
  {
    href: guideDownloads.html,
    file: "colegios-product-guide.html",
    label: "Interactive HTML",
    detail: "One file, opens in any browser, works offline",
    icon: MonitorSmartphone,
  },
  {
    href: guideDownloads.md,
    file: "colegios-product-guide.md",
    label: "Markdown source",
    detail: "Editable text, for reuse in other material",
    icon: FileText,
  },
];

function TocLinks({ sections }: { sections: { id: string; label: string }[] }) {
  return (
    <ol className="space-y-0.5 text-sm">
      {sections.map((section) => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            className="block rounded-lg border-l-2 border-transparent px-3 py-1.5 leading-snug text-ink-500 transition-colors hover:text-brand-700 aria-[current=true]:border-brand-600 aria-[current=true]:bg-brand-50 aria-[current=true]:font-semibold aria-[current=true]:text-brand-700"
          >
            {section.label}
          </a>
        </li>
      ))}
    </ol>
  );
}

export default function ProductGuidePage() {
  const guide = getProductGuide();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GUIDE_CSS }} />

      <PageHeader
        eyebrow="Product guide"
        title={guide.title}
        lede={guide.subtitle}
        aside={
          <div className="rounded-[1.5rem] border border-line bg-surface p-5 shadow-lift">
            <p className="eyebrow">Download</p>
            <ul className="mt-4 space-y-2">
              {downloads.map(({ href, file, label, detail, icon: Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    download={file}
                    className="group flex items-center gap-3 rounded-xl border border-line-soft px-3.5 py-3 transition-colors hover:border-brand-300 hover:bg-brand-50"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700 group-hover:bg-white">
                      <Icon size={19} strokeWidth={2} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold text-ink-900">{label}</span>
                      <span className="block text-sm text-ink-500">{detail}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        }
      />

      <section className="pb-8">
        <div className="shell grid gap-10 lg:grid-cols-[15.5rem_minmax(0,1fr)] xl:gap-16">
          <aside className="hidden lg:block">
            <nav
              id={TOC_ID}
              aria-label="Guide contents"
              className="sticky top-28 max-h-[calc(100dvh-8rem)] overflow-y-auto pr-1"
            >
              <p className="eyebrow mb-3 px-3">Contents</p>
              <TocLinks sections={guide.sections} />
            </nav>
          </aside>

          <div className="min-w-0 max-w-3xl">
            <details className="group mb-10 rounded-2xl border border-line bg-surface lg:hidden">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-4 font-semibold text-ink-800">
                Contents
                <ChevronDown size={18} className="transition-transform group-open:rotate-180" />
              </summary>
              <nav aria-label="Guide contents" className="border-t border-line-soft p-2">
                <TocLinks sections={guide.sections} />
              </nav>
            </details>

            <GuideBody html={guide.html} tocId={TOC_ID} />
          </div>
        </div>
      </section>

      <CtaBand
        title="Want to see it with your school's data?"
        body="Everything in this guide is live in the product today. Book a walkthrough and we will show you the plan that fits, with your own fee structure and class list."
      />
    </>
  );
}
