"use client";

import AnimatedBackground from "@/components/design/AnimatedBackground";
import CallToAction from "@/components/sections/CallToAction";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
import Hero from "@/components/sections/Hero";
import TechCardsGroup from "@/components/sections/TechCardsGroup";
import useSectionObserver from "@/hooks/useSectionObserver";

export default function HomeClient() {
  const activeSection = useSectionObserver();

  return (
    <main className="relative">
      <Hero />

      <FeaturesGrid />

      <TechCardsGroup />

      <CallToAction />

      <AnimatedBackground activeSection={activeSection} />
    </main>
  );
}
