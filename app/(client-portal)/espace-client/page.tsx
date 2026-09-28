import Link from "next/link";
import {
  ArrowRight,
  Bell,
  CalendarClock,
  ChevronRight,
  Download,
  FileText,
  Gift,
  Headphones,
  MessageSquare,
  Phone,
  Receipt,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { siteConfig } from "@/lib/site";
import { frDate, frLongDate, getMyPortal } from "@/lib/portal";

const quickLinks: { label: string; sub?: string; href: string; icon: LucideIcon }[] = [
  { label: "Déclarer un SAV", href: "/espace-client/demandes/nouvelle", icon: Wrench },
  { label: "Demander un devis", href: "/contact", icon: FileText },
  { label: "Parrainer un proche", sub: "Gagnez 300 €", href: "/espace-client/parrainage", icon: Gift },
  { label: "Souscrire un contrat d'entretien", href: "/deja-client/entretien/souscrire", icon: ShieldCheck },
  { label: "Mes rendez-vous", href: "/espace-client/rendez-vous", icon: CalendarClock },
  { label: "Mon coach énergie", href: "/espace-client/coach-energie", icon: Headphones },
];

const notifIcon: Record<string, { icon: LucideIcon; bg: string }> = {
  rdv: { icon: CalendarClock, bg: "bg-[#0b6f4c]" },
  sav: { icon: MessageSquare, bg: "bg-[#7fa3d6]" },
  contrat: { icon: Bell, bg: "bg-[#0b6f4c]" },
};

const contractStatus = {
  active: { label: "Actif", cls: "bg-soft text-teal2" },
  upcoming: { label: "À venir", cls: "bg-soft text-teal2" },
  signature: { label: "À signer", cls: "bg-[#fdf5e0] text-[#8a6508]" },
  expired: { label: "Terminé", cls: "bg-soft text-muted" },
} as const;

const Empty = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-3 rounded-md border border-dashed border-line p-4 text-center text-[10.5px] leading-relaxed text-muted">
    {children}
  </p>
);

export default async function EspaceClientPage() {
  const data = await getMyPortal();
  const firstName = data.profile.firstName || data.profile.name.split(" ")[0] || "";
  const project = data.projects[0];
  const recentDocs = data.documents.slice(0, 5);
  const contract = data.contracts[0];

  return (
    <div className="grid gap-5">
      {/* Bonjour + aide */}
      <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_260px]">
        <div>
          <h1 className="font-display text-2xl text-navy">Bonjour {firstName} 👋</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Bienvenue dans votre espace client Label Énergie. Retrouvez ici le suivi de vos
            projets, vos documents et tous vos services.
          </p>
        </div>
        <div className="rounded-card border border-line bg-white p-4">
          <p className="text-xs font-bold text-navy">Votre service client</p>
          <div className="mt-3 flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-soft text-teal2">
              <Phone size={18} />
            </span>
            <div className="text-xs leading-relaxed text-navy">
              <a href={`tel:${siteConfig.phone}`} className="font-bold">
                {siteConfig.phoneDisplay}
              </a>
              <p className="text-muted">Du lundi au vendredi, 8h–18h</p>
            </div>
          </div>
          <Link href="/contact" className="btn btn-outline mt-3 w-full justify-center py-2 text-[11px]">
            <MessageSquare size={14} /> NOUS CONTACTER
          </Link>
        </div>
      </div>

      {/* Suivi de mon projet */}
      <div className="rounded-card border border-line bg-white p-5">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-sm font-bold text-navy">Suivi de mon projet</h2>
          {project && <span className="rounded bg-soft px-2.5 py-1 text-[10px] font-bold text-teal2">{project.statusLabel}</span>}
        </div>

        {project ? (
          <>
            <ol
              className="relative mt-7 grid grid-cols-2 gap-y-4 border-b border-line pb-5 sm:[grid-template-columns:repeat(var(--n),minmax(0,1fr))]"
              style={{ "--n": project.steps.length } as React.CSSProperties}
            >
              <span
                className="absolute top-[11px] hidden h-0.5 bg-teal2 sm:block"
                style={{ left: `${50 / project.steps.length}%`, right: `${50 / project.steps.length}%` }}
                aria-hidden
              />
              {project.steps.map((step, i) => (
                <li key={step.title} className="relative flex flex-col items-center text-center">
                  <span
                    className={`flex h-[22px] w-[22px] items-center justify-center rounded-full border text-[10px] font-bold ${
                      step.done ? "border-teal2 bg-navy text-white" : "border-line bg-white text-muted"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className={`mt-3 text-[10px] ${step.done ? "font-semibold text-navy" : "text-muted"}`}>
                    {step.title}
                  </span>
                  <span className={`mt-1.5 text-[9px] ${step.done ? "text-teal2" : "text-muted"}`}>
                    {step.done ? "✓ Terminée" : step.date === "Disponible" ? "Disponible" : "À venir"}
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-4 grid gap-5 sm:grid-cols-[96px_minmax(0,1fr)_200px] sm:items-center">
              <div className="flex h-[86px] items-center justify-center rounded-md bg-soft text-teal2">
                <ShieldCheck size={30} />
              </div>
              <div>
                <p className="text-xs font-bold text-navy">
                  {project.installDate ? `Installation réalisée le ${frLongDate(project.installDate)}` : project.statusLabel}
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-muted">{project.title}</p>
              </div>
              <div className="flex flex-col gap-2">
                <Link href="/espace-client/mon-projet" className="btn btn-outline justify-center py-2 text-[10px]">
                  VOIR LE DÉTAIL DU PROJET
                </Link>
                <Link href="/espace-client/demandes/nouvelle" className="btn btn-primary justify-center py-2 text-[10px]">
                  DÉCLARER UN SAV
                </Link>
              </div>
            </div>
          </>
        ) : (
          <Empty>
            {data.profile.kind === "site"
              ? "Votre compte est créé. Dès qu'un projet sera ouvert avec notre équipe, son suivi apparaîtra ici."
              : "Aucun projet n'est rattaché à votre compte pour le moment."}{" "}
            <Link href="/contact" className="font-bold text-teal2">
              Contactez-nous
            </Link>{" "}
            pour en parler.
          </Empty>
        )}
      </div>

      {/* Documents + Accès rapides */}
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-card border border-line bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-navy">Mes documents récents</h2>
            <Link href="/espace-client/documents" className="text-[10px] font-bold text-teal2">
              VOIR TOUS
            </Link>
          </div>
          {recentDocs.length ? (
            <ul className="mt-3">
              {recentDocs.map((doc, i) => (
                <li
                  key={doc.id}
                  className={`grid grid-cols-[20px_minmax(0,1fr)_auto_24px] items-center gap-3 py-2.5 ${
                    i > 0 ? "border-t border-line" : ""
                  }`}
                >
                  <FileText size={16} className="text-red-600" />
                  <p className="truncate text-[11px] font-medium text-navy">{doc.name}</p>
                  <span className="text-[10px] text-muted">{frDate(doc.date)}</span>
                  <a
                    href={`/api/portal/documents/${doc.id}?download=1`}
                    title="Télécharger"
                    className="flex justify-center text-navy"
                  >
                    <Download size={14} />
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <Empty>Vos documents (devis, PV de réception, attestations, contrats) apparaîtront ici dès qu&apos;ils seront disponibles.</Empty>
          )}
        </div>

        <div className="rounded-card border border-line bg-white p-5">
          <h2 className="text-xs font-bold text-navy">Accès rapides</h2>
          <div className="mt-3 grid grid-cols-2 gap-2.5">
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex min-h-[66px] items-center gap-3 rounded-md border border-line p-3 text-navy hover:border-teal2 hover:bg-soft"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-soft text-teal2">
                  <link.icon size={16} />
                </span>
                <span>
                  <span className="block text-[10.5px] font-bold leading-snug">{link.label}</span>
                  {link.sub && <span className="mt-0.5 block text-[9px] text-muted">{link.sub}</span>}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications + Parrainage */}
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-card border border-line bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-navy">Notifications</h2>
            <Link href="/espace-client/demandes" className="text-[10px] font-bold text-teal2">
              MES DEMANDES
            </Link>
          </div>
          {data.notifications.length ? (
            <ul className="mt-2">
              {data.notifications.map((n, i) => {
                const { icon: Icon, bg } = notifIcon[n.kind];
                return (
                  <li key={n.title} className={i > 0 ? "border-t border-line" : ""}>
                    <Link href={n.href} className="grid grid-cols-[28px_minmax(0,1fr)_auto] items-center gap-3 py-3">
                      <span className={`flex h-7 w-7 items-center justify-center rounded-full text-white ${bg}`}>
                        <Icon size={14} />
                      </span>
                      <div>
                        <p className="text-[10px] font-bold leading-snug text-navy">{n.title}</p>
                        <p className="mt-1 text-[9px] text-muted">{n.text}</p>
                      </div>
                      <span className="text-[9px] text-muted">{frDate(n.date)}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <Empty>Aucune notification pour le moment.</Empty>
          )}
        </div>

        <div className="rounded-card bg-gradient-to-br from-[#eef6f1] to-[#e3f0e9] p-6">
          <p className="text-sm font-bold leading-snug text-[#0b5c42]">
            Parrainez et
            <br />
            bénéficiez de 300 € !
          </p>
          <p className="mt-3 text-[11px] leading-relaxed text-navy">
            Recommandez Label Énergie à vos proches et recevez 300 € dès que leur installation est
            terminée.
          </p>
          <Link
            href="/espace-client/parrainage"
            className="mt-4 inline-flex items-center gap-2 rounded border border-teal2 bg-white px-3.5 py-2 text-[10px] font-bold text-[#0b5c42] hover:bg-soft"
          >
            VOIR MON LIEN DE PARRAINAGE <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* Contrats + Factures */}
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-card border border-line bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-navy">Mes contrats</h2>
            <Link href="/espace-client/contrats" className="text-[10px] font-bold text-teal2">
              VOIR TOUS
            </Link>
          </div>
          {contract ? (
            <Link
              href="/espace-client/contrats"
              className="mt-3 block rounded-md border border-line p-4 text-navy hover:border-teal2"
            >
              <div className="grid grid-cols-[20px_minmax(0,1fr)_14px] items-start gap-3">
                <ShieldCheck size={18} className="mt-0.5 text-teal2" />
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-[11px] font-bold text-navy">
                      Contrat d&apos;entretien{contract.formula ? ` ${contract.formula}` : ""}
                    </span>
                    <span className={`rounded px-2 py-0.5 text-[9px] font-bold ${contractStatus[contract.status].cls}`}>
                      {contractStatus[contract.status].label}
                    </span>
                  </div>
                  <p className="mt-2 text-[10px] leading-relaxed text-muted">
                    {contract.equipment.join(", ")}
                    {contract.number && (
                      <>
                        <br />N° contrat : {contract.number}
                      </>
                    )}
                  </p>
                </div>
                <ChevronRight size={14} className="mt-0.5 text-navy" />
              </div>
              {contract.end && (
                <div className="mt-3 flex items-center gap-2 border-t border-line pt-3 text-[10px] text-navy">
                  <CalendarClock size={14} /> Échéance : {frDate(contract.end)}
                </div>
              )}
            </Link>
          ) : (
            <Empty>
              Vous n&apos;avez pas encore de contrat d&apos;entretien.{" "}
              <Link href="/deja-client/entretien/souscrire" className="font-bold text-teal2">
                Découvrir nos formules
              </Link>
            </Empty>
          )}
        </div>

        <div className="rounded-card border border-line bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-navy">Mes dernières factures</h2>
            <Link href="/espace-client/factures" className="text-[10px] font-bold text-teal2">
              VOIR TOUTES
            </Link>
          </div>
          <div className="mt-3 flex items-center gap-3 rounded-md border border-dashed border-line p-4 text-[10.5px] leading-relaxed text-muted">
            <Receipt size={18} className="shrink-0 text-teal2" />
            <span>Vos factures seront bientôt disponibles dans votre espace client.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
