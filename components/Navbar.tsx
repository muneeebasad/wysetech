"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

interface Sections {
  hero?: boolean; services?: boolean; pricing?: boolean;
  whyUs?: boolean; tools?: boolean; contact?: boolean; team?: boolean;
}

const ALL_ANCHOR_LINKS = [
  { href: "#services", label: "Services",  sectionKey: "services" },
  { href: "#packages", label: "Packages",  sectionKey: "pricing"  },
  { href: "#why-us",   label: "Why Us",    sectionKey: "whyUs"    },
  { href: "#tools",    label: "Tools",     sectionKey: "tools"    },
  { href: "#contact",  label: "Contact",   sectionKey: "contact"  },
];

export default function Navbar({ sections = {} }: { sections?: Sections }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  const anchorLinks = ALL_ANCHOR_LINKS.filter(
    l => sections[l.sectionKey as keyof Sections] !== false
  );
  const showTeam = sections.team !== false;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const ids = anchorLinks.map((l) => l.href.slice(1));
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-45% 0px -45% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, [isHome, anchorLinks.length]);

  const handleAnchorClick = (href: string) => {
    setMobileOpen(false);
    if (isHome) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/${href}`);
    }
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0D1117]/85 backdrop-blur-md border-b border-[#21262D]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="Wysetech Technologies — home"
          >
            <Image
              src="/favicon.png"
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
              priority
            />
            <span className="font-bold text-[#E6EDF3] text-[17px] tracking-tight">
              Wysetech{" "}
              <span className="text-brand-blue">Technologies</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {anchorLinks.map(({ href, label }) => {
              const isActive = isHome && activeSection === href.slice(1);
              return (
                <button
                  key={href}
                  onClick={() => handleAnchorClick(href)}
                  className={`relative text-sm font-medium transition-colors group/link ${
                    isActive
                      ? "text-[#E6EDF3]"
                      : "text-[#8B949E] hover:text-[#E6EDF3]"
                  }`}
                >
                  {label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover/link:w-full"
                    }`}
                    style={{ background: "linear-gradient(90deg, #1A4F8A, #0F6E56)" }}
                  />
                </button>
              );
            })}

            {showTeam && (
              <Link
                href="/team"
                className={`relative text-sm font-medium transition-colors group/link ${
                  pathname === "/team"
                    ? "text-[#E6EDF3]"
                    : "text-[#8B949E] hover:text-[#E6EDF3]"
                }`}
              >
                Team
                <span
                  className={`absolute -bottom-0.5 left-0 h-px transition-all duration-300 ${
                    pathname === "/team" ? "w-full" : "w-0 group-hover/link:w-full"
                  }`}
                  style={{ background: "linear-gradient(90deg, #1A4F8A, #0F6E56)" }}
                />
              </Link>
            )}

            {sections.contact !== false && (
              <button
                onClick={() => handleAnchorClick("#contact")}
                className="btn-shimmer px-4 py-2 rounded-lg text-white text-sm font-bold
                           transition-all duration-200 relative overflow-hidden"
                style={{ boxShadow: "0 0 20px rgba(37,99,235,0.35)" }}
              >
                Get a Quote
              </button>
            )}
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 text-[#E6EDF3] rounded-lg hover:bg-[#21262D] transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-[#161B22] border-t border-[#21262D]"
          >
            <div className="px-4 py-4 space-y-1">
              {anchorLinks.map(({ href, label }) => (
                <button
                  key={href}
                  onClick={() => handleAnchorClick(href)}
                  className="block w-full text-left px-3 py-2.5 rounded-lg text-sm
                             text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#21262D]
                             transition-all duration-150"
                >
                  {label}
                </button>
              ))}

              {showTeam && (
                <Link
                  href="/team"
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg text-sm transition-all duration-150
                             hover:bg-[#21262D] ${
                               pathname === "/team"
                                 ? "text-[#E6EDF3] bg-[#21262D]"
                                 : "text-[#8B949E] hover:text-[#E6EDF3]"
                             }`}
                >
                  Team
                </Link>
              )}

              {sections.contact !== false && (
                <div className="pt-2">
                  <button
                    onClick={() => handleAnchorClick("#contact")}
                    className="w-full btn-shimmer px-4 py-2.5 rounded-lg text-white
                               text-sm font-bold transition-colors relative overflow-hidden"
                  >
                    Get a Quote
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
