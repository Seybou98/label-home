import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Phone } from "lucide-react";
import { buildMetadata, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { solutions } from "@/lib/content/solutions";
import { cityServiceSlugs, getVille, villeSlugs, villes } from "@/lib/content/villes";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";

export function generateStaticParams() {
  return villeSlugs.flatMap((ville) => cityServiceSlugs.map((slug) => ({ ville, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ville: string; slug: string }>;
}): Promise<Metadata> {
  const { ville: villeSlug, slug } = await params;
  const ville = getVille(villeSlug);
  const solution = solutions[slug];
  if (!ville || !solution || !cityServiceSlugs.includes(slug)) return {};
  return buildMetadata({
    title: `${solution.breadcrumbLabel} à ${ville.name} (${ville.departmentCode}) : devis gratuit, aides`,
    description: `${solution.breadcrumbLabel} à ${ville.name} (${ville.postalCode}) : installation par Label Énergie, entreprise RGE. Étude gratuite, aides MaPrimeRénov' et CEE, SAV assuré.`,
    path: `/zones-intervention/${ville.slug}/${solution.slug}`,
  });
}

export default async function VilleServicePage({
  params,
}: {
  params: Promise<{ ville: string; slug: string }>;
}) {
  const { ville: villeSlug, slug } = await params;
  const ville = getVille(villeSlug);
  const solution = solutions[slug];
  if (!ville || !solution || !cityServiceSlugs.includes(slug)) notFound();

  const path = `/zones-intervention/${ville.slug}/${solution.slug}`;
  const label = solution.breadcrumbLabel;
  const faq = [
    {
      question: `Label Énergie installe-t-elle une ${label.toLowerCase()} à ${ville.name} ?`,
      answer: `Oui. Nos équipes interviennent à ${ville.name} (${ville.postalCode}) et dans les communes voisines : ${ville.nearby.join(", ")}. L'étude de votre projet est gratuite.`,
    },
    {
      question: `Quelles aides pour une installation à ${ville.name} ?`,
      answer: `Label Énergie étant certifiée RGE, vous pouvez bénéficier de MaPrimeRénov', des certificats d'économies d'énergie (CEE) et, selon votre projet, de l'éco-prêt à taux zéro. Nous vous accompagnons dans les démarches.`,
    },
    {
      question: "Qui réalise l'installation et le suivi ?",
      answer: "L'installation est réalisée par nos propres équipes, sans sous-traitance, puis suivie par notre service après-vente.",
    },
    {
      question: "Comment obtenir un devis ?",
      answer: `Simulez votre projet en ligne ou appelez-nous au ${siteConfig.phoneDisplay} : un conseiller vous recontacte pour une étude personnalisée et gratuite.`,
    },
  ];

  const sameCityOthers = cityServiceSlugs.filter((s) => s !== slug).map((s) => solutions[s]).filter(Boolean);
  const sameServiceOthers = villes.filter((v) => v.slug !== ville.slug);

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            name: `${label} à ${ville.name}`,
            description: `${label} à ${ville.name} : ${solution.metaDescription}`,
            path,
            areaServed: ville.name,
          }),
          faqJsonLd(faq),
        ]}
      />
      <Breadcrumb
        items={[
          { name: "Zones d'intervention", path: "/zones-intervention" },
          { name: ville.name, path: `/zones-intervention/${ville.slug}` },
          { name: label, path },
        ]}
      />

      <section className="pt-2">
        <div className="container max-w-3xl">
          <p className="eyebrow">
            {solution.category} · {ville.name.toUpperCase()} ({ville.departmentCode})
          </p>
          <h1 className="qsn-hero-title">
            {label} à <span className="text-teal">{ville.name}</span>.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted">{solution.intro}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Label Énergie, entreprise RGE, vous accompagne à {ville.name} ({ville.postalCode}) : étude gratuite,
            installation par nos équipes et suivi après-vente.
          </p>
          {ville.note && <p className="mt-3 text-sm leading-relaxed text-muted">{ville.note}</p>}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/simuler-mon-projet" className="btn btn-primary">
              SIMULER MON PROJET <ArrowRight size={16} />
            </Link>
            <a href={`tel:${siteConfig.phone}`} className="btn btn-outline">
              {siteConfig.phoneDisplay} <Phone size={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="qsn-section-heading">Les avantages de cette solution</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {solution.quickBenefits.slice(0, 3).map((b) => (
              <div key={b.title} className="rounded-card border border-line bg-white p-5 shadow-card">
                <p className="text-sm font-extrabold text-navy">{b.title}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container max-w-3xl">
          <h2 className="qsn-section-heading">Aides disponibles à {ville.name}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {solution.aides.text} Montant pouvant atteindre <strong className="text-navy">{solution.aides.amount}</strong>{" "}
            selon vos revenus et votre projet.
          </p>
          <ul className="mt-4 grid gap-2">
            {solution.aides.items.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-navy">
                <Check size={16} className="text-teal2" /> {item}
              </li>
            ))}
          </ul>
          <Link href="/aides-financement/calculer-mes-aides" className="btn btn-outline mt-5">
            CALCULER MES AIDES <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container max-w-3xl">
          <h2 className="qsn-section-heading">Questions fréquentes à {ville.name}</h2>
          <div className="mt-6">
            <FaqAccordion items={faq.map((f) => ({ q: f.question, a: f.answer }))} single />
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container">
          <h2 className="qsn-section-heading">Nos autres solutions à {ville.name}</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {sameCityOthers.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/zones-intervention/${ville.slug}/${s.slug}`}
                  className="inline-block rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold text-navy hover:border-teal2"
                >
                  {s.breadcrumbLabel}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="qsn-section-heading mt-10">{label} dans les villes voisines</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {sameServiceOthers.map((v) => (
              <li key={v.slug}>
                <Link
                  href={`/zones-intervention/${v.slug}/${solution.slug}`}
                  className="inline-block rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold text-navy hover:border-teal2"
                >
                  {label} à {v.name}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-muted">
            <Link href={`/solutions/${solution.slug}`} className="font-semibold text-teal2 underline">
              Tout savoir sur la solution : {label}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
