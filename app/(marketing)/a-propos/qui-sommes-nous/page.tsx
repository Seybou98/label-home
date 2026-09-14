import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PagePlaceholder } from "@/components/marketing/PagePlaceholder";

export const metadata: Metadata = buildMetadata({
  title: "Qui sommes-nous ? L'histoire de Label Énergie",
  description:
    "Découvrez l'histoire, les valeurs et l'engagement de Label Énergie, entreprise RGE spécialisée dans les solutions énergétiques depuis plus de 13 ans.",
  path: "/a-propos/qui-sommes-nous",
});

export default function QuiSommesNousPage() {
  return (
    <PagePlaceholder
      breadcrumb={[{ name: "Qui sommes-nous ?", path: "/a-propos/qui-sommes-nous" }]}
      eyebrow="À PROPOS"
      title="Label Énergie, votre partenaire de confiance"
      description="Depuis plus de 13 ans, Label Énergie accompagne les particuliers dans leurs projets de rénovation énergétique : pompe à chaleur, climatisation, solaire et eau chaude."
    />
  );
}
