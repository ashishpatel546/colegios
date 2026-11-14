import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Module, ModuleTag } from "@/lib/site";

const accents = {
  brand: "bg-brand-50 text-brand-700 border-brand-100",
  leaf: "bg-leaf-50 text-leaf-700 border-leaf-100",
  saffron: "bg-saffron-50 text-saffron-700 border-saffron-200",
} as const;

const tagStyles: Record<ModuleTag, string> = {
  "Most popular": "chip-new",
  "Most loved": "chip-new",
  Beta: "chip-brand",
  "Free in offer": "chip-live",
  "Free for now": "chip-live",
};

export default function ModuleCard({
  module,
  accent = "brand",
}: {
  module: Module;
  accent?: keyof typeof accents;
}) {
  const Icon = module.icon;
  const tags = module.tags ?? [];
  // "Most popular" already says it is worth a look; a third chip would crowd the corner.
  const showNew = module.isNew && !tags.includes("Most popular") && !tags.includes("Most loved");

  const body = (
    <>
      <span className="rail-edge" />
      <div className="flex items-start justify-between gap-3">
        <span
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl border transition-transform duration-300 group-hover:scale-105 ${accents[accent]}`}
        >
          <Icon size={21} strokeWidth={1.75} />
        </span>
        {showNew || tags.length ? (
          <span className="flex flex-wrap justify-end gap-1.5">
            {showNew ? <span className="chip chip-new">New</span> : null}
            {tags.map((tag) => (
              <span key={tag} className={`chip ${tagStyles[tag]}`}>
                {tag}
              </span>
            ))}
          </span>
        ) : null}
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

  const className = "card card-hover group flex flex-col overflow-hidden p-6 h-full scroll-mt-40";

  return module.href ? (
    <Link id={module.id} href={module.href} className={className}>
      {body}
    </Link>
  ) : (
    <article id={module.id} className={className}>
      {body}
    </article>
  );
}
