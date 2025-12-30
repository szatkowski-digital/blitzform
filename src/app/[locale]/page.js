import { getTranslations } from "next-intl/server";
import HomeClient from "./HomeClient";

export default function Home() {
  return <HomeClient />;
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });

  const baseUrl = "https://blitzform3d.com";
  const ogLocale = locale === "pl" ? "pl_PL" : "en_US";

  return {
    metadataBase: new URL(baseUrl),
    title: t("seo.home.title"),
    description: t("seo.home.description"),

    alternates: {
      canonical: `/${locale}`,
      languages: {
        pl: "/pl",
        en: "/en",
      },
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title: t("seo.home.title"),
      description: t("seo.home.description"),
      url: `/${locale}`,
      siteName: "BlitzForm",
      locale: ogLocale,
      type: "website",
      images: [
        {
          url: "/og/home.jpg",
          width: 1200,
          height: 630,
          alt: "BlitzForm – Mobile Manufacturing Platform",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: t("seo.home.title"),
      description: t("seo.home.description"),
      images: ["/og/home.jpg"],
    },
  };
}
