"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles, Wrench, DollarSign, Users, Star, Building2, Eye,
  ArrowRight, ExternalLink,
} from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";

const sections = [
  {
    href: "/admin/dashboard/hero",
    icon: Sparkles,
    label: "Hero Section",
    desc: "Headline, badge, sub-text & stats",
    color: "#60A5FA",
  },
  {
    href: "/admin/dashboard/services",
    icon: Wrench,
    label: "Services",
    desc: "All 10 service cards, tools & bullet lists",
    color: "#34D399",
  },
  {
    href: "/admin/dashboard/pricing",
    icon: DollarSign,
    label: "Pricing",
    desc: "Tier names, prices & feature lists",
    color: "#FBBF24",
  },
  {
    href: "/admin/dashboard/team",
    icon: Users,
    label: "Team",
    desc: "Member profiles, bios & social links",
    color: "#A78BFA",
  },
  {
    href: "/admin/dashboard/why-us",
    icon: Star,
    label: "Why Us",
    desc: "The four differentiator pillars",
    color: "#F87171",
  },
  {
    href: "/admin/dashboard/company",
    icon: Building2,
    label: "Company Info",
    desc: "Contact details, social links & footer copy",
    color: "#38BDF8",
  },
  {
    href: "/admin/dashboard/visibility",
    icon: Eye,
    label: "Visibility",
    desc: "Toggle which sections appear on the site",
    color: "#F472B6",
  },
];

export default function Dashboard() {
  return (
    <AdminShell>
      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-extrabold text-[#E6EDF3]">Content Dashboard</h1>
          <p className="text-sm text-[#8B949E] mt-1">
            Edit any section below. Changes save to JSON files and reflect immediately in dev mode.
          </p>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#21262D]
                     text-sm text-[#8B949E] hover:text-[#E6EDF3] hover:border-[#2563EB]/40
                     transition-all duration-200"
        >
          <ExternalLink size={14} />
          Preview site
        </a>
      </div>

      {/* Section cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {sections.map((s, i) => (
          <motion.div
            key={s.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06, ease: [0.34, 1.2, 0.64, 1] }}
          >
            <Link
              href={s.href}
              className="group flex flex-col p-5 rounded-xl border border-[#21262D]
                         bg-[#161B22] hover:border-transparent transition-all duration-200
                         relative overflow-hidden block"
              style={{ ["--c" as string]: s.color }}
            >
              {/* Hover bg */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `linear-gradient(135deg, ${s.color}12, ${s.color}04)` }}
              />
              {/* Hover border */}
              <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ boxShadow: `0 0 0 1px ${s.color}50, 0 8px 30px ${s.color}18` }}
              />

              <div className="flex items-center justify-between mb-4 relative">
                <div
                  className="p-2.5 rounded-lg"
                  style={{ background: `${s.color}18`, border: `1px solid ${s.color}30` }}
                >
                  <s.icon size={18} style={{ color: s.color }} />
                </div>
                <ArrowRight
                  size={15}
                  className="text-[#8B949E] group-hover:text-[#E6EDF3] group-hover:translate-x-1
                             transition-all duration-200"
                />
              </div>

              <p className="text-sm font-bold text-[#E6EDF3] relative">{s.label}</p>
              <p className="text-xs text-[#8B949E] mt-1 relative">{s.desc}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Info banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 p-4 rounded-xl border border-[#21262D] bg-[#161B22] flex gap-3"
      >
        <div className="w-1 rounded-full bg-gradient-to-b from-[#2563EB] to-[#0F6E56] shrink-0" />
        <div>
          <p className="text-sm font-semibold text-[#E6EDF3] mb-0.5">How changes work</p>
          <p className="text-xs text-[#8B949E] leading-relaxed">
            Edits are written to <code className="text-[#60A5FA]">/content/*.json</code> files via the API.
            In dev mode, Next.js HMR automatically hot-reloads the site.
            For production, run <code className="text-[#60A5FA]">npm run build</code> after saving changes.
          </p>
        </div>
      </motion.div>
    </AdminShell>
  );
}
