"use client";

import { motion } from "framer-motion";
import { Linkedin, Github, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Sections {
  services?: boolean; pricing?: boolean; whyUs?: boolean;
  tools?: boolean; contact?: boolean; team?: boolean;
}

const ALL_ANCHOR_LINKS = [
  { href: "#services", label: "Services",  key: "services" },
  { href: "#packages", label: "Packages",  key: "pricing"  },
  { href: "#why-us",   label: "Why Us",    key: "whyUs"    },
  { href: "#tools",    label: "Tools",     key: "tools"    },
  { href: "#contact",  label: "Contact",   key: "contact"  },
];

interface Company { tagline: string; location: string; email: string; copyright: string; social: { linkedin: string; github: string } }

export default function Footer({ sections = {}, company }: { sections?: Sections; company: Company }) {
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  const visibleLinks = ALL_ANCHOR_LINKS.filter(
    l => sections[l.key as keyof Sections] !== false
  );
  const showTeam = sections.team !== false;

  return (
    <footer className="bg-[#0D1117]">
      <div className="h-px bg-gradient-to-r from-transparent via-[#2563EB] via-50% to-[#0F6E56] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Image src="/favicon.png" alt="" width={22} height={22} className="h-[22px] w-[22px] object-contain" />
              <span className="font-bold text-[#E6EDF3] text-[17px] tracking-tight">
                Wysetech <span className="text-brand-blue">Technologies</span>
              </span>
            </div>
            <p className="text-sm text-[#8B949E] italic mb-2">{company.tagline}</p>
            <p className="text-xs text-[#8B949E]/50">{company.location}</p>

            <div className="inline-flex items-center gap-1.5 mt-4 px-3 py-1.5 rounded-full border border-[#21262D] bg-[#161B22]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0F6E56] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#0F6E56]" />
              </span>
              <span className="text-[11px] text-[#8B949E]">All systems operational</span>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2.5 md:justify-center pt-1">
            {visibleLinks.map(({ href, label }) => (
              <button
                key={href}
                onClick={() => scrollTo(href)}
                className="text-sm text-[#8B949E] hover:text-[#E6EDF3] transition-colors"
              >
                {label}
              </button>
            ))}
            {showTeam && (
              <Link href="/team" className="text-sm text-[#8B949E] hover:text-[#E6EDF3] transition-colors">
                Team
              </Link>
            )}
          </div>

          {/* Social + email */}
          <div className="flex flex-col gap-3 md:items-end">
            <div className="flex items-center gap-2">
              <a
                href={company.social.linkedin}
                aria-label="Wysetech Technologies on LinkedIn"
                className="p-2 rounded-lg border border-[#21262D] text-[#8B949E]
                           hover:text-[#E6EDF3] hover:border-[#1A4F8A]/50 transition-all duration-200"
              >
                <Linkedin size={17} />
              </a>
              <a
                href={company.social.github}
                aria-label="Wysetech Technologies on GitHub"
                className="p-2 rounded-lg border border-[#21262D] text-[#8B949E]
                           hover:text-[#E6EDF3] hover:border-[#1A4F8A]/50 transition-all duration-200"
              >
                <Github size={17} />
              </a>
            </div>
            <a
              href={`mailto:${company.email}`}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#21262D]
                         text-[#8B949E] text-xs hover:text-[#E6EDF3] hover:border-[#1A4F8A]/50
                         transition-all duration-200"
            >
              {company.email}
              <ArrowUpRight size={12} />
            </a>
          </div>
        </div>

        <div className="py-4 border-t border-[#21262D] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[#8B949E]">{company.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
