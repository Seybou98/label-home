"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ChevronDown, MapPin } from "lucide-react";
import type { RealisationCategory, RealisationItem } from "@/lib/content/realisationsPage";

export function RealisationsFilterGrid({
  categories,
  items,
}: {
  categories: RealisationCategory[];
  items: RealisationItem[];
}) {
  const [category, setCategory] = useState<string>("all");
  const [region, setRegion] = useState<string>("all");

  const regions = useMemo(() => Array.from(new Set(items.map((i) => i.region))), [items]);

  const filtered = items.filter(
    (item) => (category === "all" || item.category === category) && (region === "all" || item.region === region),
  );

  return (
    <div>
      <div className="realisations-filters">
        <button
          type="button"
          className={`realisations-filter-tab${category === "all" ? " is-active" : ""}`}
          onClick={() => setCategory("all")}
        >
          Tous les projets
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            type="button"
            className={`realisations-filter-tab${category === c.slug ? " is-active" : ""}`}
            onClick={() => setCategory(c.slug)}
          >
            {c.label}
          </button>
        ))}
        <div className="realisations-region-select">
          <MapPin size={14} />
          <select value={region} onChange={(e) => setRegion(e.target.value)} aria-label="Filtrer par région">
            <option value="all">Toutes les régions</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <ChevronDown size={14} aria-hidden />
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((item) => (
          <article key={item.title} className="realisation-card">
            <div className="relative h-40">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 900px) 50vw, 25vw"
                style={{ objectFit: "cover" }}
                loading="lazy"
              />
              <span className={`realisation-card-badge realisation-badge-${item.category}`}>{item.categoryLabel}</span>
            </div>
            <div className="p-5">
              <h3 className="text-base font-bold text-navy">{item.title}</h3>
              <p className="mt-2 text-xs font-bold text-teal2">{item.location}</p>
              <p className="mt-2 text-sm text-muted">{item.text}</p>
              <div className="realisation-card-footer">
                <span>Économies annuelles</span>
                <strong>{item.savings}</strong>
              </div>
            </div>
          </article>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-muted">Aucune réalisation ne correspond à ces filtres pour le moment.</p>
        )}
      </div>
    </div>
  );
}
