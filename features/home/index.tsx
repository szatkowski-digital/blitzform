"use client";

import { useEffect, useState } from "react";
import caseImg from "../../public/images/box_systems.webp";
import containerImg from "../../public/images/container_systems.webp";
import { BlitzFormDepot } from "./components/BlitzformDepot";
import { FeaturesGrid } from "./components/FeaturesGrid";
import { Hero } from "./components/Hero";
import { HeroVideoContainer } from "./components/HeroVideoContainer";
import { ProductTeasers } from "./components/ProductTeasers";
import AnimatedBackground, {
  SectionId,
} from "@/components/design/AnimatedBackground";
import { useTranslations } from "next-intl";
import {
  getBlitzFormDepotData,
  getFeaturesGridData,
  getHeroData,
  getHeroVideoData,
  getProductTeasersData,
} from "./data";

export const HomePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>("home-hero");
  const t = useTranslations("home");
  const heroData = getHeroData(t);
  const heroVideoData = getHeroVideoData(t);
  const productTeasersData = getProductTeasersData(t);
  const featuresGridData = getFeaturesGridData(t);
  const depotData = getBlitzFormDepotData(t);

  useEffect(() => {
    const sections: SectionId[] = [
      "home-hero",
      "product-teasers",
      "blitzform-depot",
    ];

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id as SectionId);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative overflow-x-clip pt-24 sm:pt-28 md:pt-32">
      <AnimatedBackground activeSection={activeSection} />

      <div className="mx-auto px-4 sm:px-6 flex flex-col items-center w-full">
        <Hero {...heroData} />

        <HeroVideoContainer {...heroVideoData} />

        <ProductTeasers
          caseImg={caseImg}
          containerImg={containerImg}
          {...productTeasersData}
        />

        <FeaturesGrid {...featuresGridData} />

        <BlitzFormDepot {...depotData} />
      </div>
    </div>
  );
};
