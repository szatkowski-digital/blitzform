"use client";

import React from "react";
import Badge from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";

export interface OfferCTAProps {
  /** Small category/eyebrow tag text */
  badgeText?: string;
  /** Main call-to-action title */
  title?: string;
  /** Detailed description paragraph */
  description?: string;
  /** Label for the primary CTA button */
  buttonText?: string;
  /** Target section/route key passed to navigation callback */
  targetRoute?: string;
  /** Global navigation handler */
  onNavigate?: (route: string, section?: string, packageId?: string) => void;
  /** Optional custom ID for in-page anchors */
  id?: string;
  /** Custom CSS classes for container overrides */
  className?: string;
}

export const OfferCTA: React.FC<OfferCTAProps> = ({
  badgeText = "Dobór Sprzętu",
  title = "Potrzebujesz Konfiguracji Pod Nietypowe Zadania?",
  description = "Nasi inżynierowie skonfigurują Systemy Skrzyniowe lub Fabryki Kontenerowe z nietypowymi dyszami wysokotemperaturowymi, zasilaniem solarnym lub dedykowanym mocowaniem do pojazdów specjalnych.",
  buttonText = "Skonsultuj projekt z inżynierem",
  targetRoute = "kontakt",
  onNavigate,
  id = "sekcja-oferta-cta",
  className = "",
}) => {
  const handleConsultationClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(targetRoute);
    }
  };

  return (
    <section className={`py-16 sm:py-24 px-4 sm:px-6 ${className}`} id={id}>
      <div className="max-w-4xl mx-auto text-center">
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center justify-center mb-3">
          <Badge
            variant="ghost"
            className="font-mono text-xs uppercase tracking-wide"
          >
            <span className="w-2 h-2 rounded-sm bg-primary mr-2" />
            <span className="text-primary font-semibold">{badgeText}</span>
          </Badge>
        </div>

        {/* CTA Heading */}
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
          {title}
        </h2>

        {/* CTA Description */}
        {description && (
          <p className="text-zinc-400 font-sans text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            {description}
          </p>
        )}

        {/* Action Button Container */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact">
            <Button id="about-primary-cta" variant="primary">
              {buttonText}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OfferCTA;
