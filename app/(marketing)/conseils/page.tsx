import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PagePlaceholder } from "@/components/marketing/PagePlaceholder";

export const metadata: Metadata = buildMetadata({
  title: "Conseils énergie : guides pompe à chaleur, solaire, aides",
  description:
    "Retrouvez nos guides et conseils pratiques sur le chauffage, la climatisation, le solaire et les aides à la rénovation énergétique.",
  path: "/conseils",
});

export default function ConseilsPage() {
  return (
    <PagePlaceholder
      breadcrumb={[{ name: "Conseils", path: "/conseils" }]}
      eyebrow="BLOG & CONSEILS"
      title="Nos conseils pour bien choisir vos équipements"
      description="Guides pratiques, comparatifs et actualités sur le chauffage, la climatisation, le solaire et les aides à la rénovation énergétique. Les premiers articles arrivent très prochainement."
    />
  );
}
