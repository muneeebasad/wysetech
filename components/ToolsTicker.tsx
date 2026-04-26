"use client";

import { motion } from "framer-motion";

const tools = [
  { name: "Zabbix",       color: "#F87171" },
  { name: "LibreNMS",     color: "#60A5FA" },
  { name: "Wazuh",        color: "#34D399" },
  { name: "Grafana",      color: "#FBBF24" },
  { name: "Tactical RMM", color: "#A78BFA" },
  { name: "Graylog",      color: "#60A5FA" },
  { name: "Gitea",        color: "#34D399" },
  { name: "Portainer",    color: "#38BDF8" },
  { name: "OpenTofu",     color: "#A78BFA" },
  { name: "Mailcow",      color: "#F87171" },
  { name: "Duplicati",    color: "#FBBF24" },
  { name: "OpenSCAP",     color: "#34D399" },
  { name: "Uptime Kuma",  color: "#60A5FA" },
  { name: "MeshCentral",  color: "#F87171" },
  { name: "Velociraptor", color: "#FB923C" },
];

const row2 = [...tools.slice(8), ...tools.slice(0, 8)];

function ToolPill({ name, color }: { name: string; color: string }) {
  return (
    <motion.span
      className="inline-flex items-center gap-2 px-4 py-2 mx-2 rounded-full
                 text-sm font-semibold whitespace-nowrap cursor-default
                 transition-all duration-200"
      style={{
        background: `linear-gradient(135deg, ${color}18, ${color}08)`,
        border: `1px solid ${color}35`,
        color: color,
      }}
      whileHover={{
        scale: 1.06,
        background: `linear-gradient(135deg, ${color}30, ${color}12)`,
        boxShadow: `0 0 18px ${color}40`,
        borderColor: `${color}70`,
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full shrink-0"
        style={{ background: color, boxShadow: `0 0 6px ${color}` }}
      />
      {name}
    </motion.span>
  );
}

export default function ToolsTicker() {
  return (
    <section
      id="tools"
      className="py-24 bg-[#0D1117] overflow-hidden relative"
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(37,99,235,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Heading */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 relative">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.span
            className="inline-block text-sm font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
            style={{
              background: "linear-gradient(135deg, rgba(37,99,235,0.18), rgba(15,110,86,0.12))",
              border: "1px solid rgba(37,99,235,0.25)",
              color: "#60A5FA",
            }}
          >
            Technology Stack
          </motion.span>

          <h2 className="text-4xl md:text-5xl font-extrabold mt-3 mb-4">
            <span
              style={{
                background: "linear-gradient(135deg, #E6EDF3 0%, #93C5FD 50%, #34D399 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Powered by the Best Tools
            </span>
          </h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-20 h-[2px] mx-auto mb-5"
            style={{ background: "linear-gradient(90deg, #1A4F8A, #0F6E56)" }}
          />

          <p className="text-[#8B949E] max-w-2xl mx-auto text-[15px] leading-relaxed">
            Open source, enterprise-grade tooling. No proprietary black boxes —
            just proven technology you can audit, own, and trust.
          </p>
        </motion.div>
      </div>

      {/* Ticker rows */}
      <div className="space-y-4">
        {/* Row 1 — left */}
        <div
          className="ticker-row flex overflow-hidden"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            maskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="ticker-inner-left flex w-max">
            {[...tools, ...tools].map((t, i) => (
              <ToolPill key={i} name={t.name} color={t.color} />
            ))}
          </div>
        </div>

        {/* Row 2 — right */}
        <div
          className="ticker-row flex overflow-hidden"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            maskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="ticker-inner-right flex w-max">
            {[...row2, ...row2].map((t, i) => (
              <ToolPill key={i} name={t.name} color={t.color} />
            ))}
          </div>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center text-xs text-[#8B949E]/50 mt-10"
      >
        All tools are self-hosted and operated by Wysetech — your data stays on
        your infrastructure.
      </motion.p>
    </section>
  );
}
