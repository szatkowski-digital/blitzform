"use client";

import React from "react";
import {
  ArrowRight,
  SearchCheck,
  Truck,
  GraduationCap,
  LucideIcon,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";

export interface ContainerProcessStep {
  id: string;
  title: string;
  description: string;
}

interface ContainerPricingProps {
  steps: ContainerProcessStep[];
  badgeText: string;
  title: string;
  subtitle?: string;
  ctaText: string;
  icons?: LucideIcon[];
  contactPath?: string;
  onNavigate?: (section: string, subSection?: string) => void;
}

const DEFAULT_CONTAINER_ICONS: LucideIcon[] = [
  SearchCheck,
  Truck,
  GraduationCap,
];

export const ContainerPricing: React.FC<ContainerPricingProps> = ({
  steps,
  badgeText,
  title,
  subtitle,
  ctaText,
  icons = DEFAULT_CONTAINER_ICONS,
}) => {
  return (
    <section
      className="pt-10 pb-16 space-y-8"
      aria-labelledby="wycena-kontenera-heading"
      id="sekcja-wycena-kontenera"
    >
      {/* Section Header matching TrainingPrograms layout */}
      <header className="text-center max-w-xl mx-auto">
        <Badge variant="ghost">{badgeText}</Badge>
        <h3
          id="wycena-kontenera-heading"
          className="font-display text-2xl sm:text-4xl font-extrabold text-white mt-3"
        >
          {title}
        </h3>
        {subtitle && (
          <p className="text-zinc-400 text-xs sm:text-sm mt-1.5 font-sans">
            {subtitle}
          </p>
        )}
      </header>

      {/* Call-to-Action Section */}
      <div className="pt-4 flex justify-center">
        <Link href="/contact?category=containers">
          <Button variant="secondary" icon={<ArrowRight className="w-4 h-4" />}>
            {ctaText}
          </Button>
        </Link>
      </div>

      {/* Process Steps Grid */}
      <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-5">
        {steps.map((step, idx) => {
          const Icon = icons[idx] || SearchCheck;
          return (
            <div
              key={step.id}
              className="group relative p-5 sm:p-6 rounded-2xl bg-transparent hover:bg-zinc-900/40 border border-transparent transition-all duration-300 flex flex-col items-start space-y-3.5"
            >
              {/* Icon Box */}
              <div className="w-10 h-10 rounded-xl bg-zinc-900/90 flex items-center justify-center text-primary shrink-0 shadow-sm border border-zinc-800/60">
                <Icon className="w-5 h-5 stroke-[1.75]" />
              </div>

              {/* Step Title */}
              <h4 className="font-display text-base font-bold text-white tracking-tight leading-snug">
                {step.title}
              </h4>

              {/* Step Description */}
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ContainerPricing;
