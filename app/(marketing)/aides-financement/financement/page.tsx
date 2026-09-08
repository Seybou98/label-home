import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PagePlaceholder } from "@/components/marketing/PagePlaceholder";

export const metadata: Metadata = buildMetadata({
  title: "Financement de vos travaux : éco-prêt et paiement facilité",
  description:
    "Éco-prêt à taux 0, financement en plusieurs fois : découvrez les solutions pour financer votre projet énergétique sans avancer les fonds.",
  path: "/aides-financement/financement",
});

export default function FinancementPage() {
  return (
    <PagePlaceholder
      breadcrumb={[
        { name: "Aides & financement", path: "/aides-financement" },
        { name: "Financement", path: "/aides-financement/financement" },
      ]}
      eyebrow="SOLUTIONS DE FINANCEMENT"
      title="Financez votre projet sans avancer les fonds"
      description="Éco-prêt à taux 0, paiement en plusieurs fois : Label Énergie vous accompagne pour trouver la solution de financement adaptée à votre projet et à votre budget."
      cta={{ label: "Nous contacter", href: "/contact" }}
    />
  );
}
