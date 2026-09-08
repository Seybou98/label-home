import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PagePlaceholder } from "@/components/marketing/PagePlaceholder";

export const metadata: Metadata = buildMetadata({
  title: "Calculer mes aides à la rénovation énergétique",
  description:
    "Estimez en 2 minutes le montant des aides auxquelles vous avez droit pour votre projet de pompe à chaleur, panneaux solaires ou rénovation énergétique.",
  path: "/aides-financement/calculer-mes-aides",
});

export default function CalculerMesAidesPage() {
  return (
    <PagePlaceholder
      breadcrumb={[
        { name: "Aides & financement", path: "/aides-financement" },
        { name: "Calculer mes aides", path: "/aides-financement/calculer-mes-aides" },
      ]}
      eyebrow="SIMULATEUR D'AIDES"
      title="Estimez vos aides en 2 minutes"
      description="Renseignez quelques informations sur votre logement et votre projet pour obtenir une estimation gratuite et sans engagement des aides auxquelles vous êtes éligible."
      cta={{ label: "Démarrer ma simulation", href: "/simuler-mon-projet" }}
    />
  );
}
