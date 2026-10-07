"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, LucideIcon } from "lucide-react";
import Image, { StaticImageData } from "next/image";

import { Badge } from "@/components/ui/Badge";

export interface FeatureItem {
  id: string;
  stepNumber: string;
  title: string;
  summary: string;
  description: string;
  tag: string;
  icon?: React.ReactNode;
}

export interface FeatureAccordionProps {
  categoryNumber: string;
  categoryTitle: string;
  categoryDescription: string;
  imageSrc: string | StaticImageData;
  imageAlt: string;
  features: FeatureItem[];
  icons?: LucideIcon[];
}

export const FeatureAccordion: React.FC<FeatureAccordionProps> = ({
  categoryNumber,
  categoryTitle,
  categoryDescription,
  imageSrc,
  imageAlt,
  features,
  icons,
}) => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const activeTextClasses = "text-primary";
  const inactiveTextClasses = "text-text-main hover:text-white";
  const mutedTextClasses = "text-text-muted";
  const separatorClasses = "border-b border-border-muted last:border-b-0";

  return (
    <section className="w-full py-12 lg:py-24">
      <div className="mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <aside className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <Badge variant="dark" className="font-mono">
                {categoryNumber}
              </Badge>

              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                {categoryTitle}
              </h2>

              <p className="text-text-muted text-sm lg:text-base leading-relaxed">
                {categoryDescription}
              </p>
            </div>

            <figure className="relative overflow-hidden rounded-xl border border-border-muted shadow-lg bg-black/50">
              <Image
                width={800}
                height={280}
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-55 lg:h-75 object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-linear-to-t from-surface-dark via-transparent to-transparent pointer-events-none" />
            </figure>
          </aside>

          <main className="lg:col-span-7">
            <ul className="flex flex-col">
              {features.map((item, index) => {
                const isExpanded = openIndex === index;
                const IconComponent = icons?.[index];
                const renderIcon = IconComponent ? (
                  <IconComponent className="w-4 h-4" />
                ) : (
                  item.icon
                );

                return (
                  <li
                    key={item.id}
                    className={`relative ${separatorClasses} py-4 sm:py-5 pl-4 sm:pl-5`}
                  >
                    {isExpanded && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r transition-all duration-300" />
                    )}

                    <button
                      type="button"
                      onClick={() => setOpenIndex(index)}
                      aria-expanded={isExpanded}
                      aria-controls={`content-${item.id}`}
                      className="w-full flex items-center justify-between gap-4 outline-none focus-visible:ring-2 focus-visible:ring-primary group cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div
                          className={`w-9 h-9 flex items-center justify-center shrink-0 transition-colors ${
                            isExpanded
                              ? "text-primary"
                              : "text-icon-inactive group-hover:text-icon-hover"
                          }`}
                        >
                          {renderIcon}
                        </div>

                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            className={`text-xs font-mono font-bold transition-colors ${
                              isExpanded ? activeTextClasses : mutedTextClasses
                            }`}
                          >
                            {item.stepNumber}
                          </span>
                          <h3
                            className={`font-display text-base sm:text-lg font-bold truncate transition-colors ${
                              isExpanded ? "text-white" : inactiveTextClasses
                            }`}
                          >
                            {item.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center justify-center w-8 h-8 shrink-0">
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-300 ${
                            isExpanded
                              ? `rotate-180 ${activeTextClasses}`
                              : "text-icon-inactive group-hover:text-icon-hover"
                          }`}
                        />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          id={`content-${item.id}`}
                          key="content"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.25, 1, 0.5, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 pb-2 pl-13 space-y-4">
                            {item.summary && (
                              <p className="text-zinc-300 text-sm sm:text-base font-semibold font-sans leading-snug">
                                {item.summary}
                              </p>
                            )}

                            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-sans">
                              {item.description}
                            </p>

                            <div className="pt-1">
                              <Badge variant="ghost" className="px-0!">
                                {item.tag}
                              </Badge>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </main>
        </div>
      </div>
    </section>
  );
};

export default FeatureAccordion;
