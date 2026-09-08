import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PagePlaceholder } from "@/components/marketing/PagePlaceholder";

export const metadata: Metadata = buildMetadata({
  title: "Aides & financement pour vos travaux énergétiques",
  description:
    "MaPrimeRénov', CEE, éco-prêt à taux 0 : découvrez toutes les aides disponibles pour financer votre pompe à chaleur, vos panneaux solaires ou votre rénovation énergétique.",
  path: "/aides-financement",
});

export default function AidesFinancementPage() {
  return (
    <PagePlaceholder
      breadcrumb={[{ name: "Aides & financement", path: "/aides-financement" }]}
      eyebrow="AIDES & FINANCEMENT"
      title="Financez votre projet grâce aux aides de l'État"
      description="MaPrimeRénov', certificats d'économies d'énergie (CEE), éco-prêt à taux 0, TVA réduite : Label Énergie vous aide à identifier et à obtenir toutes les aides auxquelles vous avez droit."
      cta={{ label: "Calculer mes aides", href: "/aides-financement/calculer-mes-aides" }}
    />
  );
}
