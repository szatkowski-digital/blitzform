"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/Buttons";
import Reveal from "../ui/Reveal";
import { useTranslations } from "next-intl";

export const CallToAction = () => {
  const t = useTranslations("home");

  return (
    <section className="relative py-16 lg:py-32">
      <Reveal className="container flex flex-col items-center text-center justify-center gap-3 lg:gap-6">
        <Image
          src="/images/filament3d.webp"
          alt="Mobilna Fabryka Druku 3D"
          className="w-20 object-contain"
          width={470}
          height={470}
        />

        <h2 className="h2 font-light">{t("callToAction.header")}</h2>

        <p className="body-lg text-primary-dark">
          {t("callToAction.description")}
        </p>

        <Link href="/contact">
          <Button>{t("callToAction.button")}</Button>
        </Link>
      </Reveal>
    </section>
  );
};

export default CallToAction;
