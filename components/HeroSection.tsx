"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronDown, ArrowRight, Shield, Zap, Globe } from "lucide-react";

/* ── Animated aurora background ─────────────────────────── */
function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary aurora blob — blue */}
      <motion.div
        className="absolute w-[80vw] h-[80vw] max-w-[900px] max-h-[900px]
                   rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(26,79,138,0.28) 0%, rgba(26,79,138,0.06) 60%, transparent 80%)",
          top: "-20%",
          left: "-10%",
        }}
        animate={{
          x: [0, 60, -30, 0],
          y: [0, 40, -20, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Secondary aurora blob — teal */}
      <motion.div
        className="absolute w-[60vw] h-[60vw] max-w-[700px] max-h-[700px]
                   rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(15,110,86,0.22) 0%, rgba(15,110,86,0.05) 60%, transparent 80%)",
          top: "10%",
          right: "-15%",
        }}
        animate={{
          x: [0, -50, 25, 0],
          y: [0, 30, -40, 0],
          scale: [1, 0.92, 1.1, 1],
        }}
        transition={{
          duration: 34,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      {/* Tertiary blob — purple accent */}
      <motion.div
        className="absolute w-[40vw] h-[40vw] max-w-[500px] max-h-[500px]
                   rounded-full blur-[90px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(83,74,183,0.16) 0%, transparent 70%)",
          bottom: "15%",
          left: "30%",
        }}
        animate={{
          x: [0, 35, -20, 0],
          y: [0, -25, 35, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 8,
        }}
      />

      {/* Dot grid */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: [0.22, 0.35, 0.22] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(99,179,237,0.28) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0D1117] to-transparent" />
    </div>
  );
}

/* ── Floating geometric shape ───────────────────────────── */
interface ShapeProps {
  size: number;
  left: string;
  top: string;
  duration: number;
  delay: number;
  gradientId: string;
  from: string;
  to: string;
  clipPath: string;
}

function FloatingShape({
  size,
  left,
  top,
  duration,
  delay,
  gradientId,
  from,
  to,
  clipPath,
}: ShapeProps) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left, top, width: size, height: size }}
      animate={{
        x: [0, 30, -18, 12, 0],
        y: [0, -28, 20, -10, 0],
        rotate: [0, 14, -8, 4, 0],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={from} stopOpacity="0.85" />
            <stop offset="100%" stopColor={to} stopOpacity="0.25" />
          </linearGradient>
        </defs>
        <polygon
          points="50,0 100,87 0,87"
          fill={`url(#${gradientId})`}
          style={{ clipPath }}
        />
      </svg>
    </motion.div>
  );
}

const shapes: ShapeProps[] = [
  {
    size: 240,
    left: "6%",
    top: "15%",
    duration: 28,
    delay: 0,
    gradientId: "g1",
    from: "#2563EB",
    to: "#0F6E56",
    clipPath: "polygon(50% 0%, 100% 87%, 0% 87%)",
  },
  {
    size: 170,
    left: "76%",
    top: "10%",
    duration: 34,
    delay: 5,
    gradientId: "g2",
    from: "#0F6E56",
    to: "#534AB7",
    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
  },
  {
    size: 120,
    left: "65%",
    top: "60%",
    duration: 22,
    delay: 2,
    gradientId: "g3",
    from: "#1A4F8A",
    to: "#2563EB",
    clipPath:
      "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
  },
  {
    size: 200,
    left: "2%",
    top: "65%",
    duration: 38,
    delay: 9,
    gradientId: "g4",
    from: "#534AB7",
    to: "#0F6E56",
    clipPath: "polygon(50% 0%, 100% 87%, 0% 87%)",
  },
  {
    size: 140,
    left: "40%",
    top: "78%",
    duration: 26,
    delay: 3,
    gradientId: "g5",
    from: "#2563EB",
    to: "#A32D2D",
    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
  },
];

/* ── Stat counter card ──────────────────────────────────── */
interface StatProps {
  value: string;
  label: string;
  color: string;
  icon: React.ReactNode;
  delay: number;
}

function StatCard({ value, label, color, icon, delay }: StatProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center gap-1 px-5"
    >
      <div className="flex items-center gap-2">
        <span style={{ color }} className="opacity-80">
          {icon}
        </span>
        <span
          className="text-2xl md:text-3xl font-extrabold"
          style={{ color }}
        >
          {value}
        </span>
      </div>
      <span className="text-xs text-[#8B949E] font-medium">{label}</span>
    </motion.div>
  );
}

interface HeroData {
  badge: string; subheadline: string; ctaPrimary: string; ctaSecondary: string;
  stats: { value: string; label: string; color: string }[];
}

/* ── Hero Section ───────────────────────────────────────── */
export default function HeroSection({ data: heroData }: { data: HeroData }) {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0D1117]">
      <AuroraBackground />

      {/* Floating shapes */}
      {shapes.map((s) => (
        <FloatingShape key={s.gradientId} {...s} />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-sm font-medium relative"
          style={{
            background:
              "linear-gradient(135deg, rgba(26,79,138,0.18), rgba(15,110,86,0.1))",
            border: "1px solid rgba(37,99,235,0.3)",
            color: "#93C5FD",
          }}
        >
          {/* Animated border glow */}
          <motion.span
            className="absolute inset-0 rounded-full pointer-events-none"
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            style={{ boxShadow: "0 0 12px rgba(37,99,235,0.4)" }}
          />
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0F6E56] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0F6E56]" />
          </span>
          {heroData.badge}
        </motion.div>

        {/* Headline — staggered word entrance */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-6">
          {/* "Managed IT." */}
          <motion.span
            className="inline-block mr-3 md:mr-5"
            style={{ color: "#E6EDF3" }}
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Managed IT.
          </motion.span>

          {/* "Secured." — red with glow */}
          <motion.span
            className="inline-block mr-3 md:mr-5 relative"
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span
              style={{
                color: "#F87171",
                textShadow: "0 0 40px rgba(163,45,45,0.7), 0 0 80px rgba(163,45,45,0.3)",
              }}
            >
              Secured.
            </span>
          </motion.span>

          {/* "Automated." — teal gradient */}
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.51, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span
              className="gradient-text"
              style={{
                background:
                  "linear-gradient(135deg, #34D399, #0F6E56, #2563EB, #34D399)",
                backgroundSize: "300% 300%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "gradient-shift 5s ease infinite",
              }}
            >
              Automated.
            </span>
          </motion.span>
        </h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="text-lg md:text-xl text-[#8B949E] max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          {heroData.subheadline}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.82 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Primary — shimmer gradient */}
          <motion.button
            onClick={() => scrollTo("services")}
            className="group btn-shimmer flex items-center gap-2 px-8 py-3.5 rounded-lg
                       text-white font-semibold text-sm shadow-lg relative overflow-hidden"
            style={{ boxShadow: "0 0 30px rgba(26,79,138,0.5)" }}
            whileHover={{
              scale: 1.04,
              boxShadow: "0 0 50px rgba(37,99,235,0.6)",
            }}
            whileTap={{ scale: 0.96 }}
          >
            {/* Shimmer overlay */}
            <motion.span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
              style={{
                background:
                  "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.15) 50%, transparent 65%)",
                backgroundSize: "200% auto",
              }}
              animate={{ backgroundPosition: ["-100%", "200%"] }}
              transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 0.8 }}
            />
            {heroData.ctaPrimary}
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </motion.button>

          {/* Secondary */}
          <motion.button
            onClick={() => scrollTo("contact")}
            className="flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-sm
                       text-[#E6EDF3] transition-all duration-200 relative"
            style={{ border: "1px solid rgba(37,99,235,0.3)" }}
            whileHover={{
              scale: 1.04,
              borderColor: "rgba(37,99,235,0.8)",
              boxShadow: "0 0 25px rgba(37,99,235,0.2)",
            }}
            whileTap={{ scale: 0.96 }}
          >
            {heroData.ctaSecondary}
          </motion.button>
        </motion.div>

        {/* Decorative divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 1.0 }}
          className="w-40 h-px mx-auto mt-14 mb-10"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(37,99,235,0.6), rgba(15,110,86,0.6), transparent)",
          }}
        />

        {/* Stats */}
        {(() => {
          const icons = [<Shield size={16} key="s" />, <Zap size={16} key="z" />, <Globe size={16} key="g" />];
          return (
            <div className="flex items-center justify-center gap-2 sm:gap-6">
              {heroData.stats.map((stat, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <div className="w-px h-10 bg-[#21262D]" />}
                  <StatCard
                    value={stat.value}
                    label={stat.label}
                    color={stat.color}
                    icon={icons[i] ?? icons[0]}
                    delay={1.1 + i * 0.1}
                  />
                </React.Fragment>
              ))}
            </div>
          );
        })()}
      </div>

      {/* Scroll chevron */}
      <motion.button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#8B949E]
                   hover:text-[#60A5FA] transition-colors"
        onClick={() => scrollTo("services")}
        animate={{ y: [0, 9, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        aria-label="Scroll to services"
      >
        <ChevronDown size={28} />
      </motion.button>
    </section>
  );
}
