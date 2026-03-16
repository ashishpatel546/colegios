"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (pathname === "/") {
        const sections = document.querySelectorAll("section[id]");
        let current = "";
        sections.forEach((section) => {
          const sectionTop = (section as HTMLElement).offsetTop;
          if (window.scrollY >= sectionTop - 250) {
            current = "#" + section.getAttribute("id");
          }
        });
        setActiveHash(current);
      } else {
        setActiveHash("");
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/", isHome: true },
    { name: "Features", href: "/#features", isHome: false },
    { name: "Contact Us", href: "/contact", isHome: false },
  ];

  const isLinkActive = (href: string, isHome: boolean) => {
    if (pathname !== "/") return pathname === href;
    if (isHome) return activeHash === "";
    return activeHash === href.substring(1);
  };

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          <div className="shrink-0 flex items-center">
            <Link href="/" className="flex flex-col group py-2">
              <span className="text-3xl sm:text-4xl font-extrabold tracking-tight transition-colors leading-none text-blue-900">
                Colegios
              </span>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-8 h-0.5 rounded-full transition-colors bg-blue-600"></div>
                <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase transition-colors text-slate-500">
                  Empowering Education
                </span>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex gap-2 relative p-2 rounded-full transition-all duration-300 bg-slate-100 shadow-inner border border-slate-200">
            <AnimatePresence>
              {navLinks.map((link) => {
                const active = isLinkActive(link.href, link.isHome);
                return (
                  <Link 
                    key={link.name}
                    href={link.href} 
                    className={`relative isolate px-6 py-2 rounded-full text-sm font-bold transition-all ${
                      active 
                        ? "text-white"
                        : "text-slate-600 hover:text-blue-900"
                    }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="active-nav"
                        className="absolute inset-0 rounded-full shadow-sm z-0 bg-blue-600"
                        initial={false}
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </Link>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle menu"
              className="p-2 rounded-full transition-all text-blue-900 hover:bg-slate-100"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg"
          >
            <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = isLinkActive(link.href, link.isHome);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                      active
                        ? "bg-blue-600 text-white"
                        : "text-slate-700 hover:bg-slate-100 hover:text-blue-900"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
