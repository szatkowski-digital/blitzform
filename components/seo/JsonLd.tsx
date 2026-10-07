interface JsonLdProps {
  title: string;
  description: string;
  locale: string;
  path?: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "ItemPage";
}

export function JsonLd({
  title,
  description,
  locale,
  path = "",
  type = "WebPage",
}: JsonLdProps) {
  const cleanPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  const fullUrl =
    locale === "pl"
      ? `https://blitzform3d.com${cleanPath}`
      : `https://blitzform3d.com/en${cleanPath}`;

  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://blitzform3d.com/#organization",
        name: "BlitzForm",
        url: "https://blitzform3d.com",
        logo: {
          "@type": "ImageObject",
          url: "https://blitzform3d.com/logo.png",
        },
        description:
          "Mobile Additive Manufacturing Systems for Tactical and Industrial Environments",
      },
      {
        "@type": type,
        "@id": `${fullUrl}/#webpage`,
        url: fullUrl,
        name: title,
        description: description,
        inLanguage: locale === "pl" ? "pl-PL" : "en-US",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://blitzform3d.com/#website",
          name: "BlitzForm",
          url: "https://blitzform3d.com",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />
  );
}
