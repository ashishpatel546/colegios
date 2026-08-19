"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { Boxes, IdCard, ScanLine, UserRoundCheck, Wallet } from "lucide-react";
import { useNowSeconds } from "@/lib/useNowSeconds";

const feed = [
  { icon: IdCard, text: "Gate 1 · ID verified", meta: "Class VIII-B", tone: "text-brand-300" },
  { icon: UserRoundCheck, text: "Visitor pass issued", meta: "Reception", tone: "text-saffron-400" },
  { icon: Wallet, text: "Fee receipt raised", meta: "₹ 12,400", tone: "text-leaf-300" },
  { icon: Boxes, text: "Lab stock issued", meta: "12 units", tone: "text-brand-300" },
  { icon: ScanLine, text: "Pickup confirmed", meta: "Guardian matched", tone: "text-saffron-400" },
] as const;

/**
 * The school clock. A campus runs on the bell, so the hero shows the time and
 * what is happening at it, rather than a decorative statistic.
 */
export default function LiveNow() {
  const seconds = useNowSeconds();
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotionSafe();
  const now = seconds === null ? null : new Date(seconds * 1000);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % feed.length), 2600);
    return () => window.clearInterval(id);
  }, [reduced]);

  const time = now
    ? now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    : "--:--";
  const secondsLabel = now ? String(now.getSeconds()).padStart(2, "0") : "--";

  const item = feed[index];

  return (
    <div className="rounded-[1.4rem] border border-white/12 bg-gradient-to-br from-brand-900 to-ink-900 p-5 shadow-float">
      <div className="flex items-center justify-between gap-4">
        <span className="flex items-center gap-2">
          <span className="relative grid h-2 w-2 place-items-center">
            {!reduced ? (
              <span className="animate-pulse-ring absolute h-2 w-2 rounded-full bg-leaf-500/60" />
            ) : null}
            <span className="relative h-2 w-2 rounded-full bg-leaf-500" />
          </span>
          <span className="font-mono text-[0.5625rem] tracking-[0.22em] text-white/60 uppercase">
            Right now
          </span>
        </span>
        <span className="font-mono text-[0.5625rem] tracking-[0.18em] text-white/40 uppercase">
          Gate 1 · IST
        </span>
      </div>

      <p className="tnum font-display mt-2.5 flex items-baseline gap-1.5 text-[2.6rem] leading-none font-extrabold text-white">
        {time}
        <span className="font-mono text-sm font-medium text-white/40">:{secondsLabel}</span>
      </p>

      <div className="mt-4 h-px bg-white/12" />

      <div className="mt-3.5 h-11 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: reduced ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -12 }}
            transition={{ duration: reduced ? 0.15 : 0.34, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/10 ring-1 ring-white/12">
              <item.icon size={17} strokeWidth={1.75} className={item.tone} />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-white">{item.text}</span>
              <span className="block truncate font-mono text-[0.625rem] tracking-wider text-white/45">
                {item.meta}
              </span>
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
