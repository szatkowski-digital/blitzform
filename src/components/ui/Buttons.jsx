"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export const Button = ({ children, onClick }) => {
  const [isActive, setIsActive] = useState(false);
  const [animationType, setAnimationType] = useState("hover");

  const getTransition = () => {
    if (animationType === "hover") {
      return { duration: 0.4, ease: "easeOut" };
    } else {
      return { duration: 0.2, ease: "easeOut" };
    }
  };

  const handleClick = () => {
    if (onClick) onClick();
    setIsActive(false);
  };

  return (
    <motion.button
      className="relative px-6 py-3 border border-n-1 bg-transparent text-n-1 font-medium text-lg rounded-none overflow-hidden whitespace-nowrap cursor-pointer"
      onMouseEnter={() => {
        setAnimationType("hover");
        setIsActive(true);
      }}
      onMouseLeave={() => setIsActive(false)}
      onTapStart={() => {
        setAnimationType("tap");
        setIsActive(true);
      }}
      onTapCancel={() => setIsActive(false)}
      onClick={handleClick}
    >
      <motion.span
        className="absolute inset-0 -z-10 rounded-r-full bg-n-1"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{
          scaleX: isActive ? 2 : 0,
          originX: 0,
        }}
        transition={getTransition()}
      />
      <span className="relative z-10 mix-blend-difference">{children}</span>
    </motion.button>
  );
};
