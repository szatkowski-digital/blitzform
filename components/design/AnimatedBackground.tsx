"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import { motion } from "framer-motion";

export type SectionId = "home-hero" | "product-teasers" | "blitzform-depot";

interface AnimatedBackgroundProps {
  activeSection: SectionId;
}

export default function AnimatedBackground({
  activeSection,
}: AnimatedBackgroundProps) {
  const isMobile = useIsMobile();
  const variants = isMobile ? mobileVariants : desktopVariants;

  return (
    <div className="fixed bottom-0 left-0 w-full h-svh overflow-hidden pointer-events-none -z-10">
      <motion.div
        className="absolute left-1/2 top-1/2"
        initial="home-hero"
        animate={activeSection}
        variants={variants}
        transition={transition}
      >
        {/* Outer circle */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 
        w-200 h-200
        lg:w-400 lg:h-400
        rounded-full bg-[radial-gradient(circle,rgba(120,150,60,0.30),rgba(120,150,60,0.15),transparent_100%)] opacity-70"
        />

        {/* Middle circle */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 
        w-175 h-175 
        lg:w-325 lg:h-325
        rounded-full bg-[radial-gradient(circle,rgba(120,150,60,0.30),rgba(120,150,60,0.15),transparent_100%)] opacity-70"
        />

        {/* Inner circle */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 
        w-150 h-150 
        lg:w-250 lg:h-250 
        rounded-full bg-[radial-gradient(circle,rgba(120,150,60,0.30),rgba(120,150,60,0.15),transparent_100%)] opacity-70"
        />
      </motion.div>
    </div>
  );
}

/* ---------------- VARIANTS ---------------- */

const desktopVariants = {
  "home-hero": {
    opacity: 1,
    x: "0vw",
    y: "105vh",
  },
  "product-teasers": {
    opacity: 1,
    x: "20vw",
    y: "80vh",
  },
  "blitzform-depot": {
    opacity: 1,
    x: "40vw",
    y: "60vh",
  },
};

const mobileVariants = {
  "home-hero": {
    opacity: 1,
    x: "0vw",
    y: "50vh",
  },
  "product-teasers": {
    opacity: 1,
    x: "0vw",
    y: "70vh",
  },
  "blitzform-depot": {
    opacity: 1,
    x: "0vw",
    y: "100vh",
  },
};

/* ---------------- TRANSITION ---------------- */

const transition = {
  duration: 3.2,
  ease: [0.22, 1, 0.36, 1] as const,
};
