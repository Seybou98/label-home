import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { villes } from "@/lib/content/villes";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export const metadata: Metadata = buildMetadata({
  title: "Zones d'intervention : installateur RGE en Île-de-France",
  description:
    "Label Énergie intervient en Seine-et-Marne et en Île-de-France pour l'installation de pompes à chaleur, panneaux solaires, chauffe-eau et poêles à granulés. Trouvez votre ville.",
  path: "/zones-intervention",
});

export default function ZonesInterventionPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Zones d'intervention", path: "/zones-intervention" }]} />

      <section className="pt-2">
        <div className="container max-w-3xl">
          <p className="eyebrow">ZONES D&apos;INTERVENTION</p>
          <h1 className="qsn-hero-title">
            Nous intervenons <span className="text-teal">près de chez vous.</span>
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Label Énergie, entreprise RGE basée en Seine-et-Marne, installe et entretient pompes à
            chaleur, panneaux solaires, chauffe-eau et poêles à granulés en Île-de-France. Choisissez
            votre ville pour découvrir nos solutions, les aides disponibles et nos interventions à
            proximité.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="qsn-section-heading">Seine-et-Marne (77)</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {villes.map((v) => (
              <Link
                key={v.slug}
                href={`/zones-intervention/${v.slug}`}
                className="group rounded-card border border-line bg-white p-5 shadow-card transition hover:border-teal2"
              >
                <MapPin size={20} className="text-teal2" />
                <p className="mt-3 text-sm font-extrabold text-navy">{v.name}</p>
                <p className="text-xs text-muted">{v.postalCode}</p>
                <span className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-teal2">
                  Voir nos solutions <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted">
            Votre commune n&apos;est pas listée ?{" "}
            <Link href="/contact" className="font-semibold text-teal2 underline">
              Contactez-nous
            </Link>
            , nous intervenons aussi dans les communes voisines.
          </p>
        </div>
      </section>
    </>
  );
}
