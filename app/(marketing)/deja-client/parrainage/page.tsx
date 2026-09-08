import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PagePlaceholder } from "@/components/marketing/PagePlaceholder";

export const metadata: Metadata = buildMetadata({
  title: "Parrainage Label Énergie : gagnez 300 €",
  description:
    "Recommandez Label Énergie à vos proches et recevez 300 € dès que leur installation est terminée. Découvrez notre programme de parrainage.",
  path: "/deja-client/parrainage",
});

export default function ParrainagePage() {
  return (
    <PagePlaceholder
      breadcrumb={[
        { name: "Déjà client", path: "/deja-client" },
        { name: "Parrainage", path: "/deja-client/parrainage" },
      ]}
      eyebrow="PROGRAMME DE PARRAINAGE"
      title="Parrainez et bénéficiez de 300 € !"
      description="Recommandez Label Énergie à vos proches et recevez 300 € dès que leur installation est terminée. Connectez-vous à votre espace client pour récupérer votre lien de parrainage personnel."
      cta={{ label: "Accéder à mon espace client", href: "/espace-client" }}
    />
  );
}
