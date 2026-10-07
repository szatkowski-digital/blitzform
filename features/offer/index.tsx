"use client";

import {
  Box,
  Container,
  Cpu,
  Wind,
  BatteryCharging,
  Wrench,
  Eye,
} from "lucide-react";

import { BoxPackages } from "./components/BoxPackages";
import TrainingPrograms from "./components/TrainingPrograms";
import ContainerPricing from "./components/ContainerPricing";
import SectionDivider from "./components/SectionDevider";
import HeroSection from "./components/HeroSection";
import OfferCTA from "./components/OfferCTA";
import FeatureAccordion from "./components/FeatureAccordion";
import {
  getBoxPackagesData,
  getContainerPricingData,
  getFeaturesData,
  getHeroSectionData,
  getSectionDividersData,
  getTrainingProgramsData,
} from "./data";
import { useTranslations } from "next-intl";

export const OfferPage = () => {
  const t = useTranslations("offer");
  const { boxes, containers } = getFeaturesData(t);
  const heroData = getHeroSectionData(t);
  const boxPricingData = getBoxPackagesData(t);
  const trainingData = getTrainingProgramsData(t);
  const containerPricing = getContainerPricingData(t);
  const { divider1, divider2, divider3 } = getSectionDividersData(t);

  return (
    <div className="pt-24 sm:pt-28 md:pt-32 pb-0">
      <HeroSection {...heroData} />

      <SectionDivider {...divider1} />

      {/* 2. SYSTEM 01: SYSTEMY SKRZYNIOWE */}
      <section className="scroll-mt-30" id="section-boxes">
        <div className="max-w-7xl mx-auto space-y-16 md:space-y-24 relative z-10 px-4 sm:px-6">
          <FeatureAccordion
            {...boxes}
            icons={[Box, Wind, BatteryCharging, Wrench, Eye]}
          />

          <BoxPackages {...boxPricingData} />

          <TrainingPrograms {...trainingData} />
        </div>
      </section>

      <SectionDivider {...divider2} />

      {/* 3. SYSTEM 02: FABRYKI KONTENEROWE */}
      <section className="scroll-mt-30" id="section-containers">
        <div className="max-w-7xl mx-auto space-y-16 md:space-y-24 relative z-10 px-4 sm:px-6">
          <FeatureAccordion
            {...containers}
            icons={[Container, Wind, Wrench, BatteryCharging, Cpu]}
          />

          <ContainerPricing {...containerPricing} />
        </div>
      </section>

      <SectionDivider {...divider3} />

      <OfferCTA />
    </div>
  );
};
