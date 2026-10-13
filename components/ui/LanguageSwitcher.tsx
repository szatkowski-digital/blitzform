"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Language {
  code: string;
  label: string;
  icon: string;
}

const LANGUAGES: readonly Language[] = [
  { code: "pl", label: "Polski", icon: "/pl_icon.svg" },
  { code: "en", label: "English", icon: "/en_icon.svg" },
] as const;

export const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const currentLanguage =
    LANGUAGES.find((lang) => lang.code === locale) ?? LANGUAGES[0];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setIsHovered(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleLanguageChange = useCallback(
    (code: string) => {
      setIsOpen(false);
      setIsHovered(false);
      if (code !== locale) {
        router.replace(pathname, { locale: code });
      }
    },
    [locale, pathname, router]
  );

  const showDropdown = isMobile ? isOpen : isHovered;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      className="relative text-sm inline-flex items-center"
    >
      <button
        type="button"
        aria-expanded={showDropdown}
        aria-haspopup="listbox"
        onClick={() => {
          if (isMobile) {
            setIsOpen((prev) => !prev);
          }
        }}
        className="group flex items-center gap-1.5 p-1 rounded-lg border-0 bg-transparent transition-all cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
      >
        <Image
          src={currentLanguage.icon}
          alt={currentLanguage.label}
          width={22}
          height={22}
          className="rounded-full object-cover shadow-sm transition-transform duration-200 group-hover:scale-105"
          priority
        />

        <motion.span
          animate={{
            opacity: showDropdown ? 1 : 0,
            x: showDropdown ? 0 : -3,
            rotate: showDropdown ? 180 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="text-zinc-400 group-hover:text-white shrink-0 pointer-events-none"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </motion.span>
      </button>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 sm:left-auto sm:right-0 pt-2 z-50 min-w-[155px]"
          >
            <div className="py-2.5 px-2 bg-n-8/95 backdrop-blur-md border border-n-1/10 rounded-xl flex flex-col gap-1 shadow-2xl">
              {LANGUAGES.map((lang) => {
                const isSelected = lang.code === locale;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-colors duration-150 cursor-pointer ${
                      isSelected
                        ? "text-white"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <Image
                      src={lang.icon}
                      alt=""
                      width={18}
                      height={18}
                      className="rounded-full object-cover shrink-0"
                    />
                    <span>{lang.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
