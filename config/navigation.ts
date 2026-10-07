export interface SubItem {
  href: string;
  labelKey: string;
}

export interface NavItem {
  href: string;
  labelKey: string;
  subItems?: readonly SubItem[];
}

export const NAV_ITEMS: readonly NavItem[] = [
  {
    href: "/offer",
    labelKey: "navigation.offer",
    subItems: [
      { href: "/offer#section-boxes", labelKey: "navigation.boxSystems" },
      {
        href: "/offer#section-containers",
        labelKey: "navigation.containerFactories",
      },
    ],
  },
  { href: "/about", labelKey: "navigation.about" },
  { href: "/contact", labelKey: "navigation.contact" },
] as const;
