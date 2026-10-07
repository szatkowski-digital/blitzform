export const getHeroData = (t: (key: string) => string) => ({
  badge: t("hero.badge"),
  titleLine1: t("hero.titleLine1"),
  titleGradient: t("hero.titleGradient"),
  description: t("hero.description"),
  primaryCta: t("hero.primaryCta"),
  secondaryCta: t("hero.secondaryCta"),
});

export const getProductTeasersData = (t: (key: string) => string) => ({
  badge: t("productTeasers.badge"),
  title: t("productTeasers.title"),
  description: t("productTeasers.description"),
  cases: {
    badge: t("productTeasers.cases.badge"),
    priceBadge: t("productTeasers.cases.priceBadge"),
    category: t("productTeasers.cases.category"),
    title: t("productTeasers.cases.title"),
    description: t("productTeasers.cases.description"),
    features: [
      t("productTeasers.cases.features.0"),
      t("productTeasers.cases.features.1"),
      t("productTeasers.cases.features.2"),
    ],
    cta: t("productTeasers.cases.cta"),
  },
  containers: {
    badge: t("productTeasers.containers.badge"),
    priceBadge: t("productTeasers.containers.priceBadge"),
    category: t("productTeasers.containers.category"),
    title: t("productTeasers.containers.title"),
    description: t("productTeasers.containers.description"),
    features: [
      t("productTeasers.containers.features.0"),
      t("productTeasers.containers.features.1"),
      t("productTeasers.containers.features.2"),
    ],
    cta: t("productTeasers.containers.cta"),
  },
});

export const getFeaturesGridData = (t: (key: string) => string) => ({
  features: [
    {
      title: t("featuresGrid.items.0.title"),
      desc: t("featuresGrid.items.0.desc"),
    },
    {
      title: t("featuresGrid.items.1.title"),
      desc: t("featuresGrid.items.1.desc"),
    },
    {
      title: t("featuresGrid.items.2.title"),
      desc: t("featuresGrid.items.2.desc"),
    },
    {
      title: t("featuresGrid.items.3.title"),
      desc: t("featuresGrid.items.3.desc"),
    },
    {
      title: t("featuresGrid.items.4.title"),
      desc: t("featuresGrid.items.4.desc"),
    },
    {
      title: t("featuresGrid.items.5.title"),
      desc: t("featuresGrid.items.5.desc"),
    },
    {
      title: t("featuresGrid.items.6.title"),
      desc: t("featuresGrid.items.6.desc"),
    },
    {
      title: t("featuresGrid.items.7.title"),
      desc: t("featuresGrid.items.7.desc"),
    },
  ],
});

export const getBlitzFormDepotData = (t: (key: string) => string) => ({
  badge: t("blitzFormDepot.badge"),
  title: t("blitzFormDepot.title"),
  description: t("blitzFormDepot.description"),
  cta: t("blitzFormDepot.cta"),
  pillars: [
    {
      title: t("blitzFormDepot.pillars.0.title"),
      desc: t("blitzFormDepot.pillars.0.desc"),
    },
    {
      title: t("blitzFormDepot.pillars.1.title"),
      desc: t("blitzFormDepot.pillars.1.desc"),
    },
    {
      title: t("blitzFormDepot.pillars.2.title"),
      desc: t("blitzFormDepot.pillars.2.desc"),
    },
  ],
});
