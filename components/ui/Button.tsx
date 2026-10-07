"use client";

import React, { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

export type ButtonVariant = "primary" | "secondary";

export interface ButtonProps extends Omit<
  HTMLMotionProps<"button">,
  "children"
> {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  icon?: ReactNode;
}

export const Button = ({
  children,
  variant = "primary",
  className = "",
  icon,
  onClick,
  ...props
}: ButtonProps) => {
  // Usunięto sm:w-auto, aby przycisk zawsze zajmował pełną szerokość (w-full)
  const baseClasses =
    "group relative overflow-hidden w-full px-8 py-4 rounded-full font-display text-sm flex items-center justify-between cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary border transition-colors";

  // Stylizacja wariantów
  const variantClasses = {
    primary: "bg-white text-zinc-950 font-bold border-white",
    secondary:
      "bg-zinc-900 text-zinc-200 border-zinc-700/80 font-semibold hover:text-white hover:border-zinc-500",
  };

  // Kolory fali/pulsu w tle dla poszczególnych wariantów
  const pulseOverlayColor = {
    primary: "bg-zinc-200",
    secondary: "bg-zinc-800",
  };

  return (
    <motion.button
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={{
        rest: { scale: 1 },
        tap: { scale: 0.97 },
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {/* Animowane tło rozchodzące się na scaleX: 2 z punktu originX: 0 */}
      <motion.span
        className={`absolute inset-0 z-0 rounded-r-full pointer-events-none ${pulseOverlayColor[variant]}`}
        variants={{
          rest: { scaleX: 0, originX: 0 },
          hover: {
            scaleX: 2,
            originX: 0,
            transition: { duration: 0.4, ease: "easeOut" },
          },
          tap: {
            scaleX: 2,
            originX: 0,
            transition: { duration: 0.15, ease: "easeOut" },
          },
        }}
      />

      {/* Zmieniono justify-center na justify-between i dodano w-full, żeby treść i ikona ładnie się rozchodziły na pełnej szerokości */}
      <span className="relative z-10 flex items-center justify-between w-full gap-3">
        <span>{children}</span>
        {icon && (
          <span className="inline-flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1 shrink-0">
            {icon}
          </span>
        )}
      </span>
    </motion.button>
  );
};

export default Button;
