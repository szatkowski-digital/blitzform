export const getAboutHeroData = (t: (key: string) => string) => ({
  badge: t("aboutHero.badge"),
  titleLine1: t("aboutHero.titleLine1"),
  titleGradient: t("aboutHero.titleGradient"),
  description: t("aboutHero.description"),
  metrics: [
    {
      id: t("aboutHero.metrics.0.id"),
      value: t("aboutHero.metrics.0.value"),
      title: t("aboutHero.metrics.0.title"),
      desc: t("aboutHero.metrics.0.desc"),
      highlight: true,
    },
    {
      id: t("aboutHero.metrics.1.id"),
      value: t("aboutHero.metrics.1.value"),
      title: t("aboutHero.metrics.1.title"),
      desc: t("aboutHero.metrics.1.desc"),
      highlight: false,
    },
    {
      id: t("aboutHero.metrics.2.id"),
      value: t("aboutHero.metrics.2.value"),
      title: t("aboutHero.metrics.2.title"),
      desc: t("aboutHero.metrics.2.desc"),
      highlight: true,
    },
  ],
});

export const getAboutManifestData = (t: (key: string) => string) => ({
  badge: t("aboutManifest.badge"),
  location: t("aboutManifest.location"),
  country: t("aboutManifest.country"),
  title: t("aboutManifest.title"),
  paragraph1: t("aboutManifest.paragraph1"),
  paragraph2HighlightBefore: t("aboutManifest.paragraph2HighlightBefore"),
  paragraph2Strong: t("aboutManifest.paragraph2Strong"),
  paragraph2HighlightAfter: t("aboutManifest.paragraph2HighlightAfter"),
  quoteText: t("aboutManifest.quoteText"),
  quoteAuthor: t("aboutManifest.quoteAuthor"),
  sectorsTitle: t("aboutManifest.sectorsTitle"),
  sectors: [
    {
      title: t("aboutManifest.sectors.0.title"),
      desc: t("aboutManifest.sectors.0.desc"),
    },
    {
      title: t("aboutManifest.sectors.1.title"),
      desc: t("aboutManifest.sectors.1.desc"),
    },
    {
      title: t("aboutManifest.sectors.2.title"),
      desc: t("aboutManifest.sectors.2.desc"),
    },
    {
      title: t("aboutManifest.sectors.3.title"),
      desc: t("aboutManifest.sectors.3.desc"),
    },
  ],
  teamMembers: [
    {
      id: "1",
      name: "Dawid Tomica",
      role: "Produkcja i Inżynieria",
      bio: "Founder",
      avatarUrl: "/images/about/dawid_t.avif",
    },
    {
      id: "2",
      name: "Bartosz Kuśmierek",
      role: "Inżynieria i Operacje",
      bio: "Founding Partner",
      avatarUrl: "/images/about/bartosz_k.avif",
    },
    {
      id: "3",
      name: "Paweł Szatkowski",
      role: "Systemy i Automatyzacja",
      bio: "Founding Partner",
      avatarUrl: "/images/about/pawel_s.avif",
    },
  ],
});

export const getAboutCtaData = (t: (key: string) => string) => ({
  badge: t("aboutCta.badge"),
  title: t("aboutCta.title"),
  description: t("aboutCta.description"),
  primaryCta: t("aboutCta.primaryCta"),
  secondaryCta: t("aboutCta.secondaryCta"),
});
