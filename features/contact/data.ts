import { Box, Container, Wrench } from "lucide-react";
import { MainCategory, BoxPackageId } from "./types";

export const getContactHeroData = (t: (key: string) => string) => ({
  badgeText: t("contactHero.badgeText"),
  title: t("contactHero.title"),
  subtitle: t("contactHero.subtitle"),
});

export const getContactFormContentData = (t: (key: string) => string) => ({
  successTitle: t("contactFormContent.successTitle"),
  successDescriptionPrefix: t("contactFormContent.successDescriptionPrefix"),
  successDescriptionSuffix: t("contactFormContent.successDescriptionSuffix"),
  successButtonText: t("contactFormContent.successButtonText"),
  nameLabel: t("contactFormContent.nameLabel"),
  namePlaceholder: t("contactFormContent.namePlaceholder"),
  organizationLabel: t("contactFormContent.organizationLabel"),
  organizationPlaceholder: t("contactFormContent.organizationPlaceholder"),
  emailLabel: t("contactFormContent.emailLabel"),
  emailPlaceholder: t("contactFormContent.emailPlaceholder"),
  phoneLabel: t("contactFormContent.phoneLabel"),
  phonePlaceholder: t("contactFormContent.phonePlaceholder"),
  messageLabel: t("contactFormContent.messageLabel"),
  messagePlaceholder: t("contactFormContent.messagePlaceholder"),
  submittingText: t("contactFormContent.submittingText"),
  submitButtonText: t("contactFormContent.submitButtonText"),
  defaultError: t("contactFormContent.defaultError"),
  connectionError: t("contactFormContent.connectionError"),
});

export const getContactSidebarData = (t: (key: string) => string) => ({
  badgeText: t("contactSidebar.badgeText"),
  companyName: t("contactSidebar.companyName"),
  emailLabel: t("contactSidebar.emailLabel"),
  emailValue: t("contactSidebar.emailValue"),
  locationLabel: t("contactSidebar.locationLabel"),
  locationValue: t("contactSidebar.locationValue"),
  responseTimeLabel: t("contactSidebar.responseTimeLabel"),
  responseTimeValue: t("contactSidebar.responseTimeValue"),
});

export const getCategorySelectorData = (t: (key: string) => string) => ({
  step1Label: t("categorySelector.step1Label"),
  step2Label: t("categorySelector.step2Label"),
  categories: [
    {
      id: "boxes" as MainCategory,
      title: t("categorySelector.categories.boxes.title"),
      subtitle: t("categorySelector.categories.boxes.subtitle"),
    },
    {
      id: "containers" as MainCategory,
      title: t("categorySelector.categories.containers.title"),
      subtitle: t("categorySelector.categories.containers.subtitle"),
    },
    {
      id: "consultation" as MainCategory,
      title: t("categorySelector.categories.consultation.title"),
      subtitle: t("categorySelector.categories.consultation.subtitle"),
    },
  ],
  boxSubOptions: [
    {
      id: "basic" as BoxPackageId,
      name: t("categorySelector.boxSubOptions.basic.name"),
      price: t("categorySelector.boxSubOptions.basic.price"),
    },
    {
      id: "pro" as BoxPackageId,
      name: t("categorySelector.boxSubOptions.pro.name"),
      price: t("categorySelector.boxSubOptions.pro.price"),
    },
    {
      id: "advanced" as BoxPackageId,
      name: t("categorySelector.boxSubOptions.advanced.name"),
      price: t("categorySelector.boxSubOptions.advanced.price"),
    },
  ],
});
