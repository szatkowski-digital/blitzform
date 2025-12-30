"use client";

import { motion, useInView, useAnimation, scale } from "framer-motion";
import React, { useEffect, useRef } from "react";

const Reveal = ({ children, className, amount = 0.6 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: amount,
  });
  const mainControls = useAnimation();
  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      className={`relative ${className || ""}`}
      variants={variants}
      exit="exit"
      initial="hidden"
      animate={mainControls}
      transition={{
        type: "tween",
        ease: "easeOut",
        duration: 0.5,
      }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
