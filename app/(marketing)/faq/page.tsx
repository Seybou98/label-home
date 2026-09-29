import type { Metadata } from "next";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { FaqExperience } from "@/components/marketing/FaqExperience";

export const metadata: Metadata = buildMetadata({
  title: "FAQ & Centre d'aide : questions fréquentes",
  description:
    "Retrouvez les réponses aux questions les plus fréquentes sur nos solutions, les aides financières, l'installation, l'entretien et votre espace client.",
  path: "/faq",
});

const faqForJsonLd = [
  {
    question: "Quelles aides puis-je obtenir pour mon projet ?",
    answer:
      "Selon votre projet et vos revenus, vous pouvez cumuler MaPrimeRénov', les certificats d'économies d'énergie (CEE), l'éco-prêt à taux 0 et une TVA réduite à 5,5 %.",
  },
  {
    question: "Label Énergie est-elle certifiée RGE ?",
    answer:
      "Oui, Label Énergie est une entreprise certifiée RGE (Reconnu Garant de l'Environnement), condition indispensable pour bénéficier des aides de l'État.",
  },
  {
    question: "Quels sont les délais d'installation ?",
    answer:
      "Comptez généralement quelques semaines entre la signature du devis et la pose. L'installation elle-même dure 1 à 2 jours pour une pompe à chaleur, et 1 jour pour des panneaux photovoltaïques.",
  },
  {
    question: "Les équipements sont-ils garantis ?",
    answer: "Oui, nos équipements bénéficient de la garantie constructeur, de notre garantie de pose et de l'assurance décennale.",
  },
];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqForJsonLd)} />
      <Breadcrumb items={[{ name: "Centre d'aide / FAQ", path: "/faq" }]} />
      <FaqExperience />
    </>
  );
}
