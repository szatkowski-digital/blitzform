"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { usePathname } from "next/navigation";

import AnimatedLogo from "./AnimatedLogo";
import MenuToggle from "./MenuToggle";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

export const Header = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [hiddenMobile, setHiddenMobile] = useState<boolean>(false);

  const pathname = usePathname();
  const { scrollY } = useScroll();

  const closeNav = useCallback(() => {
    setOpen(false);
  }, []);

  const toggleNav = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      if (hiddenMobile) setHiddenMobile(false);
      return;
    }

    if (open) {
      setHiddenMobile(false);
      return;
    }

    const previous = scrollY.getPrevious() ?? 0;
    const diff = latest - previous;

    if (latest > 100 && diff > 8) {
      setHiddenMobile(true);
    } else if (diff < -8) {
      setHiddenMobile(false);
    }
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setHiddenMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!open) return;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [open]);

  useEffect(() => {
    closeNav();
  }, [pathname, closeNav]);

  useEffect(() => {
    const handleScroll = () => {
      const isDesktop = window.innerWidth >= 1024;
      const isScrolled = isDesktop && window.scrollY > 100;

      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const headerStyle = scrolled
    ? "px-4 lg:px-32 xl:px-48 2xl:px-64 h-16 lg:h-20 lg:backdrop-blur-md lg:bg-n-8/40"
    : "px-4 lg:px-16 h-16 lg:h-28 border-transparent";

  return (
    <motion.header
      initial={{ opacity: 0, y: "0%" }}
      animate={{
        opacity: 1,
        y: hiddenMobile ? "-100%" : "0%",
      }}
      transition={{
        opacity: { duration: 0.4 },
        y: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] },
      }}
      className={`fixed top-0 left-0 w-full z-50 border-b border-n-4/10 bg-transparent transition-[padding,height,background-color] duration-300 max-lg:bg-n-8 ${headerStyle}`}
    >
      <div className="flex items-center justify-between h-full px-4">
        {/* Logo */}
        <AnimatedLogo scrolled={scrolled} />

        {/* Nawigacja Desktop */}
        <DesktopNav />

        {/* Przycisk Menu Mobilnego */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          className="lg:hidden text-white text-2xl absolute right-8 z-60"
          onClick={toggleNav}
        >
          <MenuToggle openNavigation={open} />
        </button>
      </div>

      {/* Nakładka Menu Mobilnego */}
      <MobileNav open={open} handleClick={closeNav} />
    </motion.header>
  );
};

export default Header;
