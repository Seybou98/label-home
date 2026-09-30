import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { siteConfig } from "@/lib/site";
import { localBusinessJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { CookieConsent } from "@/components/layout/CookieConsent";
import "./globals.css";

// Auto-hébergée par Next (build) : évite l'appel bloquant vers fonts.googleapis.com au chargement.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Réduisez vos factures d'énergie durablement`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    siteName: siteConfig.name,
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-default.png"],
  },
} as Metadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" data-scroll-behavior="smooth" className={poppins.variable}>
      <body suppressHydrationWarning>
        <JsonLd data={localBusinessJsonLd()} />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
