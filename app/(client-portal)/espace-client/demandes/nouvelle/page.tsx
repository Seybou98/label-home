import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { SavRequestForm } from "@/components/client-portal/SavRequestForm";
import { frDate, getMyPortal } from "@/lib/portal";

export default async function NouvelleDemandePage({ searchParams }: { searchParams: Promise<{ projet?: string }> }) {
  const data = await getMyPortal();
  const { projet } = await searchParams;

  // Un SAV concerne une installation existante : projets non annulés du client.
  const projects = data.projects
    .filter((p) => p.phase !== "cancelled")
    .map((p) => ({ id: p.id, label: `${p.title}${p.startDate ? ` · ${frDate(p.startDate)}` : ""}` }));

  return (
    <div className="grid gap-5">
      <div className="flex items-center gap-2 text-[11px] text-muted">
        <Link href="/espace-client" className="hover:text-teal2">
          Espace client
        </Link>
        <span>›</span>
        <Link href="/espace-client/demandes" className="hover:text-teal2">
          Mes demandes
        </Link>
        <span>›</span>
        <span className="font-semibold text-navy">Déclarer un SAV</span>
      </div>

      <div>
        <h1 className="font-display text-2xl text-navy">Déclarer un SAV</h1>
        <p className="mt-2 text-[11px] text-muted">Décrivez votre problème : notre équipe SAV examine votre demande et vous recontacte.</p>
      </div>

      {data.profile.kind === "site" ? (
        <div className="rounded-card border border-dashed border-line bg-white p-8 text-center">
          <MessageSquare size={28} className="mx-auto text-teal2" />
          <p className="mt-3 text-sm font-bold text-navy">Aucune installation rattachée à votre compte</p>
          <p className="mx-auto mt-2 max-w-md text-[11px] leading-relaxed text-muted">
            La déclaration en ligne est réservée aux clients ayant une installation Label Énergie. Contactez-nous et nous
            rattacherons votre dossier.
          </p>
          <Link href="/contact" className="btn btn-primary mt-5 py-2.5 text-[10px]">
            NOUS CONTACTER
          </Link>
        </div>
      ) : (
        <SavRequestForm projects={projects} initialProjectId={projet} />
      )}
    </div>
  );
}
