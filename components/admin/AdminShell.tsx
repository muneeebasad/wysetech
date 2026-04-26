"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  LayoutDashboard,
  Sparkles,
  Wrench,
  DollarSign,
  Users,
  Building2,
  Star,
  Eye,
  ExternalLink,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

const NAV = [
  { href: "/admin/dashboard",            label: "Dashboard",    icon: LayoutDashboard },
  { href: "/admin/dashboard/hero",       label: "Hero",         icon: Sparkles },
  { href: "/admin/dashboard/services",   label: "Services",     icon: Wrench },
  { href: "/admin/dashboard/pricing",    label: "Pricing",      icon: DollarSign },
  { href: "/admin/dashboard/team",       label: "Team",         icon: Users },
  { href: "/admin/dashboard/why-us",     label: "Why Us",       icon: Star },
  { href: "/admin/dashboard/company",    label: "Company Info", icon: Building2 },
  { href: "/admin/dashboard/visibility", label: "Visibility",   icon: Eye },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    });
    router.push("/admin");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-[#21262D]">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg, #1A4F8A, #2563EB)" }}
          >
            <Shield size={16} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#E6EDF3] leading-none">Wysetech</p>
            <p className="text-[10px] text-[#8B949E] mt-0.5 font-medium uppercase tracking-wider">CMS Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                         transition-all duration-150 group relative ${
                           active
                             ? "text-[#E6EDF3] bg-[#21262D]"
                             : "text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#21262D]/60"
                         }`}
            >
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: "linear-gradient(90deg, rgba(26,79,138,0.2), rgba(15,110,86,0.08))",
                    borderLeft: "2px solid #2563EB",
                  }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
              <Icon size={16} className="shrink-0 relative z-10" />
              <span className="relative z-10">{label}</span>
              {active && (
                <ChevronRight size={12} className="ml-auto text-[#2563EB] relative z-10" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="px-3 py-4 border-t border-[#21262D] space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                     text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#21262D]/60 transition-all"
        >
          <ExternalLink size={16} />
          View Site
        </a>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                     text-[#8B949E] hover:text-[#F87171] hover:bg-[#A32D2D]/10 transition-all text-left"
        >
          <LogOut size={16} />
          {loggingOut ? "Signing out…" : "Sign Out"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-[#0D1117]">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-56 shrink-0 border-r border-[#21262D] bg-[#161B22] fixed inset-y-0 left-0 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -224 }}
              animate={{ x: 0 }}
              exit={{ x: -224 }}
              transition={{ type: "spring", bounce: 0, duration: 0.35 }}
              className="fixed inset-y-0 left-0 w-56 z-50 bg-[#161B22] border-r border-[#21262D] md:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 md:ml-56 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-14 border-b border-[#21262D] bg-[#161B22]/80 backdrop-blur-md
                           flex items-center px-4 gap-3 sticky top-0 z-20">
          <button
            className="md:hidden p-1.5 rounded-lg text-[#8B949E] hover:text-[#E6EDF3]
                       hover:bg-[#21262D] transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-sm">
            <span className="text-[#8B949E]">CMS</span>
            {pathname !== "/admin/dashboard" && (
              <>
                <ChevronRight size={12} className="text-[#8B949E]" />
                <span className="text-[#E6EDF3] font-medium capitalize">
                  {pathname.split("/").pop()?.replace(/-/g, " ")}
                </span>
              </>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
