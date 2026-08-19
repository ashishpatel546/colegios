"use client";

import { useMemo, useState } from "react";
import QRCode from "react-qr-code";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { CheckCircle2, RotateCcw, ShieldAlert, ShieldCheck } from "lucide-react";
import { useNowSeconds } from "@/lib/useNowSeconds";

const WINDOW_SECONDS = 30;

/** Display-only digest. The real signing happens server-side with HMAC-SHA256. */
function mockDigest(input: string, length = 24) {
  let h1 = 0x811c9dc5;
  let h2 = 0x1000193;
  for (let i = 0; i < input.length; i += 1) {
    h1 = (h1 ^ input.charCodeAt(i)) >>> 0;
    h1 = Math.imul(h1, 16777619) >>> 0;
    h2 = (h2 + Math.imul(h1 ^ i, 2654435761)) >>> 0;
  }
  let out = "";
  let seed = h1;
  while (out.length < length) {
    seed = (Math.imul(seed, 1103515245) + 12345) >>> 0;
    out += seed.toString(16).padStart(8, "0");
  }
  return out.slice(0, length);
}

const student = {
  name: "Aarav Sharma",
  admission: "CLG/2024/0417",
  klass: "Class VIII — B",
  house: "Neelgiri",
};

export default function SignedIdCard() {
  const reduced = useReducedMotionSafe();
  const seconds = useNowSeconds();
  const [scan, setScan] = useState<"idle" | "valid" | "expired">("idle");

  // The signing window is derived from the clock rather than counted down, so a
  // backgrounded tab cannot drift out of step with the real one.
  const epoch = seconds === null ? null : Math.floor(seconds / WINDOW_SECONDS);
  const remaining = seconds === null ? WINDOW_SECONDS : WINDOW_SECONDS - (seconds % WINDOW_SECONDS);

  // A verified result belongs to the window it was issued in, so it clears when
  // the card re-signs. Reset during render, not in an effect.
  const [scannedEpoch, setScannedEpoch] = useState(epoch);
  if (scannedEpoch !== epoch) {
    setScannedEpoch(epoch);
    if (scan === "valid") setScan("idle");
  }

  const signature = useMemo(
    () => (epoch === null ? "".padEnd(24, "·") : mockDigest(`${student.admission}:${epoch}`)),
    [epoch],
  );

  const payload = useMemo(
    () => `CLG1.${student.admission}.${epoch ?? 0}.${signature}`,
    [signature, epoch],
  );

  const ringLength = 2 * Math.PI * 22;
  const progress = remaining / WINDOW_SECONDS;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:items-center lg:gap-10">
      {/* ---------------- The card ---------------- */}
      <div className="relative mx-auto w-full max-w-[20rem]">
        <div
          aria-hidden
          className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-brand-200/50 via-transparent to-saffron-200/40 blur-2xl sm:-inset-6"
        />
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 18, rotateX: 8 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[1.6rem] border border-white/15 bg-gradient-to-b from-brand-800 to-ink-900 p-6 text-white shadow-float"
        >
          <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-saffron-500 via-leaf-500 to-brand-500" />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-16 -right-10 h-40 w-40 rounded-full bg-brand-400/25 blur-3xl"
          />

          <div className="relative flex items-start justify-between">
            <div>
              <p className="font-mono text-[0.5625rem] tracking-[0.24em] text-white/50 uppercase">
                Student identity
              </p>
              <p className="font-display mt-1.5 text-xl leading-none font-bold text-white">
                {student.name}
              </p>
              <p className="mt-1.5 text-[0.8125rem] text-brand-100/70">{student.klass}</p>
            </div>
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 ring-1 ring-white/15">
              <span className="font-display text-base font-extrabold">AS</span>
            </span>
          </div>

          <div className="relative mt-6 flex items-end gap-4">
            <div className="rounded-2xl bg-white p-2.5 shadow-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={signature}
                  initial={{ opacity: 0, scale: reduced ? 1 : 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: reduced ? 1 : 1.04 }}
                  transition={{ duration: reduced ? 0.12 : 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="grid h-[104px] w-[104px] place-items-center"
                >
                  <QRCode
                    value={payload}
                    size={104}
                    bgColor="#ffffff"
                    fgColor="#0b1b33"
                    level="M"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2.5">
                <span className="relative grid h-12 w-12 place-items-center">
                  <svg viewBox="0 0 48 48" className="absolute h-12 w-12 -rotate-90">
                    <circle cx="24" cy="24" r="22" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="3" />
                    <circle
                      cx="24"
                      cy="24"
                      r="22"
                      fill="none"
                      stroke="var(--color-leaf-500)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={ringLength}
                      strokeDashoffset={ringLength * (1 - progress)}
                      style={{ transition: "stroke-dashoffset 1s linear" }}
                    />
                  </svg>
                  <span className="tnum font-mono text-[0.6875rem] font-semibold text-leaf-300">
                    {epoch === null ? "--" : remaining}
                  </span>
                </span>
                <p className="text-[0.6875rem] leading-snug text-brand-100/65">
                  Re-signs in
                  <br />
                  <span className="text-white/90">{WINDOW_SECONDS}s window</span>
                </p>
              </div>
            </div>
          </div>

          <div className="relative mt-5 border-t border-white/10 pt-4">
            <p className="font-mono text-[0.5625rem] tracking-[0.2em] text-white/40 uppercase">
              HMAC-SHA256 · rotating
            </p>
            <p className="mt-1.5 font-mono text-[0.6875rem] break-all text-leaf-300/90">
              {signature}
            </p>
            <p className="mt-2 font-mono text-[0.625rem] tracking-wider text-white/40">
              {student.admission} · {student.house}
            </p>
          </div>
        </motion.div>
      </div>

      {/* ---------------- The scanner ---------------- */}
      <div className="card p-6 sm:p-8">
        <p className="eyebrow">Try it at the gate</p>
        <h3 className="font-display mt-2 text-xl font-bold sm:text-2xl">
          A photograph of this card will not get anyone in.
        </h3>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-500">
          The QR above re-signs itself every {WINDOW_SECONDS} seconds. Scan the live card and the
          gate opens. Scan a screenshot taken a few minutes ago and the signature it carries has
          already lapsed, so the gate refuses it — with no lookup and no network.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" onClick={() => setScan("valid")} className="btn btn-ink">
            <ShieldCheck size={17} />
            Scan the live card
          </button>
          <button type="button" onClick={() => setScan("expired")} className="btn btn-quiet">
            <ShieldAlert size={17} />
            Scan an old screenshot
          </button>
        </div>

        <div className="mt-5 min-h-[6.5rem]">
          <AnimatePresence mode="wait">
            {scan === "idle" ? (
              <motion.p
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl border border-dashed border-line bg-ground/60 px-5 py-6 text-center text-sm text-ink-400"
              >
                The gate reader is waiting for a scan.
              </motion.p>
            ) : (
              <motion.div
                key={scan}
                initial={{ opacity: 0, y: reduced ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -6 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                role="status"
                aria-live="polite"
                className={`flex items-start gap-4 rounded-2xl border px-5 py-5 ${
                  scan === "valid"
                    ? "border-leaf-100 bg-leaf-50"
                    : "border-danger-600/25 bg-[#fdf2f1]"
                }`}
              >
                {scan === "valid" ? (
                  <CheckCircle2 size={22} className="mt-0.5 shrink-0 text-leaf-700" />
                ) : (
                  <ShieldAlert size={22} className="mt-0.5 shrink-0 text-danger-600" />
                )}
                <div className="min-w-0">
                  <p
                    className={`font-display text-lg leading-tight font-bold ${
                      scan === "valid" ? "text-leaf-800" : "text-danger-600"
                    }`}
                  >
                    {scan === "valid" ? "Verified — gate open" : "Signature expired — entry denied"}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
                    {scan === "valid"
                      ? `Signature ${signature.slice(0, 10)}… matched for ${student.name}, ${student.klass}. Entry logged at Gate 1.`
                      : "The signature on that image belongs to a window that has closed. Nothing was looked up, and nothing was let through."}
                  </p>
                  <button
                    type="button"
                    onClick={() => setScan("idle")}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-600 transition-colors hover:text-brand-700"
                  >
                    <RotateCcw size={14} />
                    Reset the reader
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
