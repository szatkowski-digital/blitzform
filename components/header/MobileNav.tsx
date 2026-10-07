"use client";

import { useTransition } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, type Variants } from "framer-motion";

import LanguageSwitcher from "../ui/LanguageSwitcher";
import TextReveal from "../ui/TextReveal";
import { NAV_ITEMS } from "@/config/navigation";
import { useActiveRoute } from "../../hooks/useActiveRoute";
import { Link } from "@/i18n/navigation";

interface MobileMenuProps {
  open: boolean;
  handleClick: () => void;
}

const menuVariants: Variants = {
  hidden: {
    opacity: 0,
    y: "-100%",
    transition: { duration: 0.3, ease: [0.32, 0, 0.67, 0] },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const linkVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

export const MobileNav = ({ open, handleClick }: MobileMenuProps) => {
  const t = useTranslations("common");
  const { isLinkActive, isPathActive } = useActiveRoute();
  const [, startTransition] = useTransition();

  const handleNavClick = () => {
    startTransition(() => {
      if (handleClick) {
        handleClick();
      }
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-menu"
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 bg-surface-dark/95 backdrop-blur-2xl text-white z-40 flex flex-col justify-between p-6 pt-24"
        >
          <div className="absolute top-5 left-6 z-10">
            <LanguageSwitcher />
          </div>

          <nav className="flex flex-col items-center justify-center my-auto gap-7 text-center w-full max-w-xs mx-auto">
            {NAV_ITEMS.map((item) => (
              <motion.div
                key={item.href}
                variants={linkVariants}
                className="flex flex-col items-center gap-3 w-full"
              >
                {/* Główny link menu */}
                <Link
                  href={item.href}
                  onClick={handleNavClick}
                  prefetch={false}
                  className="inline-block outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
                >
                  <TextReveal
                    className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight"
                    isActive={isLinkActive(item)}
                  >
                    {t(item.labelKey)}
                  </TextReveal>
                </Link>

                {/* Sub-lista pod-ofert */}
                {item.subItems && item.subItems.length > 0 && (
                  <div className="flex flex-col items-center gap-2 w-full pt-1">
                    <div className="flex flex-col items-center gap-1.5 w-full border-l border-zinc-800 pl-3">
                      {item.subItems.map((subItem) => {
                        const isActive = isPathActive(subItem.href);
                        return (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            onClick={handleNavClick}
                            prefetch={false}
                            className={`w-full py-1.5 px-3 rounded-lg text-sm font-mono uppercase tracking-wider transition-colors duration-200 ${
                              isActive
                                ? "bg-zinc-900 text-primary border border-zinc-800/80 font-bold"
                                : "text-zinc-400 hover:text-white hover:bg-zinc-900/50"
                            }`}
                          >
                            <TextReveal
                              className="text-sm font-mono"
                              isActive={isActive}
                            >
                              {t(subItem.labelKey)}
                            </TextReveal>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </nav>

          <motion.footer
            className="w-full text-center text-xs text-zinc-500 pb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.3 }}
          >
            <p>© {new Date().getFullYear()} BlitzForm</p>
          </motion.footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
