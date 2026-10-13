"use client";

import Badge from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { ArrowRight, ChevronRight } from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

interface HeroProps {
  badge: string;
  titleLine1: string;
  titleGradient: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
}

export const Hero: React.FC<HeroProps> = ({
  badge,
  titleLine1,
  titleGradient,
  description,
  primaryCta,
  secondaryCta,
}) => {
  const isMobile = useIsMobile(768);
  const { scrollY } = useScroll();

  // Płynne, delikatne wygaszanie i unoszenie sekcji Hero przy przewijaniu do wideo (tylko desktop)
  const opacity = useTransform(scrollY, [0, 240], [1, 0.2]);
  const y = useTransform(scrollY, [0, 240], [0, -35]);
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 25 });
  const smoothY = useSpring(y, { stiffness: 100, damping: 25 });

  return (
    <motion.section
      style={isMobile ? undefined : { opacity: smoothOpacity, y: smoothY }}
      className="relative text-center max-w-4xl mx-auto pt-2 sm:pt-4 pb-8 sm:pb-10 md:pb-12 flex flex-col justify-center items-center"
      id="home-hero"
    >
      <Badge>{badge}</Badge>

      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight leading-[1.06] mb-4 sm:mb-6">
        {titleLine1}
        <br />
        <span className="text-primary">{titleGradient}</span>
      </h1>

      <p className="font-sans text-zinc-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8">
        {description}
      </p>

      {/* Przyciski wyświetlane obok siebie (flex-row) na mobile i desktop */}
      <div className="flex flex-row items-center justify-center gap-2.5 sm:gap-3.5 max-w-sm sm:max-w-md w-full mx-auto px-2 sm:px-0">
        <Link href="/offer">
          <Button
            id="hero-primary-cta"
            variant="primary"
            className="text-xs sm:text-sm px-3 sm:px-5 py-2 sm:py-2.5 whitespace-nowrap"
            icon={<ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            onClick={() => console.log("Primary click")}
          >
            {primaryCta}
          </Button>
        </Link>

        <Link href="/contact?category=konsultacja">
          <Button
            id="hero-secondary-cta"
            variant="secondary"
            className="text-xs sm:text-sm px-3 sm:px-5 py-2 sm:py-2.5 whitespace-nowrap"
            icon={
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-400" />
            }
          >
            {secondaryCta}
          </Button>
        </Link>
      </div>
    </motion.section>
  );
};
