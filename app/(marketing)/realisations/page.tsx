import type { Metadata } from "next";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";
import { realizations } from "@/lib/content/home";

export const metadata: Metadata = buildMetadata({
  title: "Nos réalisations : installations de pompes à chaleur et solaire",
  description:
    "Découvrez les installations de pompes à chaleur, climatisation, panneaux solaires et eau chaude réalisées par Label Énergie près de chez vous.",
  path: "/realisations",
});

export default function RealisationsPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Réalisations", path: "/realisations" }]} />
      <section className="section">
        <div className="container">
          <PageHeader
            eyebrow="NOS RÉALISATIONS"
            title="Nos réalisations près de chez vous"
            description="Découvrez quelques-unes de nos installations récentes, dans votre région."
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-4">
            {realizations.map((p) => (
              <article key={p.location} className="overflow-hidden rounded-card border border-line shadow-card">
                <div className="relative h-36">
                  <Image
                    src={p.image}
                    alt={`${p.title} — ${p.location}`}
                    fill
                    sizes="(max-width: 900px) 50vw, 25vw"
                    style={{ objectFit: "cover" }}
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <p className="text-[10px] font-bold text-teal2">{p.location}</p>
                  <h2 className="mt-1 text-sm font-bold text-navy">{p.title}</h2>
                  <p className="mt-1 text-xs text-muted">{p.details}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
