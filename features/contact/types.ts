import { Box, Container, Wrench, MessageSquare } from "lucide-react";

export type MainCategory = "boxes" | "containers" | "consultation";
export type BoxPackageId = "basic" | "pro" | "advanced" | null;

export interface FormData {
  name: string;
  organization: string;
  email: string;
  phone: string;
  message: string;
}

export const MAIN_CATEGORIES = [
  {
    id: "boxes" as const,
    title: "System Skrzyniowy",
    subtitle: "BASIC, PRO, ADVANCED",
    icon: Box,
  },
  {
    id: "containers" as const,
    title: "System Kontenerowy",
    subtitle: "Fabryka ISO",
    icon: Container,
  },
  {
    id: "consultation" as const,
    title: "Konsultacja Wdrożeniowa",
    subtitle: "Dobór technologii i audyt",
    icon: Wrench,
  },
];

export const BOX_SUB_OPTIONS = [
  {
    id: "basic" as const,
    name: "BASIC",
    price: "60 000 PLN",
  },
  {
    id: "pro" as const,
    name: "PRO",
    price: "105 000 PLN",
    recommended: true,
  },
  {
    id: "advanced" as const,
    name: "ADVANCED",
    price: "247 000 PLN",
  },
];
