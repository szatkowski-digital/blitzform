"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { MainCategory, BoxPackageId, FormData } from "../types";
import { CheckCircle2, Send, Loader2 } from "lucide-react";
import {
  CategorySelector,
  CategoryOption,
  BoxSubOption,
} from "./CategorySelector";
import { sendEmail } from "../sendEmail";

export interface ContactFormContentProps {
  successTitle: string;
  successDescriptionPrefix: string;
  successDescriptionSuffix: string;
  successButtonText: string;
  nameLabel: string;
  namePlaceholder: string;
  organizationLabel: string;
  organizationPlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  submittingText: string;
  submitButtonText: string;
  defaultError: string;
  connectionError: string;

  step1Label: string;
  step2Label: string;
  categories: CategoryOption[];
  boxSubOptions: BoxSubOption[];
}

export const ContactFormContent: React.FC<ContactFormContentProps> = ({
  successTitle,
  successDescriptionPrefix,
  successDescriptionSuffix,
  successButtonText,
  nameLabel,
  namePlaceholder,
  organizationLabel,
  organizationPlaceholder,
  emailLabel,
  emailPlaceholder,
  phoneLabel,
  phonePlaceholder,
  messageLabel,
  messagePlaceholder,
  submittingText,
  submitButtonText,
  defaultError,
  connectionError,
  step1Label,
  step2Label,
  categories,
  boxSubOptions,
}) => {
  const searchParams = useSearchParams();

  // Stany formularza
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [mainCategory, setMainCategory] = useState<MainCategory | null>(null);
  const [selectedBoxPackage, setSelectedBoxPackage] =
    useState<BoxPackageId>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Honeypot (pułapka na boty)
  const [honeypot, setHoneypot] = useState("");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    organization: "",
    email: "",
    phone: "",
    message: "",
  });

  // Ustawienie kategorii z query stringów URL
  useEffect(() => {
    const categoryParam = searchParams.get("category") as MainCategory | null;
    const packageParam = searchParams.get("packageId") as BoxPackageId | null;

    if (categoryParam) {
      setMainCategory(categoryParam);
    } else if (
      packageParam &&
      ["basic", "pro", "advanced"].includes(packageParam)
    ) {
      setMainCategory("boxes" as MainCategory);
    } else {
      setMainCategory("consultation" as MainCategory);
    }

    if (packageParam && ["basic", "pro", "advanced"].includes(packageParam)) {
      setSelectedBoxPackage(packageParam);
    }
  }, [searchParams]);

  // Obsługa zmian w inputach
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Resetowanie błędu konkretnego pola po wpisaniu wartości
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    if (submitError) setSubmitError(null);
  };

  // Walidacja formularza na koncie klienta
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    const trimmedName = formData.name.trim();
    const trimmedOrg = formData.organization.trim();
    const trimmedEmail = formData.email.trim();

    if (!trimmedName) {
      errors.name = "Proszę podać imię i nazwisko.";
    } else if (trimmedName.length < 2) {
      errors.name = "Imię i nazwisko musi mieć co najmniej 2 znaki.";
    }

    if (!trimmedOrg) {
      errors.organization = "Proszę podać nazwę firmy lub organizacji.";
    }

    if (!trimmedEmail) {
      errors.email = "Proszę podać adres e-mail.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        errors.email = "Wprowadź prawidłowy adres e-mail.";
      }
    }

    if (formData.phone && formData.phone.trim().length > 30) {
      errors.phone = "Numer telefonu jest za długi.";
    }

    if (formData.message && formData.message.length > 3000) {
      errors.message = "Treść wiadomości nie może przekraczać 3000 znaków.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ochrona przed wielokrotnym kliknięciem przycisku
    if (isSubmitting) return;

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await sendEmail({
        name: formData.name.trim(),
        organization: formData.organization.trim(),
        email: formData.email.trim(),
        phone: formData.phone?.trim(),
        message: formData.message?.trim(),
        mainCategory: mainCategory,
        selectedBoxPackage: selectedBoxPackage,
        honeypot: honeypot,
      });

      if (response.success) {
        setIsSubmitted(true);
      } else {
        setSubmitError(response.error || defaultError);
      }
    } catch (error) {
      console.error("Client submission error:", error);
      setSubmitError(connectionError);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="w-14 h-14 rounded-full bg-zinc-800 text-primary flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        </div>
        <h3 className="font-display text-2xl font-extrabold text-white">
          {successTitle}
        </h3>
        <p className="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed font-sans">
          {successDescriptionPrefix}{" "}
          <strong className="text-white">
            {formData.email || "office@blitzform3d.com"}
          </strong>{" "}
          {successDescriptionSuffix}
        </p>
        <button
          type="button"
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              name: "",
              organization: "",
              email: "",
              phone: "",
              message: "",
            });
            setFieldErrors({});
            setSubmitError(null);
            setMainCategory("consultation" as MainCategory);
            setSelectedBoxPackage(null);
          }}
          className="mt-4 px-6 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-display font-semibold text-xs transition-colors cursor-pointer"
        >
          {successButtonText}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6 relative z-10"
    >
      {/* UKRYTE POLE HONEYPOT (Wyłapywanie botów) */}
      <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
        <input
          type="text"
          name="b_website"
          tabIndex={-1}
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          autoComplete="off"
        />
      </div>

      <CategorySelector
        mainCategory={mainCategory}
        onSelectMainCategory={setMainCategory}
        selectedBoxPackage={selectedBoxPackage}
        onSelectBoxPackage={setSelectedBoxPackage}
        step1Label={step1Label}
        step2Label={step2Label}
        categories={categories}
        boxSubOptions={boxSubOptions}
      />

      {/* Komunikat o ogólnym błędzie po wysyłce */}
      {submitError && (
        <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-800/80 text-red-300 text-xs font-sans leading-relaxed">
          {submitError}
        </div>
      )}

      {/* Pola formularza */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-sans font-semibold text-zinc-200 mb-1.5">
            {nameLabel} *
          </label>
          <input
            name="name"
            type="text"
            required
            maxLength={100}
            value={formData.name}
            onChange={handleChange}
            placeholder={namePlaceholder}
            disabled={isSubmitting}
            className={`w-full px-4 py-3 rounded-xl bg-zinc-900/80 text-white text-sm focus:outline-none focus:bg-zinc-900 transition-all placeholder:text-zinc-500 border ${
              fieldErrors.name
                ? "border-red-500 focus:border-red-500"
                : "border-transparent focus:border-zinc-700"
            } disabled:opacity-50`}
          />
          {fieldErrors.name && (
            <p className="text-red-400 text-[11px] mt-1 font-sans">
              {fieldErrors.name}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-sans font-semibold text-zinc-200 mb-1.5">
            {organizationLabel} *
          </label>
          <input
            name="organization"
            type="text"
            required
            maxLength={100}
            value={formData.organization}
            onChange={handleChange}
            placeholder={organizationPlaceholder}
            disabled={isSubmitting}
            className={`w-full px-4 py-3 rounded-xl bg-zinc-900/80 text-white text-sm focus:outline-none focus:bg-zinc-900 transition-all placeholder:text-zinc-500 border ${
              fieldErrors.organization
                ? "border-red-500 focus:border-red-500"
                : "border-transparent focus:border-zinc-700"
            } disabled:opacity-50`}
          />
          {fieldErrors.organization && (
            <p className="text-red-400 text-[11px] mt-1 font-sans">
              {fieldErrors.organization}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-sans font-semibold text-zinc-200 mb-1.5">
            {emailLabel} *
          </label>
          <input
            name="email"
            type="email"
            required
            maxLength={100}
            value={formData.email}
            onChange={handleChange}
            placeholder={emailPlaceholder}
            disabled={isSubmitting}
            className={`w-full px-4 py-3 rounded-xl bg-zinc-900/80 text-white text-sm focus:outline-none focus:bg-zinc-900 transition-all placeholder:text-zinc-500 border ${
              fieldErrors.email
                ? "border-red-500 focus:border-red-500"
                : "border-transparent focus:border-zinc-700"
            } disabled:opacity-50`}
          />
          {fieldErrors.email && (
            <p className="text-red-400 text-[11px] mt-1 font-sans">
              {fieldErrors.email}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-sans font-semibold text-zinc-200 mb-1.5">
            {phoneLabel}
          </label>
          <input
            name="phone"
            type="tel"
            maxLength={30}
            value={formData.phone}
            onChange={handleChange}
            placeholder={phonePlaceholder}
            disabled={isSubmitting}
            className={`w-full px-4 py-3 rounded-xl bg-zinc-900/80 text-white text-sm focus:outline-none focus:bg-zinc-900 transition-all placeholder:text-zinc-500 border ${
              fieldErrors.phone
                ? "border-red-500 focus:border-red-500"
                : "border-transparent focus:border-zinc-700"
            } disabled:opacity-50`}
          />
          {fieldErrors.phone && (
            <p className="text-red-400 text-[11px] mt-1 font-sans">
              {fieldErrors.phone}
            </p>
          )}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label className="block text-xs font-sans font-semibold text-zinc-200">
            {messageLabel}
          </label>
          <span className="text-[10px] text-zinc-500 font-mono">
            {formData.message.length}/3000
          </span>
        </div>
        <textarea
          name="message"
          rows={4}
          maxLength={3000}
          value={formData.message}
          onChange={handleChange}
          placeholder={messagePlaceholder}
          disabled={isSubmitting}
          className={`w-full px-4 py-3 rounded-xl bg-zinc-900/80 text-white text-sm focus:outline-none focus:bg-zinc-900 transition-all resize-none placeholder:text-zinc-500 border ${
            fieldErrors.message
              ? "border-red-500 focus:border-red-500"
              : "border-transparent focus:border-zinc-700"
          } disabled:opacity-50`}
        />
        {fieldErrors.message && (
          <p className="text-red-400 text-[11px] mt-1 font-sans">
            {fieldErrors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 px-6 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-display text-sm font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg active:scale-[0.99]"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>{submittingText}</span>
          </>
        ) : (
          <>
            <span>{submitButtonText}</span>
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
};

export default ContactFormContent;
