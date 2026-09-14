import type { Metadata } from "next";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = buildMetadata({
  title: "FAQ : questions fréquentes sur nos solutions énergétiques",
  description:
    "Retrouvez les réponses aux questions les plus fréquentes sur la pompe à chaleur, le solaire, les aides financières et l'entretien de vos équipements.",
  path: "/faq",
});

const faq = [
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
    question: "Proposez-vous un contrat d'entretien pour mes équipements ?",
    answer:
      "Oui, nous proposons plusieurs formules d'entretien (Essentiel, Sérénité, Confort+) pour vos pompes à chaleur, panneaux solaires, chauffe-eau et poêles à granulés.",
  },
  {
    question: "Combien de temps dure une installation ?",
    answer:
      "La durée dépend du type d'équipement : comptez généralement 1 à 2 jours pour une pompe à chaleur ou une climatisation, et 1 jour pour des panneaux photovoltaïques.",
  },
];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faq)} />
      <Breadcrumb items={[{ name: "FAQ", path: "/faq" }]} />
      <section className="section">
        <div className="container max-w-3xl">
          <PageHeader
            eyebrow="BESOIN D'AIDE ?"
            title="Questions fréquentes"
            description="Retrouvez les réponses aux questions les plus posées sur nos solutions, les aides financières et le suivi de votre projet."
          />
          <div className="mt-6 grid gap-3">
            {faq.map((item) => (
              <details key={item.question} className="rounded-card border border-line p-4">
                <summary className="cursor-pointer text-sm font-bold text-navy">
                  {item.question}
                </summary>
                <p className="mt-2 text-sm text-muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
