import Link from "next/link";
import { Check } from "lucide-react";
import { getMyPortal } from "@/lib/portal";

const Field = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-1.5 text-[9.5px] text-muted">
    {label}
    <span className="flex min-h-[36px] items-center border-b border-line text-[11.5px] font-medium text-navy">{value || "—"}</span>
  </div>
);

export default async function ProfilPage() {
  const { profile, projects } = await getMyPortal();
  const initials = `${profile.firstName[0] ?? ""}${profile.lastName[0] ?? ""}`.toUpperCase() || profile.name[0]?.toUpperCase() || "?";
  const housing = projects[0]?.housing ?? [];
  const addr = profile.address;

  return (
    <div className="grid gap-5">
      <div className="flex items-center gap-2 text-[11px] text-muted">
        <Link href="/espace-client" className="hover:text-teal2">
          Espace client
        </Link>
        <span>›</span>
        <span className="font-semibold text-navy">Mon profil</span>
      </div>

      <div>
        <h1 className="font-display text-2xl text-navy">Mon profil</h1>
        <p className="mt-2 text-[11px] text-muted">Vos informations personnelles et votre sécurité.</p>
      </div>

      <section className="flex flex-wrap items-center gap-5 rounded-card border border-line bg-white p-5">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-navy text-xl font-bold text-white">
          {initials}
        </span>
        <div className="min-w-[220px] flex-1">
          <p className="text-base font-bold text-navy">{profile.name || "—"}</p>
          <p className="mt-1 text-[10.5px] text-muted">{profile.email}</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded bg-[#eaf6ef] px-3 py-1.5 text-[9.5px] font-bold text-[#0b6f4c]">
          <Check size={12} /> Email vérifié
        </span>
      </section>

      <div className="flex flex-wrap items-start gap-4">
        <div className="flex min-w-0 flex-[3_1_420px] flex-col gap-4">
          <section className="rounded-card border border-line bg-white p-5">
            <h2 className="text-xs font-bold text-navy">Informations personnelles</h2>
            <div className="mt-4 grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              <Field label="Civilité" value={profile.civility} />
              <Field label="Prénom" value={profile.firstName} />
              <Field label="Nom" value={profile.lastName} />
              <Field label="Email" value={profile.email} />
              <Field label="Téléphone" value={profile.phone} />
            </div>
            <p className="mt-4 text-[9.5px] leading-relaxed text-muted">
              Une information est incorrecte ?{" "}
              <a
                href="mailto:contact@labelenergie.fr?subject=Correction de mes informations"
                className="font-bold text-navy underline"
              >
                Écrivez-nous
              </a>{" "}
              et nous la mettrons à jour.
            </p>
          </section>

          {profile.kind === "crm" && (addr || housing.length > 0) && (
            <section className="rounded-card border border-line bg-white p-5">
              <h2 className="text-xs font-bold text-navy">Mon logement</h2>
              <div className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                {addr && (
                  <div>
                    <p className="text-[9.5px] text-muted">Adresse</p>
                    <p className="mt-1 text-[11px] font-medium leading-relaxed text-navy">
                      {addr.street}
                      <br />
                      {addr.postalCode} {addr.city}
                    </p>
                  </div>
                )}
                {housing.length > 0 && (
                  <div>
                    <p className="text-[9.5px] text-muted">Type de logement</p>
                    <p className="mt-1 text-[11px] font-medium leading-relaxed text-navy">
                      {housing.map((l, i) => (
                        <span key={i} className="block">
                          {l}
                        </span>
                      ))}
                    </p>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>

        <div className="flex min-w-0 flex-[2_1_260px] flex-col gap-4">
          <section className="rounded-card border border-line bg-white p-4">
            <h2 className="text-xs font-bold text-navy">Sécurité</h2>
            <p className="mt-3 text-[10px] leading-relaxed text-muted">
              Vous vous connectez avec un code envoyé par e-mail à chaque connexion : aucun mot de passe
              n&apos;est nécessaire.
            </p>
          </section>

          <section className="rounded-card border border-line bg-white p-4">
            <h2 className="text-xs font-bold text-navy">Mes données</h2>
            <p className="mt-2.5 text-[9.5px] leading-relaxed text-muted">
              Conformément au RGPD, vous pouvez consulter, exporter ou supprimer vos données personnelles.
            </p>
            <a
              href="mailto:contact@labelenergie.fr?subject=Export de mes données personnelles"
              className="btn btn-outline mt-3.5 w-full justify-center py-2.5 text-[9.5px]"
            >
              EXPORTER MES DONNÉES
            </a>
            <a
              href="mailto:contact@labelenergie.fr?subject=Demande de suppression de compte"
              className="mt-3 block text-center text-[9.5px] text-red-600 hover:text-red-700"
            >
              Supprimer mon compte
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
