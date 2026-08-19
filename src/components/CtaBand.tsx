import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { site } from "@/lib/site";
import Reveal from "./Reveal";

export default function CtaBand({
  title = "Ready to see your own school in it?",
  body = "Bring us your fee structure, your grading scheme and your worst admin bottleneck. We will show you what the same day looks like on Colegios, using your data.",
  action = "Book a demo",
}: {
  title?: string;
  body?: string;
  action?: string;
}) {
  return (
    <section className="section">
      <div className="shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-800 via-brand-900 to-ink-900 px-6 py-16 text-center sm:px-12 lg:px-16 lg:py-20">
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-saffron-500 via-leaf-500 to-brand-500" />
            <div
              aria-hidden
              className="grid-paper pointer-events-none absolute inset-0 opacity-40"
              style={{ maskImage: "radial-gradient(ellipse at center, #000 10%, transparent 72%)" }}
            />
            <div
              aria-hidden
              className="animate-drift pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-brand-500/25 blur-[110px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute right-[-6rem] bottom-[-8rem] h-80 w-80 rounded-full bg-saffron-500/12 blur-[100px]"
            />

            <div className="relative mx-auto max-w-2xl">
              <span className="rail mx-auto mb-6" />
              <h2 className="headline text-white">{title}</h2>
              <p className="lede mx-auto mt-5 text-brand-100/80">{body}</p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/contact" className="btn btn-primary w-full sm:w-auto">
                  {action}
                  <ArrowRight size={17} strokeWidth={2.25} />
                </Link>
                <a
                  href={`tel:${site.phones[0].replace(/[^+\d]/g, "")}`}
                  className="btn btn-on-dark w-full sm:w-auto"
                >
                  <Phone size={16} />
                  <span className="tnum">{site.phones[0]}</span>
                </a>
              </div>

              <a
                href={`mailto:${site.email}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-100/60 transition-colors hover:text-white"
              >
                <Mail size={14} />
                {site.email}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
