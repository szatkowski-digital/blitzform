"use client";

import Image from "next/image";
import {
  ArrowRight,
  Database,
  Sparkles,
  Lock,
  Printer,
  LucideIcon,
} from "lucide-react";
import Button from "@/components/ui/Button";

interface BlitzFormDepotProps {
  badge: string;
  title: string;
  description: string;
  cta: string;
  pillars: {
    title: string;
    desc: string;
  }[];
}

const PILLAR_ICONS: LucideIcon[] = [Database, Printer, Lock];

export const BlitzFormDepot: React.FC<BlitzFormDepotProps> = ({
  badge,
  title,
  description,
  cta,
  pillars,
}) => (
  <section className="py-12" id="blitzform-depot">
    <div className="relative rounded-3xl p-6 sm:p-10 md:p-12 bg-zinc-950/80 border border-zinc-800/60 shadow-2xl overflow-hidden">
      <div className="relative z-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-primary text-xs font-mono uppercase tracking-wider font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{badge}</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {title}
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-sans">
              {description}
            </p>
          </div>

          <div className="shrink-0">
            <Button
              variant="primary"
              icon={<ArrowRight className="w-4 h-4" />}
              onClick={() => {}}
            >
              {cta}
            </Button>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
          {/* Left Column: Pillars */}
          <div className="lg:col-span-5 space-y-4 z-10 pb-4 lg:pb-0">
            {pillars.map((pillar, idx) => {
              const Icon = PILLAR_ICONS[idx] || Database;
              return (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/50 backdrop-blur-sm flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-zinc-800/80 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm sm:text-base font-bold text-white mb-1">
                      {pillar.title}
                    </h3>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Image Bleed to Edges */}
          <div className="lg:col-span-7 hidden lg:block -mx-6 -mb-6 sm:-mx-10 sm:-mb-10 md:-mx-12 md:-mb-12 lg:mx-0 lg:mb-0 lg:absolute lg:-right-10 md:lg:-right-12 lg:-bottom-10 md:lg:-bottom-12 lg:top-0 lg:w-[58%] group rounded-t-2xl lg:rounded-tl-2xl lg:rounded-tr-none overflow-hidden border-t border-l border-zinc-800/80 bg-zinc-900/50 shadow-2xl">
            <div className="relative w-full h-64 sm:h-80 lg:h-full">
              <Image
                src="/images/blitzform_depot.jpeg"
                alt="BlitzForm Depot Interface Preview"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-top-left transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t lg:bg-linear-to-r from-zinc-950/90 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
