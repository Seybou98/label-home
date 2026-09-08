import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { solutionSlugs, solutions } from "@/lib/content/solutions";

const sections: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Solutions",
    links: [
      { label: "Toutes nos solutions", href: "/solutions" },
      ...solutionSlugs.map((slug) => ({ label: solutions[slug].breadcrumbLabel, href: `/solutions/${slug}` })),
    ],
  },
  {
    title: "Aides & financement",
    links: [
      { label: "Aides & financement", href: "/aides-financement" },
      { label: "Calculer mes aides", href: "/aides-financement/calculer-mes-aides" },
      { label: "MaPrimeRénov'", href: "/aides-financement/maprimerenov" },
      { label: "CEE", href: "/aides-financement/cee" },
      { label: "Financement", href: "/aides-financement/financement" },
    ],
  },
  {
    title: "À propos",
    links: [
      { label: "Qui sommes-nous ?", href: "/a-propos/qui-sommes-nous" },
      { label: "Nos certifications", href: "/a-propos/certifications" },
      { label: "Nos équipes", href: "/a-propos/nos-equipes" },
      { label: "Nos partenaires", href: "/a-propos/nos-partenaires" },
      { label: "Recrutement", href: "/a-propos/recrutement" },
    ],
  },
  {
    title: "Déjà client",
    links: [
      { label: "Déjà client", href: "/deja-client" },
      { label: "Mon espace client", href: "/espace-client" },
      { label: "Déclarer un SAV", href: "/deja-client/sav" },
      { label: "Entretien & contrats", href: "/deja-client/entretien" },
      { label: "Parrainage", href: "/deja-client/parrainage" },
    ],
  },
  {
    title: "Autres pages",
    links: [
      { label: "Réalisations", href: "/realisations" },
      { label: "Conseils", href: "/conseils" },
      { label: "Témoignages", href: "/temoignages" },
      { label: "Zones d'intervention", href: "/zones-intervention" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "Politique de confidentialité", href: "/confidentialite" },
      { label: "Gestion des cookies", href: "/cookies" },
    ],
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Plan du site",
  description: "Retrouvez toutes les pages du site Label Énergie : solutions, aides, à propos et services clients.",
  path: "/plan-du-site",
});

export default function PlanDuSitePage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Plan du site", path: "/plan-du-site" }]} />
      <section className="section">
        <div className="container">
          <h1 className="font-display text-2xl text-navy">Plan du site</h1>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-xs font-extrabold uppercase tracking-wide text-teal2">
                  {section.title}
                </h2>
                <ul className="mt-3 grid gap-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-xs text-muted hover:text-navy">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
