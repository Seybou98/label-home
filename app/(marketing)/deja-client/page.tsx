import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Gift, LogIn, ShieldCheck, Wrench } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export const metadata: Metadata = buildMetadata({
  title: "Déjà client Label Énergie : espace, SAV, entretien, parrainage",
  description:
    "Vous êtes déjà équipé par Label Énergie ? Accédez à votre espace client, déclarez un SAV, souscrivez un contrat d'entretien ou parrainez un proche.",
  path: "/deja-client",
});

const links = [
  {
    title: "Mon espace client",
    text: "Suivez votre installation, vos documents et vos contrats.",
    href: "/espace-client",
    icon: LogIn,
  },
  {
    title: "Déclarer un SAV",
    text: "Un équipement en panne ou une question technique ?",
    href: "/deja-client/sav",
    icon: Wrench,
  },
  {
    title: "Entretien & contrats",
    text: "Souscrivez un contrat d'entretien pour vos équipements.",
    href: "/deja-client/entretien",
    icon: ShieldCheck,
  },
  {
    title: "Parrainage",
    text: "Recommandez Label Énergie et gagnez 300 €.",
    href: "/deja-client/parrainage",
    icon: Gift,
  },
];

export default function DejaClientPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Déjà client", path: "/deja-client" }]} />
      <section className="section">
        <div className="container">
          <h1 className="font-display text-2xl text-navy">Vous êtes déjà équipé par Label Énergie ?</h1>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            Retrouvez tous les services dédiés à nos clients : suivi de votre installation, SAV,
            entretien et parrainage.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-start gap-4 rounded-card border border-line bg-white p-5 shadow-card hover:border-teal2"
              >
                <link.icon className="mt-1 shrink-0 text-teal2" size={24} />
                <div>
                  <h2 className="text-sm font-bold text-navy">{link.title}</h2>
                  <p className="mt-1 text-xs text-muted">{link.text}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-extrabold text-teal2">
                    Accéder <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
