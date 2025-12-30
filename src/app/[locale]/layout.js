import { NextIntlClientProvider, hasLocale } from "next-intl";
import ClientWrapper from "./ClientWrapper";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import OrganizationSchema from "@/components/schema/OrganizationSchema";
import { inter, monaSans, orbitron } from "../fonts";

export const metadata = {
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default async function RootLayout({ children, params }) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${monaSans.variable} ${inter.variable} ${orbitron.variable} antialiased`}
    >
      <body>
        <OrganizationSchema />
        <NextIntlClientProvider locale={locale}>
          <ClientWrapper>{children}</ClientWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
