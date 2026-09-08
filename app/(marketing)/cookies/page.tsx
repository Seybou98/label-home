import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PagePlaceholder } from "@/components/marketing/PagePlaceholder";

export const metadata: Metadata = buildMetadata({
  title: "Gestion des cookies",
  description: "Informations sur l'utilisation des cookies sur le site Label Énergie et gestion de vos préférences.",
  path: "/cookies",
  noIndex: true,
});

export default function CookiesPage() {
  return (
    <PagePlaceholder
      breadcrumb={[{ name: "Gestion des cookies", path: "/cookies" }]}
      eyebrow="COOKIES"
      title="Gestion des cookies"
      description="Le détail des cookies utilisés sur le site et le module de gestion de vos préférences seront intégrés ici, avec le bandeau de consentement associé."
    />
  );
}
