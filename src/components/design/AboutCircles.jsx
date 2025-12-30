"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export const AboutCircles = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMove = (e) => {
      const x = e.clientX - window.innerWidth / 2;
      const y = e.clientY - window.innerHeight / 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <div className="w-full flex justify-center items-center h-80 lg:h-120">
      <div className="relative w-[320px] h-80 lg:w-105 lg:h-120">
        <Circle
          size="w-100 h-80 lg:h-100"
          gradient="from-primary/50 to-primary-dark/50"
          baseClass="-translate-y-5"
          mouseX={mouseX}
          mouseY={mouseY}
          mouseStrength={0.015}
          float={{ x: 6, y: 6, duration: 12 }}
        />

        <Circle
          size="w-72 h-72"
          gradient="from-primary/40 to-primary-dark/40"
          baseClass="translate-x-10 -translate-y-15 lg:translate-x-40 lg:-translate-y-25"
          mouseX={mouseX}
          mouseY={mouseY}
          mouseStrength={0.025}
          float={{ x: 8, y: 4, duration: 14 }}
        />

        <Circle
          size="w-54 h-54"
          gradient="from-primary/30 to-primary-dark/30"
          baseClass="translate-x-15 translate-y-15 lg:translate-x-30 lg:translate-y-20"
          mouseX={mouseX}
          mouseY={mouseY}
          mouseStrength={0.04}
          float={{ x: 4, y: 6, duration: 10 }}
        />
      </div>
    </div>
  );
};

const Circle = ({
  size,
  gradient,
  baseClass,
  mouseX,
  mouseY,
  mouseStrength,
  float,
}) => {
  const xSpring = useSpring(mouseX, {
    stiffness: 40,
    damping: 20,
  });

  const ySpring = useSpring(mouseY, {
    stiffness: 40,
    damping: 20,
  });

  const mouseXTransform = useTransform(xSpring, (v) => v * mouseStrength);
  const mouseYTransform = useTransform(ySpring, (v) => v * mouseStrength);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        x: mouseXTransform,
        y: mouseYTransform,
      }}
    >
      {/* FLOAT LAYER */}
      <motion.div
        animate={{
          x: [-float.x, float.x, -float.x],
          y: [-float.y, float.y, -float.y],
        }}
        transition={{
          duration: float.duration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          className={`
            ${size}
            ${baseClass}
            rounded-full
            bg-linear-to-br ${gradient}
            blur-xs
          `}
        />
      </motion.div>
    </motion.div>
  );
};
