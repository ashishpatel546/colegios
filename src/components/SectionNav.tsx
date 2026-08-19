"use client";

import { useEffect, useState } from "react";

type Item = { id: string; label: string };

/**
 * A sticky index for long pages. It tracks which section is in view so the
 * reader always knows where they are in a catalogue this size.
 */
export default function SectionNav({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <div className="glass-solid sticky top-[4.25rem] z-30 border-b border-line shadow-[0_8px_24px_-22px_rgba(11,27,51,0.7)] lg:top-[4.75rem]">
      <nav aria-label="Sections" className="shell">
        <ul className="no-scrollbar flex gap-2 overflow-x-auto py-3">
          {items.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id} className="shrink-0">
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`inline-flex min-h-10 items-center rounded-full px-4 text-sm font-semibold transition-colors duration-200 ${
                    isActive
                      ? "bg-brand-600 text-white shadow-[0_6px_16px_-8px_rgba(15,59,168,0.9)]"
                      : "border border-line bg-white/70 text-ink-600 hover:border-brand-300 hover:text-brand-700"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
