"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function PrivacyPolicyPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations("privacy");
  const sections = t.raw("sections");

  const sectionRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY + 10;
      const newIndex = sectionRefs.current.findIndex((section, idx) => {
        if (!section) return false;
        const offsetTop = section.offsetTop;
        const nextOffsetTop =
          sectionRefs.current[idx + 1]?.offsetTop || Infinity;
        return scrollTop >= offsetTop && scrollTop < nextOffsetTop;
      });
      if (newIndex !== -1 && newIndex !== activeIndex) setActiveIndex(newIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeIndex]);

  return (
    <main className="min-h-screen mt-16 lg:mt-28 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="lg:py-20"
      >
        <h1 className="h2 py-8 lg:py-16 text-center">{t("title")}</h1>

        {/* Mobile Table of Contents */}
        <div className="lg:hidden mb-6">
          <div
            className="w-full flex items-center justify-between cursor-pointer bg-primary/20 px-6 py-4"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className="font-semibold">Table of Contents</span>
            <span className="text-lg">{mobileOpen ? "▲" : "▼"}</span>
          </div>

          {mobileOpen && (
            <ul className="py-6 px-3 border-b border-n-3 bg-primary/10">
              {sections.map((section, idx) => (
                <li key={idx}>
                  <a
                    href={`#section-${idx}`}
                    className="block px-4 py-2 text-white hover:bg-neutral-700"
                    onClick={() => setMobileOpen(false)}
                  >
                    {section.title.replace(/^\d+\.\s*/, "")}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex gap-32 container px-6">
          {/* Desktop sticky */}
          <nav className="hidden lg:block w-1/4 sticky top-28 self-start">
            <ul className="space-y-3 relative">
              {sections.map((section, idx) => (
                <li key={idx} className="relative pl-6">
                  <span
                    className={`absolute left-0 top-1/2 w-2 h-2 rounded-full transform -translate-y-1/2 transition-colors ${
                      idx === activeIndex ? "bg-primary" : "bg-white/30"
                    }`}
                  ></span>
                  <a
                    href={`#section-${idx}`}
                    className={`${
                      idx === activeIndex
                        ? "font-semibold"
                        : "font-normal text-white/80"
                    }`}
                  >
                    {section.title.replace(/^\d+\.\s*/, "")}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Main Content */}
          <div className="flex-1 space-y-20">
            {sections.map((section, idx) => (
              <div
                key={idx}
                id={`section-${idx}`}
                ref={(el) => (sectionRefs.current[idx] = el)}
                className="mb-12 scroll-mt-28"
              >
                <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
                <ol className="list-decimal list-inside space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i}>
                      <span>{item.text}</span>
                      {item.subItems && (
                        <ul className="ml-6 list-disc space-y-1">
                          {item.subItems.map((sub, j) => {
                            if (typeof sub === "string")
                              return <li key={j}>{sub}</li>;
                            if (sub.text && sub.url)
                              return (
                                <li key={j}>
                                  <a
                                    href={sub.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline hover:text-white"
                                  >
                                    {sub.text}
                                  </a>
                                </li>
                              );
                            return null;
                          })}
                        </ul>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </main>
  );
}
