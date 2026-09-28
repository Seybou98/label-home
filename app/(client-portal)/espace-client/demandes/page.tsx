import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { frDate, getMyPortal } from "@/lib/portal";

const tone = {
  ok: "bg-[#eaf6ef] text-[#0b6f4c]",
  info: "bg-[#eef3f8] text-[#1e5fa8]",
  muted: "bg-soft text-muted",
} as const;

export default async function DemandesPage() {
  const { tickets } = await getMyPortal();

  return (
    <div className="grid gap-5">
      <div className="flex items-center gap-2 text-[11px] text-muted">
        <Link href="/espace-client" className="hover:text-teal2">
          Espace client
        </Link>
        <span>›</span>
        <span className="font-semibold text-navy">Mes demandes</span>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-navy">Mes demandes</h1>
          <p className="mt-2 text-[11px] text-muted">Le suivi de vos demandes de SAV.</p>
        </div>
        <Link href="/espace-client/demandes/nouvelle" className="btn btn-primary py-2.5 text-[10px]">
          DÉCLARER UN SAV
        </Link>
      </div>

      {tickets.length === 0 ? (
        <div className="rounded-card border border-dashed border-line bg-white p-8 text-center">
          <MessageSquare size={28} className="mx-auto text-teal2" />
          <p className="mt-3 text-sm font-bold text-navy">Aucune demande</p>
          <p className="mx-auto mt-2 max-w-md text-[11px] leading-relaxed text-muted">
            Un souci avec votre installation ? Déclarez une demande SAV, nous vous répondons rapidement.
          </p>
        </div>
      ) : (
        <section className="overflow-hidden rounded-card border border-line bg-white">
          {tickets.map((t, i) => (
            <div
              key={t.id}
              className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 py-4 ${i > 0 ? "border-t border-line" : ""}`}
            >
              <div className="min-w-0">
                <p className="text-[11.5px] font-bold text-navy">
                  {t.issue}
                  {t.number && <span className="font-medium text-muted"> · n°{t.number}</span>}
                </p>
                <p className="mt-1 truncate text-[10px] text-muted">
                  {t.product ? `${t.product} · ` : ""}
                  {t.date ? `Déclarée le ${frDate(t.date)}` : ""}
                </p>
              </div>
              <span className={`whitespace-nowrap rounded px-2.5 py-1 text-[9.5px] font-bold ${tone[t.tone]}`}>{t.statusLabel}</span>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
