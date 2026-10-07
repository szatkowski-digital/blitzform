import { ReactNode } from "react";

export type BadgeVariant = "dark" | "light" | "ghost";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
  dotClassName?: string;
}

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  dark: "bg-zinc-900 border border-zinc-800 text-zinc-300",
  light: "bg-zinc-200/80 border border-zinc-300 text-zinc-900",
  ghost: "bg-transparent text-primary",
};

export const Badge = ({
  children,
  variant = "dark",
  className = "",
  dotClassName = "",
}: BadgeProps) => {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full font-mono text-xs font-semibold tracking-wide uppercase ${VARIANT_STYLES[variant]} ${className}`}
    >
      <span
        aria-hidden="true"
        className={`w-2 h-2 rounded-sm bg-primary shrink-0 ${dotClassName}`}
      />
      <span>{children}</span>
    </div>
  );
};

export default Badge;
