import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PagePlaceholder } from "@/components/marketing/PagePlaceholder";

export const metadata: Metadata = buildMetadata({
  title: "Déclarer un SAV sur votre équipement Label Énergie",
  description:
    "Un problème sur votre pompe à chaleur, votre climatisation ou vos panneaux solaires ? Déclarez votre demande de SAV en ligne, nos techniciens vous recontactent rapidement.",
  path: "/deja-client/sav",
});

export default function SavPage() {
  return (
    <PagePlaceholder
      breadcrumb={[
        { name: "Déjà client", path: "/deja-client" },
        { name: "SAV", path: "/deja-client/sav" },
      ]}
      eyebrow="SERVICE APRÈS-VENTE"
      title="Une question ou une panne sur votre équipement ?"
      description="Déclarez votre demande de SAV en quelques clics : nos techniciens certifiés interviennent rapidement pour diagnostiquer et résoudre le problème. Le formulaire de déclaration sera disponible ici prochainement — en attendant, contactez-nous directement."
      cta={{ label: "Nous contacter", href: "/contact" }}
    />
  );
}
