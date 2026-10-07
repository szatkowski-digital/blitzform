"use client";

import { useRef, useEffect } from "react";
import TeamSection from "./TeamSection";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
}

interface Sector {
  title: string;
  desc: string;
}

interface AboutManifestProps {
  badge: string;
  location: string;
  country: string;
  title: string;
  paragraph1: string;
  paragraph2HighlightBefore: string;
  paragraph2Strong: string;
  paragraph2HighlightAfter: string;
  quoteText: string;
  quoteAuthor: string;
  sectorsTitle: string;
  sectors: Sector[];
  teamMembers: TeamMember[];
}

export const AboutManifest: React.FC<AboutManifestProps> = ({
  badge,
  location,
  country,
  title,
  paragraph1,
  paragraph2HighlightBefore,
  paragraph2Strong,
  paragraph2HighlightAfter,
  quoteText,
  quoteAuthor,
  sectorsTitle,
  sectors,
  teamMembers,
}) => {
  const marqueeTrackRef = useRef<HTMLDivElement>(null);
  const xPercentRef = useRef<number>(-50);
  const scrollBoostRef = useRef<number>(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let animationFrameId: number;
    let lastTime = performance.now();

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;
      // Łagodne, wolniejsze przyspieszenie ruchu w prawo podczas scrollowania
      scrollBoostRef.current = Math.min(
        6,
        scrollBoostRef.current + delta * 0.05
      );
    };

    const animateMarquee = (now: number) => {
      const dt = Math.min(50, now - lastTime);
      lastTime = now;

      const baseSpeed = 0.0085;
      const boostSpeed = scrollBoostRef.current * 0.025;
      const step = (baseSpeed + boostSpeed) * (dt / 16.67);

      xPercentRef.current += step;
      if (xPercentRef.current >= 0) {
        xPercentRef.current -= 50;
      }

      // Płynne wygaszanie przyspieszenia po zatrzymaniu scrolla
      scrollBoostRef.current *= 0.94;
      if (scrollBoostRef.current < 0.005) {
        scrollBoostRef.current = 0;
      }

      if (marqueeTrackRef.current) {
        marqueeTrackRef.current.style.transform = `translate3d(${xPercentRef.current}%, 0, 0)`;
      }

      animationFrameId = requestAnimationFrame(animateMarquee);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    animationFrameId = requestAnimationFrame(animateMarquee);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const renderMarqueeUnit = (keyPrefix: string) => (
    <div className="flex items-center shrink-0">
      {[0, 1, 2].map((idx) => (
        <div key={`${keyPrefix}-${idx}`} className="flex items-center shrink-0">
          <span className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-zinc-950 px-4 sm:px-6">
            PROJEKT
          </span>
          <span className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-zinc-300 px-2 sm:px-4">
            —
          </span>
          <span className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-zinc-500 px-4 sm:px-6">
            DRUK
          </span>
          <span className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-zinc-300 px-2 sm:px-4">
            —
          </span>
          <span className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-zinc-950 px-4 sm:px-6">
            ROZWIĄZANIE
          </span>
          <span className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-[#84a818] px-6 sm:px-10 leading-none">
            *
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <section className="relative w-full bg-[#f4f5f7] text-zinc-950 pt-10 sm:pt-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Nagłówek Sekcji */}
        <div className="flex items-center justify-between gap-4 mb-10 pb-4 border-b border-zinc-200">
          <div className="flex items-center gap-2.5">
            <span className="font-display font-extrabold text-xs sm:text-sm text-zinc-900 uppercase tracking-wide">
              {badge}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
            <span className="text-zinc-500 font-mono text-xs hidden sm:inline-block">
              O Firmie
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-zinc-600">
            <span className="font-bold text-zinc-900">{location}</span>
            <span>• {country}</span>
          </div>
        </div>

        {/* Tekst o misji */}
        <div className="space-y-12 max-w-4xl">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight mb-6">
              {title}
            </h2>
            <p className="text-zinc-700 text-base sm:text-lg leading-relaxed font-sans">
              {paragraph1}
            </p>
            <p className="text-zinc-700 text-base sm:text-lg leading-relaxed font-sans mt-4">
              {paragraph1 ? paragraph2HighlightBefore : ""}
              <strong className="font-bold text-zinc-950">
                {paragraph2Strong}
              </strong>{" "}
              {paragraph2HighlightAfter}
            </p>
          </div>

          {/* Blok Cytatu */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-zinc-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
            <blockquote className="text-zinc-900 font-sans text-base sm:text-xl font-semibold italic leading-relaxed pl-2">
              „{quoteText}”
            </blockquote>
            <div className="mt-4 pl-2 font-mono text-xs font-semibold text-zinc-600 uppercase tracking-wide flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
              <span>{quoteAuthor}</span>
            </div>
          </div>

          {/* Sektory Wdrożeniowe */}
          <div className="pt-2">
            <h3 className="font-display text-2xl font-extrabold text-zinc-950 mb-4">
              {sectorsTitle}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sectors.map((sector, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-sm"
                >
                  <div className="font-display font-extrabold text-zinc-950 text-base mb-1">
                    {sector.title}
                  </div>
                  <div className="text-zinc-600 text-xs sm:text-sm leading-relaxed font-sans">
                    {sector.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <TeamSection members={teamMembers} />
      </div>

      {/* Pasek Marquee */}
      <div
        aria-label="Hasło przewodnie BlitzForm"
        className="w-full bg-white border-y border-zinc-200 py-6 sm:py-10 overflow-hidden select-none relative z-10 mt-4"
      >
        <div
          ref={marqueeTrackRef}
          className="flex items-center w-max will-change-transform"
          style={{ transform: "translate3d(-50%, 0, 0)" }}
        >
          {renderMarqueeUnit("half-a")}
          {renderMarqueeUnit("half-b")}
        </div>
      </div>
    </section>
  );
};
