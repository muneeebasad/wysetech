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

export default function TeamCard({ member, index }: TeamCardProps) {
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
            {/* Avatar */}
            <motion.div
              className="relative"
              animate={
                hovered
                  ? { scale: 1.06 }
                  : { scale: 1 }
              }
              transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {/* Glow ring */}
              <motion.div
                className="absolute -inset-1.5 rounded-full pointer-events-none"
                animate={{
                  opacity: hovered ? 1 : 0,
                  boxShadow: `0 0 24px ${member.avatarTo}80`,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Avatar — photo or initials */}
              {member.showPhoto && member.photo ? (
                <div
                  className="w-16 h-16 rounded-full overflow-hidden relative z-10 border-2"
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
                    sizes="64px"
                  />
                </div>
              ) : (
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center
                             text-xl font-extrabold text-white relative z-10 select-none"
                  style={{
                    background: `linear-gradient(135deg, ${member.avatarFrom}, ${member.avatarTo})`,
                    boxShadow: `0 4px 20px ${member.avatarFrom}60`,
                  }}
                >
                  {member.initials}
                </div>
              )}
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
          <div className="flex items-center gap-2 pt-4 border-t border-[#21262D]">
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
        </div>
      </motion.div>
    </motion.div>
  );
}
