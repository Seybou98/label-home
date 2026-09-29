import { Breadcrumb } from "@/components/layout/Breadcrumb";

export function LegalLayout({
  title,
  updatedAt,
  breadcrumbLabel,
  path,
  children,
}: {
  title: string;
  updatedAt: string;
  breadcrumbLabel: string;
  path: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Breadcrumb items={[{ name: breadcrumbLabel, path }]} />
      <section className="section">
        <div className="container max-w-3xl">
          <p className="eyebrow">INFORMATIONS LÉGALES</p>
          <h1 className="mt-3 font-display text-[28px] font-bold leading-[1.25] text-navy sm:text-[34px]">
            {title}
          </h1>
          <p className="mt-3 text-[13px] text-muted">Dernière mise à jour : {updatedAt}</p>
          <div className="mt-8 grid gap-5 text-[13px] leading-relaxed text-navy [&_h2]:mt-5 [&_h2]:font-display [&_h2]:text-[17px] [&_h2]:font-bold [&_h2]:text-navy [&_ul]:grid [&_ul]:gap-2 [&_li]:list-disc [&_li]:ml-5">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
