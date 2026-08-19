import type { Metadata } from "next";

import ContactPanels from "@/components/ContactPanels";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to the team who build Colegios. Book a demo, ask about pricing for your enrolment, or reach us on WhatsApp, phone or email.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-12 sm:pt-36 lg:pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-50/90 via-ground to-ground" />
          <div className="grid-paper absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,#000,transparent_80%)]" />
          <div className="animate-drift absolute -top-32 right-[-6rem] h-[26rem] w-[26rem] rounded-full bg-brand-200/40 blur-[110px]" />
          <div className="absolute -bottom-40 left-[-8rem] h-[22rem] w-[22rem] rounded-full bg-saffron-100/60 blur-[110px]" />
        </div>

        <div className="shell max-w-3xl text-center">
          <Reveal>
            <span className="rail mx-auto mb-5" />
            <p className="eyebrow">Talk to us</p>
            <h1 className="display mt-4">Let&apos;s look at your school.</h1>
          </Reveal>
          <Reveal index={1}>
            <p className="lede mx-auto mt-6">
              Send a message and you will hear back the same working day — from the people who
              build Colegios, not a call centre. Bring your fee structure and your worst admin
              bottleneck; the demo starts there.
            </p>
          </Reveal>
        </div>
      </section>

      <ContactPanels />
    </>
  );
}
