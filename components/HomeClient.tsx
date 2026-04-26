"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import WhyUsSection from "@/components/WhyUsSection";
import ToolsTicker from "@/components/ToolsTicker";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import type { Service } from "@/data/services";
import type { TeamMember } from "@/data/team";

interface Sections {
  hero: boolean; services: boolean; pricing: boolean;
  whyUs: boolean; tools: boolean; contact: boolean; team: boolean;
}

interface Props {
  sections: Sections;
  hero: Record<string, unknown>;
  services: Service[];
  pricing: Record<string, unknown>[];
  whyUs: Record<string, unknown>[];
  company: Record<string, unknown>;
}

export default function HomeClient({ sections, hero, services, pricing, whyUs, company }: Props) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <Navbar sections={sections} />
      {sections.hero     && <HeroSection data={hero as never} />}
      {sections.services && <ServicesSection services={services} />}
      {sections.pricing  && <PricingSection tiers={pricing as never} />}
      {sections.whyUs    && <WhyUsSection features={whyUs as never} />}
      {sections.tools    && <ToolsTicker />}
      {sections.contact  && <ContactSection company={company as never} />}
      <Footer sections={sections} company={company as never} />
    </motion.main>
  );
}
