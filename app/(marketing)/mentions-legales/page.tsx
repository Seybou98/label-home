import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PagePlaceholder } from "@/components/marketing/PagePlaceholder";

export const metadata: Metadata = buildMetadata({
  title: "Mentions légales",
  description: "Mentions légales du site Label Énergie : éditeur, hébergeur et informations légales.",
  path: "/mentions-legales",
  noIndex: true,
});

export default function MentionsLegalesPage() {
  return (
    <PagePlaceholder
      breadcrumb={[{ name: "Mentions légales", path: "/mentions-legales" }]}
      eyebrow="INFORMATIONS LÉGALES"
      title="Mentions légales"
      description="Éditeur du site, hébergeur, numéro SIRET, directeur de la publication : les mentions légales complètes de Label Énergie seront publiées ici."
    />
  );
}
