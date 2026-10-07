"use client";

import { Link } from "@/i18n/navigation";
import { ShieldCheck, Mail, MapPin, Terminal } from "lucide-react";
import { useTranslations } from "next-intl";

export const Footer: React.FC = () => {
  const t = useTranslations("common.footer");

  return (
    <footer className="bg-black/60 text-zinc-400 text-xs py-14 px-4 sm:px-6 mt-16 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="font-display text-lg font-black text-white tracking-tight">
                BLITZ<span className="text-primary">FORM</span>
              </span>
              <span className="text-[11px] font-mono font-medium bg-zinc-900 border border-zinc-800 px-2.5 py-0.5 rounded-full text-zinc-400">
                {t("badge")}
              </span>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-md font-sans">
              {t("description")}
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
              <span className="inline-block w-2 h-2 rounded-full bg-[#8FA85B]" />
              <span>{t("status")}</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold text-zinc-100">
              {t("architectureTitle")}
            </h4>
            <ul className="space-y-2 font-sans text-xs sm:text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors block"
                >
                  {t("links.home")}
                </Link>
              </li>
              <li>
                <Link
                  scroll={true}
                  href="/offer#section-boxes"
                  className="hover:text-primary transition-colors block"
                >
                  {t("links.boxSystems")}
                </Link>
              </li>
              <li>
                <Link
                  scroll={true}
                  href="/offer#section-containers"
                  className="hover:text-[#98B364] transition-colors block"
                >
                  {t("links.containerFactories")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors block"
                >
                  {t("links.about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors block"
                >
                  {t("links.contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold text-zinc-100">
              {t("engineeringTitle")}
            </h4>
            <div className="space-y-2.5 text-zinc-400 font-sans text-xs sm:text-sm">
              <a
                href="mailto:office@blitzform3d.com"
                className="flex items-center gap-2 hover:text-white transition-colors text-zinc-200 font-semibold"
              >
                <Mail className="w-4 h-4 text-primary" />
                <span>office@blitzform3d.com</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-zinc-500" />
                <span>{t("location")}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-zinc-500" />
                <span>{t("standards")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-zinc-500" />
                <span>{t("support")}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-sans">
          <div>
            © {new Date().getFullYear()} {t("copyright")}
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-zinc-300 transition-colors cursor-pointer">
              {t("privacyPolicy")}
            </span>
            <span>•</span>
            <span className="hover:text-zinc-300 transition-colors cursor-pointer">
              {t("technicalDocs")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
