import Link from "next/link";
import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  cta,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  cta?: { label: string; href: string; icon?: ReactNode; variant?: "primary" | "outline" }[];
}) {
  return (
    <div className="page-hero">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
      {cta && cta.length > 0 && (
        <div className="page-hero-actions">
          {cta.map((c) => (
            <Link key={c.href} href={c.href} className={`btn btn-${c.variant ?? "primary"}`}>
              {c.label} {c.icon}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
