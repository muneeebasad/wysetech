"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle2 } from "lucide-react";
import type { LucideProps } from "lucide-react";
import * as LucideIcons from "lucide-react";
import ToolChip from "./ToolChip";
import type { Service } from "@/data/services";

interface ServiceCardProps {
  service: Service;
  index: number;
}

function ServiceIcon({ name, color }: { name: string; color: string }) {
  const Icon = (
    LucideIcons as unknown as Record<string, React.ComponentType<LucideProps>>
  )[name];
  if (!Icon) return null;
  return <Icon size={20} color={color} />;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const col = index % 2;
  const row = Math.floor(index / 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.55,
        delay: col * 0.12 + row * 0.06,
        ease: [0.34, 1.2, 0.64, 1],
      }}
      className="relative group"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Outer glow layer */}
      <motion.div
        className="absolute -inset-px rounded-xl pointer-events-none"
        animate={{
          opacity: hovered ? 1 : 0,
          boxShadow: hovered
            ? `0 0 0 1px ${service.color}70, 0 8px 32px ${service.color}35, 0 0 80px ${service.color}18`
            : "0 0 0 0px transparent",
        }}
        transition={{ duration: 0.35 }}
      />

      {/* Gradient border sweep */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Top accent line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${service.color}, rgba(255,255,255,0.4), ${service.color}, transparent)`,
          }}
          animate={hovered ? { x: ["-100%", "100%"] } : { x: "-100%" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Card body */}
      <motion.div
        className="relative rounded-xl border border-[#21262D] bg-[#161B22] p-6 cursor-pointer
                   overflow-hidden select-none"
        animate={{
          y: hovered ? -4 : 0,
          borderColor: hovered ? `${service.color}50` : "#21262D",
        }}
        transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
        onClick={() => setExpanded((v) => !v)}
        role="button"
        aria-expanded={expanded}
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setExpanded((v) => !v)}
      >
        {/* Background radial glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-xl"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            background: `radial-gradient(ellipse 60% 50% at 30% 30%, ${service.color}14, transparent 70%)`,
          }}
        />

        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-4 relative">
          <div className="flex items-start gap-3">
            {/* Icon container */}
            <motion.div
              className="p-2.5 rounded-lg shrink-0 mt-0.5"
              style={{
                backgroundColor: `${service.color}18`,
                border: `1px solid ${service.color}40`,
              }}
              animate={
                hovered
                  ? {
                      backgroundColor: `${service.color}28`,
                      boxShadow: `0 0 16px ${service.color}50`,
                    }
                  : {
                      backgroundColor: `${service.color}18`,
                      boxShadow: "none",
                    }
              }
              transition={{ duration: 0.3 }}
            >
              <ServiceIcon name={service.icon} color={service.color} />
            </motion.div>

            <div className="min-w-0">
              {/* Number badge */}
              <span
                className="inline-block text-[10px] font-bold font-mono px-1.5 py-0.5
                           rounded mb-1"
                style={{
                  background: `linear-gradient(135deg, ${service.color}30, ${service.color}10)`,
                  color: service.color,
                  border: `1px solid ${service.color}30`,
                }}
              >
                {service.id}
              </span>
              <h3 className="text-[15px] font-semibold text-[#E6EDF3] leading-snug">
                {service.title}
              </h3>
              <p className="text-sm text-[#8B949E] mt-0.5">{service.sub}</p>
            </div>
          </div>

          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="shrink-0 mt-1"
          >
            <ChevronDown
              size={16}
              style={{ color: hovered ? service.color : "#8B949E" }}
            />
          </motion.div>
        </div>

        {/* Always-visible bullets */}
        <ul className="space-y-2 mb-3 relative">
          {service.items.slice(0, 2).map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[#8B949E]">
              <CheckCircle2
                size={14}
                style={{ color: service.color }}
                className="mt-0.5 shrink-0"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Expandable content */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="expanded"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden relative"
            >
              <ul className="space-y-2 mb-5">
                {service.items.slice(2).map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.045 + 0.05 }}
                    className="flex items-start gap-2 text-sm text-[#8B949E]"
                  >
                    <CheckCircle2
                      size={14}
                      style={{ color: service.color }}
                      className="mt-0.5 shrink-0"
                    />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Tool chips */}
              <div
                className="pt-4 border-t border-[#21262D]"
                onClick={(e) => e.stopPropagation()}
              >
                <p
                  className="text-[10px] font-bold uppercase tracking-widest mb-2.5"
                  style={{ color: service.color }}
                >
                  Powered by
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tools.map((tool, i) => (
                    <ToolChip key={i} tool={tool} serviceColor={service.color} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle hint */}
        <motion.p
          className="text-[11px] font-semibold mt-3 relative"
          style={{ color: service.color }}
          animate={{ opacity: expanded ? 0.6 : 0.85 }}
        >
          {expanded ? "↑ Show less" : "↓ View details"}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
