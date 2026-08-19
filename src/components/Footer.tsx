import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { moduleGroups, navLinks, site } from "@/lib/site";
import { AppMeSoftOnDark, ColegiosMark } from "./Brand";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink-900 text-brand-100/75">
      {/* The tricolour rail closes the page the same way it opens every section */}
      <div className="h-[3px] w-full bg-gradient-to-r from-saffron-500 via-leaf-500 to-brand-600" />

      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-brand-600/20 blur-[120px]"
      />

      <div className="shell relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-10">
          <div>
            <div className="flex items-center gap-3">
              <ColegiosMark size={48} plate />
              <div className="leading-tight">
                <p className="font-display text-2xl font-extrabold tracking-[-0.04em] text-white">
                  Colegios
                </p>
                <p className="mt-1 font-mono text-[0.5rem] tracking-[0.18em] text-white/55 uppercase">
                  School Management System
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-brand-100/70">
              One system for admissions, fees, academics, stock and campus safety — built for
              Indian schools by <AppMeSoftOnDark className="text-[0.95rem]" suffix={null} />.
            </p>

            <div className="mt-7 flex flex-col gap-3 text-[0.95rem]">
              {site.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                  className="group inline-flex w-fit items-center gap-3 text-brand-100/80 transition-colors hover:text-white"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-white/8 ring-1 ring-white/12 transition-colors group-hover:bg-white/14">
                    <Phone size={15} className="text-brand-200" />
                  </span>
                  <span className="tnum">{phone}</span>
                </a>
              ))}
              <a
                href={`mailto:${site.email}`}
                className="group inline-flex w-fit items-center gap-3 text-brand-100/80 transition-colors hover:text-white"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white/8 ring-1 ring-white/12 transition-colors group-hover:bg-white/14">
                  <Mail size={15} className="text-brand-200" />
                </span>
                {site.email}
              </a>
            </div>
          </div>

          <nav aria-label="Pages">
            <h2 className="font-mono text-[0.6875rem] tracking-[0.2em] text-white/45 uppercase">
              Pages
            </h2>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline text-brand-100/75 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Modules">
            <h2 className="font-mono text-[0.6875rem] tracking-[0.2em] text-white/45 uppercase">
              Modules
            </h2>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              {moduleGroups.map((group) => (
                <li key={group.id}>
                  <Link
                    href={`/features#${group.id}`}
                    className="link-underline text-brand-100/75 transition-colors hover:text-white"
                  >
                    {group.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/security"
                  className="link-underline text-brand-100/75 transition-colors hover:text-white"
                >
                  QR ID and pickup
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-[0.6875rem] tracking-[0.2em] text-white/45 uppercase">
              See it running
            </h2>
            <p className="mt-5 text-[0.95rem] leading-relaxed text-brand-100/70">
              We quote per school rather than publishing a number that fits nobody. Book a walkthrough
              and you will have a written quote the same week.
            </p>
            <Link href="/contact" className="btn btn-primary mt-6 w-full sm:w-auto">
              Book a demo
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-center gap-5 border-t border-white/10 pt-8 text-sm sm:flex-row sm:justify-between">
          <p className="text-brand-100/55">
            © {year} Colegios. A product of{" "}
            <AppMeSoftOnDark className="text-sm" suffix="Private Limited" />.
          </p>
          <a
            href={site.parentSite}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-semibold text-white/85 transition-colors hover:bg-white/12 hover:text-white"
          >
            appme.in
            <ArrowUpRight size={14} strokeWidth={2.25} />
          </a>
        </div>
      </div>
    </footer>
  );
}
