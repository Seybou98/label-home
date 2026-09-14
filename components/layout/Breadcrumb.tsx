import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const full: BreadcrumbItem[] = [{ name: "Accueil", path: "/" }, ...items];

  return (
    <nav aria-label="Fil d'ariane" className="breadcrumb">
      <JsonLd data={breadcrumbJsonLd(full)} />
      <div className="container breadcrumb-list">
        {full.map((item, i) => (
          <span key={item.path} style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {i > 0 && <span aria-hidden>›</span>}
            {i === full.length - 1 ? (
              <span className="breadcrumb-current">{item.name}</span>
            ) : (
              <Link href={item.path}>{item.name}</Link>
            )}
          </span>
        ))}
      </div>
    </nav>
  );
}
