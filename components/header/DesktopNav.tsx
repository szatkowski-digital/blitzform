import { useTranslations } from "next-intl";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import TextReveal from "../ui/TextReveal";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import { NAV_ITEMS } from "@/config/navigation";
import { useActiveRoute } from "../../hooks/useActiveRoute";
import { Link } from "@/i18n/navigation";

export const DesktopNav = () => {
  const t = useTranslations("common");
  const { isLinkActive } = useActiveRoute();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <nav className="hidden lg:flex flex-1 text-n-1">
      <div className="flex gap-16 xl:gap-32 items-center w-full justify-center">
        {NAV_ITEMS.map((item) => {
          const isHovered = hoveredItem === item.href;
          const isMainActive = isLinkActive(item) || isHovered;

          return (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() => setHoveredItem(item.href)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link href={item.href}>
                <TextReveal className="text-sm" isActive={isMainActive}>
                  {t(item.labelKey)}
                </TextReveal>
              </Link>

              <AnimatePresence>
                {item.subItems && isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-6 z-50"
                  >
                    <div className="py-4 px-6 bg-n-8/95 backdrop-blur-md border border-n-1/5 rounded-xl flex flex-col gap-4 min-w-[240px] shadow-xl">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="group"
                        >
                          <span className="text-xs whitespace-nowrap uppercase tracking-wide font-bold text-n-1 group-hover:text-primary transition-colors">
                            {t(subItem.labelKey)}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
      <LanguageSwitcher />
    </nav>
  );
};
