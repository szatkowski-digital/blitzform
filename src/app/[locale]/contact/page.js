import ContactForm from "@/components/sections/ContactForm";
import { getTranslations } from "next-intl/server";

export const Contact = () => {
  return (
    <div className="relative w-full min-h-screen md:min-h-dvh flex flex-col items-center justify-start pt-16 lg:pt-28">
      <ContactForm />
    </div>
  );
};

export default Contact;

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });

  const baseUrl = "https://blitzform3d.com";
  const ogLocale = locale === "pl" ? "pl_PL" : "en_US";

  return {
    metadataBase: new URL(baseUrl),
    title: t("seo.contact.title"),
    description: t("seo.contact.description"),

    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        pl: "/pl/contact",
        en: "/en/contact",
      },
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title: t("seo.contact.title"),
      description: t("seo.contact.description"),
      url: `/${locale}/contact`,
      siteName: "BlitzForm",
      locale: ogLocale,
      type: "website",
      images: [
        {
          url: "/og/contact.jpg",
          width: 1200,
          height: 630,
          alt: "Contact BlitzForm",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: t("seo.contact.title"),
      description: t("seo.contact.description"),
      images: ["/og/contact.jpg"],
    },
  };
}
