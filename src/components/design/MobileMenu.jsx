"use client";

import { motion, AnimatePresence } from "framer-motion";
import TextReveal from "./TextReveal";
import Link from "next/link";
import LanguageSwitcher from "../ui/LanguageSwithcer";
import { useTranslations } from "next-intl";

const linkVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1 } }),
};

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 0.6,
    y: 0,
    transition: { duration: 0.3 },
  },
};

const circleVariants = {
  hidden: {
    clipPath: "circle(0% at 110% 0%)",
  },
  visible: {
    clipPath: "circle(150% at 110% 0%)",
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
    },
  },
  exit: {
    clipPath: "circle(0% at 110% 0%)",
    transition: {
      duration: 0.35,
    },
  },
};

export const MobileMenu = ({ open, handleClick }) => {
  const t = useTranslations("common");
  const links = [
    { href: "/", label: t("navigation.home") },
    { href: "/about", label: t("navigation.about") },
    { href: "/contact", label: t("navigation.contact") },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-menu"
          variants={circleVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-primary/5 backdrop-blur-2xl text-white z-50"
        >
          <div className="absolute top-4 left-4">
            <LanguageSwitcher />
          </div>

          <div className="flex flex-col items-center justify-center min-h-screen gap-8 text-2xl">
            {links.map((link, index) => (
              <motion.div
                key={link.href}
                custom={index}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <Link href={link.href} onClick={handleClick}>
                  <TextReveal className="text-3xl">{link.label}</TextReveal>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="absolute bottom-8 w-full text-center text-sm text-gray-400"
            variants={footerVariants}
            initial="hidden"
            animate="visible"
          >
            <p>© {new Date().getFullYear()} BlitzForm</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
