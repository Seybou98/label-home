import Link from "next/link";
import {
  CalendarClock,
  Download,
  FileText,
  Gift,
  ShieldCheck,
  Wrench,
} from "lucide-react";

const timeline = [
  { label: "Étude personnalisée", done: true },
  { label: "Devis signé", done: true },
  { label: "Installation", done: true },
  { label: "Réception & mise en service", done: true },
  { label: "Service après-vente", done: false },
];

const quickLinks = [
  { label: "Déclarer un SAV", href: "/espace-client/demandes", icon: Wrench },
  { label: "Demander un devis", href: "/espace-client/demandes", icon: FileText },
  { label: "Parrainer un proche", href: "/espace-client/parrainage", icon: Gift },
  { label: "Souscrire un contrat d'entretien", href: "/deja-client/entretien/souscrire", icon: ShieldCheck },
  { label: "Mes rendez-vous", href: "/espace-client/rendez-vous", icon: CalendarClock },
];

export default function EspaceClientPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="font-display text-2xl text-navy">Bonjour Jean 👋</h1>
        <p className="mt-1 text-sm text-muted">
          Bienvenue dans votre espace client Label Énergie. Retrouvez ici le suivi de vos
          projets, vos documents et tous vos services.
        </p>
      </div>

      <div className="rounded-card border border-line bg-white p-6 shadow-card">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-navy">Suivi de mon projet</h2>
          <span className="rounded-full bg-soft px-3 py-1 text-[10px] font-bold text-teal2">
            Installation terminée
          </span>
        </div>
        <ol className="mt-6 flex flex-wrap gap-4">
          {timeline.map((step) => (
            <li key={step.label} className="flex items-center gap-2 text-xs">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${
                  step.done ? "bg-teal2 text-white" : "border border-line text-muted"
                }`}
              >
                {step.done ? "✓" : ""}
              </span>
              <span className={step.done ? "font-semibold text-navy" : "text-muted"}>{step.label}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-card border border-line bg-white p-6 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-navy">Mes documents récents</h2>
            <Link href="/espace-client/documents" className="text-xs font-bold text-teal2">
              Voir tous
            </Link>
          </div>
          <ul className="mt-4 grid gap-3">
            {["PV de réception", "Facture finale", "Notice d'utilisation PAC", "Certificat de garantie"].map(
              (doc) => (
                <li key={doc} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-navy">
                    <FileText size={14} className="text-teal2" /> {doc}
                  </span>
                  <Download size={14} className="text-muted" />
                </li>
              ),
            )}
          </ul>
        </div>

        <div className="rounded-card border border-line bg-white p-6 shadow-card">
          <h2 className="text-sm font-bold text-navy">Accès rapides</h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex flex-col items-start gap-2 rounded-md border border-line p-3 text-xs font-semibold text-navy hover:border-teal2"
              >
                <link.icon size={16} className="text-teal2" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-card bg-gradient-to-r from-navy to-teal2 p-6 text-white">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-lg">Parrainez et bénéficiez de 300 € !</h2>
            <p className="mt-1 text-xs text-white/85">
              Recommandez Label Énergie à vos proches et recevez 300 € dès que leur installation
              est terminée.
            </p>
          </div>
          <Link
            href="/espace-client/parrainage"
            className="inline-flex shrink-0 items-center rounded-md bg-white px-4 py-2 text-xs font-extrabold text-navy"
          >
            VOIR MON LIEN DE PARRAINAGE
          </Link>
        </div>
      </div>
    </div>
  );
}
