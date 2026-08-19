import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { navLinks } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50/90 to-ground" />
        <div className="grid-paper absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,#000,transparent_75%)]" />
      </div>

      <div className="shell flex min-h-[70vh] flex-col justify-center py-32 text-center">
        <span className="rail mx-auto mb-6" />
        <p className="eyebrow">Error 404</p>
        <h1 className="display mx-auto mt-4 max-w-3xl">This page is not on the timetable.</h1>
        <p className="lede mx-auto mt-6 max-w-xl">
          The link you followed does not lead anywhere in Colegios. Here is the way back.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">
            Back to the home page
            <ArrowRight size={17} strokeWidth={2.25} />
          </Link>
          {navLinks
            .filter((link) => link.href !== "/")
            .map((link) => (
              <Link key={link.href} href={link.href} className="btn btn-quiet">
                {link.name}
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
