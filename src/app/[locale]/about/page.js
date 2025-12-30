import { Button } from "@/components/ui/Buttons";
import { AboutCircles } from "@/components/design/AboutCircles";
import MarqueeBanner from "@/components/design/MarqueeBanner";
import Reveal from "@/components/ui/Reveal";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Team from "@/components/sections/Team";
import { getTranslations } from "next-intl/server";

export const About = () => {
  const t = useTranslations("about");

  return (
    <div className="relative w-full min-h-screen md:min-h-dvh flex flex-col items-center justify-start pt-16 lg:pt-28">
      <div className="space-y-16 lg:space-y-32 w-full pb-16 lg:pb-32">
        <GetToKnow />

        <Team />

        <div className="w-full border-b border-n-3" />

        <Vision />
      </div>

      <MarqueeBanner text={t("vision.banner")} />
    </div>
  );
};

export default About;

const GetToKnow = () => {
  const t = useTranslations("about");

  return (
    <section className="container space-y-32 py-20">
      <h2 className="h1">{t("hero.header")}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start justify-center">
        <div className="flex justify-center lg:justify-start">
          <AboutCircles />
        </div>

        <div className="flex flex-col gap-6">
          <h3 className="h2 max-w-2xl">{t("hero.title")}</h3>
          <p className="body-xl max-w-xl leading-relaxed">
            {t("hero.description")}
          </p>
          <div className="flex gap-6">
            <Link href="/contact">
              <Button>{t("hero.button")}</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const Vision = () => {
  const t = useTranslations("about");

  return (
    <Reveal>
      <section className="container grid grid-cols-5 items-start gap-6">
        <h2 className="col-start-1 col-end-3 h1 text-end -mr-32">
          {t("vision.title")}
        </h2>
        <p className="row-start-2 col-start-3 col-end-5 body-xl leading-relaxed -ml-32">
          {t("vision.description")}
        </p>
      </section>
    </Reveal>
  );
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });

  const baseUrl = "https://blitzform3d.com";
  const ogLocale = locale === "pl" ? "pl_PL" : "en_US";

  return {
    metadataBase: new URL(baseUrl),
    title: t("seo.about.title"),
    description: t("seo.about.description"),

    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        pl: "/pl/about",
        en: "/en/about",
      },
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title: t("seo.about.title"),
      description: t("seo.about.description"),
      url: `/${locale}/about`,
      siteName: "BlitzForm",
      locale: ogLocale,
      type: "website",
      images: [
        {
          url: "/og/about.jpg",
          width: 1200,
          height: 630,
          alt: "BlitzForm Team and Vision",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: t("seo.about.title"),
      description: t("seo.about.description"),
      images: ["/og/about.jpg"],
    },
  };
}
