"use client";

import { useIsMobile } from "@/hooks/useInMobile";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export const HeroBackground = () => {
  const isMobile = useIsMobile();

  const offsetSmall = isMobile ? 4 : 8;
  const offsetMedium = isMobile ? 6 : 10;
  const offsetLarge = isMobile ? 10 : 18;

  const durationSlow = isMobile ? 40 : 30;
  const durationMed = isMobile ? 32 : 24;
  const durationFast = isMobile ? 28 : 18;

  return (
    <div className="relative w-full h-full will-change-transform overflow-hidden">
      {/* LEWA CZĘŚĆ */}
      <HorizontalLine
        y={isMobile ? 8 : 18}
        xStart={isMobile ? -8 : -10}
        xEnd={isMobile ? 62 : 16}
        duration={durationMed}
        offset={offsetSmall}
        enterFrom="left"
      />

      {!isMobile && (
        <VerticalLine
          x={isMobile ? 4 : 2}
          yStart={36}
          yEnd={62}
          duration={durationSlow}
          offset={offsetLarge}
        />
      )}
      {!isMobile && (
        <HorizontalLine
          y={92}
          xStart={isMobile ? 12 : 18}
          xEnd={32}
          duration={durationMed}
          offset={offsetMedium}
          enterFrom="left"
        />
      )}

      {/* PRAWA CZĘŚĆ */}
      {!isMobile && (
        <HorizontalLine
          y={20}
          xStart={76}
          xEnd={88}
          duration={durationMed}
          offset={4}
        />
      )}
      <HorizontalLine
        y={isMobile ? 48 : 44}
        xStart={52}
        xEnd={106}
        duration={durationMed}
        offset={offsetSmall}
      />
      <HorizontalLine
        y={isMobile ? 70 : 68}
        xStart={52}
        xEnd={106}
        duration={durationSlow}
        offset={offsetSmall}
      />
      <HorizontalLine
        y={92}
        xStart={isMobile ? 18 : 48}
        xEnd={110}
        duration={durationMed}
        offset={offsetLarge}
      />
      {!isMobile && (
        <VerticalLine
          x={66}
          yStart={24}
          yEnd={102}
          duration={durationMed}
          offset={offsetSmall}
        />
      )}
      <VerticalLine
        x={isMobile ? 42 : 82}
        yStart={isMobile ? 58 : 10}
        yEnd={102}
        duration={durationMed}
        offset={offsetSmall}
      />

      <VerticalLine
        x={isMobile ? 86 : 98}
        yStart={isMobile ? 42 : 24}
        yEnd={102}
        duration={durationSlow}
        offset={offsetSmall}
      />
    </div>
  );
};

export const TechBackground = () => {
  return (
    <div className="max-lg:hidden absolute inset-0 overflow-hidden -z-10 border-y border-n-3">
      {/* Net */}
      <div className="absolute inset-0 grid grid-cols-5 grid-rows-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="border-r border-n-3 last:border-r-0"></div>
        ))}

        <div className="absolute top-1/2 w-full border-b border-n-3"></div>
      </div>

      {/* Circle */}
      <div className="absolute right-0 top-0 w-1/2 h-full border border-n-3 rounded-full"></div>
    </div>
  );
};

const HorizontalLine = ({
  y,
  xStart,
  xEnd,
  duration = 22,
  offset = 20,
  enterFrom = "right",
}) => {
  const width = xEnd - xStart;
  const enterX = enterFrom === "right" ? "5vw" : "-5vw";

  return (
    <motion.div
      className="absolute"
      style={{ top: `${y}%`, left: 0, width: "100%" }}
      initial={{ x: enterX, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <motion.div
        className="absolute h-px"
        style={{ top: `${y}%`, left: `${xStart}%`, width: `${width}%` }}
        animate={{ x: [`-${offset}%`, `${offset}%`, `-${offset}%`] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        <div className="relative w-full h-full">
          {/* lewy segment */}
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-px bg-white/20"
            style={{ width: "calc(50% - 10px)" }}
          />
          {/* prawy segment */}
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 h-px bg-white/20"
            style={{ width: "calc(50% - 10px)" }}
          />
          {/* kropki na końcach */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-0.75 rounded-full bg-white/70" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0.75 h-0.75 rounded-full bg-white/70" />
        </div>
      </motion.div>
    </motion.div>
  );
};

const VerticalLine = ({
  x,
  yStart,
  yEnd,
  duration = 24,
  offset = 20,
  enterFrom = "top",
}) => {
  const height = yEnd - yStart;
  const enterY = enterFrom === "top" ? "10vh" : "-10vh";

  return (
    <motion.div
      className="absolute"
      style={{ top: 0, left: 0, width: "100%", height: "100%" }}
      initial={{ y: enterY, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <motion.div
        className="absolute w-px"
        style={{ left: `${x}%`, top: `${yStart}%`, height: `${height}%` }}
        animate={{ y: [`-${offset}%`, `${offset}%`, `-${offset}%`] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        <div className="relative w-full h-full">
          {/* górny segment */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-px bg-white/20"
            style={{ height: "calc(50% - 10px)" }}
          />
          {/* dolny segment */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px bg-white/20"
            style={{ height: "calc(50% - 10px)" }}
          />
          {/* kropki na końcach */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-white/70" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-white/70" />
        </div>
      </motion.div>
    </motion.div>
  );
};
