"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/site";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = useReducedMotionSafe();

  return (
    <div className="divide-y divide-line overflow-hidden rounded-[1.5rem] border border-line bg-white shadow-soft">
      {faqs.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                className="flex w-full cursor-pointer items-start justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-ground/70 sm:px-8 sm:py-6"
              >
                <span className="font-display text-[1.0625rem] leading-snug font-bold text-ink-900 sm:text-lg">
                  {item.q}
                </span>
                <span
                  className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                    isOpen
                      ? "rotate-45 border-brand-200 bg-brand-600 text-white"
                      : "border-line bg-white text-ink-500"
                  }`}
                >
                  <Plus size={16} strokeWidth={2.25} />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="panel"
                  id={`faq-panel-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-[0.9375rem] leading-relaxed text-ink-500 sm:px-8 sm:pb-7 sm:text-base">
                    {item.a}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
