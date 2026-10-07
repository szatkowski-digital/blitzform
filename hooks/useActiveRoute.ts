import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { NavItem } from "@/config/navigation";

export const useActiveRoute = () => {
  const rawPathname = usePathname();

  const pathname = useMemo(() => {
    return rawPathname?.replace(/^\/(en|pl)/, "") || "/";
  }, [rawPathname]);

  const isLinkActive = (item: NavItem): boolean => {
    return (
      pathname === item.href ||
      Boolean(item.subItems?.some((sub) => pathname === sub.href))
    );
  };

  const isPathActive = (href: string): boolean => pathname === href;

  return { pathname, isLinkActive, isPathActive };
};
