import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { LegalLayout } from "@/components/marketing/LegalLayout";

export const metadata: Metadata = buildMetadata({
  title: "Gestion des cookies",
  description: "Informations sur l'utilisation des cookies sur le site Label Énergie et gestion de vos préférences.",
  path: "/cookies",
  noIndex: true,
});

export default function CookiesPage() {
  return (
    <LegalLayout title="Gestion des cookies" updatedAt="29 septembre 2026" breadcrumbLabel="Gestion des cookies" path="/cookies">
      <p>
        Un cookie est un petit fichier texte déposé sur votre appareil lors de votre navigation. Voici les
        cookies utilisés sur le site {`labelenergie.fr`}.
      </p>

      <h2>Cookies strictement nécessaires</h2>
      <p>
        Ces cookies sont indispensables au fonctionnement du site et ne peuvent pas être désactivés : ils
        permettent notamment de maintenir votre connexion à votre espace client et de retenir votre choix
        concernant la bannière de cookies. Ils ne nécessitent pas votre consentement.
      </p>

      <h2>Cookies de mesure d&apos;audience</h2>
      <p>
        Ces cookies permettraient de mesurer la fréquentation du site afin d&apos;en améliorer le
        fonctionnement et les contenus. Ils ne sont déposés qu&apos;avec votre consentement, donné via la
        bannière affichée lors de votre première visite.
      </p>

      <h2>Gérer votre choix</h2>
      <p>
        Vous pouvez accepter ou refuser les cookies non essentiels via la bannière affichée sur le site.
        Vous pouvez également configurer votre navigateur pour refuser tous les cookies ; certaines
        fonctionnalités du site (comme l&apos;espace client) pourraient alors ne plus fonctionner
        correctement.
      </p>
    </LegalLayout>
  );
}
