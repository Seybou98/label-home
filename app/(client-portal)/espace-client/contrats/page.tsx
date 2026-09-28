import Link from "next/link";
import { CalendarClock, Download, ShieldCheck } from "lucide-react";
import { euro, frDate, getMyPortal } from "@/lib/portal";

const statusUi = {
  active: { label: "Actif", cls: "bg-soft text-teal2" },
  upcoming: { label: "À venir", cls: "bg-soft text-teal2" },
  signature: { label: "En attente de signature", cls: "bg-[#fdf5e0] text-[#8a6508]" },
  expired: { label: "Terminé", cls: "bg-soft text-muted" },
} as const;

export default async function ContratsPage() {
  const { contracts } = await getMyPortal();

  return (
    <div className="grid gap-5">
      <div className="flex items-center gap-2 text-[11px] text-muted">
        <Link href="/espace-client" className="hover:text-teal2">
          Espace client
        </Link>
        <span>›</span>
        <span className="font-semibold text-navy">Mes contrats</span>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-navy">Mes contrats</h1>
          <p className="mt-2 text-[11px] text-muted">Vos contrats d&apos;entretien et leurs prochaines échéances.</p>
        </div>
        <Link href="/deja-client/entretien/souscrire" className="btn btn-primary py-2.5 text-[10px]">
          SOUSCRIRE UN CONTRAT D&apos;ENTRETIEN
        </Link>
      </div>

      {contracts.length === 0 ? (
        <div className="rounded-card border border-dashed border-line bg-white p-8 text-center">
          <ShieldCheck size={28} className="mx-auto text-teal2" />
          <p className="mt-3 text-sm font-bold text-navy">Aucun contrat d&apos;entretien</p>
          <p className="mx-auto mt-2 max-w-md text-[11px] leading-relaxed text-muted">
            Un contrat d&apos;entretien garantit la performance et la durée de vie de vos équipements.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {contracts.map((c) => (
            <section key={c.id} className="rounded-card border border-line bg-white p-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <ShieldCheck size={18} className="text-teal2" />
                <h2 className="text-[12px] font-bold text-navy">Contrat d&apos;entretien{c.formula ? ` ${c.formula}` : ""}</h2>
                <span className={`rounded px-2 py-0.5 text-[9px] font-bold ${statusUi[c.status].cls}`}>{statusUi[c.status].label}</span>
              </div>
              {c.number && <p className="mt-2 text-[10px] text-muted">N° contrat : {c.number}</p>}
              {c.equipment.length > 0 && <p className="mt-1 text-[10.5px] text-navy">{c.equipment.join(", ")}</p>}

              <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-4 text-[10px]">
                {c.start && (
                  <div>
                    <dt className="text-muted">Début</dt>
                    <dd className="mt-0.5 font-semibold text-navy">{frDate(c.start)}</dd>
                  </div>
                )}
                {c.end && (
                  <div>
                    <dt className="text-muted">Échéance</dt>
                    <dd className="mt-0.5 font-semibold text-navy">{frDate(c.end)}</dd>
                  </div>
                )}
                {c.monthlyAmount !== undefined && (
                  <div>
                    <dt className="text-muted">Mensualité</dt>
                    <dd className="mt-0.5 font-semibold text-navy">{euro(c.monthlyAmount)} TTC / mois</dd>
                  </div>
                )}
                {c.nextMaintenance && (
                  <div>
                    <dt className="text-muted">Prochaine visite</dt>
                    <dd className="mt-0.5 flex items-center gap-1.5 font-semibold text-navy">
                      <CalendarClock size={12} /> {frDate(c.nextMaintenance)}
                    </dd>
                  </div>
                )}
              </dl>

              {c.docId && (
                <a
                  href={`/api/portal/documents/${c.docId}?download=1`}
                  className="mt-4 inline-flex items-center gap-2 rounded border border-line px-3 py-2 text-[9.5px] font-bold text-teal2 hover:bg-soft"
                >
                  <Download size={12} /> Télécharger le contrat
                </a>
              )}
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
