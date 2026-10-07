import { getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { HomePage } from "@/features/home";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return buildMetadata({ locale, namespace: "home", path: "" });
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
