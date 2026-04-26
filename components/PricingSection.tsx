"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Star, Zap } from "lucide-react";

interface Tier {
  name: string; price: string; period: string; bestFor: string;
  accentColor: string; glowColor: string; featured: boolean; services: string[];
}

export default function PricingSection({ tiers }: { tiers: Tier[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="packages" className="py-24 bg-[#161B22] relative overflow-hidden">
      {/* Background radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(37,99,235,0.07) 0%, transparent 65%)",
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
              background: "linear-gradient(135deg, rgba(37,99,235,0.18), rgba(15,110,86,0.12))",
              border: "1px solid rgba(37,99,235,0.25)",
              color: "#60A5FA",
            }}
          >
            Pricing
          </motion.span>

          <h2 className="text-4xl md:text-5xl font-extrabold mt-3 mb-4">
            <span
              style={{
                background: "linear-gradient(135deg, #E6EDF3 0%, #93C5FD 50%, #34D399 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Transparent Packages
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
            Predictable per-user pricing with no hidden fees. Scale up or down
            as your business evolves.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 50, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
                ease: [0.34, 1.2, 0.64, 1],
              }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative flex flex-col rounded-2xl overflow-hidden"
            >
              {/* Outer glow on hover */}
              <motion.div
                className="absolute -inset-1 rounded-2xl pointer-events-none"
                animate={{
                  opacity: hoveredIndex === index ? 1 : tier.featured ? 0.6 : 0,
                  boxShadow: `0 0 60px ${tier.glowColor}`,
                }}
                transition={{ duration: 0.35 }}
              />

              {/* Card */}
              <motion.div
                className="relative flex flex-col rounded-2xl border overflow-hidden"
                animate={{
                  y: hoveredIndex === index ? -6 : 0,
                  borderColor:
                    hoveredIndex === index
                      ? `${tier.accentColor}70`
                      : tier.featured
                      ? `${tier.accentColor}50`
                      : "#21262D",
                }}
                transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                style={{
                  background: tier.featured
                    ? "linear-gradient(160deg, #0F1923 0%, #0D1520 40%, #0A1A14 100%)"
                    : "#0D1117",
                }}
              >
                {/* Featured inner glow */}
                {tier.featured && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(37,99,235,0.15) 0%, transparent 60%)",
                    }}
                  />
                )}

                {/* Top accent line */}
                <motion.div
                  className="h-[2px] w-full"
                  animate={{
                    background:
                      hoveredIndex === index
                        ? `linear-gradient(90deg, transparent, ${tier.accentColor}, rgba(255,255,255,0.5), ${tier.accentColor}, transparent)`
                        : tier.featured
                        ? `linear-gradient(90deg, transparent, ${tier.accentColor}, transparent)`
                        : `linear-gradient(90deg, transparent, #21262D, transparent)`,
                  }}
                  transition={{ duration: 0.4 }}
                />

                {/* Most popular badge */}
                {tier.featured && (
                  <div className="flex justify-center pt-4">
                    <span
                      className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold"
                      style={{
                        background: "linear-gradient(135deg, #1A4F8A, #2563EB)",
                        color: "white",
                        boxShadow: "0 0 20px rgba(37,99,235,0.5)",
                      }}
                    >
                      <Star size={11} fill="white" strokeWidth={0} />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-8 flex flex-col flex-1">
                  {/* Plan name */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-[#E6EDF3] mb-0.5">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-[#8B949E] mb-5">
                      Best for {tier.bestFor}
                    </p>

                    {/* Price */}
                    <div className="flex items-end gap-1.5">
                      <span
                        className="text-4xl font-extrabold"
                        style={{
                          background: `linear-gradient(135deg, #E6EDF3, ${tier.accentColor})`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {tier.price}
                      </span>
                      <span className="text-[#8B949E] text-sm mb-1.5">
                        / {tier.period}
                      </span>
                    </div>
                  </div>

                  {/* Feature list */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.services.map((svc, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-sm text-[#C9D1D9]"
                      >
                        <Check
                          size={15}
                          style={{ color: tier.accentColor }}
                          className="mt-0.5 shrink-0"
                        />
                        {svc}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <motion.button
                    onClick={scrollToContact}
                    className="w-full py-3.5 rounded-xl font-bold text-sm relative overflow-hidden
                               transition-all duration-200"
                    style={
                      tier.featured
                        ? {
                            background: "linear-gradient(135deg, #1A4F8A, #2563EB)",
                            color: "white",
                            boxShadow: "0 4px 20px rgba(37,99,235,0.4)",
                          }
                        : {
                            border: `1px solid ${tier.accentColor}40`,
                            color: "#E6EDF3",
                          }
                    }
                    whileHover={{
                      scale: 1.02,
                      boxShadow: `0 8px 30px ${tier.glowColor}`,
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {tier.featured && (
                      <motion.span
                        className="absolute inset-0 opacity-0 hover:opacity-100"
                        style={{
                          background:
                            "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.12) 50%, transparent 65%)",
                        }}
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatDelay: 1,
                        }}
                      />
                    )}
                    {tier.featured ? (
                      <span className="flex items-center justify-center gap-2">
                        <Zap size={14} fill="white" strokeWidth={0} />
                        Get Started
                      </span>
                    ) : (
                      "Get Started"
                    )}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-sm text-[#8B949E] mt-10"
        >
          All prices in USD. Custom enterprise packages available.{" "}
          <button
            onClick={scrollToContact}
            className="text-[#60A5FA] hover:underline"
          >
            Contact us for a tailored quote →
          </button>
        </motion.p>
      </div>
    </section>
  );
}
