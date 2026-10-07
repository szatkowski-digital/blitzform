"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";

export interface BoxPackageItem {
  id: "basic" | "pro" | "advanced";
  name: string;
  badgeTag: string;
  price: string;
  priceShort: string;
  priceSubtext: string;
  description: string;
  features: string[];
  isRecommended?: boolean;
}

export interface BoxPackagesProps {
  packages: BoxPackageItem[];
  sectionBadge: string;
  sectionTitle: string;
  sectionDescription: string;
  recommendedBadgeMobile?: string;
  recommendedBadgeDesktop?: string;
  selectButtonPrefix?: string;
  onSelectPackage?: (packageId: "basic" | "pro" | "advanced") => void;
  contactPath?: string;
}

export const BoxPackages: React.FC<BoxPackagesProps> = ({
  packages,
  sectionBadge,
  sectionTitle,
  sectionDescription,
  recommendedBadgeMobile = "★ Rekomendacja Inżynierska",
  recommendedBadgeDesktop = "Rekomendowane przez Blitzform",
  selectButtonPrefix = "Wybierz",
  onSelectPackage,
  contactPath = "/contakt",
}) => {
  const router = useRouter();
  const [mobileBoxPackage, setMobileBoxPackage] = useState<
    "basic" | "pro" | "advanced"
  >("pro");

  const currentMobileIndex = packages.findIndex(
    (pkg) => pkg.id === mobileBoxPackage
  );
  const activeMobilePkg = packages[currentMobileIndex] || packages[0];

  const handleMobilePrev = () => {
    const prevIdx =
      (currentMobileIndex - 1 + packages.length) % packages.length;
    setMobileBoxPackage(packages[prevIdx].id);
  };

  const handleMobileNext = () => {
    const nextIdx = (currentMobileIndex + 1) % packages.length;
    setMobileBoxPackage(packages[nextIdx].id);
  };

  return (
    <section
      className="pt-8 space-y-8"
      aria-labelledby="pakiety-skrzyniowe-heading"
      id="pakiety-skrzyniowe"
    >
      {/* Centered Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="ghost">{sectionBadge}</Badge>
        <h2
          className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          id="pakiety-skrzyniowe-heading"
        >
          {sectionTitle}
        </h2>

        <p className="text-zinc-400 text-sm sm:text-base font-sans leading-relaxed">
          {sectionDescription}
        </p>
      </div>

      {/* --- Widok Mobilny --- */}
      <div className="block md:hidden space-y-4">
        {/* Switcher zakładek mobilnych */}
        <div
          role="tablist"
          aria-label="Wybór pakietu cenowego"
          className="grid grid-cols-3 gap-1.5 w-full bg-zinc-900/90 p-1.5 rounded-2xl border border-zinc-800"
        >
          {packages.map((pkg) => {
            const isActive = mobileBoxPackage === pkg.id;
            return (
              <button
                key={pkg.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`mobile-tabpanel-${pkg.id}`}
                id={`mobile-tab-${pkg.id}`}
                onClick={() => setMobileBoxPackage(pkg.id)}
                className={`py-2 px-1 text-center rounded-xl font-display text-xs font-bold transition-all ${
                  isActive
                    ? "bg-white text-zinc-950 shadow"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <div className="flex items-center justify-center gap-0.5">
                  <span>{pkg.id.toUpperCase()}</span>
                  {pkg.isRecommended && <span className="text-primary">★</span>}
                </div>
                <div
                  className={`text-[10px] font-mono font-normal ${
                    isActive ? "text-zinc-700" : "text-zinc-500"
                  }`}
                >
                  {pkg.priceShort}
                </div>
              </button>
            );
          })}
        </div>

        {/* Karta wybranego pakietu na mobilce */}
        <article
          id={`mobile-tabpanel-${activeMobilePkg.id}`}
          role="tabpanel"
          aria-labelledby={`mobile-tab-${activeMobilePkg.id}`}
          className="w-full rounded-2xl bg-zinc-900/80 shadow-xl p-6 space-y-6 text-white"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              {activeMobilePkg.isRecommended ? (
                <span className="text-[11px] font-mono text-primary uppercase tracking-wide font-semibold bg-primary/10 border border-primary/30 px-2.5 py-0.5 rounded">
                  {recommendedBadgeMobile}
                </span>
              ) : (
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wide font-semibold">
                  {activeMobilePkg.badgeTag}
                </span>
              )}
              <span className="text-xs font-mono text-zinc-500">
                {currentMobileIndex + 1} z {packages.length}
              </span>
            </div>

            <h4 className="font-display text-2xl font-extrabold text-white mb-2 flex items-center gap-2">
              <span>{activeMobilePkg.name}</span>
              {activeMobilePkg.isRecommended && (
                <Sparkles className="w-4 h-4 text-primary" />
              )}
            </h4>

            <div className="mb-4">
              <span className="font-display text-3xl font-black text-white">
                {activeMobilePkg.price}
              </span>
              <span className="text-xs text-zinc-400 block font-mono">
                {activeMobilePkg.priceSubtext}
              </span>
            </div>

            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-5 font-sans">
              {activeMobilePkg.description}
            </p>

            <ul
              className="space-y-2.5 mb-6"
              aria-label="Lista elementów pakietu"
            >
              {activeMobilePkg.features.map((feat, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 font-sans"
                >
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span
                    className={
                      activeMobilePkg.isRecommended
                        ? "font-medium text-zinc-200"
                        : ""
                    }
                  >
                    {feat}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href={{
                pathname: "/contact",
                query: {
                  category: "boxes",
                  packageId: activeMobilePkg.id,
                },
              }}
              className="w-full"
            >
              <Button
                variant={
                  activeMobilePkg.isRecommended ? "primary" : "secondary"
                }
                icon={<ArrowRight className="w-4 h-4" />}
                className="w-full"
              >
                {selectButtonPrefix} {activeMobilePkg.name}
              </Button>
            </Link>
          </div>

          {/* Nawigacja dolna na mobilce */}
          <footer className="flex items-center justify-between pt-3">
            <button
              onClick={handleMobilePrev}
              className="text-xs font-mono text-zinc-400 hover:text-white px-2 py-1 outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
              aria-label="Poprzedni pakiet"
            >
              ← Poprzedni
            </button>

            <div className="flex gap-1.5" aria-hidden="true">
              {packages.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => setMobileBoxPackage(pkg.id)}
                  className={`h-2 rounded-full transition-all ${
                    mobileBoxPackage === pkg.id
                      ? "bg-white w-5"
                      : "bg-zinc-700 w-2"
                  }`}
                  tabIndex={-1}
                />
              ))}
            </div>

            <button
              onClick={handleMobileNext}
              className="text-xs font-mono text-zinc-400 hover:text-white px-2 py-1 outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
              aria-label="Następny pakiet"
            >
              Następny →
            </button>
          </footer>
        </article>
      </div>

      {/* --- Widok Desktopowy --- */}
      <div className="hidden md:grid md:grid-cols-3 gap-6 items-stretch">
        {packages.map((pkg) => {
          const isPro = pkg.isRecommended;

          return (
            <article
              key={pkg.id}
              id={`pakiet-${pkg.id}`}
              className={`p-7 rounded-3xl flex flex-col justify-between transition-colors bg-zinc-900/80 ${
                isPro ? "shadow-2xl relative" : "bg-zinc-900/80 scale-95"
              }`}
            >
              {isPro && (
                <div className="absolute -top-3.5 right-6 bg-zinc-800 text-primary border border-primary/40 text-xs font-display font-bold px-3.5 py-1 rounded-full shadow-md">
                  {recommendedBadgeDesktop}
                </div>
              )}

              <div>
                <span
                  className={`text-xs font-mono uppercase tracking-wide font-semibold block mb-2 ${
                    isPro ? "text-primary font-bold" : "text-zinc-400"
                  }`}
                >
                  {pkg.badgeTag}
                </span>

                <h4 className="font-display text-2xl font-extrabold text-white mb-2 flex items-center gap-2">
                  <span>{pkg.name}</span>
                  {isPro && <Sparkles className="w-4 h-4 text-primary" />}
                </h4>

                <div className="mb-4">
                  <span className="font-display text-3xl sm:text-4xl font-black text-white">
                    {pkg.price}
                  </span>
                  <span className="text-xs text-zinc-400 block font-mono mt-0.5">
                    {pkg.priceSubtext}
                  </span>
                </div>

                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                  {pkg.description}
                </p>

                <ul
                  className="space-y-3 mb-8"
                  aria-label={`Zawartość pakietu ${pkg.name}`}
                >
                  {pkg.features.map((feat, idx) => (
                    <li
                      key={idx}
                      className={`flex items-start gap-2.5 text-xs sm:text-sm font-sans ${
                        isPro ? "text-zinc-200 font-medium" : "text-zinc-300"
                      }`}
                    >
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href={{
                  pathname: "/contact",
                  query: {
                    category: "boxes",
                    packageId: pkg.id,
                  },
                }}
              >
                <Button
                  variant={isPro ? "primary" : "secondary"}
                  icon={<ArrowRight className="w-4 h-4" />}
                  className="w-full"
                >
                  {selectButtonPrefix} {pkg.name}
                </Button>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default BoxPackages;
