"use client";

import { useState } from "react";
import QRCode from "react-qr-code";
import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { Check, Mail, MessageSquare, Phone, Send } from "lucide-react";

import Reveal from "@/components/Reveal";
import { AppMeSoftOnDark } from "@/components/Brand";
import { site } from "@/lib/site";

type Fields = {
  name: string;
  school: string;
  phone: string;
  role: string;
  interest: string;
  message: string;
};

const roles = [
  "Principal or head of school",
  "Trustee or management",
  "Administrator or office",
  "Teacher",
  "Other",
];

const interests = [
  "A full walkthrough",
  "Campus safety: QR IDs, pickup, visitors",
  "Fees and finance",
  "Inventory and stores",
  "Pricing for our enrolment",
];

const empty: Fields = {
  name: "",
  school: "",
  phone: "",
  role: roles[0],
  interest: interests[0],
  message: "",
};

export default function ContactPanels() {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>(
    {},
  );
  const [sent, setSent] = useState(false);
  const reduced = useReducedMotionSafe();

  const whatsappUrl = `https://wa.me/${site.whatsapp}`;

  const validate = (values: Fields) => {
    const next: Partial<Record<keyof Fields, string>> = {};
    if (!values.name.trim()) next.name = "Tell us who we are speaking to.";
    if (!values.school.trim()) next.school = "Which school is this for?";
    if (
      values.phone.trim() &&
      !/^[+\d][\d\s-]{7,}$/.test(values.phone.trim())
    ) {
      next.phone =
        "That number does not look complete. Include the area or country code.";
    }
    return next;
  };

  const update =
    (key: keyof Fields) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setFields((current) => ({ ...current, [key]: event.target.value }));
      if (errors[key])
        setErrors((current) => ({ ...current, [key]: undefined }));
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(fields);
    setErrors(found);

    if (Object.keys(found).length) {
      const firstInvalid = Object.keys(found)[0];
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    const lines = [
      `Hello Colegios — I am ${fields.name.trim()} from ${fields.school.trim()}.`,
      `Role: ${fields.role}`,
      `Interested in: ${fields.interest}`,
      fields.phone.trim() ? `Phone: ${fields.phone.trim()}` : null,
      fields.message.trim() ? `\n${fields.message.trim()}` : null,
    ].filter(Boolean);

    window.open(
      `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank",
      "noopener,noreferrer",
    );
    setSent(true);
  };

  const fieldClass = (key: keyof Fields) =>
    `w-full min-h-12 rounded-xl border bg-white px-4 py-3 text-[0.9375rem] text-ink-800 outline-none transition-colors placeholder:text-ink-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 ${
      errors[key] ? "border-danger-600" : "border-line"
    }`;

  return (
    <section className="pb-20 lg:pb-28">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
          {/* ---- Left: how to reach a person ---- */}
          <Reveal direction="left">
            <div className="relative h-full overflow-hidden rounded-[1.75rem] bg-gradient-to-b from-brand-800 to-ink-900 p-7 text-white sm:p-9">
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-saffron-500 via-leaf-500 to-brand-500" />
              <div
                aria-hidden
                className="animate-drift pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-brand-500/25 blur-3xl"
              />

              <div className="relative">
                <h2 className="font-display text-2xl font-bold text-white">
                  Reach a person directly
                </h2>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-brand-100/75">
                  Our team at{" "}
                  <AppMeSoftOnDark className="text-[0.9375rem]" suffix={null} />{" "}
                  answers calls between 9am and 7pm IST, Monday to Saturday.
                </p>

                <ul className="mt-8 space-y-4">
                  {site.phones.map((phone) => (
                    <li key={phone}>
                      <a
                        href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                        className="group flex items-center gap-4 rounded-2xl border border-white/12 bg-white/6 px-4 py-3.5 transition-colors hover:bg-white/12"
                      >
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 ring-1 ring-white/15">
                          <Phone size={17} className="text-brand-200" />
                        </span>
                        <span>
                          <span className="block font-mono text-[0.5625rem] tracking-[0.2em] text-white/45 uppercase">
                            Phone
                          </span>
                          <span className="tnum block font-semibold text-white">
                            {phone}
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href={`mailto:${site.email}`}
                      className="group flex items-center gap-4 rounded-2xl border border-white/12 bg-white/6 px-4 py-3.5 transition-colors hover:bg-white/12"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 ring-1 ring-white/15">
                        <Mail size={17} className="text-brand-200" />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-mono text-[0.5625rem] tracking-[0.2em] text-white/45 uppercase">
                          Email
                        </span>
                        <span className="block truncate font-semibold text-white">
                          {site.email}
                        </span>
                      </span>
                    </a>
                  </li>
                </ul>

                <div className="mt-8 rounded-2xl border border-white/12 bg-white/6 p-5">
                  <div className="flex items-center gap-2.5">
                    <MessageSquare size={17} className="text-leaf-300" />
                    <h3 className="font-display text-base font-bold text-white">
                      Or scan to open WhatsApp
                    </h3>
                  </div>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-brand-100/70">
                    Point a camera at this and the chat opens on{" "}
                    {site.phones[0]}.
                  </p>
                  <div className="mt-4 inline-block rounded-xl bg-white p-3 shadow-lg">
                    <QRCode
                      value={whatsappUrl}
                      size={132}
                      fgColor="#0b1b33"
                      bgColor="#ffffff"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ---- Right: the form ---- */}
          <Reveal index={1} direction="right">
            <div className="card h-full overflow-hidden p-7 sm:p-9">
              <span className="rail mb-5" />
              <h2 className="font-display text-2xl font-bold">
                Send us a message
              </h2>
              <p className="mt-2 text-[0.9375rem] text-ink-500">
                Filling this in opens WhatsApp with your details ready to send.
                Nothing is stored on this page.
              </p>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, y: reduced ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="status"
                  aria-live="polite"
                  className="mt-6 flex items-start gap-3 rounded-2xl border border-leaf-100 bg-leaf-50 px-5 py-4"
                >
                  <Check
                    size={18}
                    strokeWidth={3}
                    className="mt-1 shrink-0 text-leaf-700"
                  />
                  <div>
                    <p className="font-semibold text-leaf-800">
                      WhatsApp is open in a new tab.
                    </p>
                    <p className="mt-1 text-sm text-leaf-800/80">
                      Press send there and we will reply the same working day.
                      If the tab did not open, call {site.phones[0]}.
                    </p>
                  </div>
                </motion.div>
              ) : null}

              <form
                onSubmit={handleSubmit}
                noValidate
                className="mt-7 grid gap-5 sm:grid-cols-2"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-ink-700"
                  >
                    Your name <span className="text-saffron-700">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={fields.name}
                    onChange={update("name")}
                    onBlur={() =>
                      setErrors((c) => ({ ...c, ...validate(fields) }))
                    }
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={fieldClass("name")}
                    placeholder="Priya Sharma"
                  />
                  {errors.name ? (
                    <p
                      id="name-error"
                      role="alert"
                      className="mt-1.5 text-sm text-danger-600"
                    >
                      {errors.name}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label
                    htmlFor="school"
                    className="mb-2 block text-sm font-semibold text-ink-700"
                  >
                    School <span className="text-saffron-700">*</span>
                  </label>
                  <input
                    id="school"
                    name="school"
                    type="text"
                    autoComplete="organization"
                    value={fields.school}
                    onChange={update("school")}
                    onBlur={() =>
                      setErrors((c) => ({ ...c, ...validate(fields) }))
                    }
                    aria-invalid={Boolean(errors.school)}
                    aria-describedby={
                      errors.school ? "school-error" : undefined
                    }
                    className={fieldClass("school")}
                    placeholder="Vidya Mandir Senior Secondary"
                  />
                  {errors.school ? (
                    <p
                      id="school-error"
                      role="alert"
                      className="mt-1.5 text-sm text-danger-600"
                    >
                      {errors.school}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold text-ink-700"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={fields.phone}
                    onChange={update("phone")}
                    onBlur={() =>
                      setErrors((c) => ({ ...c, ...validate(fields) }))
                    }
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={
                      errors.phone ? "phone-error" : "phone-help"
                    }
                    className={fieldClass("phone")}
                    placeholder="+91 98765 43210"
                  />
                  {errors.phone ? (
                    <p
                      id="phone-error"
                      role="alert"
                      className="mt-1.5 text-sm text-danger-600"
                    >
                      {errors.phone}
                    </p>
                  ) : (
                    <p id="phone-help" className="mt-1.5 text-sm text-ink-400">
                      Only if you would rather we call you back.
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="role"
                    className="mb-2 block text-sm font-semibold text-ink-700"
                  >
                    Your role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={fields.role}
                    onChange={update("role")}
                    className={`${fieldClass("role")} cursor-pointer appearance-none bg-[length:11px] bg-[right_1rem_center] bg-no-repeat pr-10`}
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7' viewBox='0 0 11 7' fill='none'%3E%3Cpath d='M1 1L5.5 5.5L10 1' stroke='%236f7d95' stroke-width='1.8' stroke-linecap='round'/%3E%3C/svg%3E\")",
                    }}
                  >
                    {roles.map((role) => (
                      <option key={role}>{role}</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="interest"
                    className="mb-2 block text-sm font-semibold text-ink-700"
                  >
                    What should the demo cover?
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    value={fields.interest}
                    onChange={update("interest")}
                    className={`${fieldClass("interest")} cursor-pointer appearance-none bg-[length:11px] bg-[right_1rem_center] bg-no-repeat pr-10`}
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7' viewBox='0 0 11 7' fill='none'%3E%3Cpath d='M1 1L5.5 5.5L10 1' stroke='%236f7d95' stroke-width='1.8' stroke-linecap='round'/%3E%3C/svg%3E\")",
                    }}
                  >
                    {interests.map((interest) => (
                      <option key={interest}>{interest}</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-semibold text-ink-700"
                  >
                    Anything else
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={fields.message}
                    onChange={update("message")}
                    className={`${fieldClass("message")} resize-y`}
                    placeholder="We have 1,400 students across two campuses and quarterly fees with sibling concessions."
                  />
                  <p className="mt-1.5 text-sm text-ink-400">
                    Enrolment, board and the modules you care about help us
                    prepare.
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <button type="submit" className="btn btn-primary w-full">
                    <Send size={17} />
                    Send on WhatsApp
                  </button>
                  <p className="mt-3 text-center text-sm text-ink-400">
                    Opens WhatsApp in a new tab with this message filled in.
                  </p>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
