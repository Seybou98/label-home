import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PagePlaceholder } from "@/components/marketing/PagePlaceholder";

export const metadata: Metadata = buildMetadata({
  title: "Recrutement : rejoignez les équipes de Label Énergie",
  description:
    "Label Énergie recrute des techniciens installateurs, conseillers énergie et commerciaux. Découvrez nos offres d'emploi et rejoignez une entreprise en croissance.",
  path: "/a-propos/recrutement",
});

export default function RecrutementPage() {
  return (
    <PagePlaceholder
      breadcrumb={[
        { name: "À propos", path: "/a-propos/qui-sommes-nous" },
        { name: "Recrutement", path: "/a-propos/recrutement" },
      ]}
      eyebrow="RECRUTEMENT"
      title="Rejoignez l'équipe Label Énergie"
      description="Techniciens, conseillers, commerciaux : nous recrutons régulièrement pour accompagner notre croissance. Nos offres d'emploi seront bientôt publiées ici."
      cta={{ label: "Nous contacter", href: "/contact" }}
    />
  );
}
