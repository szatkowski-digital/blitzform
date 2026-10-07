import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

interface SEOProps {
  locale: string;
  namespace: string;
  path?: string; // np. "/o-nas", "/kontakt" lub "" dla strony głównej
  ogImage?: string;
}

const BASE_URL = "https://blitzform3d.com";

export async function buildMetadata({
  locale,
  namespace,
  path = "",
  ogImage = "/og/default.jpg",
}: SEOProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });

  const cleanPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";

  const plUrl = `${BASE_URL}${cleanPath}`;
  const enUrl = `${BASE_URL}/en${cleanPath}`;
  const currentUrl = locale === "pl" ? plUrl : enUrl;

  const ogLocale = locale === "pl" ? "pl_PL" : "en_US";

  const title = t("seo.title");
  const description = t("seo.description");
  const image = t.has("seo.ogImage") ? t("seo.ogImage") : ogImage;

  return {
    metadataBase: new URL(BASE_URL),
    title,
    description,
    keywords: t.has("seo.keywords") ? t("seo.keywords") : undefined,

    alternates: {
      canonical: currentUrl,
      languages: {
        pl: plUrl,
        en: enUrl,
        "x-default": plUrl,
      },
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    openGraph: {
      title: t.has("seo.ogTitle") ? t("seo.ogTitle") : title,
      description: t.has("seo.ogDescription")
        ? t("seo.ogDescription")
        : description,
      url: currentUrl,
      siteName: "BlitzForm",
      locale: ogLocale,
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: t.has("seo.ogAlt") ? t("seo.ogAlt") : title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
