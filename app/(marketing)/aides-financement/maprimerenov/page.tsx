import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PagePlaceholder } from "@/components/marketing/PagePlaceholder";

export const metadata: Metadata = buildMetadata({
  title: "MaPrimeRénov' : conditions, montants et démarches",
  description:
    "Tout savoir sur MaPrimeRénov' : montants, conditions d'éligibilité et démarches pour financer votre pompe à chaleur, vos panneaux solaires ou vos travaux de rénovation.",
  path: "/aides-financement/maprimerenov",
});

export default function MaPrimeRenovPage() {
  return (
    <PagePlaceholder
      breadcrumb={[
        { name: "Aides & financement", path: "/aides-financement" },
        { name: "MaPrimeRénov'", path: "/aides-financement/maprimerenov" },
      ]}
      eyebrow="AIDE DE L'ÉTAT"
      title="MaPrimeRénov' : la principale aide à la rénovation énergétique"
      description="MaPrimeRénov' finance une partie de vos travaux d'isolation, de chauffage ou de production d'énergie renouvelable, selon vos revenus et le gain énergétique obtenu."
      cta={{ label: "Calculer mes aides", href: "/aides-financement/calculer-mes-aides" }}
    />
  );
}
