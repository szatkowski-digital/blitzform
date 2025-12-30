import { useState } from "react";
import { motion } from "framer-motion";

const TextReveal = ({ children, className = "" }) => {
  const duration = 0.25;
  const stagger = 0.025;

  return (
    <motion.div
      initial="initial"
      whileHover="hovered"
      className={`relative block overflow-hidden font-bold font-inter text-n-1 uppercase ${className}`}
      style={{ lineHeight: 0.985 }}
    >
      <div>
        {children.split("").map((l, i) => {
          if (l === " ") {
            return <span key={i}>&nbsp;</span>;
          }
          return (
            <motion.span
              className="inline-block"
              variants={{
                initial: { y: 0 },
                hovered: { y: "-100%" },
              }}
              transition={{
                duration: duration,
                ease: "easeInOut",
                delay: stagger * i,
              }}
              key={i}
            >
              {l}
            </motion.span>
          );
        })}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => {
          if (l === " ") {
            return <span key={i}>&nbsp;</span>;
          }
          return (
            <motion.span
              className="inline-block"
              variants={{
                initial: { y: "100%" },
                hovered: { y: 0 },
              }}
              transition={{
                duration: duration,
                ease: "easeInOut",
                delay: stagger * i,
              }}
              key={i}
            >
              {l}
            </motion.span>
          );
        })}
      </div>
    </motion.div>
  );
};

export default TextReveal;
