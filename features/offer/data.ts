export const getHeroSectionData = (t: (key: string) => string) => ({
  badgeText: t("heroSection.badgeText"),
  title: t("heroSection.title"),
  subtitle: t("heroSection.subtitle"),
  links: [
    {
      id: "chest-systems-link",
      targetId: "section-boxes",
      label: t("heroSection.links.0.label"),
    },
    {
      id: "container-factories-link",
      targetId: "section-containers",
      label: t("heroSection.links.1.label"),
    },
  ],
});

export const getFeaturesData = (t: (key: string) => string) => ({
  boxes: {
    categoryNumber: t("featureAccordion.boxes.categoryNumber"),
    categoryTitle: t("featureAccordion.boxes.categoryTitle"),
    categoryDescription: t("featureAccordion.boxes.categoryDescription"),
    imageSrc: "/images/box_systems.avif",
    imageAlt: t("featureAccordion.boxes.imageAlt"),
    features: [
      {
        id: "case-kinetic",
        stepNumber: "01",
        title: t("featureAccordion.boxes.features.0.title"),
        summary: t("featureAccordion.boxes.features.0.summary"),
        description: t("featureAccordion.boxes.features.0.description"),
        tag: t("featureAccordion.boxes.features.0.tag"),
      },
      {
        id: "case-thermal",
        stepNumber: "02",
        title: t("featureAccordion.boxes.features.1.title"),
        summary: t("featureAccordion.boxes.features.1.summary"),
        description: t("featureAccordion.boxes.features.1.description"),
        tag: t("featureAccordion.boxes.features.1.tag"),
      },
      {
        id: "case-power",
        stepNumber: "03",
        title: t("featureAccordion.boxes.features.2.title"),
        summary: t("featureAccordion.boxes.features.2.summary"),
        description: t("featureAccordion.boxes.features.2.description"),
        tag: t("featureAccordion.boxes.features.2.tag"),
      },
      {
        id: "case-workstation",
        stepNumber: "04",
        title: t("featureAccordion.boxes.features.3.title"),
        summary: t("featureAccordion.boxes.features.3.summary"),
        description: t("featureAccordion.boxes.features.3.description"),
        tag: t("featureAccordion.boxes.features.3.tag"),
      },
      {
        id: "case-reverse",
        stepNumber: "05",
        title: t("featureAccordion.boxes.features.4.title"),
        summary: t("featureAccordion.boxes.features.4.summary"),
        description: t("featureAccordion.boxes.features.4.description"),
        tag: t("featureAccordion.boxes.features.4.tag"),
      },
    ],
  },
  containers: {
    categoryNumber: t("featureAccordion.containers.categoryNumber"),
    categoryTitle: t("featureAccordion.containers.categoryTitle"),
    categoryDescription: t("featureAccordion.containers.categoryDescription"),
    imageSrc: "/images/container_systems.avif",
    imageAlt: t("featureAccordion.containers.imageAlt"),
    features: [
      {
        id: "cont-park",
        stepNumber: "01",
        title: t("featureAccordion.containers.features.0.title"),
        summary: t("featureAccordion.containers.features.0.summary"),
        description: t("featureAccordion.containers.features.0.description"),
        tag: t("featureAccordion.containers.features.0.tag"),
      },
      {
        id: "cont-hvac",
        stepNumber: "02",
        title: t("featureAccordion.containers.features.1.title"),
        summary: t("featureAccordion.containers.features.1.summary"),
        description: t("featureAccordion.containers.features.1.description"),
        tag: t("featureAccordion.containers.features.1.tag"),
      },
      {
        id: "cont-post",
        stepNumber: "03",
        title: t("featureAccordion.containers.features.2.title"),
        summary: t("featureAccordion.containers.features.2.summary"),
        description: t("featureAccordion.containers.features.2.description"),
        tag: t("featureAccordion.containers.features.2.tag"),
      },
      {
        id: "cont-power",
        stepNumber: "04",
        title: t("featureAccordion.containers.features.3.title"),
        summary: t("featureAccordion.containers.features.3.summary"),
        description: t("featureAccordion.containers.features.3.description"),
        tag: t("featureAccordion.containers.features.3.tag"),
      },
      {
        id: "cont-cad",
        stepNumber: "05",
        title: t("featureAccordion.containers.features.4.title"),
        summary: t("featureAccordion.containers.features.4.summary"),
        description: t("featureAccordion.containers.features.4.description"),
        tag: t("featureAccordion.containers.features.4.tag"),
      },
    ],
  },
});

export const getBoxPackagesData = (t: (key: string) => string) => ({
  sectionBadge: t("boxPackages.sectionBadge"),
  sectionTitle: t("boxPackages.sectionTitle"),
  sectionDescription: t("boxPackages.sectionDescription"),
  recommendedBadgeMobile: t("boxPackages.recommendedBadgeMobile"),
  recommendedBadgeDesktop: t("boxPackages.recommendedBadgeDesktop"),
  selectButtonPrefix: t("boxPackages.selectButtonPrefix"),
  packages: [
    {
      id: "basic" as const,
      name: t("boxPackages.packages.basic.name"),
      badgeTag: t("boxPackages.packages.basic.badgeTag"),
      price: t("boxPackages.packages.basic.price"),
      priceShort: t("boxPackages.packages.basic.priceShort"),
      priceSubtext: t("boxPackages.packages.basic.priceSubtext"),
      description: t("boxPackages.packages.basic.description"),
      features: [
        t("boxPackages.packages.basic.features.0"),
        t("boxPackages.packages.basic.features.1"),
        t("boxPackages.packages.basic.features.2"),
        t("boxPackages.packages.basic.features.3"),
        t("boxPackages.packages.basic.features.4"),
        t("boxPackages.packages.basic.features.5"),
        t("boxPackages.packages.basic.features.6"),
        t("boxPackages.packages.basic.features.7"),
        t("boxPackages.packages.basic.features.8"),
      ],
    },
    {
      id: "pro" as const,
      name: t("boxPackages.packages.pro.name"),
      badgeTag: t("boxPackages.packages.pro.badgeTag"),
      price: t("boxPackages.packages.pro.price"),
      priceShort: t("boxPackages.packages.pro.priceShort"),
      priceSubtext: t("boxPackages.packages.pro.priceSubtext"),
      description: t("boxPackages.packages.pro.description"),
      features: [
        t("boxPackages.packages.pro.features.0"),
        t("boxPackages.packages.pro.features.1"),
        t("boxPackages.packages.pro.features.2"),
        t("boxPackages.packages.pro.features.3"),
        t("boxPackages.packages.pro.features.4"),
        t("boxPackages.packages.pro.features.5"),
        t("boxPackages.packages.pro.features.6"),
        t("boxPackages.packages.pro.features.7"),
        t("boxPackages.packages.pro.features.8"),
        t("boxPackages.packages.pro.features.9"),
      ],
      isRecommended: true,
    },
    {
      id: "advanced" as const,
      name: t("boxPackages.packages.advanced.name"),
      badgeTag: t("boxPackages.packages.advanced.badgeTag"),
      price: t("boxPackages.packages.advanced.price"),
      priceShort: t("boxPackages.packages.advanced.priceShort"),
      priceSubtext: t("boxPackages.packages.advanced.priceSubtext"),
      description: t("boxPackages.packages.advanced.description"),
      features: [
        t("boxPackages.packages.advanced.features.0"),
        t("boxPackages.packages.advanced.features.1"),
        t("boxPackages.packages.advanced.features.2"),
        t("boxPackages.packages.advanced.features.3"),
        t("boxPackages.packages.advanced.features.4"),
        t("boxPackages.packages.advanced.features.5"),
        t("boxPackages.packages.advanced.features.6"),
        t("boxPackages.packages.advanced.features.7"),
      ],
    },
  ],
});

export const getTrainingProgramsData = (t: (key: string) => string) => ({
  badgeText: t("trainingPrograms.badgeText"),
  title: t("trainingPrograms.title"),
  subtitle: t("trainingPrograms.subtitle"),
  programs: [
    {
      id: "basic-training",
      packageLabel: t("trainingPrograms.programs.0.packageLabel"),
      price: t("trainingPrograms.programs.0.price"),
      duration: t("trainingPrograms.programs.0.duration"),
      title: t("trainingPrograms.programs.0.title"),
      features: [t("trainingPrograms.programs.0.features.0")],
    },
    {
      id: "pro-training",
      packageLabel: t("trainingPrograms.programs.1.packageLabel"),
      price: t("trainingPrograms.programs.1.price"),
      duration: t("trainingPrograms.programs.1.duration"),
      title: t("trainingPrograms.programs.1.title"),
      features: [
        t("trainingPrograms.programs.1.features.0"),
        t("trainingPrograms.programs.1.features.1"),
      ],
    },
    {
      id: "advanced-training",
      packageLabel: t("trainingPrograms.programs.2.packageLabel"),
      price: t("trainingPrograms.programs.2.price"),
      duration: t("trainingPrograms.programs.2.duration"),
      title: t("trainingPrograms.programs.2.title"),
      features: [
        t("trainingPrograms.programs.2.features.0"),
        t("trainingPrograms.programs.2.features.1"),
        t("trainingPrograms.programs.2.features.2"),
        t("trainingPrograms.programs.2.features.3"),
      ],
    },
  ],
});

export const getContainerPricingData = (t: (key: string) => string) => ({
  badgeText: t("containerPricing.badgeText"),
  title: t("containerPricing.title"),
  subtitle: t("containerPricing.subtitle"),
  ctaText: t("containerPricing.ctaText"),
  steps: [
    {
      id: "audit",
      title: t("containerPricing.steps.0.title"),
      description: t("containerPricing.steps.0.description"),
    },
    {
      id: "delivery",
      title: t("containerPricing.steps.1.title"),
      description: t("containerPricing.steps.1.description"),
    },
    {
      id: "training",
      title: t("containerPricing.steps.2.title"),
      description: t("containerPricing.steps.2.description"),
    },
  ],
});

export const getSectionDividersData = (t: (key: string) => string) => ({
  divider1: {
    leftText: t("sectionDividers.d1.leftText"),
    centerText: t("sectionDividers.d1.centerText"),
    rightText: t("sectionDividers.d1.rightText"),
  },
  divider2: {
    leftText: t("sectionDividers.d2.leftText"),
    centerText: t("sectionDividers.d2.centerText"),
    rightText: t("sectionDividers.d2.rightText"),
  },
  divider3: {
    leftText: t("sectionDividers.d3.leftText"),
    centerText: t("sectionDividers.d3.centerText"),
    rightText: t("sectionDividers.d3.rightText"),
  },
});
