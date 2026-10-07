"use client";

import { useMemo } from "react";
import { motion, type Variants } from "framer-motion";

interface TextRevealProps {
  children: string;
  className?: string;
  duration?: number;
  stagger?: number;
  isActive?: boolean;
}

const PRIMARY_VARIANTS: Variants = {
  initial: { y: 0 },
  hovered: { y: "-100%" },
};

const SECONDARY_VARIANTS: Variants = {
  initial: { y: "100%" },
  hovered: { y: 0 },
};

export const TextReveal = ({
  children,
  className = "",
  duration = 0.15,
  stagger = 0.025,
  isActive = false,
}: TextRevealProps) => {
  const characters = useMemo(() => children.split(""), [children]);

  const renderChars = (variants: Variants) =>
    characters.map((char, index) =>
      char === " " ? (
        <span key={index}>&nbsp;</span>
      ) : (
        <motion.span
          key={index}
          className="inline-block"
          variants={variants}
          transition={{
            duration,
            ease: "easeInOut",
            delay: stagger * index,
          }}
        >
          {char}
        </motion.span>
      )
    );

  return (
    <motion.div
      initial={isActive ? "hovered" : "initial"}
      animate={isActive ? "hovered" : "initial"}
      whileHover="hovered"
      className={`relative block overflow-hidden font-bold font-inter text-n-1 uppercase ${className}`}
      style={{ lineHeight: 0.985 }}
    >
      <div>{renderChars(PRIMARY_VARIANTS)}</div>
      <div className="absolute inset-0 text-primary" aria-hidden="true">
        {renderChars(SECONDARY_VARIANTS)}
      </div>
    </motion.div>
  );
};

export default TextReveal;
