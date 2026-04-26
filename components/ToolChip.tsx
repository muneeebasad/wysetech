"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import clsx from "clsx";

export interface Tool {
  name: string;
  url: string | null;
}

interface ToolChipProps {
  tool: Tool;
  serviceColor: string;
}

export default function ToolChip({ tool, serviceColor }: ToolChipProps) {
  const isExternal = tool.url !== null && !tool.url.startsWith("#");
  const isAnchor = tool.url?.startsWith("#") ?? false;
  const hasUrl = tool.url !== null;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!tool.url) return;
    if (tool.url.startsWith("#")) {
      document.querySelector(tool.url)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(tool.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="relative group/chip">
      <motion.button
        onClick={hasUrl ? handleClick : undefined}
        disabled={!hasUrl}
        aria-label={
          isExternal ? `Open ${tool.name} live demo` : tool.name
        }
        className={clsx(
          "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-colors duration-200",
          hasUrl
            ? "border-[#21262D] bg-[#0D1117] text-[#C9D1D9] cursor-pointer hover:border-[#30363D] hover:text-[#E6EDF3]"
            : "border-[#21262D]/40 bg-[#0D1117]/40 text-[#8B949E]/50 cursor-not-allowed"
        )}
        whileHover={hasUrl ? { scale: 1.05 } : {}}
        whileTap={hasUrl ? { scale: 0.95 } : {}}
      >
        {/* Live pulse dot */}
        {isExternal && (
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
          </span>
        )}
        {/* Anchor indicator dot */}
        {isAnchor && (
          <span
            className="h-1.5 w-1.5 rounded-full shrink-0"
            style={{ backgroundColor: serviceColor }}
          />
        )}
        {tool.name}
        {isExternal && (
          <ExternalLink size={10} className="text-[#8B949E] shrink-0" />
        )}
      </motion.button>

      {/* Tooltip for live demos */}
      {isExternal && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5
                     bg-[#161B22] border border-[#21262D] rounded-lg text-xs text-[#E6EDF3]
                     whitespace-nowrap shadow-lg pointer-events-none z-50
                     opacity-0 group-hover/chip:opacity-100 transition-opacity duration-200"
        >
          Opens live demo ↗
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#21262D]" />
        </div>
      )}

      {/* Tooltip for anchor links */}
      {isAnchor && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5
                     bg-[#161B22] border border-[#21262D] rounded-lg text-xs text-[#E6EDF3]
                     whitespace-nowrap shadow-lg pointer-events-none z-50
                     opacity-0 group-hover/chip:opacity-100 transition-opacity duration-200"
        >
          Jump to contact
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#21262D]" />
        </div>
      )}
    </div>
  );
}
