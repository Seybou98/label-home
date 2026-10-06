import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { LegalLayout } from "@/components/marketing/LegalLayout";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité de Label Énergie : collecte, usage et protection de vos données personnelles conformément au RGPD.",
  path: "/confidentialite",
  noIndex: true,
});

export default function ConfidentialitePage() {
  return (
    <LegalLayout
      title="Politique de confidentialité"
      updatedAt="29 septembre 2026"
      breadcrumbLabel="Confidentialité"
      path="/confidentialite"
    >
      <p>
        Conformément à la loi n°78-17 du 6 janvier 1978 modifiée (dite « loi Informatique et Libertés »)
        et au Règlement général sur la protection des données 2016/679 du 27 avril 2016 (« RGPD »),
        LABEL ENERGIE agit en qualité de responsable de traitement des données à caractère personnel
        collectées sur ce site.
      </p>

      <h2>Quelles données collectons-nous ?</h2>
      <p>
        Selon les formulaires que vous utilisez (contact, simulation d&apos;aides, souscription, espace
        client), nous pouvons collecter : nom, prénom, adresse email, numéro de téléphone, adresse
        postale, code postal, et les informations relatives à votre projet de rénovation énergétique.
      </p>

      <h2>Pourquoi utilisons-nous ces données ?</h2>
      <ul>
        <li>Répondre à vos demandes de contact ou de devis</li>
        <li>Gérer la relation commerciale et le suivi de votre projet ou de votre contrat</li>
        <li>Vous informer de l&apos;évolution des produits, services et aides disponibles</li>
        <li>Réaliser des analyses statistiques pour améliorer nos services</li>
      </ul>
      <p>Ces données ne sont pas transférées en dehors de l&apos;Espace économique européen.</p>

      <h2>Combien de temps conservons-nous vos données ?</h2>
      <p>
        Vos données sont conservées pendant la durée nécessaire à la gestion de la relation commerciale,
        puis archivées conformément aux durées légales de conservation, notamment à des fins comptables et
        de preuve.
      </p>

      <h2>Vos droits</h2>
      <p>
        Vous disposez à tout moment d&apos;un droit d&apos;accès, de rectification, d&apos;opposition, d&apos;effacement,
        de limitation et, si la technique le permet, de portabilité de vos données personnelles. Pour
        exercer ces droits, adressez votre demande, accompagnée d&apos;une copie d&apos;un titre d&apos;identité si
        nécessaire :
      </p>
      <ul>
        <li>
          Par email à <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </li>
        <li>
          Par courrier postal au siège de LABEL ENERGIE : {siteConfig.address.streetAddress},{" "}
          {siteConfig.address.postalCode} {siteConfig.address.addressLocality}
        </li>
      </ul>
      <p>
        Vous disposez également de la possibilité d&apos;introduire une réclamation auprès de la CNIL
        (Commission Nationale de l&apos;Informatique et des Libertés).
      </p>

      <h2>Application mobile</h2>
      <p>
        LABEL ENERGIE édite également une application mobile, disponible sur les magasins d&apos;applications,
        qui utilise les mêmes services, comptes et données que le présent site (notamment l&apos;espace client).
        Les données collectées via l&apos;application sont traitées selon les mêmes finalités et avec les mêmes
        droits que ceux décrits dans la présente politique.
      </p>

      <h2>Cookies</h2>
      <p>
        Le site utilise des cookies strictement nécessaires à son fonctionnement (par exemple pour
        maintenir votre connexion à votre espace client) et, sous réserve de votre consentement, des
        cookies de mesure d&apos;audience. Vous pouvez gérer vos préférences à tout moment depuis notre{" "}
        <a href="/cookies" className="font-semibold text-teal2 underline">
          page de gestion des cookies
        </a>
        .
      </p>
    </LegalLayout>
  );
}
