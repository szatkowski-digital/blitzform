import { ContactPage } from "@/features/contact";
import { getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return buildMetadata({ locale, namespace: "contact", path: "/contact" });
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <>
      <JsonLd
        title={t("seo.title")}
        description={t("seo.description")}
        locale={locale}
        path="/contact"
        type="ContactPage"
      />
      <ContactPage />
    </>
  );
}
