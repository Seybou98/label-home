import { ArrowRight } from "lucide-react";
import { Breadcrumb, type BreadcrumbItem } from "@/components/layout/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";

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
          <PageHeader
            eyebrow={eyebrow}
            title={title}
            description={description}
            cta={cta ? [{ ...cta, icon: <ArrowRight size={16} /> }] : undefined}
          />
          <p className="mt-8 rounded-card border border-dashed border-line bg-soft p-4 text-xs text-muted">
            Contenu détaillé à venir — cette page est prête côté structure, SEO et navigation ; le
            contenu complet sera ajouté au fil des prochaines étapes.
          </p>
        </div>
      </section>
    </>
  );
}
