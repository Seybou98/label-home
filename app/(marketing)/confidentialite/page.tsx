import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PagePlaceholder } from "@/components/marketing/PagePlaceholder";

export const metadata: Metadata = buildMetadata({
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité de Label Énergie : collecte, usage et protection de vos données personnelles conformément au RGPD.",
  path: "/confidentialite",
  noIndex: true,
});

export default function ConfidentialitePage() {
  return (
    <PagePlaceholder
      breadcrumb={[{ name: "Politique de confidentialité", path: "/confidentialite" }]}
      eyebrow="DONNÉES PERSONNELLES"
      title="Politique de confidentialité"
      description="Conformément au RGPD, cette page détaillera la collecte, l'usage et la protection de vos données personnelles sur le site Label Énergie."
    />
  );
}
