"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Download, Eye, Search } from "lucide-react";
import type { PortalDocument } from "@/lib/portal/types";

type CategoryKey = PortalDocument["category"];

const CATEGORIES: Record<CategoryKey, { label: string; bg: string; fg: string; stroke: string }> = {
  contrat: { label: "Contrats & devis", bg: "#eef3f8", fg: "#1e5fa8", stroke: "#1e6fd0" },
  tech: { label: "Techniques", bg: "#f3effb", fg: "#5b3ea8", stroke: "#1e6fd0" },
};

const fr = (iso?: string) => {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
};

export function DocumentsExplorer({ documents }: { documents: PortalDocument[] }) {
  const [cat, setCat] = useState<CategoryKey | "all">("all");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const matchesQuery = (name: string) => !q || name.toLowerCase().includes(q);

  const filtered = useMemo(
    () => documents.filter((d) => (cat === "all" || d.category === cat) && matchesQuery(d.name)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [documents, cat, q],
  );

  // Seules les catégories qui contiennent réellement des documents sont proposées.
  const presentCats = (Object.keys(CATEGORIES) as CategoryKey[]).filter((k) => documents.some((d) => d.category === k));
  const categoryTabs: { key: CategoryKey | "all"; label: string; count: number }[] = [
    { key: "all", label: "Tous", count: documents.filter((d) => matchesQuery(d.name)).length },
    ...presentCats.map((key) => ({
      key,
      label: CATEGORIES[key].label,
      count: documents.filter((d) => d.category === key && matchesQuery(d.name)).length,
    })),
  ];

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <h1 className="font-display text-2xl text-navy">Mes documents</h1>
          <p className="mt-2 text-[11px] text-muted">Tous les documents liés à votre projet, disponibles à tout moment.</p>
        </div>
        {documents.length > 0 && (
          <div className="relative w-full max-w-[280px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un document"
              className="h-[38px] w-full rounded-md border border-line pl-8 pr-3 text-[11px] text-navy outline-none focus:border-teal2"
            />
          </div>
        )}
      </div>

      {presentCats.length > 1 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {categoryTabs.map((t) => {
            const on = cat === t.key;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setCat(t.key)}
                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[10.5px] font-medium ${
                  on ? "border-navy bg-navy text-white" : "border-line bg-white text-navy"
                }`}
              >
                {t.label}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${on ? "bg-white text-navy" : "bg-soft text-muted"}`}
                >
                  {t.count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-start gap-4">
        <section className="min-w-0 flex-[999_1_460px] overflow-hidden rounded-card border border-line">
          <div className="grid grid-cols-[minmax(160px,1fr)_110px_76px_64px] gap-3 bg-soft px-4 py-3 text-[9.5px] font-bold text-muted">
            <span>Document</span>
            <span>Catégorie</span>
            <span>Date</span>
            <span className="text-right">Actions</span>
          </div>
          {filtered.map((d, i) => (
            <div
              key={d.id}
              className={`grid grid-cols-[minmax(160px,1fr)_110px_76px_64px] items-center gap-3 px-4 py-3 hover:bg-soft ${
                i > 0 ? "border-t border-line" : ""
              }`}
            >
              <div className="flex min-w-0 items-center gap-3">
                <svg width="18" height="20" viewBox="0 0 24 26" fill="none" stroke={CATEGORIES[d.category].stroke} strokeWidth="1.4" className="shrink-0">
                  <path d="M5 2h10l5 5v17H5z" />
                  <path d="M15 2v5h5" />
                  <rect x="8" y="13" width="9" height="6" rx="1" />
                </svg>
                <div className="min-w-0">
                  <p className="truncate text-[10.5px] font-medium text-navy">{d.name}</p>
                  <span className="mt-0.5 block text-[8.5px] text-muted">{d.isPdf ? "PDF" : "Fichier"}</span>
                </div>
              </div>
              <span
                className="w-fit whitespace-nowrap rounded px-2.5 py-1 text-[9px] font-medium"
                style={{ background: CATEGORIES[d.category].bg, color: CATEGORIES[d.category].fg }}
              >
                {CATEGORIES[d.category].label}
              </span>
              <span className="whitespace-nowrap text-[9.5px] text-muted">{fr(d.date)}</span>
              <div className="flex justify-end gap-1.5">
                <a
                  href={`/api/portal/documents/${d.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Aperçu"
                  className="flex h-7 w-7 items-center justify-center rounded border border-line text-navy hover:border-teal2 hover:text-teal2"
                >
                  <Eye size={13} />
                </a>
                <a
                  href={`/api/portal/documents/${d.id}?download=1`}
                  title="Télécharger"
                  className="flex h-7 w-7 items-center justify-center rounded border border-line text-navy hover:border-teal2 hover:text-teal2"
                >
                  <Download size={13} />
                </a>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="border-t border-line px-4 py-10 text-center text-[11px] leading-relaxed text-muted">
              {documents.length === 0
                ? "Aucun document n'est disponible pour le moment. Vos devis, PV de réception et attestations apparaîtront ici."
                : "Aucun document ne correspond à votre recherche."}
            </div>
          )}
        </section>

        <div className="flex min-w-0 flex-[1_1_240px] flex-col gap-4">
          <section className="rounded-card bg-soft p-4">
            <p className="text-[10.5px] font-bold text-navy">Un document manquant ?</p>
            <p className="mt-1.5 text-[9.5px] leading-relaxed text-muted">
              Notre équipe peut vous le renvoyer rapidement.
            </p>
            <Link href="/contact" className="mt-2.5 inline-flex items-center gap-2 text-[9.5px] font-bold text-navy">
              Contacter Label Énergie <span aria-hidden>→</span>
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
