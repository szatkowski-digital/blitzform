"use client";

import {
  Factory,
  Mountain,
  WifiOff,
  Timer,
  Code2,
  Boxes,
  Layers,
  Truck,
  LucideIcon,
} from "lucide-react";

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface FeaturesGridProps {
  features: {
    title: string;
    desc: string;
  }[];
}

const FEATURE_ICONS: LucideIcon[] = [
  Factory,
  Mountain,
  WifiOff,
  Timer,
  Code2,
  Boxes,
  Layers,
  Truck,
];

export const FeaturesGrid: React.FC<FeaturesGridProps> = ({ features }) => (
  <section className="py-16 md:py-20" id="features-grid">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
      {features.map((feat, idx) => {
        const Icon = FEATURE_ICONS[idx] || Factory;
        return (
          <div
            key={idx}
            className="group relative p-5 sm:p-6 rounded-2xl bg-transparent hover:bg-n-1/5 border border-transparent transition-all duration-300 flex flex-col items-start space-y-3.5"
          >
            <div className="w-10 h-10 rounded-xl bg-zinc-900/90 flex items-center justify-center text-primary shrink-0 shadow-sm">
              <Icon className="w-5 h-5 stroke-[1.75]" />
            </div>

            <h3 className="font-display text-base font-bold text-white tracking-tight leading-snug">
              {feat.title}
            </h3>

            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans">
              {feat.desc}
            </p>
          </div>
        );
      })}
    </div>
  </section>
);
