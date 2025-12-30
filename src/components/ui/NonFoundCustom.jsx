"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import Link from "next/link";

const translations = {
  pl: {
    title: "Oops! Strona nie istnie",
    text: "Przepraszamy",
    back: "Strona główna",
  },
  en: {
    title: "OH NO! THIS PAGE DOESN&apos;T EXIST",
    text: "SORRY",
    back: "Go to homepage",
  },
};

const NotFoundCustom = () => {
  const { locale } = useParams();
  const t = translations[locale] ?? translations.en;

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="h1 text-9xl md:text-[200px] lg:text-[300px] xl:text-[400px] font-bold text-n-4">
        404
      </h1>
      <div>
        <p className="body-lg text-n-4">{t.title}</p>
      </div>
      <div className="flex flex-col">
        <h2 className="h2 mb-8">{t.text} ↓↓↓</h2>

        <Link
          href={`/${locale}`}
          className="rounded-xl bg-primary text-black px-6 py-3 text-sm hover:bg-primary-soft transition"
        >
          {t.back}
        </Link>
      </div>
    </motion.div>
  );
};

export default NotFoundCustom;
