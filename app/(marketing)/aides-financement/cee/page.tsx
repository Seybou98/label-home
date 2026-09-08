import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PagePlaceholder } from "@/components/marketing/PagePlaceholder";

export const metadata: Metadata = buildMetadata({
  title: "CEE : certificats d'économies d'énergie",
  description:
    "Les certificats d'économies d'énergie (CEE) permettent de financer une partie de vos travaux de rénovation énergétique. Découvrez comment en bénéficier avec Label Énergie.",
  path: "/aides-financement/cee",
});

export default function CeePage() {
  return (
    <PagePlaceholder
      breadcrumb={[
        { name: "Aides & financement", path: "/aides-financement" },
        { name: "CEE", path: "/aides-financement/cee" },
      ]}
      eyebrow="CERTIFICATS D'ÉCONOMIES D'ÉNERGIE"
      title="Les CEE, une prime versée par les fournisseurs d'énergie"
      description="Le dispositif des CEE oblige les fournisseurs d'énergie à financer une partie de vos travaux d'économies d'énergie. Label Énergie s'occupe de toutes les démarches pour vous."
      cta={{ label: "Calculer mes aides", href: "/aides-financement/calculer-mes-aides" }}
    />
  );
}
