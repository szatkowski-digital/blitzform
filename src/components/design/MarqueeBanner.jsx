"use client"

import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { useRef } from "react";

export default function MarqueeBanner({ text }) {
  const baseX = useMotionValue(0);
  const ref = useRef(null);

  // Speed of the marquee (lower = slower)
  const SPEED = 100; // px per second

  useAnimationFrame((t, delta) => {
    const x = baseX.get();
    const width = ref.current?.scrollWidth / 2 || 0;

    // Move left
    const move = x - (SPEED * delta) / 1000;

    // Reset when half passed (because duplicated)
    baseX.set(move <= -width ? 0 : move);
  });

  return (
    <div className="relative w-full border-t border-n-3 h-24 lg:h-50 overflow-hidden flex items-center">
      <motion.div
        ref={ref}
        className="flex whitespace-nowrap"
        style={{ x: baseX }}
      >
        <p className="text-n-1 font-orbitron tracking-wider text-5xl lg:text-9xl uppercase font-light px-4 lg:px-20">
          {text}
        </p>
        <p className="text-n-1 font-orbitron tracking-wider text-5xl lg:text-9xl uppercase font-light px-4 lg:px-20">
          {text}
        </p>
      </motion.div>
    </div>
  );
}
