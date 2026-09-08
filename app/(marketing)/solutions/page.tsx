import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { solutions, solutionSlugs } from "@/lib/content/solutions";

export const metadata: Metadata = buildMetadata({
  title: "Toutes nos solutions énergétiques",
  description:
    "Pompe à chaleur, climatisation, solaire photovoltaïque, système solaire combiné, eau chaude, poêle à granulés : découvrez toutes les solutions énergétiques installées par Label Énergie.",
  path: "/solutions",
});

export default function SolutionsIndexPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Solutions", path: "/solutions" }]} />
      <section className="section">
        <div className="container">
          <h1 className="font-display text-2xl text-navy">Toutes nos solutions énergétiques</h1>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            Chauffage, climatisation, production d&apos;électricité, eau chaude : Label Énergie
            étudie, installe et entretient l&apos;ensemble de vos équipements énergétiques.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {solutionSlugs.map((slug) => {
              const s = solutions[slug];
              return (
                <Link
                  key={slug}
                  href={`/solutions/${slug}`}
                  className="group overflow-hidden rounded-card border border-line shadow-card"
                >
                  <div className="relative h-36">
                    <Image
                      src={s.heroImage}
                      alt={s.heroAlt}
                      fill
                      sizes="(max-width: 900px) 100vw, 33vw"
                      style={{ objectFit: "cover" }}
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-sm font-bold text-navy">{s.breadcrumbLabel}</h2>
                    <p className="mt-2 text-xs text-muted">{s.intro}</p>
                    <span className="mt-3 inline-flex items-center gap-2 text-xs font-extrabold text-teal2">
                      En savoir plus <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
