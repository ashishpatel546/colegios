"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navLinks, site } from "@/lib/site";
import { Wordmark } from "./Brand";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotionSafe();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the sheet on navigation. Adjusting state during render is the
  // documented way to reset on a changed input, and avoids an extra paint of
  // the open sheet on the new page.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  // Escape closes the sheet, and the page underneath stops scrolling while it is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <a
        href="#main"
        className="btn btn-ink sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[100]"
      >
        Skip to content
      </a>

      {/* The header always carries its own light surface. The page behind it is
          a blue photograph at the top and white further down, so a transparent
          bar would lose its contrast on one of them. */}
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,box-shadow,padding,border-color] duration-300 ${
          scrolled
            ? "border-line bg-white py-2.5 shadow-[0_1px_0_rgba(11,27,51,0.05),0_12px_32px_-24px_rgba(11,27,51,0.55)]"
            : "glass border-white/50 py-3.5 shadow-[0_1px_0_rgba(11,27,51,0.03)]"
        }`}
      >
        <div className="shell flex items-center justify-between gap-4">
          <Wordmark size={scrolled ? 42 : 46} />

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            <div className="flex items-center rounded-full border border-line bg-white/70 p-1.5 shadow-[inset_0_1px_2px_rgba(11,27,51,0.04)]">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative isolate rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                      active ? "text-white" : "text-ink-600 hover:text-brand-700"
                    }`}
                  >
                    {active ? (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-gradient-to-b from-brand-600 to-brand-700 shadow-[0_6px_16px_-8px_rgba(15,59,168,0.9)]"
                        initial={false}
                        transition={
                          reduced
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 380, damping: 32 }
                        }
                      />
                    ) : null}
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <a
              href={site.parentSite}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-ink-500 transition-colors hover:text-brand-700"
            >
              AppMeSoft
              <ArrowUpRight size={14} strokeWidth={2.25} />
            </a>

            <Link href="/contact" className="btn btn-primary ml-1 min-h-11 px-5 text-sm">
              Book a demo
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-12 w-12 place-items-center rounded-full border border-line bg-white text-ink-800 shadow-soft transition-colors hover:border-brand-300 hover:text-brand-700 lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-ink-900/45 backdrop-blur-[2px] lg:hidden"
            onClick={() => setOpen(false)}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="sheet"
            id="mobile-nav"
            ref={panelRef}
            initial={{ opacity: 0, y: reduced ? 0 : -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-3 top-[4.75rem] z-50 overflow-hidden rounded-3xl border border-line bg-white shadow-float lg:hidden"
          >
            <nav aria-label="Primary mobile" className="flex flex-col p-3">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-[3.25rem] items-center justify-between rounded-2xl px-4 text-base font-semibold transition-colors ${
                      active
                        ? "bg-brand-50 text-brand-700"
                        : "text-ink-700 hover:bg-ground active:bg-ground-deep"
                    }`}
                  >
                    {link.name}
                    {active ? <span className="rail w-6" /> : null}
                  </Link>
                );
              })}

              <div className="mt-2 border-t border-line-soft pt-3">
                <Link href="/contact" className="btn btn-primary w-full">
                  Book a demo
                </Link>
                <a
                  href={site.parentSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex min-h-12 items-center justify-center gap-1.5 text-sm font-semibold text-ink-500"
                >
                  Visit AppMeSoft
                  <ArrowUpRight size={14} strokeWidth={2.25} />
                </a>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
