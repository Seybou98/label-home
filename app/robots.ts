import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/espace-client",
        "/espace-client/",
        "/connexion",
        "/simuler-mon-projet",
        "/deja-client/entretien/souscrire",
        "/deja-client/entretien/souscrire/",
      ],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
