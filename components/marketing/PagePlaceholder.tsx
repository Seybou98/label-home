import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumb, type BreadcrumbItem } from "@/components/layout/Breadcrumb";

export function PagePlaceholder({
  breadcrumb,
  eyebrow,
  title,
  description,
  cta,
}: {
  breadcrumb: BreadcrumbItem[];
  eyebrow: string;
  title: string;
  description: string;
  cta?: { label: string; href: string };
}) {
  return (
    <>
      <Breadcrumb items={breadcrumb} />
      <section className="section">
        <div className="container max-w-2xl">
          <p className="text-[11px] font-extrabold tracking-wide text-teal2">{eyebrow}</p>
          <h1 className="mt-2 font-display text-2xl text-navy md:text-3xl">{title}</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted">{description}</p>
          {cta && (
            <Link
              href={cta.href}
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-[#0b5877] to-[#18b9a0] px-5 py-3 text-xs font-extrabold text-white shadow-lg"
            >
              {cta.label} <ArrowRight size={16} />
            </Link>
          )}
          <p className="mt-8 rounded-card border border-dashed border-line bg-soft p-4 text-xs text-muted">
            Contenu détaillé à venir — cette page est prête côté structure, SEO et navigation ; le
            contenu complet sera ajouté au fil des prochaines étapes.
          </p>
        </div>
      </section>
    </>
  );
}
