import Link from "next/link";
import { Droplet, FileText, Fan, Flame, ShieldCheck, Sun, Wrench, type LucideIcon } from "lucide-react";
import { dayAndMonth, euro, frDate, getMyPortal } from "@/lib/portal";

const equipmentIcon = (type: string, name: string): LucideIcon => {
  const t = `${type} ${name}`.toUpperCase();
  if (/POELE|POÊLE/.test(t)) return Flame;
  if (/SSC|SOLAIRE|PHOTOVOLT|CESI/.test(t)) return Sun;
  if (/\bBE\b|\bBS\b|\bBTD\b|BALLON|THERMOR/.test(t)) return Droplet;
  if (/\bPAC\b/.test(t)) return Fan;
  return Wrench;
};

export default async function MonProjetPage({ searchParams }: { searchParams: Promise<{ p?: string }> }) {
  const data = await getMyPortal();
  const { p } = await searchParams;
  // Le projet demandé doit faire partie des projets du client (sinon on prend le plus récent).
  const project = data.projects.find((x) => x.id === p) ?? data.projects[0];
  const nextAppt = data.appointments.find((a) => a.upcoming);
  const { aides } = data;

  const financials = aides
    ? [
        aides.mpr > 0 && { label: "MaPrimeRénov'", value: euro(aides.mpr), color: "text-teal2" },
        aides.cee > 0 && { label: "Prime CEE", value: euro(aides.cee), color: "text-teal2" },
        aides.rac !== undefined && { label: "Reste à charge", value: euro(aides.rac) },
      ].filter(Boolean) as { label: string; value: string; color?: string }[]
    : [];

  const barTotal = aides ? aides.mpr + aides.cee + (aides.rac ?? 0) : 0;
  const bars = aides && barTotal > 0
    ? [
        { label: "MaPrimeRénov'", amount: aides.mpr, color: "bg-[#1e6fd0]" },
        { label: "Prime CEE", amount: aides.cee, color: "bg-[#f5b91e]" },
        ...(aides.rac !== undefined ? [{ label: "Votre reste à charge", amount: aides.rac, color: "bg-teal2" }] : []),
      ].filter((b) => b.amount > 0)
    : [];

  return (
    <div className="grid gap-5">
      <div className="flex items-center gap-2 text-[11px] text-muted">
        <Link href="/espace-client" className="hover:text-teal2">
          Espace client
        </Link>
        <span>›</span>
        <span className="font-semibold text-navy">Mon projet</span>
      </div>

      {!project ? (
        <>
          <h1 className="font-display text-2xl text-navy">Mon projet</h1>
          <div className="rounded-card border border-dashed border-line bg-white p-8 text-center">
            <ShieldCheck size={28} className="mx-auto text-teal2" />
            <p className="mt-3 text-sm font-bold text-navy">Aucun projet pour le moment</p>
            <p className="mx-auto mt-2 max-w-md text-[11px] leading-relaxed text-muted">
              {data.profile.kind === "site"
                ? "Votre compte est bien créé. Dès qu'un projet sera ouvert avec notre équipe, son suivi apparaîtra ici."
                : "Aucun projet n'est rattaché à votre compte. Si vous pensez qu'il s'agit d'une erreur, contactez-nous."}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link href="/aides-financement/calculer-mes-aides" className="btn btn-primary py-2.5 text-[10px]">
                CALCULER MES AIDES
              </Link>
              <Link href="/contact" className="btn btn-outline py-2.5 text-[10px]">
                NOUS CONTACTER
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <div className="flex flex-wrap items-center gap-3.5">
                <h1 className="font-display text-2xl text-navy">Mon projet</h1>
                <span className="rounded bg-soft px-3 py-1 text-[10px] font-bold text-teal2">{project.statusLabel}</span>
              </div>
              <p className="mt-2 text-[11px] text-muted">
                {project.title}
              </p>
            </div>
            <Link href={`/espace-client/demandes/nouvelle?projet=${project.id}`} className="btn btn-primary py-2.5 text-[10px]">
              <ShieldCheck size={13} /> DÉCLARER UN SAV
            </Link>
          </div>

          {data.projects.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {data.projects.map((x) => (
                <Link
                  key={x.id}
                  href={`/espace-client/mon-projet?p=${x.id}`}
                  className={`max-w-full truncate rounded-full border px-3.5 py-2 text-[10.5px] font-medium ${
                    x.id === project.id ? "border-navy bg-navy text-white" : "border-line bg-white text-navy"
                  }`}
                >
                  {x.title}
                  {x.startDate ? ` · ${frDate(x.startDate)}` : ""}
                </Link>
              ))}
            </div>
          )}

          {/* Résumé du projet */}
          <section className="rounded-card border border-line bg-white p-4">
            <div className="flex flex-wrap gap-6">
              <div className="flex min-h-[170px] flex-1 basis-[200px] items-center justify-center rounded-md bg-soft text-teal2">
                <ShieldCheck size={40} />
              </div>
              <div className="flex flex-[3_1_380px] flex-col justify-between gap-4">
                <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3">
                  {project.address.length > 0 && (
                    <div>
                      <p className="text-[9.5px] text-muted">Adresse du chantier</p>
                      <p className="mt-1 text-[11px] font-medium leading-relaxed text-navy">
                        {project.address.map((l, i) => (
                          <span key={i} className="block">
                            {l}
                          </span>
                        ))}
                      </p>
                    </div>
                  )}
                  {project.housing.length > 0 && (
                    <div>
                      <p className="text-[9.5px] text-muted">Logement</p>
                      <p className="mt-1 text-[11px] font-medium leading-relaxed text-navy">
                        {project.housing.map((l, i) => (
                          <span key={i} className="block">
                            {l}
                          </span>
                        ))}
                      </p>
                    </div>
                  )}
                  {project.installDate && (
                    <div>
                      <p className="text-[9.5px] text-muted">Installation réalisée</p>
                      <p className="mt-1 text-[11px] font-medium leading-relaxed text-navy">{frDate(project.installDate)}</p>
                    </div>
                  )}
                </div>
                {financials.length > 0 && (
                  <div className="grid grid-cols-2 rounded-md bg-soft sm:grid-cols-3">
                    {financials.map((f, i) => (
                      <div key={f.label} className={`p-3.5 ${i < financials.length - 1 ? "border-r border-line" : ""}`}>
                        <p className="text-[9.5px] text-muted">{f.label}</p>
                        <p className={`mt-1 whitespace-nowrap text-[15px] font-bold text-navy ${f.color ?? ""}`}>{f.value}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Étapes */}
            <section className="rounded-card border border-line bg-white p-4">
              <h2 className="text-xs font-bold text-navy">Étapes de mon projet</h2>
              <div className="mt-4">
                {project.steps.map((step, i) => (
                  <div key={step.title} className="grid grid-cols-[24px_minmax(0,1fr)] gap-4">
                    <div className="flex flex-col items-center">
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold ${
                          step.done ? "border-teal2 bg-navy text-white" : "border-line bg-white text-navy"
                        }`}
                      >
                        {step.done ? "✓" : i + 1}
                      </span>
                      {i < project.steps.length - 1 && (
                        <span className={`my-1 w-0.5 flex-1 ${step.done && project.steps[i + 1].done ? "bg-teal2" : "bg-line"}`} />
                      )}
                    </div>
                    <div className="pb-5">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="text-[11.5px] font-bold text-navy">{step.title}</span>
                        {step.date && (
                          <span className={`text-[9.5px] font-medium ${step.done ? "text-muted" : "text-teal2"}`}>{step.date}</span>
                        )}
                      </div>
                      <p className="mt-1.5 text-[10px] leading-relaxed text-muted">{step.text}</p>
                      {step.doc && (
                        <a
                          href={`/api/portal/documents/${step.doc.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center gap-2 rounded border border-line px-2.5 py-1.5 text-[9.5px] font-bold text-teal2 hover:bg-soft"
                        >
                          <FileText size={11} /> {step.doc.label}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="flex flex-col gap-4">
              {project.equipments.length > 0 && (
                <section className="rounded-card border border-line bg-white p-4">
                  <h2 className="text-xs font-bold text-navy">Équipements</h2>
                  <div className="mt-3.5 flex flex-col gap-2.5">
                    {project.equipments.map((e, i) => {
                      const Icon = equipmentIcon(e.type, e.name);
                      return (
                        <div key={`${e.name}-${i}`} className="grid grid-cols-[34px_minmax(0,1fr)] gap-3 rounded-md border border-line p-3">
                          <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-soft text-teal2">
                            <Icon size={18} />
                          </span>
                          <div className="min-w-0">
                            <p className="text-[10.5px] font-bold text-navy">{e.name}</p>
                            <p
                              className={`mt-2 flex items-center gap-2 text-[9px] font-semibold ${
                                e.installed ? "text-[#0b6f4c]" : "text-muted"
                              }`}
                            >
                              <ShieldCheck size={11} /> {e.installed ? "Installé" : "Installation à venir"}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {(bars.length > 0 || aides?.statut) && aides && (
                <section className="rounded-card border border-line bg-white p-4">
                  <h2 className="text-xs font-bold text-navy">Aides &amp; reste à charge</h2>
                  {bars.length > 0 && (
                    <>
                      <div className="mt-4 flex h-2.5 overflow-hidden rounded-full">
                        {bars.map((b) => (
                          <span key={b.label} className={b.color} style={{ width: `${(b.amount / barTotal) * 100}%` }} />
                        ))}
                      </div>
                      <div className="mt-3.5 flex flex-col gap-2.5 text-[10px] text-navy">
                        {bars.map((b) => (
                          <div key={b.label} className="flex items-center justify-between gap-3">
                            <span className="flex items-center gap-2.5">
                              <span className={`h-2 w-2 rounded-full ${b.color}`} /> {b.label}
                            </span>
                            <b className="font-bold">{euro(b.amount)}</b>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  {aides.statut && (
                    <p className="mt-3.5 border-t border-line pt-3 text-[9.5px] text-muted">
                      Statut du dossier : <b className="text-navy">{aides.statut}</b>
                    </p>
                  )}
                </section>
              )}

              {nextAppt && (
                <section className="grid grid-cols-[44px_minmax(0,1fr)] items-center gap-3.5 rounded-card bg-[#0f2d44] p-4 text-white">
                  <div className="flex h-12 w-11 flex-col items-center justify-center rounded-md bg-white leading-none text-[#0f2d44]">
                    <span className="text-base font-bold">{dayAndMonth(nextAppt.date).day}</span>
                    <span className="mt-0.5 text-[8px] font-bold">{dayAndMonth(nextAppt.date).month}</span>
                  </div>
                  <div>
                    <p className="text-[9.5px] text-[#9fd9bf]">Prochain rendez-vous</p>
                    <p className="mt-0.5 text-[11.5px] font-bold">
                      {nextAppt.label}
                      {nextAppt.time ? ` · ${nextAppt.time}` : ""}
                    </p>
                    <Link href="/espace-client/rendez-vous" className="mt-2 inline-block text-[9.5px] font-bold text-[#3ecf8e]">
                      Voir mes rendez-vous
                    </Link>
                  </div>
                </section>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
