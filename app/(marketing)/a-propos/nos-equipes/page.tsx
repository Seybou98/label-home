import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PagePlaceholder } from "@/components/marketing/PagePlaceholder";

export const metadata: Metadata = buildMetadata({
  title: "Nos équipes : des experts RGE à votre service",
  description:
    "Découvrez les équipes de conseillers, techniciens et installateurs certifiés RGE qui accompagnent chaque jour les clients de Label Énergie.",
  path: "/a-propos/nos-equipes",
});

export default function NosEquipesPage() {
  return (
    <PagePlaceholder
      breadcrumb={[
        { name: "À propos", path: "/a-propos/qui-sommes-nous" },
        { name: "Nos équipes", path: "/a-propos/nos-equipes" },
      ]}
      eyebrow="NOS ÉQUIPES"
      title="Des équipes qualifiées à votre service"
      description="Conseillers énergie, techniciens installateurs et service après-vente : plus de 90 collaborateurs s'engagent chaque jour pour la réussite de votre projet."
    />
  );
}
