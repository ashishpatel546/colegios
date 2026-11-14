import Link from "next/link";
import {
  ArrowRight,
  Bus,
  ClipboardCheck,
  IdCard,
  ScanLine,
  ShieldCheck,
  Ticket,
  UserRoundCheck,
  type LucideIcon,
} from "lucide-react";
import Reveal from "./Reveal";

type Tone = "brand" | "leaf" | "saffron";

const tones: Record<Tone, string> = {
  brand: "bg-brand-50 text-brand-700 border-brand-100",
  leaf: "bg-leaf-50 text-leaf-700 border-leaf-100",
  saffron: "bg-saffron-50 text-saffron-700 border-saffron-200",
};

// One child's day, as his parent's phone sees it. Illustrative names only.
const notifications: { time: string; title: string; detail: string; icon: LucideIcon; tone: Tone }[] = [
  {
    time: "07:42",
    title: "Aarav has boarded Bus 4",
    detail: "Live location is on until he reaches school.",
    icon: Bus,
    tone: "leaf",
  },
  {
    time: "08:05",
    title: "Aarav has reached school",
    detail: "ID card verified at Gate 1.",
    icon: IdCard,
    tone: "brand",
  },
  {
    time: "08:15",
    title: "Marked present",
    detail: "Class VI-B. Live, at no extra cost to the school.",
    icon: ClipboardCheck,
    tone: "leaf",
  },
  {
    time: "14:50",
    title: "Collected by Priya (Mother)",
    detail: "QR verified at Gate 2 before handover.",
    icon: ScanLine,
    tone: "saffron",
  },
  {
    time: "Sat",
    title: "Your Annual Day pass is ready",
    detail: "Car HR 26 DK 4417 is on the pass.",
    icon: Ticket,
    tone: "brand",
  },
];

const promises: { title: string; line: string; icon: LucideIcon }[] = [
  {
    title: "No stranger at pickup",
    line: "A child is handed over only after the guardian's QR is verified, and the parent is told who collected, and when.",
    icon: ScanLine,
  },
  {
    title: "No guessing where the bus is",
    line: "A live map during the trip, and an alert when the child boards, reaches school and is dropped home.",
    icon: Bus,
  },
  {
    title: "No unlisted guest on event day",
    line: "Every guest carries a secure QR pass with their vehicle details, checked at the gate.",
    icon: Ticket,
  },
  {
    title: "No unlogged visitor on campus",
    line: "Every visitor has a pass, a purpose and a host, and the register closes itself on exit.",
    icon: UserRoundCheck,
  },
];

/**
 * The emotional centre of the home page: a parent's day, told as the
 * notifications on their phone. Every line describes a real product feature.
 */
export default function SafetyStory() {
  return (
    <section id="student-safety" className="section scroll-mt-28 overflow-hidden">
      <div className="shell grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow flex items-center gap-2">
              <ShieldCheck size={14} className="text-leaf-600" />
              Student safety
            </p>
            <h2 className="headline mt-4">
              Every child, accounted for.{" "}
              <span className="text-brand-700">
                From the bus stop to the school gate, and safely back home.
              </span>
            </h2>
          </Reveal>

          <Reveal index={1}>
            <p className="lede mt-6 max-w-xl">
              Every parent carries one quiet question through the school day: is my child safe
              right now? Colegios answers it before they have to ask, with a message at every
              moment that matters.
            </p>
          </Reveal>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {promises.map((promise, index) => (
              <li key={promise.title}>
                <Reveal index={index + 2} className="flex h-full items-start gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-saffron-200 bg-saffron-50 text-saffron-700">
                    <promise.icon size={18} strokeWidth={1.75} />
                  </span>
                  <span>
                    <span className="font-display block text-base leading-snug font-bold text-ink-900">
                      {promise.title}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-ink-500">
                      {promise.line}
                    </span>
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal index={6}>
            <div className="mt-10 rounded-2xl border-l-4 border-saffron-500 bg-white/80 px-5 py-4 shadow-soft">
              <p className="font-display text-lg leading-snug font-bold text-ink-900">
                Safety every school needs. Features every Indian parent will love.
              </p>
              <p className="mt-1 text-sm text-ink-500">
                QR-verified pickup was conceived and built from scratch by our own team, in India.
              </p>
            </div>
            <Link href="/contact" className="btn btn-primary mt-8 w-full sm:w-auto">
              See it working for your school
              <ArrowRight size={17} strokeWidth={2.25} />
            </Link>
          </Reveal>
        </div>

        {/* The parent's phone */}
        <Reveal index={1} direction="right" travel={24}>
          <div className="relative mx-auto w-full max-w-[22rem]">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-gradient-to-br from-leaf-100/70 via-brand-100/60 to-saffron-100/70 blur-3xl"
            />
            <div className="rounded-[2.75rem] bg-ink-900 p-3 shadow-float ring-1 ring-ink-800">
              <div className="relative overflow-hidden rounded-[2.2rem] bg-gradient-to-b from-brand-50 to-ground px-4 pt-10 pb-6">
                <span
                  aria-hidden
                  className="absolute top-3 left-1/2 h-5 w-24 -translate-x-1/2 rounded-full bg-ink-900"
                />
                <p className="text-center font-mono text-[0.625rem] tracking-[0.2em] text-ink-400 uppercase">
                  A parent&apos;s phone · one school day
                </p>

                <ol className="mt-5 space-y-2.5" aria-label="Notifications a parent receives">
                  {notifications.map((note, index) => (
                    <li key={note.title}>
                      <Reveal
                        index={index + 2}
                        className="flex items-start gap-3 rounded-2xl border border-white bg-white/95 p-3 shadow-soft"
                      >
                        <span
                          className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl border ${tones[note.tone]}`}
                        >
                          <note.icon size={16} strokeWidth={1.9} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-baseline justify-between gap-2">
                            <span className="text-[0.8125rem] leading-snug font-bold text-ink-900">
                              {note.title}
                            </span>
                            <span className="tnum shrink-0 font-mono text-[0.625rem] text-ink-400">
                              {note.time}
                            </span>
                          </span>
                          <span className="mt-0.5 block text-xs leading-snug text-ink-500">
                            {note.detail}
                          </span>
                        </span>
                      </Reveal>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
