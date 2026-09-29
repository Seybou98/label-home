import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ContactExperience } from "@/components/marketing/ContactExperience";

export const metadata: Metadata = buildMetadata({
  title: "Contact : parlons de votre projet énergétique",
  description:
    "Contactez Label Énergie pour un devis gratuit ou une question sur votre projet de pompe à chaleur, climatisation, solaire ou eau chaude. Réponse rapide de nos conseillers.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Contact", path: "/contact" }]} />
      <ContactExperience />
    </>
  );
}
