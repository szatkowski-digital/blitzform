import { OfferPage } from "@/features/offer";
import { getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return buildMetadata({ locale, namespace: "offer", path: "/offer" });
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "offer" });

  return (
    <>
      <JsonLd
        title={t("seo.title")}
        description={t("seo.description")}
        locale={locale}
        path="/offer"
        type="ItemPage"
      />
      <OfferPage />
    </>
  );
}
