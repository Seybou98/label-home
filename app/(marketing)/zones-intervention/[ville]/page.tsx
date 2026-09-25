import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Phone } from "lucide-react";
import { buildMetadata, serviceJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { solutions } from "@/lib/content/solutions";
import { cityServiceSlugs, getVille, villeSlugs } from "@/lib/content/villes";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";

export function generateStaticParams() {
  return villeSlugs.map((ville) => ({ ville }));
}

export async function generateMetadata({ params }: { params: Promise<{ ville: string }> }): Promise<Metadata> {
  const { ville: slug } = await params;
  const ville = getVille(slug);
  if (!ville) return {};
  return buildMetadata({
    title: `Installateur RGE à ${ville.name} (${ville.departmentCode}) : pompe à chaleur, solaire`,
    description: `Label Énergie, entreprise RGE, installe pompes à chaleur, panneaux solaires, chauffe-eau et poêles à granulés à ${ville.name} (${ville.postalCode}). Étude gratuite, aides MaPrimeRénov' et CEE.`,
    path: `/zones-intervention/${ville.slug}`,
  });
}

export default async function VillePage({ params }: { params: Promise<{ ville: string }> }) {
  const { ville: slug } = await params;
  const ville = getVille(slug);
  if (!ville) notFound();

  const services = cityServiceSlugs.map((s) => solutions[s]).filter(Boolean);

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: `Installation de solutions énergétiques à ${ville.name}`,
          description: `Pompes à chaleur, panneaux solaires, chauffe-eau et poêles à granulés à ${ville.name}.`,
          path: `/zones-intervention/${ville.slug}`,
          areaServed: ville.name,
        })}
      />
      <Breadcrumb
        items={[
          { name: "Zones d'intervention", path: "/zones-intervention" },
          { name: ville.name, path: `/zones-intervention/${ville.slug}` },
        ]}
      />

      <section className="pt-2">
        <div className="container max-w-3xl">
          <p className="eyebrow">
            INSTALLATEUR RGE · {ville.name.toUpperCase()} ({ville.departmentCode})
          </p>
          <h1 className="qsn-hero-title">
            Rénovation énergétique à <span className="text-teal">{ville.name}</span>.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Label Énergie accompagne les habitants de {ville.name} ({ville.postalCode}, {ville.department}) de
            l&apos;étude à l&apos;installation : pompe à chaleur, panneaux photovoltaïques, chauffe-eau
            thermodynamique ou solaire, système solaire combiné et poêle à granulés. Nos équipes sont
            certifiées RGE, ce qui vous ouvre l&apos;accès à MaPrimeRénov&apos; et aux primes CEE.
          </p>
          {ville.note && <p className="mt-4 text-sm leading-relaxed text-muted">{ville.note}</p>}
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
          <h2 className="qsn-section-heading">Nos solutions à {ville.name}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/zones-intervention/${ville.slug}/${s.slug}`}
                className="rounded-card border border-line bg-white p-5 shadow-card transition hover:border-teal2"
              >
                <p className="text-sm font-extrabold text-navy">{s.breadcrumbLabel}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted">{s.metaDescription}</p>
                <span className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-teal2">
                  {s.breadcrumbLabel} à {ville.name} <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container max-w-3xl">
          <h2 className="qsn-section-heading">Communes voisines desservies</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Depuis {ville.name}, nous intervenons également à {ville.nearby.join(", ")}. Une autre commune ?{" "}
            <Link href="/contact" className="font-semibold text-teal2 underline">
              Demandez-nous
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
