import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PagePlaceholder } from "@/components/marketing/PagePlaceholder";

export const metadata: Metadata = buildMetadata({
  title: "Nos partenaires : EDF, Daikin, Atlantic, Mitsubishi Electric",
  description:
    "Label Énergie installe les plus grandes marques du marché : Daikin, Mitsubishi Electric, Atlantic, LG. Partenaire officiel EDF pour la revente d'électricité solaire.",
  path: "/a-propos/nos-partenaires",
});

export default function NosPartenairesPage() {
  return (
    <PagePlaceholder
      breadcrumb={[
        { name: "À propos", path: "/a-propos/qui-sommes-nous" },
        { name: "Nos partenaires", path: "/a-propos/nos-partenaires" },
      ]}
      eyebrow="NOS PARTENAIRES"
      title="Les meilleures marques du marché"
      description="Daikin, Mitsubishi Electric, Atlantic, LG, Ariston : nous installons des équipements fiables et performants. Label Énergie est également partenaire officiel d'EDF."
    />
  );
}
