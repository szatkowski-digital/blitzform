import { Orbitron, Inter } from "next/font/google";
import localFont from "next/font/local";

/**
 * Orbitron – nagłówki
 */
export const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
  display: "swap",
});

/**
 * Inter – tekst główny
 */
export const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * Mona Sans – UI
 */
export const monaSans = localFont({
  src: [
    {
      path: "../mona-sans/MonaSansVF.woff2",
      weight: "200 900",
      style: "normal",
    },
    {
      path: "../mona-sans/MonaSansVF.woff2",
      weight: "200 900",
      style: "italic",
    },
  ],
  variable: "--font-mona",
  display: "swap",
});
