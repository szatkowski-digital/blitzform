"use client";

import React from "react";
import { Plus } from "lucide-react";
import Badge from "@/components/ui/Badge";

export interface TrainingProgramItem {
  id: string;
  packageLabel: string;
  price: string;
  duration: string;
  title: string;
  features: string[];
}

interface TrainingProgramsProps {
  programs: TrainingProgramItem[];
  badgeText: string;
  title: string;
  subtitle?: string;
}

export const TrainingPrograms: React.FC<TrainingProgramsProps> = ({
  programs,
  badgeText,
  title,
  subtitle,
}) => {
  return (
    <div className="pt-10 pb-16 space-y-12" id="sekcja-szkolenia-skrzyniowe">
      {/* Centered Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="ghost">{badgeText}</Badge>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-zinc-400 text-sm sm:text-base font-sans leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* Training Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {programs.map((prog) => (
          <div
            key={prog.id}
            className="group relative p-5 sm:p-6 rounded-2xl bg-transparent hover:bg-zinc-900/40 border border-transparent transition-all duration-300 flex flex-col items-start space-y-3"
          >
            {/* Custom Brochure-styled Badge with Package Name and Price */}
            <div className="inline-flex items-stretch rounded-r-xl rounded-l-md overflow-hidden font-display text-sm font-bold shadow-md">
              <div className="bg-primary text-zinc-950 px-3.5 py-1.5 flex items-center justify-center font-extrabold uppercase tracking-wide">
                {prog.packageLabel}
              </div>
              <div className="bg-zinc-800/90 text-white px-3.5 py-1.5 flex items-center justify-center font-black font-mono">
                {prog.price}
              </div>
            </div>

            {/* Duration Tag */}
            <div className="text-xs font-mono font-semibold text-zinc-300">
              {prog.duration}
            </div>

            {/* Program Title */}
            <h3 className="font-display text-lg font-bold text-white">
              {prog.title}
            </h3>

            {/* Feature List with Plus Bullet Icons */}
            <ul className="space-y-2.5 pt-1 w-full">
              {prog.features.map((feature, fIdx) => (
                <li
                  key={fIdx}
                  className="flex items-start gap-2 text-xs sm:text-sm font-sans font-medium text-zinc-300 leading-snug"
                >
                  <Plus className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingPrograms;
