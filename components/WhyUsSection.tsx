"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";

interface FeatureRaw { icon: string; color: string; glowColor: string; gradient: string; title: string; description: string; }
interface Feature extends Omit<FeatureRaw, "icon"> { Icon: React.ComponentType<LucideProps>; }

export default function WhyUsSection({ features: rawFeatures }: { features: FeatureRaw[] }) {
  const features: Feature[] = rawFeatures.map(item => ({
    ...item,
    Icon: (LucideIcons[item.icon as keyof typeof LucideIcons] as React.ComponentType<LucideProps>) ?? LucideIcons.Shield,
  }));
  return (
    <section id="why-us" className="py-24 bg-[#161B22] relative overflow-hidden">
      {/* Background decorative */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 80% 60%, rgba(15,110,86,0.06) 0%, transparent 65%)",
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
            Why Choose Us
          </motion.span>

          <h2 className="text-4xl md:text-5xl font-extrabold mt-3 mb-4">
            <span
              style={{
                background: "linear-gradient(135deg, #E6EDF3 0%, #93C5FD 50%, #34D399 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              The Wysetech Difference
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
            We&apos;re not just another MSP. We&apos;re engineers who care about doing it
            right — every time.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.55,
                delay: index * 0.1,
                ease: [0.34, 1.2, 0.64, 1],
              }}
              whileHover={{
                y: -6,
                boxShadow: `0 0 0 1px ${feature.color}40, 0 12px 40px ${feature.glowColor}`,
              }}
              className="relative p-6 rounded-xl border border-[#21262D] bg-[#0D1117]
                         overflow-hidden transition-colors duration-300 group
                         hover:border-transparent"
            >
              {/* Background gradient on hover */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100
                           transition-opacity duration-400 pointer-events-none"
                style={{ background: feature.gradient }}
              />

              {/* Icon */}
              <motion.div
                className="inline-flex p-3 rounded-xl mb-5 relative"
                style={{
                  background: feature.gradient,
                  border: `1px solid ${feature.color}35`,
                }}
                whileHover={{
                  boxShadow: `0 0 20px ${feature.glowColor}`,
                  scale: 1.08,
                }}
                transition={{ duration: 0.25 }}
              >
                <feature.Icon size={22} style={{ color: feature.color }} />
              </motion.div>

              <h3
                className="text-[15px] font-bold mb-2 relative"
                style={{ color: feature.color }}
              >
                {feature.title}
              </h3>
              <p className="text-sm text-[#8B949E] leading-relaxed relative">
                {feature.description}
              </p>

              {/* Bottom accent */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0
                           group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
