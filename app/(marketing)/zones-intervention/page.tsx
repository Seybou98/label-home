import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PagePlaceholder } from "@/components/marketing/PagePlaceholder";

export const metadata: Metadata = buildMetadata({
  title: "Zones d'intervention Label Énergie",
  description:
    "Label Énergie intervient en Île-de-France et dans les départements limitrophes pour l'installation de pompes à chaleur, climatisation, solaire et eau chaude.",
  path: "/zones-intervention",
});

export default function ZonesInterventionPage() {
  return (
    <PagePlaceholder
      breadcrumb={[{ name: "Zones d'intervention", path: "/zones-intervention" }]}
      eyebrow="ZONES D'INTERVENTION"
      title="Nous intervenons près de chez vous"
      description="Label Énergie intervient en Île-de-France et dans les départements limitrophes. Les pages détaillées par ville seront ajoutées prochainement pour vous informer sur nos délais et références locales."
      cta={{ label: "Nous contacter", href: "/contact" }}
    />
  );
}
