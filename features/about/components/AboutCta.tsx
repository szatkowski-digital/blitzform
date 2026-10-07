"use client";

import Button from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";

interface AboutCtaProps {
  badge: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
}

export const AboutCta: React.FC<AboutCtaProps> = ({
  badge,
  title,
  description,
  primaryCta,
  secondaryCta,
}) => (
  <section className="py-16 sm:py-24 px-4 sm:px-6">
    <div className="max-w-4xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 text-primary font-mono text-xs font-semibold tracking-wide uppercase mb-3">
        <span className="w-2 h-2 rounded-sm bg-primary" />
        <span>{badge}</span>
      </div>

      <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
        {title}
      </h2>

      <p className="text-zinc-400 font-sans text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
        {description}
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        {/* <Link
          href="/oferta"
          className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-zinc-900 border border-zinc-700/80 text-zinc-200 hover:text-white font-display text-sm font-semibold hover:bg-zinc-800 transition-colors inline-flex items-center justify-center"
        >
          {primaryCta}
        </Link> */}
        <Link href="/offer">
          <Button id="about-primary-cta" variant="secondary">
            {primaryCta}
          </Button>
        </Link>
        {/* <Link
          href="/kontakt"
          className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-display text-sm font-bold transition-all inline-flex items-center justify-center gap-2 border border-white"
        >
          <span>{secondaryCta}</span>
          <ArrowRight className="w-4 h-4" />
        </Link> */}
        <Link href="/contact">
          <Button id="about-secondary-cta" variant="primary">
            {secondaryCta}
          </Button>
        </Link>
      </div>
    </div>
  </section>
);
