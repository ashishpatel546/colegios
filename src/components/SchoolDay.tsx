"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { Pause, Play } from "lucide-react";
import { dayEnd, dayStart, schoolDay } from "@/lib/site";

const accentClasses = {
  brand: {
    dot: "bg-brand-600",
    ring: "bg-brand-600/35",
    soft: "bg-brand-50 text-brand-700 border-brand-100",
    text: "text-brand-700",
  },
  leaf: {
    dot: "bg-leaf-600",
    ring: "bg-leaf-600/35",
    soft: "bg-leaf-50 text-leaf-700 border-leaf-100",
    text: "text-leaf-700",
  },
  saffron: {
    dot: "bg-saffron-600",
    ring: "bg-saffron-600/35",
    soft: "bg-saffron-50 text-saffron-700 border-saffron-200",
    text: "text-saffron-700",
  },
} as const;

const span = dayEnd - dayStart;
const positionOf = (minutes: number) => ((minutes - dayStart) / span) * 100;

const hourTicks = Array.from({ length: dayEnd / 60 - dayStart / 60 + 1 }, (_, i) => dayStart / 60 + i);

/**
 * "A day at Colegios" — the page's signature. A marker walks the school day and
 * each module appears at the hour it actually happens, so the times carry real
 * information instead of decorative 01 / 02 / 03 numbering.
 */
export default function SchoolDay() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const reduced = useReducedMotionSafe();
  const trackRef = useRef<HTMLDivElement>(null);
  const inView = useInView(trackRef, { amount: 0.35 });

  const select = useCallback((index: number) => {
    setActive(index);
    setPlaying(false); // a deliberate choice wins over the auto-advance
  }, []);

  useEffect(() => {
    if (!playing || !inView || reduced) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % schoolDay.length),
      4200,
    );
    return () => window.clearInterval(id);
  }, [playing, inView, reduced]);

  const event = schoolDay[active];
  const accent = accentClasses[event.accent];
  const markerPosition = positionOf(event.minutes);

  return (
    <div ref={trackRef}>
      {/* ---------- Desktop: the bell-schedule track ---------- */}
      <div className="hidden lg:block">
        <div className="card overflow-hidden rounded-[1.75rem] px-10 pt-9 pb-8">
          <div className="mb-7 flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">The school day</p>
              <p className="mt-1 text-sm text-ink-500">
                Follow the marker, or pick a moment.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setPlaying((v) => !v)}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-white px-4 text-sm font-semibold text-ink-600 transition-colors hover:border-brand-300 hover:text-brand-700"
              aria-label={playing ? "Pause the school day" : "Play the school day"}
            >
              {playing ? <Pause size={14} /> : <Play size={14} />}
              {playing ? "Pause" : "Play"}
            </button>
          </div>

          {/* Track */}
          <div className="relative mx-3 h-[6.5rem]">
            {/* Only the selected event is named on the track. Consecutive
                periods sit minutes apart, so labelling all seven collides. */}
            <motion.div
              className="pointer-events-none absolute top-0 w-48 -translate-x-1/2 text-center"
              animate={{ left: `${markerPosition}%` }}
              transition={{ duration: reduced ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={event.time}
                  initial={{ opacity: 0, y: reduced ? 0 : 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduced ? 0 : -4 }}
                  transition={{ duration: reduced ? 0.12 : 0.28 }}
                  className={`inline-block rounded-full border px-3 py-1 text-xs font-bold ${accent.soft}`}
                >
                  {event.label}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            {/* hour ruler — ticks only; the event times below carry the reading */}
            <div className="absolute top-[3.25rem] right-0 left-0 h-px bg-line" />
            {hourTicks.map((hour) => (
              <span
                key={hour}
                className="absolute top-[3.25rem] block h-1.5 w-px -translate-x-1/2 bg-line"
                style={{ left: `${positionOf(hour * 60)}%` }}
              />
            ))}

            {/* progress fill up to the marker */}
            <motion.div
              className="absolute top-[3.25rem] left-0 h-[3px] -translate-y-[1px] rounded-full bg-gradient-to-r from-saffron-500 via-leaf-500 to-brand-600"
              animate={{ width: `${markerPosition}%` }}
              transition={{ duration: reduced ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* event dots */}
            {schoolDay.map((item, index) => {
              const isActive = index === active;
              const tone = accentClasses[item.accent];
              return (
                <button
                  key={item.time}
                  type="button"
                  onClick={() => select(index)}
                  aria-pressed={isActive}
                  className="group absolute top-[2.25rem] flex w-16 -translate-x-1/2 cursor-pointer flex-col items-center gap-2.5 rounded-lg py-2 focus-visible:outline-offset-4"
                  style={{ left: `${positionOf(item.minutes)}%` }}
                >
                  <span className="sr-only">{item.label} — </span>
                  <span className="relative grid place-items-center">
                    {isActive && !reduced ? (
                      <span
                        className={`animate-pulse-ring absolute h-3 w-3 rounded-full ${tone.ring}`}
                      />
                    ) : null}
                    <span
                      className={`relative h-3 w-3 rounded-full ring-4 ring-white transition-all duration-300 ${
                        isActive ? `${tone.dot} scale-125` : "bg-ink-200 group-hover:bg-ink-400"
                      }`}
                    />
                  </span>
                  <span
                    className={`tnum font-mono text-[0.6875rem] font-medium tracking-wider transition-colors ${
                      isActive ? tone.text : "text-ink-400 group-hover:text-ink-600"
                    }`}
                  >
                    {item.time}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active moment */}
          <div className="mt-6 min-h-[9.5rem] rounded-2xl border border-line-soft bg-ground/70 p-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={event.time}
                initial={{ opacity: 0, y: reduced ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -8 }}
                transition={{ duration: reduced ? 0.15 : 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-6"
              >
                <span
                  className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl border ${accent.soft}`}
                >
                  <event.icon size={24} strokeWidth={1.75} />
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="tnum font-mono text-sm font-medium tracking-wider text-ink-400">
                      {event.time}
                    </span>
                    <h3 className="font-display text-2xl leading-none font-bold">{event.label}</h3>
                    <span className={`chip border ${accent.soft}`}>{event.module}</span>
                  </div>
                  <p className="mt-3 max-w-3xl text-[1.0625rem] leading-relaxed text-ink-500">
                    {event.detail}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ---------- Mobile and tablet: the same day, read top to bottom ---------- */}
      <ol className="relative lg:hidden">
        <span
          aria-hidden
          className="absolute top-3 bottom-3 left-[1.4375rem] w-px bg-gradient-to-b from-saffron-400 via-leaf-400 to-brand-500 opacity-45"
        />
        {schoolDay.map((item, index) => {
          const tone = accentClasses[item.accent];
          return (
            <motion.li
              key={item.time}
              initial={{ opacity: 0, y: reduced ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: reduced ? 0.2 : 0.5,
                delay: reduced ? 0 : Math.min(index * 0.05, 0.3),
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative flex gap-4 pb-6 last:pb-0 sm:gap-5"
            >
              <span
                className={`relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-2xl border bg-white ${tone.soft}`}
              >
                <item.icon size={20} strokeWidth={1.75} />
              </span>
              <div className="card card-hover group min-w-0 flex-1 p-5">
                <span className="rail-edge" />
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="tnum font-mono text-xs font-medium tracking-wider text-ink-400">
                    {item.time}
                  </span>
                  <h3 className="font-display text-lg leading-tight font-bold">{item.label}</h3>
                </div>
                <span className={`chip mt-2.5 border ${tone.soft}`}>{item.module}</span>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-500">{item.detail}</p>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
