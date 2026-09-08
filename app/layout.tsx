import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { localBusinessJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Réduisez vos factures d'énergie durablement`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
} as Metadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <JsonLd data={localBusinessJsonLd()} />
        {children}
      </body>
    </html>
  );
}
