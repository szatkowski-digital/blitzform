export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://blitzform3d.com/#organization",
    name: "BlitzForm",
    url: "https://blitzform3d.com",
    logo: "https://blitzform3d.com/logo.png",
    description:
      "BlitzForm delivers secure, cloud-free mobile manufacturing systems for on-site production.",
    email: "office@blitzform3d.com",
    telephone: "+48-518-866-569",
    address: {
      "@type": "PostalAddress",
      addressCountry: "PL",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Business inquiries",
      email: "office@blitzform3d.com",
      telephone: "+48-518-866-569",
      availableLanguage: ["Polish", "English"],
    },
    sameAs: [
      // dodaj później LinkedIn / X / GitHub jeśli będą
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
