"use client";

import { useIsMobile } from "@/hooks/useInMobile";
import { motion } from "framer-motion";

export default function AnimatedBackground({ activeSection }) {
  const isMobile = useIsMobile();
  const variants = isMobile ? mobileVariants : desktopVariants;

  return (
    <div className="fixed bottom-0 left-0 w-full h-svh overflow-hidden pointer-events-none -z-10">
      <motion.div
        className="absolute left-1/2 top-1/2"
        animate={activeSection}
        initial={{ opacity: 0, y: "120vh" }}
        variants={variants}
        transition={transition}
      >
        {/* Outer circle */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 
        w-200 h-200
        lg:w-400 lg:h-400
        rounded-full bg-[radial-gradient(circle,rgba(120,150,60,0.35),rgba(120,150,60,0.15),transparent_100%)]"
        />

        {/* Middle circle */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 
        w-175 h-175 
        lg:w-325 lg:h-325
        rounded-full bg-[radial-gradient(circle,rgba(120,150,60,0.35),rgba(120,150,60,0.15),transparent_100%)]"
        />

        {/* Inner circle */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 
        w-150 h-150 
        lg:w-250 lg:h-250 
        rounded-full bg-[radial-gradient(circle,rgba(120,150,60,0.35),rgba(120,150,60,0.15),transparent_100%)]"
        />
      </motion.div>
    </div>
  );
}

/* ---------------- VARIANTS ---------------- */

const desktopVariants = {
  hero: {
    opacity: 1,
    x: "0vw",
    y: "105vh",
  },
  features: {
    opacity: 1,
    x: "20vw",
    y: "80vh",
  },
  tech: {
    opacity: 1,
    x: "40vw",
    y: "60vh",
  },
};

const mobileVariants = {
  hero: {
    opacity: 1,
    x: "0vw",
    y: "50vh",
  },
  features: {
    opacity: 1,
    x: "0vw",
    y: "70vh",
  },
  tech: {
    opacity: 1,
    x: "0vw",
    y: "100vh",
  },
};

/* ---------------- TRANSITION ---------------- */

const transition = {
  duration: 3.2,
  ease: [0.22, 1, 0.36, 1],
};
