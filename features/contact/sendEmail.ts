"use server";

import nodemailer from "nodemailer";

export interface SendEmailParams {
  name: string;
  organization: string;
  email: string;
  phone?: string;
  message?: string;
  mainCategory?: string | null;
  selectedBoxPackage?: string | null;
  honeypot?: string; // Pułapka na spamboty
}

// Mapowanie kategorii i pakietów na czytelne nazwy PL
const CATEGORY_MAP: Record<string, string> = {
  boxes: "Skrzynie Mobilne 3D",
  containers: "Kontenery Produkcyjne",
  consultation: "Konsultacje / Usługi Inżynieryjne",
};

const PACKAGE_MAP: Record<string, string> = {
  basic: "Pakiet Basic",
  pro: "Pakiet Pro",
  advanced: "Pakiet Advanced",
};

/**
 * Zabezpieczenie przed atakami XSS w poczcie HTML
 */
function escapeHtml(text?: string | null): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Zabezpieczenie przed atakami Email Header Injection (usuwanie znaków CRLF)
 */
function sanitizeHeader(text?: string | null): string {
  if (!text) return "";
  return text.replace(/[\r\n]+/g, " ").trim();
}

/**
 * Walidacja formatu adresu e-mail
 */
function isValidEmail(email: string): boolean {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email);
}

// Inicjalizacja transportera SMTP
const getTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.error(
      "[SMTP Error] Brak skonfigurowanych zmiennych środowiskowych SMTP."
    );
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    tls: {
      rejectUnauthorized: true,
    },
  });
};

export async function sendEmail(
  params: SendEmailParams
): Promise<{ success: boolean; error?: string }> {
  // 0. Honeypot check - jeśli bot wypełnił ukryte pole, cicho udajemy sukces
  if (params.honeypot && params.honeypot.trim() !== "") {
    return { success: true };
  }

  // 1. Ograniczenie długości ciągów znaków (ochrona przed payloadami o wielkości MB)
  const rawName = params.name?.trim().slice(0, 100) || "";
  const rawOrg = params.organization?.trim().slice(0, 100) || "";
  const rawEmail = params.email?.trim().slice(0, 100) || "";
  const rawPhone = params.phone?.trim().slice(0, 30) || "";
  const rawMessage = params.message?.trim().slice(0, 3000) || "";
  const rawCategory = params.mainCategory?.trim().slice(0, 50) || "";
  const rawPackage = params.selectedBoxPackage?.trim().slice(0, 50) || "";

  // 2. Walidacja serwerowa pól wymaganych
  if (!rawName) {
    return { success: false, error: "Uzupełnij imię i nazwisko." };
  }
  if (!rawOrg) {
    return { success: false, error: "Uzupełnij nazwę firmy / organizacji." };
  }
  if (!rawEmail) {
    return { success: false, error: "Uzupełnij adres e-mail." };
  }

  if (!isValidEmail(rawEmail)) {
    return { success: false, error: "Podano niepoprawny adres e-mail." };
  }

  // 3. Sanitartyzacja nagłówków i treści HTML
  const headerName = sanitizeHeader(rawName);
  const headerOrg = sanitizeHeader(rawOrg);
  const headerEmail = sanitizeHeader(rawEmail);

  const cleanName = escapeHtml(rawName);
  const cleanOrg = escapeHtml(rawOrg);
  const cleanEmail = escapeHtml(rawEmail);
  const cleanPhone = rawPhone ? escapeHtml(rawPhone) : "Nie podano";
  const cleanMessage = rawMessage
    ? escapeHtml(rawMessage).replace(/\n/g, "<br/>")
    : "<em>Brak treści wiadomości</em>";

  const displayCategory =
    CATEGORY_MAP[rawCategory] ||
    (rawCategory ? escapeHtml(rawCategory) : "Nie wybrano");
  const displayPackage =
    PACKAGE_MAP[rawPackage] || (rawPackage ? escapeHtml(rawPackage) : null);

  // 4. Profesjonalny szablon e-mail w stylu Blitzform
  const htmlBody = `
    <!DOCTYPE html>
    <html lang="pl">
    <head>
      <meta charset="utf-8">
      <title>Nowe Zapytanie - Blitzform</title>
    </head>
    <body style="margin:0; padding:20px; background-color:#09090b; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color:#f4f4f5;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; background-color:#18181b; border:1px solid #27272a; border-radius:16px; overflow:hidden;">
        <!-- Header -->
        <tr>
          <td style="padding:28px 32px; background-color:#09090b; border-bottom:1px solid #27272a;">
            <div style="font-size:20px; font-weight:800; color:#ffffff; text-transform:uppercase; font-family: monospace; letter-spacing:-0.03em;">
              BLITZ<span style="color:#a1a1aa;">FORM</span>
            </div>
            <div style="font-size:12px; color:#a1a1aa; margin-top:4px;">
              Nowe Zapytanie Ofertowe ze Strony WWW
            </div>
          </td>
        </tr>
        
        <!-- Content -->
        <tr>
          <td style="padding:32px;">
            <!-- Sekcja 1: Dane Nadawcy -->
            <div style="margin-bottom:28px;">
              <div style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; color:#a1a1aa; margin-bottom:12px; font-family: monospace;">
                1. Dane Kontrahenta
              </div>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size:14px; line-height:1.6; color:#e4e4e7;">
                <tr>
                  <td width="140" style="color:#a1a1aa; padding:4px 0;">Imię i nazwisko:</td>
                  <td style="font-weight:600; color:#ffffff; padding:4px 0;">${cleanName}</td>
                </tr>
                <tr>
                  <td style="color:#a1a1aa; padding:4px 0;">Firma / Organizacja:</td>
                  <td style="font-weight:600; color:#ffffff; padding:4px 0;">${cleanOrg}</td>
                </tr>
                <tr>
                  <td style="color:#a1a1aa; padding:4px 0;">Adres e-mail:</td>
                  <td style="padding:4px 0;">
                    <a href="mailto:${cleanEmail}" style="color:#3b82f6; text-decoration:none; font-weight:600;">${cleanEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="color:#a1a1aa; padding:4px 0;">Telefon:</td>
                  <td style="color:#ffffff; padding:4px 0;">${cleanPhone}</td>
                </tr>
              </table>
            </div>

            <!-- Sekcja 2: Konfiguracja -->
            <div style="margin-bottom:28px; padding:16px; background-color:#09090b; border:1px solid #27272a; border-radius:12px;">
              <div style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; color:#a1a1aa; margin-bottom:10px; font-family: monospace;">
                2. Wybrana Konfiguracja
              </div>
              <div style="font-size:14px; color:#ffffff; margin-bottom:6px;">
                <strong style="color:#a1a1aa;">Kategoria:</strong> ${displayCategory}
              </div>
              ${
                displayPackage
                  ? `<div style="font-size:14px; color:#ffffff;">
                      <strong style="color:#a1a1aa;">Pakiet:</strong> ${displayPackage}
                     </div>`
                  : ""
              }
            </div>

            <!-- Sekcja 3: Wiadomość -->
            <div>
              <div style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; color:#a1a1aa; margin-bottom:12px; font-family: monospace;">
                3. Wymagania Techniczne / Opis Zapytania
              </div>
              <div style="font-size:14px; line-height:1.6; color:#d4d4d8; background-color:#09090b; padding:16px; border-radius:12px; border:1px solid #27272a; word-break:break-word;">
                ${cleanMessage}
              </div>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 32px; background-color:#09090b; border-top:1px solid #27272a; text-align:center; font-size:11px; color:#71717a;">
            Wiadomość wygenerowana automatycznie przez system Blitzform &bull; ${new Date().getFullYear()}
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  // Fallback tekstowy
  const textBody = `
NOWE ZAPYTANIE OFERTOWE - BLITZFORM
====================================

1. DANE KONTRAHENTA:
- Imię i nazwisko: ${rawName}
- Firma / Organizacja: ${rawOrg}
- E-mail: ${rawEmail}
- Telefon: ${rawPhone || "Nie podano"}

2. SPECYFIKACJA:
- Kategoria: ${displayCategory}
${displayPackage ? `- Pakiet: ${displayPackage}\n` : ""}
3. TREŚĆ WIADOMOŚCI:
${rawMessage || "Brak treści wiadomości"}
  `.trim();

  // 5. Wysyłka e-maila
  try {
    const transporter = getTransporter();

    if (!transporter) {
      return {
        success: false,
        error:
          "Serwer pocztowy jest niedostępny. Skontaktuj się z administratorem.",
      };
    }

    const recipient = process.env.SMTP_TO || process.env.SMTP_USER;

    await transporter.sendMail({
      from: `"Blitzform WWW" <${process.env.SMTP_USER}>`,
      to: recipient,
      replyTo: `"${headerName}" <${headerEmail}>`,
      subject: `[Formularz WWW] ${headerOrg} - ${headerName}`,
      text: textBody,
      html: htmlBody,
    });

    return { success: true };
  } catch (error: any) {
    console.error("[SMTP Send Error]:", error?.message || error);
    return {
      success: false,
      error: "Wystąpił problem podczas wysyłania wiadomości. Spróbuj ponownie.",
    };
  }
}
