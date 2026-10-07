"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

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
  const containerRef = useRef<HTMLDivElement>(null);

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const currentLanguage =
    LANGUAGES.find((lang) => lang.code === locale) ?? LANGUAGES[0];

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleLanguageChange = useCallback(
    (code: string) => {
      setIsOpen(false);
      if (code !== locale) {
        router.replace(pathname, { locale: code });
      }
    },
    [locale, pathname, router]
  );

  return (
    <div ref={containerRef} className="relative text-sm">
      {/* Trigger */}
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between w-35 rounded-full border border-white/10 px-4 py-2 hover:border-white/60 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Image
            src={currentLanguage.icon}
            alt={`${currentLanguage.label} flag`}
            width={20}
            height={20}
            className="object-contain"
            priority
          />
          <span className="whitespace-nowrap">{currentLanguage.label}</span>
        </div>

        <svg
          aria-hidden="true"
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute right-0 mt-2 w-35 rounded-xl border border-white/10 bg-n-8/90 backdrop-blur-md shadow-xl overflow-hidden z-50"
        >
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              role="option"
              aria-selected={lang.code === locale}
              onClick={() => handleLanguageChange(lang.code)}
              className="flex items-center gap-3 w-full px-4 py-3 hover:bg-white/10 transition-colors text-left"
            >
              <Image
                src={lang.icon}
                alt={`${lang.label} flag`}
                width={20}
                height={20}
                className="object-contain"
              />
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
