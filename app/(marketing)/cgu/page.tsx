import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { LegalLayout } from "@/components/marketing/LegalLayout";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Conditions générales d'utilisation",
  description: "Conditions générales d'utilisation du site Label Énergie.",
  path: "/cgu",
  noIndex: true,
});

export default function CguPage() {
  return (
    <LegalLayout
      title="Conditions générales d'utilisation"
      updatedAt="29 septembre 2026"
      breadcrumbLabel="CGU"
      path="/cgu"
    >
      <p>
        Les présentes conditions générales d&apos;utilisation (« CGU ») ont pour objet de définir les
        modalités d&apos;accès et d&apos;utilisation du site {siteConfig.url}, édité par LABEL ENERGIE. En
        naviguant sur ce site, vous acceptez sans réserve les présentes CGU.
      </p>

      <h2>Objet du site</h2>
      <p>
        Le site présente les solutions énergétiques proposées par Label Énergie (pompe à chaleur,
        climatisation, solaire photovoltaïque, eau chaude, poêle à granulés), permet de simuler les
        aides financières disponibles, de demander un devis ou un rendez-vous, et donne accès à un
        espace client sécurisé pour les clients de Label Énergie.
      </p>

      <h2>Accès au site</h2>
      <p>
        Le site est accessible gratuitement à tout utilisateur disposant d&apos;un accès à Internet. Label
        Énergie met tout en œuvre pour assurer un accès de qualité au site, mais n&apos;est tenue à aucune
        obligation d&apos;y parvenir et ne saurait être tenue responsable d&apos;une interruption, d&apos;une
        suspension ou d&apos;un dysfonctionnement du site, notamment en cas de maintenance.
      </p>

      <h2>Espace client</h2>
      <p>
        L&apos;accès à l&apos;espace client est réservé aux clients de Label Énergie et nécessite une
        authentification. Vous êtes responsable de la confidentialité de vos identifiants de connexion et
        de toute activité effectuée depuis votre compte.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des éléments du site (textes, images, logos, charte graphique) est protégé par le
        droit de la propriété intellectuelle. Toute reproduction ou utilisation non autorisée de ces
        éléments, en dehors d&apos;un usage strictement personnel, est interdite.
      </p>

      <h2>Formulaires et informations transmises</h2>
      <p>
        Les informations que vous transmettez via les formulaires du site (contact, simulation, demande de
        rendez-vous) sont destinées à Label Énergie pour le traitement de votre demande. Le traitement de
        ces données est décrit dans notre{" "}
        <a href="/confidentialite" className="font-semibold text-teal2 underline">
          politique de confidentialité
        </a>
        .
      </p>

      <h2>Liens vers d&apos;autres sites</h2>
      <p>
        Le site peut contenir des liens vers des sites tiers. Label Énergie n&apos;exerce aucun contrôle sur
        ces sites et décline toute responsabilité quant à leur contenu.
      </p>

      <h2>Limitation de responsabilité</h2>
      <p>
        Les informations diffusées sur le site (notamment les estimations d&apos;aides financières) sont
        indicatives et ne constituent pas un engagement contractuel. Seul un devis personnalisé établi par
        Label Énergie fait foi. Les ventes et prestations de services réalisées par Label Énergie sont
        régies par nos{" "}
        <a href="/cgv" className="font-semibold text-teal2 underline">
          Conditions Générales de Vente
        </a>
        , qui vous sont communiquées lors de la commande.
      </p>

      <h2>Droit applicable</h2>
      <p>
        Les présentes CGU sont soumises au droit français. En cas de litige, une solution amiable sera
        recherchée avant toute action judiciaire.
      </p>

      <h2>Contact</h2>
      <p>
        Pour toute question relative aux présentes CGU, vous pouvez nous contacter à{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>
    </LegalLayout>
  );
}
