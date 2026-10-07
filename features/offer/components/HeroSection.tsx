"use client";

import React, { useCallback } from "react";
import { Box, Container, ChevronDown, LucideIcon } from "lucide-react";
import Badge from "@/components/ui/Badge";

export interface HeroNavLinkItem {
  id: string;
  targetId: string;
  label: string;
}

interface HeroSectionProps {
  badgeText: string;
  title: string;
  subtitle?: string;
  links?: HeroNavLinkItem[];
  icons?: LucideIcon[];
  onAnchorClick?: (targetId: string) => void;
  className?: string;
}

const HERO_ICONS: LucideIcon[] = [Box, Container];

export const HeroSection: React.FC<HeroSectionProps> = ({
  badgeText,
  title,
  subtitle,
  links = [],
  icons = HERO_ICONS,
  onAnchorClick,
  className = "",
}) => {
  const handleLinkClick = useCallback(
    (targetId: string) => {
      if (onAnchorClick) {
        onAnchorClick(targetId);
      } else {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    },
    [onAnchorClick]
  );

  return (
    <section
      className={`max-w-6xl mx-auto px-4 sm:px-6 mb-12 md:mb-16 ${className}`}
      id="oferta-hero"
    >
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center justify-center mb-4">
          <Badge variant="ghost">
            <span className="w-1.5 h-1.5 rounded-sm bg-primary mr-1.5" />
            {badgeText}
          </Badge>
        </div>

        <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-[1.08]">
          {title}
        </h1>

        {subtitle && (
          <p className="text-zinc-300 font-sans text-sm sm:text-base md:text-lg mt-4 leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}

        {links.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            {links.map((link, idx) => {
              const Icon = icons[idx] || Box;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleLinkClick(link.targetId)}
                  className="px-4 py-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700/80 text-zinc-200 hover:text-white font-display font-semibold text-xs sm:text-sm flex items-center gap-2.5 transition-all duration-200 shadow-sm cursor-pointer"
                >
                  <Icon className="w-4 h-4 text-primary shrink-0" />
                  <span>{link.label}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
