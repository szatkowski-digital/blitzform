import { getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/seo/JsonLd";
import { HomePage } from "@/features/home";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <>
      <JsonLd
        title={t("seo.title")}
        description={t("seo.description")}
        locale={locale}
        path=""
        type="WebPage"
      />
      <HomePage />
    </>
  );
}
