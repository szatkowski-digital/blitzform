"use client";

import Badge from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { ArrowRight, ChevronRight } from "lucide-react";

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
}) => (
  <section
    className="relative text-center max-w-4xl mx-auto pt-4 pb-14 md:pb-20 flex flex-col justify-center items-center"
    id="home-hero"
  >
    <Badge>{badge}</Badge>

    <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight leading-[1.06] mb-6">
      {titleLine1}
      <br />
      <span className="text-primary">{titleGradient}</span>
    </h1>

    <p className="font-sans text-zinc-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
      {description}
    </p>

    <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md w-full mx-auto">
      <Link href="/offer">
        <Button
          id="hero-primary-cta"
          variant="primary"
          icon={<ArrowRight className="w-4 h-4" />}
          onClick={() => console.log("Primary click")}
        >
          {primaryCta}
        </Button>
      </Link>

      <Link href="/contact?category=konsultacja">
        <Button
          id="hero-secondary-cta"
          variant="secondary"
          icon={<ChevronRight className="w-4 h-4 text-zinc-400" />}
        >
          {secondaryCta}
        </Button>
      </Link>
    </div>
  </section>
);
