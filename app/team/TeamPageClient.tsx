"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Users,
  Mail,
  Shield,
  Zap,
  Globe,
  Heart,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TeamCard from "@/components/TeamCard";
import type { TeamMember } from "@/data/team";

/* ── Animated aurora (reused from hero) ─────────────────── */
function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(26,79,138,0.22) 0%, transparent 70%)",
          top: "-20%",
          left: "-8%",
        }}
        animate={{ x: [0, 40, -20, 0], y: [0, 30, -15, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(15,110,86,0.18) 0%, transparent 70%)",
          top: "5%",
          right: "-10%",
        }}
        animate={{ x: [0, -40, 20, 0], y: [0, 25, -30, 0] }}
        transition={{ duration: 36, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: [0.2, 0.32, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(99,179,237,0.22) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0D1117] to-transparent" />
    </div>
  );
}

/* ── Value pillars ──────────────────────────────────────── */
const values = [
  {
    icon: Shield,
    color: "#F87171",
    title: "Security First",
    description: "Every decision — from tooling to code review — is made through a security lens.",
  },
  {
    icon: Zap,
    color: "#FBBF24",
    title: "Relentless Automation",
    description: "If it can be automated, it will be. We build systems that run themselves.",
  },
  {
    icon: Globe,
    color: "#34D399",
    title: "Transparent by Default",
    description: "Open communication and full transparency with every client — no black boxes, ever.",
  },
  {
    icon: Heart,
    color: "#A78BFA",
    title: "People Over Process",
    description: "Great IT support starts with caring about the people on the other end of the ticket.",
  },
];

interface Sections {
  hero?: boolean; services?: boolean; pricing?: boolean;
  whyUs?: boolean; tools?: boolean; contact?: boolean; team?: boolean;
}

interface Company {
  tagline: string; location: string; email: string; copyright: string;
  social: { linkedin: string; github: string };
}

export default function TeamPageClient({
  sections = {},
  team,
  company,
}: {
  sections?: Sections;
  team: TeamMember[];
  company: Company;
}) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <Navbar sections={sections} />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-[#0D1117] pt-24 pb-16">
        <AuroraBackground />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center mb-8"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-[#8B949E]
                         hover:text-[#60A5FA] transition-colors group"
            >
              <ArrowLeft
                size={15}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Back to main site
            </Link>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-medium"
            style={{
              background: "linear-gradient(135deg, rgba(26,79,138,0.18), rgba(15,110,86,0.1))",
              border: "1px solid rgba(37,99,235,0.3)",
              color: "#93C5FD",
            }}
          >
            <Users size={14} />
            {team.length} Engineers & Specialists
          </motion.div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 25, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span style={{ color: "#E6EDF3" }}>Meet the </span>
              <span
                style={{
                  background: "linear-gradient(135deg, #60A5FA, #34D399)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Team
              </span>
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38 }}
            className="text-lg text-[#8B949E] max-w-2xl mx-auto leading-relaxed"
          >
            A small but elite team of engineers, security professionals, and
            infrastructure specialists dedicated to precision engineering and enterprise-grade delivery.
          </motion.p>

          {/* Gradient divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="w-32 h-px mx-auto mt-10"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.7), rgba(15,110,86,0.7), transparent)",
            }}
          />
        </div>
      </section>

      {/* ── Team grid ──────────────────────────────────────── */}
      <section className="py-20 bg-[#0D1117] relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(26,79,138,0.06) 0%, transparent 60%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-14">
          {/* Leadership — full-width cards */}
          {(() => {
            const leaders = team.filter(m => m.tier === "leadership");
            if (leaders.length === 0) return null;
            return (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{
                      background: "linear-gradient(135deg, rgba(26,79,138,0.18), rgba(15,110,86,0.12))",
                      border: "1px solid rgba(37,99,235,0.25)",
                      color: "#60A5FA",
                    }}
                  >
                    Leadership
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#2563EB]/20 to-transparent" />
                </div>
                <div className="space-y-5">
                  {leaders.map((member, i) => (
                    <TeamCard key={member.id} member={member} index={i} />
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Staff — 3-col grid */}
          {(() => {
            const staff = team.filter(m => m.tier !== "leadership");
            if (staff.length === 0) return null;
            return (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{
                      background: "linear-gradient(135deg, rgba(15,110,86,0.14), rgba(26,79,138,0.08))",
                      border: "1px solid rgba(52,211,153,0.2)",
                      color: "#34D399",
                    }}
                  >
                    The Team
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#34D399]/20 to-transparent" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {staff.map((member, i) => (
                    <TeamCard key={member.id} member={member} index={i} />
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* ── Values ─────────────────────────────────────────── */}
      <section className="py-20 bg-[#161B22] relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(15,110,86,0.06) 0%, transparent 65%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <motion.span
              className="inline-block text-sm font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
              style={{
                background: "linear-gradient(135deg, rgba(26,79,138,0.18), rgba(15,110,86,0.12))",
                border: "1px solid rgba(37,99,235,0.25)",
                color: "#60A5FA",
              }}
            >
              What Drives Us
            </motion.span>

            <h2 className="text-3xl md:text-4xl font-extrabold mt-3 mb-4">
              <span
                style={{
                  background: "linear-gradient(135deg, #E6EDF3 0%, #93C5FD 50%, #34D399 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Our Core Values
              </span>
            </h2>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-16 h-[2px] mx-auto mb-5"
              style={{ background: "linear-gradient(90deg, #1A4F8A, #0F6E56)" }}
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.1,
                  ease: [0.34, 1.2, 0.64, 1],
                }}
                whileHover={{
                  y: -6,
                  boxShadow: `0 0 0 1px ${v.color}40, 0 12px 40px ${v.color}25`,
                }}
                className="p-6 rounded-xl border border-[#21262D] bg-[#0D1117] group
                           hover:border-transparent transition-colors duration-300 relative overflow-hidden"
              >
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100
                             transition-opacity duration-400 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${v.color}18, ${v.color}06)`,
                  }}
                />

                <motion.div
                  className="inline-flex p-3 rounded-xl mb-5 relative"
                  style={{
                    background: `linear-gradient(135deg, ${v.color}18, ${v.color}08)`,
                    border: `1px solid ${v.color}35`,
                  }}
                  whileHover={{ boxShadow: `0 0 20px ${v.color}50`, scale: 1.08 }}
                  transition={{ duration: 0.25 }}
                >
                  <v.icon size={22} style={{ color: v.color }} />
                </motion.div>

                <h3
                  className="text-[15px] font-bold mb-2 relative"
                  style={{ color: v.color }}
                >
                  {v.title}
                </h3>
                <p className="text-sm text-[#8B949E] leading-relaxed relative">
                  {v.description}
                </p>

                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0
                             group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${v.color}, transparent)`,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Join the team CTA ──────────────────────────────── */}
      <section className="py-20 bg-[#0D1117] relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(37,99,235,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Animated border card */}
            <div
              className="rounded-2xl p-10 relative overflow-hidden"
              style={{
                background: "linear-gradient(160deg, #161B22, #0F1923)",
                border: "1px solid rgba(37,99,235,0.25)",
                boxShadow: "0 0 60px rgba(37,99,235,0.12)",
              }}
            >
              {/* Glowing top border */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #2563EB, #0F6E56, transparent)",
                }}
              />

              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{
                  background: "linear-gradient(135deg, rgba(37,99,235,0.2), rgba(15,110,86,0.12))",
                  border: "1px solid rgba(37,99,235,0.3)",
                }}
              >
                <Users size={24} className="text-[#60A5FA]" />
              </div>

              <h2 className="text-3xl font-extrabold mb-3">
                <span
                  style={{
                    background: "linear-gradient(135deg, #E6EDF3, #60A5FA)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Want to Join Us?
                </span>
              </h2>

              <p className="text-[#8B949E] mb-8 leading-relaxed">
                We&apos;re always looking for sharp engineers who care about doing things
                properly. If you love infrastructure, automation, and security — we&apos;d
                love to hear from you.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.a
                  href="mailto:careers@wysetech.com.pk"
                  className="btn-shimmer flex items-center gap-2 px-7 py-3.5 rounded-xl
                             text-white font-bold text-sm"
                  style={{ boxShadow: "0 4px 24px rgba(37,99,235,0.4)" }}
                  whileHover={{ scale: 1.04, boxShadow: "0 6px 32px rgba(37,99,235,0.6)" }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Mail size={16} />
                  Send Your CV
                </motion.a>

                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Link
                    href="/#contact"
                    className="flex items-center gap-2 px-7 py-3.5 rounded-xl
                               border border-[#21262D] text-[#E6EDF3] font-bold text-sm
                               hover:border-[#2563EB]/50 hover:bg-[#2563EB]/5
                               transition-all duration-200"
                  >
                    Get in Touch
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer sections={sections} company={company} />
    </motion.main>
  );
}
