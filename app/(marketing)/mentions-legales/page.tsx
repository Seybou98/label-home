import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { LegalLayout } from "@/components/marketing/LegalLayout";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Mentions légales",
  description: "Mentions légales du site Label Énergie : éditeur, hébergeur et informations légales.",
  path: "/mentions-legales",
  noIndex: true,
});

export default function MentionsLegalesPage() {
  return (
    <LegalLayout title="Mentions légales" updatedAt="29 septembre 2026" breadcrumbLabel="Mentions légales" path="/mentions-legales">
      <h2>Éditeur du site</h2>
      <p>
        Le site {siteConfig.url} est édité par la société <strong>LABEL ENERGIE</strong>, SAS au capital de
        200 000 euros, dont le siège social est situé au {siteConfig.address.streetAddress},{" "}
        {siteConfig.address.postalCode} {siteConfig.address.addressLocality}.
      </p>
      <ul>
        <li>RCS Meaux n° 890 462 625</li>
        <li>N° TVA intracommunautaire : FR 30 890 462 625</li>
        <li>
          Téléphone : <a href={`tel:${siteConfig.phone}`}>{siteConfig.phoneDisplay}</a>
        </li>
        <li>
          Email : <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </li>
      </ul>

      <h2>Directeur de la publication</h2>
      <p>Le directeur de la publication est le représentant légal de la société LABEL ENERGIE.</p>

      <h2>Hébergement</h2>
      <p>
        Les informations relatives à l&apos;hébergeur du site (raison sociale, adresse) seront précisées ici
        une fois l&apos;hébergement définitif du site mis en place.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des contenus présents sur ce site (textes, images, logos, mise en page) est la
        propriété de LABEL ENERGIE ou de ses partenaires, sauf mention contraire, et est protégé par le
        droit de la propriété intellectuelle. Toute reproduction, même partielle, est soumise à
        autorisation préalable.
      </p>

      <h2>Médiation de la consommation</h2>
      <p>
        Conformément à l&apos;article L.616-1 du Code de la consommation, le client a le droit de recourir
        gratuitement à un médiateur de la consommation en vue de la résolution amiable d&apos;un litige.
        Le médiateur proposé par LABEL ENERGIE est l&apos;association MÉDIATION EN SEINE — 17/25 avenue du
        maréchal Joffre, 92000 Nanterre, ou par voie électronique via le formulaire disponible sur{" "}
        consommation@mediation-en-seine.org.
      </p>

      <h2>Litiges — droit applicable</h2>
      <p>
        Le présent site et les opérations qui y sont conclues sont soumis au droit français. En cas de
        litige non résolu à l&apos;amiable, les tribunaux compétents seront ceux déterminés par les règles
        de droit commun.
      </p>
    </LegalLayout>
  );
}
