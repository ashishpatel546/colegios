import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Module } from "@/lib/site";

const accents = {
  brand: "bg-brand-50 text-brand-700 border-brand-100",
  leaf: "bg-leaf-50 text-leaf-700 border-leaf-100",
  saffron: "bg-saffron-50 text-saffron-700 border-saffron-200",
} as const;

export default function ModuleCard({
  module,
  accent = "brand",
}: {
  module: Module;
  accent?: keyof typeof accents;
}) {
  const Icon = module.icon;

  const body = (
    <>
      <span className="rail-edge" />
      <div className="flex items-start justify-between gap-3">
        <span
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl border transition-transform duration-300 group-hover:scale-105 ${accents[accent]}`}
        >
          <Icon size={21} strokeWidth={1.75} />
        </span>
        {module.isNew ? <span className="chip chip-new">New</span> : null}
      </div>

      <h3 className="font-display mt-5 text-lg leading-snug font-bold">{module.name}</h3>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-500">{module.description}</p>

      {module.href ? (
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
          How it works
          <ArrowUpRight
            size={15}
            strokeWidth={2.25}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      ) : null}
    </>
  );

  const className = "card card-hover group flex flex-col overflow-hidden p-6 h-full";

  return module.href ? (
    <Link href={module.href} className={className}>
      {body}
    </Link>
  ) : (
    <article className={className}>{body}</article>
  );
}
