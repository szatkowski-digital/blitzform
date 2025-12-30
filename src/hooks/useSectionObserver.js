"use client";

import { useEffect, useState } from "react";

export default function useSectionObserver() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = [
      { id: "hero", section: "hero" },
      { id: "features", section: "features" },
      { id: "tech", section: "tech" },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = sections.find((s) => s.id === entry.target.id);
            if (match) {
              setActiveSection(match.section);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return activeSection;
}
