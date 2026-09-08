import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { solutionSlugs } from "@/lib/content/solutions";

const staticPaths = [
  "/",
  "/solutions",
  "/aides-financement",
  "/aides-financement/calculer-mes-aides",
  "/aides-financement/maprimerenov",
  "/aides-financement/cee",
  "/aides-financement/financement",
  "/realisations",
  "/conseils",
  "/a-propos/qui-sommes-nous",
  "/a-propos/certifications",
  "/a-propos/nos-equipes",
  "/a-propos/nos-partenaires",
  "/a-propos/recrutement",
  "/zones-intervention",
  "/temoignages",
  "/faq",
  "/contact",
  "/deja-client",
  "/deja-client/sav",
  "/deja-client/entretien",
  "/deja-client/parrainage",
  "/plan-du-site",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const solutionPaths = solutionSlugs.map((slug) => `/solutions/${slug}`);

  return [...staticPaths, ...solutionPaths].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
