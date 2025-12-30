"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

import TextReveal from "@/components/design/TextReveal";
import MobileMenu from "@/components/design/MobileMenu";
import MenuSvg from "@/components/design/MenuSvg";
import LanguageSwitcher from "./LanguageSwithcer";
import { LogoAnimation } from "../design/LogoAnimation";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const t = useTranslations("common");
  const pathname = usePathname();

  const toggleNav = () => {
    if (open) {
      setOpen(false);
      enablePageScroll();
    } else {
      setOpen(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!open) return;
    enablePageScroll();
    setOpen(false);
  };

  useEffect(() => {
    enablePageScroll();
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 175);
    };

    onScroll();

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 left-0 w-full z-50 border-n-4/10 border-b bg-transparent transition-all duration-300 max-lg:bg-n-8
${
  scrolled
    ? "px-4 lg:px-32 xl:px-48 2xl:px-64 h-18 lg:h-20 lg:backdrop-blur-md"
    : "px-4 lg:px-16 h-16 lg:h-28 border-transparent"
}`}
    >
      <div className={`flex items-center justify-between h-full px-4`}>
        {/* Logo */}
        <LogoAnimation scrolled={scrolled} />

        {/* Desktop Navigation */}
        <nav className={`hidden lg:flex flex-1 text-n-1`}>
          <div
            className={`flex gap-16 xl:gap-32 items-center w-full justify-center`}
          >
            <Link href="/">
              <TextReveal className="text-sm">
                {t("navigation.home")}
              </TextReveal>
            </Link>
            <Link href="/about">
              <TextReveal className="text-sm">
                {t("navigation.about")}
              </TextReveal>
            </Link>
            <Link href="/contact">
              <TextReveal className="text-sm">
                {t("navigation.contact")}
              </TextReveal>
            </Link>
          </div>

          <LanguageSwitcher />
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white text-2xl absolute right-8 z-60"
          onClick={toggleNav}
        >
          <MenuSvg openNavigation={open} />
        </button>

        {/* Mobile Menu */}
      </div>

      <MobileMenu open={open} handleClick={handleClick} />
    </motion.header>
  );
};

export default Header;
