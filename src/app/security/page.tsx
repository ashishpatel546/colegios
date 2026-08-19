import type { Metadata } from "next";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Ban,
  Bell,
  Check,
  Clock,
  DoorOpen,
  KeyRound,
  Lock,
  RefreshCw,
  PackageSearch,
  ShieldCheck,
  UserRoundCheck,
  WifiOff,
} from "lucide-react";

import CtaBand from "@/components/CtaBand";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SectionNav from "@/components/SectionNav";
import SignedIdCard from "@/components/SignedIdCard";
import Steps from "@/components/Steps";
import { newCapabilities } from "@/lib/site";

export const metadata: Metadata = {
  title: "Campus safety",
  description:
    "HMAC-secured QR ID cards, secure student pickup, visitor management and inventory management. How Colegios controls who enters a school, who leaves with a child, and what the school owns.",
  alternates: { canonical: "/security" },
};

const sections = [
  { id: "qr-id-cards", label: "QR ID cards" },
  { id: "secure-pickup", label: "Secure pickup" },
  { id: "visitor-management", label: "Visitors" },
  { id: "inventory-management", label: "Inventory" },
];

const pickupSteps = [
  {
    title: "The guardian list is set at admission",
    detail:
      "Each child carries a list of adults authorised to collect them, with a photograph and a relationship, maintained by the parent and approved by the office.",
  },
  {
    title: "The guardian scans at the dismissal gate",
    detail:
      "Their QR is read at the gate. The reader checks the signature, then checks the pairing against that child's authorised list.",
  },
  {
    title: "The class is told who is waiting",
    detail:
      "The child's name appears on the teacher's dismissal screen only once a match is confirmed, so no child is called out to an unverified adult.",
  },
  {
    title: "The parent is told the moment it happens",
    detail:
      "A notification goes out with the time, the gate and the name of the person who collected. The same record is in the dismissal log for audit.",
  },
];

const visitorSteps = [
  {
    title: "Invite ahead, or capture at the gate",
    detail:
      "A pre-approved visitor receives a time-bound QR pass by SMS or WhatsApp. A walk-in has their photo, ID proof and purpose captured at reception in under a minute.",
  },
  {
    title: "The host approves from their phone",
    detail:
      "The teacher or officer being visited gets a notification and can approve, decline or ask reception to hold the visitor in the waiting area.",
  },
  {
    title: "The pass expires on its own",
    detail:
      "Passes are valid for a window, not a day. An unclosed visit is flagged to security rather than sitting unnoticed in a diary.",
  },
  {
    title: "The roster is always current",
    detail:
      "Reception sees everyone on campus right now, and can print or open an evacuation list in one tap during a drill or an emergency.",
  },
];

const inventoryRows = [
  { item: "Chemistry lab — dissection kit", store: "Science store", qty: "18", state: "low" },
  { item: "House uniform — sports, size M", store: "Uniform room", qty: "142", state: "ok" },
  { item: "Library — NCERT Class X set", store: "Library", qty: "6", state: "low" },
  { item: "Sports — cricket kit, senior", store: "Sports room", qty: "24", state: "ok" },
];

export default function SecurityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Campus and safety"
        title={
          <>
            The gate is the hardest promise a school makes.{" "}
            <span className="text-brand-600">So we built for it.</span>
          </>
        }
        lede="Four capabilities that answer four questions a parent is entitled to ask: who is inside the school, who let them in, who took my child home, and what happened to the things the school bought."
        aside={
          <div className="card overflow-hidden p-6">
            <span className="rail mb-4" />
            <ul className="space-y-3">
              {newCapabilities.map((capability) => (
                <li key={capability.slug} className="flex items-start gap-3">
                  <capability.icon
                    size={18}
                    strokeWidth={1.75}
                    className="mt-0.5 shrink-0 text-brand-600"
                  />
                  <span className="text-[0.9375rem] leading-snug font-semibold text-ink-700">
                    {capability.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        }
      />

      <SectionNav items={sections} />

      {/* ======================= QR ID cards ======================= */}
      <section id="qr-id-cards" className="section scroll-mt-40">
        <div className="shell">
          <SectionHeading
            eyebrow="01 — Identity"
            title="HMAC-secured QR ID cards"
            lede="A printed barcode is just a number, so a photograph of it works as well as the card. A Colegios QR carries a payload signed with a key that rotates — which means a photograph stops working, and a lost card can be killed campus-wide in one action."
          />

          <div className="mt-12">
            <SignedIdCard />
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {newCapabilities[0].points.map((point, index) => {
              const Icon = [KeyRound, RefreshCw, WifiOff, Ban][index] ?? ShieldCheck;
              return (
                <Reveal key={point} index={index}>
                  <div className="card group h-full overflow-hidden p-6">
                    <span className="rail-edge" />
                    <span className="grid h-11 w-11 place-items-center rounded-2xl border border-brand-100 bg-brand-50">
                      <Icon size={19} strokeWidth={1.75} className="text-brand-700" />
                    </span>
                    <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-600">{point}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================= Secure pickup ======================= */}
      <section
        id="secure-pickup"
        className="section scroll-mt-40 border-y border-line bg-white/60"
      >
        <div className="shell">
          <SectionHeading
            eyebrow="02 — Dismissal"
            title="Secure student pickup"
            lede="Dismissal is the busiest and least supervised twenty minutes of a school day. Colegios turns it into a sequence of confirmations rather than a crowd and a guess."
          />

          <div className="mt-12 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <Steps steps={pickupSteps} accent="leaf" />

            <Reveal index={1} direction="right" className="min-w-0">
              <div className="lg:sticky lg:top-40">
                {/* What the parent actually receives */}
                <div className="mx-auto max-w-sm rounded-[1.75rem] border border-line bg-gradient-to-b from-brand-50 to-ground p-4 shadow-float">
                  <p className="eyebrow mb-3 text-center">On the parent&apos;s phone, 14:47</p>

                  <div className="card overflow-hidden p-5">
                    <div className="flex items-start gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-leaf-100 bg-leaf-50">
                        <Check size={18} strokeWidth={2.5} className="text-leaf-700" />
                      </span>
                      <div className="min-w-0">
                        <p className="font-display text-base leading-tight font-bold">
                          Aarav has been collected
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
                          Released at Gate 2 to <strong className="text-ink-800">Priya Sharma</strong>{" "}
                          (mother) at 14:47.
                        </p>
                        <p className="tnum mt-2 font-mono text-[0.625rem] tracking-wider text-ink-400">
                          Verified · Class VIII-B · CLG/2024/0417
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="card mt-3 overflow-hidden border-saffron-200 bg-saffron-50 p-5">
                    <div className="flex items-start gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-saffron-200 bg-white">
                        <AlertTriangle size={18} strokeWidth={2} className="text-saffron-700" />
                      </span>
                      <div className="min-w-0">
                        <p className="font-display text-base leading-tight font-bold text-saffron-800">
                          Someone else is at the gate
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-saffron-800/80">
                          A driver not on Aarav&apos;s authorised list has scanned. Approve a
                          one-time pass, or decline.
                        </p>
                        <div className="mt-3 flex gap-2">
                          <span className="chip border border-leaf-100 bg-white text-leaf-700">
                            Approve once
                          </span>
                          <span className="chip border border-line bg-white text-ink-500">
                            Decline
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="mt-5 text-center text-sm text-ink-400">
                  The parent decides. The gate only acts on the answer.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ======================= Visitor management ======================= */}
      <section id="visitor-management" className="section scroll-mt-40">
        <div className="shell">
          <SectionHeading
            eyebrow="03 — Reception"
            title="Visitor management"
            lede="A paper visitor book records that someone arrived. It does not tell you whether they left, who approved them, or who is standing in your building right now."
          />

          <div className="mt-12 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <Reveal direction="left" className="min-w-0">
              <div className="card overflow-hidden">
                <div className="flex items-center justify-between border-b border-line px-6 py-4">
                  <p className="font-display text-base font-bold">On campus right now</p>
                  <span className="chip chip-live">
                    <span className="h-1.5 w-1.5 rounded-full bg-leaf-500" />
                    Live
                  </span>
                </div>

                <ul className="divide-y divide-line-soft">
                  {[
                    {
                      name: "Rakesh Menon",
                      meta: "Meeting Ms. Iyer · Admissions",
                      time: "In 0:24",
                      icon: UserRoundCheck,
                      tone: "text-leaf-700 bg-leaf-50 border-leaf-100",
                    },
                    {
                      name: "Sunita Rao",
                      meta: "Parent · Class VI-A teacher",
                      time: "In 0:11",
                      icon: UserRoundCheck,
                      tone: "text-leaf-700 bg-leaf-50 border-leaf-100",
                    },
                    {
                      name: "Bharat Traders",
                      meta: "Delivery · Science store",
                      time: "In 1:38",
                      icon: PackageSearch,
                      tone: "text-saffron-700 bg-saffron-50 border-saffron-200",
                    },
                    {
                      name: "Anil Kumar",
                      meta: "Maintenance · Awaiting approval",
                      time: "Waiting",
                      icon: Clock,
                      tone: "text-ink-500 bg-ground border-line",
                    },
                  ].map((visitor) => (
                    <li key={visitor.name} className="flex items-center gap-4 px-6 py-4">
                      <span
                        className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border ${visitor.tone}`}
                      >
                        <visitor.icon size={17} strokeWidth={1.75} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[0.9375rem] font-semibold text-ink-800">
                          {visitor.name}
                        </p>
                        <p className="truncate text-[0.8125rem] text-ink-400">{visitor.meta}</p>
                      </div>
                      <span className="tnum shrink-0 font-mono text-[0.6875rem] tracking-wider text-ink-400">
                        {visitor.time}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-3 border-t border-line bg-ground/60 px-6 py-4">
                  <DoorOpen size={16} className="text-brand-600" />
                  <p className="text-sm text-ink-500">
                    <strong className="text-ink-800">4 on campus</strong> · evacuation list ready
                  </p>
                </div>
              </div>
            </Reveal>

            <Steps steps={visitorSteps} accent="saffron" />
          </div>
        </div>
      </section>

      {/* ======================= Inventory ======================= */}
      <section
        id="inventory-management"
        className="section scroll-mt-40 border-y border-line bg-white/60"
      >
        <div className="shell">
          <SectionHeading
            eyebrow="04 — Stores"
            title="Inventory management"
            lede="Uniforms, textbooks, lab glassware, sports kit and furniture, tracked from the purchase order to the day they are issued, returned or written off — reconciling against the same accounts your fees land in."
          />

          {/* min-w-0 on the grid item: without it the item's automatic minimum
              size is the table's min-content width, which drags the whole
              column past the viewport on a phone. */}
          <div className="mt-12 grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-12">
            <Reveal className="min-w-0">
              <div className="card overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-6 py-4">
                  <p className="font-display text-base font-bold">Stock, this morning</p>
                  <span className="chip chip-new">2 below reorder level</span>
                </div>

                <div className="max-w-full overflow-x-auto">
                  <table className="w-full min-w-[30rem] text-left text-sm">
                    <thead>
                      <tr className="border-b border-line-soft">
                        {["Item", "Store", "Qty", ""].map((heading) => (
                          <th
                            key={heading}
                            scope="col"
                            className="px-5 py-3 font-mono text-[0.625rem] whitespace-nowrap tracking-[0.16em] text-ink-400 uppercase"
                          >
                            {heading}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line-soft">
                      {inventoryRows.map((row) => (
                        <tr key={row.item} className="transition-colors hover:bg-ground/60">
                          <td className="px-5 py-4 font-semibold text-ink-800">{row.item}</td>
                          <td className="px-5 py-4 whitespace-nowrap text-ink-500">{row.store}</td>
                          <td className="tnum px-5 py-4 font-mono font-semibold text-ink-800">
                            {row.qty}
                          </td>
                          <td className="px-5 py-4">
                            {row.state === "low" ? (
                              <span className="chip chip-new">
                                <ArrowDownRight size={12} />
                                Reorder
                              </span>
                            ) : (
                              <span className="chip chip-live">
                                <Check size={12} strokeWidth={3} />
                                Healthy
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center gap-3 border-t border-line bg-ground/60 px-6 py-4">
                  <Bell size={16} className="text-saffron-600" />
                  <p className="text-sm text-ink-500">
                    Two purchase requests raised automatically and sent to the bursar.
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {newCapabilities[3].points.map((point, index) => (
                <Reveal key={point} index={index} direction="right">
                  <div className="card group h-full overflow-hidden p-5">
                    <span className="rail-edge" />
                    <p className="text-[0.9375rem] leading-relaxed text-ink-600">{point}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================= Data handling ======================= */}
      <section className="section">
        <div className="shell">
          <Reveal>
            <div className="card overflow-hidden p-8 sm:p-10 lg:p-12">
              <span className="rail mb-6" />
              <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
                <div>
                  <h2 className="headline">What the QR does not carry.</h2>
                  <p className="lede mt-4">
                    A child&apos;s card holds an identifier and a signature — no name, no class, no
                    phone number, nothing readable by a stranger with a scanner app. Everything
                    legible about a student stays on the school&apos;s side of the fence.
                  </p>
                </div>

                <ul className="grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      icon: Lock,
                      title: "Signed, not stored",
                      detail:
                        "The payload is verified against a key the school holds. Nothing personal travels on the card.",
                    },
                    {
                      icon: ShieldCheck,
                      title: "Role-based access",
                      detail:
                        "A gate operator sees a pass or a refusal. Records stay with the staff whose role permits them.",
                    },
                    {
                      icon: Clock,
                      title: "Short windows",
                      detail:
                        "Signatures and visitor passes expire by design, so an old image is worthless.",
                    },
                    {
                      icon: ArrowUpRight,
                      title: "Yours to take",
                      detail:
                        "Logs and records export in full. The school owns its data, including the day it leaves.",
                    },
                  ].map((item) => (
                    <li key={item.title} className="rounded-2xl border border-line bg-ground/70 p-5">
                      <item.icon size={19} strokeWidth={1.75} className="text-brand-600" />
                      <p className="font-display mt-3 text-base font-bold">{item.title}</p>
                      <p className="mt-1.5 text-sm leading-snug text-ink-500">{item.detail}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Bring us your gate."
        body="Tell us how your school handles entry and dismissal today. We will show you the same twenty minutes running on Colegios — including what happens when someone turns up who should not."
        action="Book a safety walkthrough"
      />
    </>
  );
}
