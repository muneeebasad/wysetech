"use client";

import { motion } from "framer-motion";
import ServiceCard from "./ServiceCard";
import type { Service } from "@/data/services";

export default function ServicesSection({ services }: { services: Service[] }) {
  return (
    <section id="services" className="py-24 bg-[#0D1117] relative overflow-hidden">
      {/* Subtle background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(26,79,138,0.08) 0%, transparent 70%)",
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
          {/* Animated label */}
          <motion.span
            className="inline-block text-sm font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
            style={{
              background: "linear-gradient(135deg, rgba(26,79,138,0.2), rgba(15,110,86,0.12))",
              border: "1px solid rgba(37,99,235,0.25)",
              color: "#60A5FA",
            }}
          >
            What We Do
          </motion.span>

          {/* Gradient heading */}
          <h2 className="text-4xl md:text-5xl font-extrabold mt-3 mb-4">
            <span
              style={{
                background: "linear-gradient(135deg, #E6EDF3 0%, #93C5FD 50%, #34D399 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Our Service Lines
            </span>
          </h2>

          {/* Animated underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-20 h-[2px] mx-auto mb-5"
            style={{
              background: "linear-gradient(90deg, #1A4F8A, #0F6E56)",
            }}
          />

          <p className="text-[#8B949E] max-w-2xl mx-auto text-[15px] leading-relaxed">
            End-to-end managed services — from helpdesk to DevOps, all powered
            by best-of-breed enterprise tooling. Click any card to explore.
          </p>
        </motion.div>

        {/* 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
