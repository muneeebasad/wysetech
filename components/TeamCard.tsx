"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Github, Twitter, Mail } from "lucide-react";
import type { LucideProps } from "lucide-react";
import Image from "next/image";
import type { TeamMember } from "@/data/team";

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

function SocialLink({
  href,
  icon: Icon,
  label,
  color,
}: {
  href: string;
  icon: React.ComponentType<LucideProps>;
  label: string;
  color: string;
}) {
  return (
    <motion.a
      href={href}
      aria-label={label}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="p-2 rounded-lg border border-[#21262D] text-[#8B949E] transition-all duration-200"
      whileHover={{
        scale: 1.12,
        color: color,
        borderColor: `${color}60`,
        boxShadow: `0 0 12px ${color}40`,
      }}
      whileTap={{ scale: 0.94 }}
    >
      <Icon size={15} />
    </motion.a>
  );
}

function SocialLinks({ member }: { member: TeamMember }) {
  return (
    <div className="flex items-center gap-2">
      {member.social.linkedin && (
        <SocialLink
          href={member.social.linkedin}
          icon={Linkedin}
          label={`${member.name} on LinkedIn`}
          color={member.departmentColor}
        />
      )}
      {member.social.github && (
        <SocialLink
          href={member.social.github}
          icon={Github}
          label={`${member.name} on GitHub`}
          color={member.departmentColor}
        />
      )}
      {member.social.twitter && (
        <SocialLink
          href={member.social.twitter}
          icon={Twitter}
          label={`${member.name} on Twitter`}
          color={member.departmentColor}
        />
      )}
      {member.social.email && (
        <SocialLink
          href={`mailto:${member.social.email}`}
          icon={Mail}
          label={`Email ${member.name}`}
          color={member.departmentColor}
        />
      )}
    </div>
  );
}

function Avatar({
  member,
  size,
}: {
  member: TeamMember;
  size: "sm" | "lg";
}) {
  const dim = size === "lg" ? "w-28 h-28" : "w-16 h-16";
  const text = size === "lg" ? "text-3xl" : "text-xl";

  return member.showPhoto && member.photo ? (
    <div
      className={`${dim} rounded-full overflow-hidden relative z-10 border-2 flex-shrink-0`}
      style={{
        borderColor: `${member.avatarTo}60`,
        boxShadow: `0 4px 20px ${member.avatarFrom}60`,
      }}
    >
      <Image
        src={member.photo}
        alt={member.name}
        fill
        className="object-cover"
        sizes={size === "lg" ? "112px" : "64px"}
        unoptimized
      />
    </div>
  ) : (
    <div
      className={`${dim} rounded-full flex items-center justify-center ${text} font-extrabold text-white relative z-10 select-none flex-shrink-0`}
      style={{
        background: `linear-gradient(135deg, ${member.avatarFrom}, ${member.avatarTo})`,
        boxShadow: `0 4px 20px ${member.avatarFrom}60`,
      }}
    >
      {member.initials}
    </div>
  );
}

/* ── Leadership card — full-width horizontal layout ── */
function LeadershipCard({ member, index }: TeamCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.34, 1.2, 0.64, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative group w-full"
    >
      {/* Outer glow */}
      <motion.div
        className="absolute -inset-px rounded-2xl pointer-events-none"
        animate={{
          opacity: hovered ? 1 : 0,
          boxShadow: `0 0 0 1px ${member.avatarTo}50, 0 16px 60px ${member.avatarTo}20`,
        }}
        transition={{ duration: 0.35 }}
      />

      <motion.div
        className="relative rounded-2xl border border-[#21262D] bg-[#161B22] overflow-hidden"
        animate={{
          y: hovered ? -4 : 0,
          borderColor: hovered ? `${member.avatarTo}50` : "#21262D",
        }}
        transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {/* Left accent bar */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-[4px]"
          style={{ background: `linear-gradient(180deg, ${member.avatarFrom}, ${member.avatarTo})` }}
          animate={{ opacity: hovered ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
        />

        {/* Background glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            background: `radial-gradient(ellipse 50% 80% at 0% 50%, ${member.avatarFrom}12, transparent 60%)`,
          }}
        />

        <div className="pl-8 pr-7 py-8 flex flex-col sm:flex-row items-start gap-7 relative">
          {/* Avatar */}
          <motion.div
            className="relative flex-shrink-0"
            animate={hovered ? { scale: 1.04 } : { scale: 1 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <motion.div
              className="absolute -inset-2 rounded-full pointer-events-none"
              animate={{ opacity: hovered ? 1 : 0, boxShadow: `0 0 28px ${member.avatarTo}80` }}
              transition={{ duration: 0.3 }}
            />
            <Avatar member={member} size="lg" />
          </motion.div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            {/* Name row */}
            <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
              <div>
                <h3 className="text-2xl font-extrabold text-[#E6EDF3] leading-tight">
                  {member.name}
                </h3>
                <p className="text-base font-semibold mt-0.5" style={{ color: member.departmentColor }}>
                  {member.role}
                </p>
              </div>
              <span
                className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border flex-shrink-0"
                style={{
                  color: member.departmentColor,
                  borderColor: `${member.departmentColor}35`,
                  background: `${member.departmentColor}12`,
                }}
              >
                {member.department}
              </span>
            </div>

            {/* Bio */}
            <p className="text-sm text-[#8B949E] leading-relaxed mb-5">
              {member.bio}
            </p>

            {/* Skills + Social */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                {member.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[11px] font-medium px-2 py-0.5 rounded-full border"
                    style={{
                      color: member.avatarTo,
                      borderColor: `${member.avatarTo}30`,
                      background: `${member.avatarTo}10`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <SocialLinks member={member} />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Regular card — 3-col grid item ── */
function StaffCard({ member, index }: TeamCardProps) {
  const [hovered, setHovered] = useState(false);
  const col = index % 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: col * 0.1,
        ease: [0.34, 1.2, 0.64, 1],
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative group"
    >
      {/* Outer glow */}
      <motion.div
        className="absolute -inset-px rounded-2xl pointer-events-none"
        animate={{
          opacity: hovered ? 1 : 0,
          boxShadow: `0 0 0 1px ${member.avatarTo}50, 0 12px 50px ${member.avatarTo}25`,
        }}
        transition={{ duration: 0.35 }}
      />

      {/* Card */}
      <motion.div
        className="relative rounded-2xl border border-[#21262D] bg-[#161B22]
                   overflow-hidden flex flex-col"
        animate={{
          y: hovered ? -6 : 0,
          borderColor: hovered ? `${member.avatarTo}50` : "#21262D",
        }}
        transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {/* Top accent gradient bar */}
        <motion.div
          className="h-[3px] w-full"
          style={{
            background: `linear-gradient(90deg, ${member.avatarFrom}, ${member.avatarTo})`,
          }}
          animate={{ opacity: hovered ? 1 : 0.4 }}
          transition={{ duration: 0.3 }}
        />

        {/* Background glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${member.avatarFrom}14, transparent 70%)`,
          }}
        />

        <div className="p-7 flex flex-col flex-1 relative">
          {/* Avatar + department row */}
          <div className="flex items-start justify-between mb-5">
            <motion.div
              className="relative"
              animate={hovered ? { scale: 1.06 } : { scale: 1 }}
              transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <motion.div
                className="absolute -inset-1.5 rounded-full pointer-events-none"
                animate={{
                  opacity: hovered ? 1 : 0,
                  boxShadow: `0 0 24px ${member.avatarTo}80`,
                }}
                transition={{ duration: 0.3 }}
              />
              <Avatar member={member} size="sm" />
            </motion.div>

            {/* Department badge */}
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1
                         rounded-full border"
              style={{
                color: member.departmentColor,
                borderColor: `${member.departmentColor}35`,
                background: `${member.departmentColor}12`,
              }}
            >
              {member.department}
            </span>
          </div>

          {/* Name + role */}
          <div className="mb-3">
            <h3 className="text-lg font-bold text-[#E6EDF3] leading-snug">
              {member.name}
            </h3>
            <p
              className="text-sm font-semibold mt-0.5"
              style={{ color: member.departmentColor }}
            >
              {member.role}
            </p>
          </div>

          {/* Bio */}
          <p className="text-sm text-[#8B949E] leading-relaxed mb-5 flex-1">
            {member.bio}
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {member.skills.map((skill) => (
              <span
                key={skill}
                className="text-[11px] font-medium px-2 py-0.5 rounded-full border"
                style={{
                  color: member.avatarTo,
                  borderColor: `${member.avatarTo}30`,
                  background: `${member.avatarTo}10`,
                }}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Social links */}
          <div className="pt-4 border-t border-[#21262D]">
            <SocialLinks member={member} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function TeamCard({ member, index }: TeamCardProps) {
  if (member.tier === "leadership") {
    return <LeadershipCard member={member} index={index} />;
  }
  return <StaffCard member={member} index={index} />;
}
