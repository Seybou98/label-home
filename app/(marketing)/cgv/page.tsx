import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { LegalLayout } from "@/components/marketing/LegalLayout";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Conditions générales de vente",
  description: "Conditions générales de vente (CGV) de Label Énergie, applicables à toute commande de fourniture et d'installation d'équipements.",
  path: "/cgv",
  noIndex: true,
});

const articles: { title: string; paragraphs: string[] }[] = [
  {
    title: "Article 1 : Définitions des termes",
    paragraphs: [
      "Client : toute personne physique ou morale, ayant la capacité de conclure un tel acte, passant une commande pour la fourniture et, le cas échéant, l'installation d'un matériel vendu par le Vendeur (chaudière, pompe à chaleur, thermostat connecté, chauffe-eau électrique, radiateur électrique, etc. — ci-après « Produit(s) ») et/ou de diverses prestations pour ses besoins et éligible au service proposé en fonction de sa situation géographique. Le Client, en commandant, déclare sur l'honneur être capable de commander.",
      `Vendeur : la société LABEL ENERGIE, SAS au capital de 200 000 euros, spécialisée dans les travaux d'installation d'équipements thermiques et de climatisation, dont le siège social est situé au ${siteConfig.address.streetAddress}, ${siteConfig.address.postalCode} ${siteConfig.address.addressLocality}, N° 890 462 625 RCS Meaux, Tél : ${siteConfig.phoneDisplay}, E-mail : ${siteConfig.email}, n° TVA Intracommunautaire FR 30 890 462 625.`,
      "Commande : la commande s'entend de la signature du contrat de vente (devis/bon de commande) par le Client.",
      "Livraison : la livraison s'entend de la remise directe des Produits vendus au Client et de leur installation, sauf stipulation contraire insérée au contrat de vente.",
      "Réception : la réception des biens commandés s'entend de la signature sans réserve du procès-verbal d'installation et/ou de réception par le Client.",
    ],
  },
  {
    title: "Article 2 : Acceptation et opposabilité des CGV",
    paragraphs: [
      "Les présentes Conditions Générales de Vente (« CGV ») s'appliquent de plein droit à toutes les prestations de service d'installation figurant sur le bon de commande, conclues par LABEL ENERGIE (le « Vendeur ») auprès de tout Client (le « Client » ou l'« Acheteur ») qui les agrée et reconnaît en avoir parfaite connaissance.",
      "La passation d'une Commande implique de la part du Client l'acceptation des présentes CGV. Toutes les clauses contraires aux présentes CGV ne peuvent être opposées à LABEL ÉNERGIE à moins qu'elles n'aient fait l'objet d'un accord particulier écrit et préalable. Le fait que LABEL ÉNERGIE ne se prévale pas à un moment donné de l'une des dispositions des CGV ne peut être interprété comme une renonciation à s'en prévaloir ultérieurement. La nullité éventuelle d'une clause contractuelle n'entraîne pas la nullité des présentes, chaque clause étant autonome.",
    ],
  },
  {
    title: "Article 3 : Offres – devis – catalogues",
    paragraphs: [
      "Les devis et offres faites par LABEL ENERGIE à un Client sont valables un mois à compter de leur émission, sauf stipulation expresse contraire. Le contenu des documents commerciaux de LABEL ENERGIE ou de ses fournisseurs est purement informatif et peut être modifié sans préavis.",
    ],
  },
  {
    title: "Article 4 : Commandes – bon de commande – disponibilité des stocks",
    paragraphs: [
      "Les Produits sont vendus, livrés et installés dans la limite des stocks disponibles. LABEL ENERGIE se réserve la possibilité de modifier certains articles vendus ; le cas échéant, le Client se verra proposer le modèle le plus proche de celui figurant sur sa Commande. En cas de désaccord et si des sommes ont été perçues avant l'installation, LABEL ÉNERGIE procède au remboursement dans un délai de 45 jours maximum à compter du refus du consommateur.",
      "Les commandes sont prises sous réserve de faisabilité technique. En cas de non-faisabilité, la commande sera annulée et les acomptes remboursés ; LABEL ENERGIE informe le Client de l'infaisabilité technique dans un délai maximum de 4 mois à compter de la signature du bon de commande.",
      "Le bon de commande est conclu à la date de sa signature par le Client et prend effet à l'expiration du délai de rétractation (voir Article 16).",
    ],
  },
  {
    title: "Article 5 : Réserve de propriété",
    paragraphs: [
      "La propriété des marchandises fournies par LABEL ÉNERGIE ne sera transférée au Client que lorsque la totalité du montant facturé sera encaissée par LABEL ENERGIE (ou, dans le cas de subventions déduites sur facture, par le(s) mandataire(s)). Les acomptes reçus restent définitivement acquis par LABEL ÉNERGIE à titre d'indemnisation forfaitaire, sans préjudice de toute autre action que LABEL ÉNERGIE serait en droit d'exercer.",
    ],
  },
  {
    title: "Article 6 : Installation du matériel",
    paragraphs: [
      "L'emplacement du matériel est déterminé de manière définitive entre le Client et LABEL ÉNERGIE. Le Client s'engage à laisser libre accès aux locaux, à fournir l'eau et l'électricité si besoin, à obtenir l'autorisation d'accès chez les voisins si nécessaire, et à fournir tout renseignement utile sur le passage des canalisations, du gaz et de l'électricité aux endroits de perçage des murs.",
      "LABEL ENERGIE ne saurait être tenue responsable d'un manque de diligence du Client occasionnant un retard d'installation. Le Client ne recevra aucune indemnité en raison de l'usure, des modifications ou d'une éventuelle dépréciation de son bien immobilier liée à l'installation.",
    ],
  },
  {
    title: "Article 7 : Réception",
    paragraphs: [
      "Après l'installation, LABEL ÉNERGIE fera signer au Client un procès-verbal de fin de travaux ; la réception sera alors réputée acquise sans réserve. En cas de refus non motivé de signer, le Client sera redevable des frais engagés par LABEL ÉNERGIE pour obtenir la signature ainsi que d'une indemnité de 30 % du montant TTC de la commande.",
      "Lorsque la réception est assortie de réserves techniquement justifiées, LABEL ÉNERGIE procèdera à leur levée dans un délai raisonnable, constatée par un procès-verbal signé par les deux parties. Le refus de réception ne peut être motivé que par l'inachèvement des travaux ou un ensemble de défauts graves équivalents, et doit être indiqué par écrit.",
    ],
  },
  {
    title: "Article 8 : Prix",
    paragraphs: [
      "Le matériel et les fournitures installés forment un tout indivisible (un pack) : le prix indiqué au devis correspond au prix de vente du pack ainsi qu'à sa pose, TVA incluse. Le prix de chacun des éléments composant le pack peut être fourni au consommateur sur demande.",
      "Au-delà du montant fixé au bon de commande, les frais supplémentaires (terrassement, dépose/pose de matériaux, mise en conformité de toiture, raccordement au-delà des limites prévues, élagage ou dépose d'éléments gênants...) sont à la charge du Client et font l'objet d'une facture complémentaire.",
      "L'installation de certains équipements peut nécessiter une augmentation de la puissance du compteur électrique ; il appartient au Client de se rapprocher de son fournisseur d'électricité. LABEL ENERGIE ne saurait être tenue responsable d'un manque de puissance nécessaire au bon fonctionnement des équipements.",
    ],
  },
  {
    title: "Article 9 : Paiement",
    paragraphs: [
      "Avec financement proposé par l'intermédiaire de LABEL ENERGIE, le Client reconnaît avoir pris connaissance de l'ensemble des informations relatives au financement (TAEG, montant total, échéances, durée, assurances facultatives...).",
      "Sans financement, le paiement total intervient au plus tard le jour de l'installation. Les paiements s'effectuent par chèque, virement bancaire, mandat SEPA ou carte bancaire, sauf disposition contraire figurant dans la commande. Tout retard de paiement entraîne de plein droit l'application d'intérêts de retard au taux légal en vigueur ; pour les clients professionnels, une indemnité forfaitaire de recouvrement de 40 € minimum par facture est due (articles L.441-10 et D.441-5 du Code de commerce).",
      "En cas de défaut de paiement 48 heures après une mise en demeure restée infructueuse, LABEL ÉNERGIE peut exiger le paiement immédiat du solde dû, suspendre ses obligations, suspendre ou annuler les commandes en cours, sans préjudice de dommages et intérêts et/ou de la résiliation du contrat.",
    ],
  },
  {
    title: "Article 10 : Démarches administratives",
    paragraphs: [
      "Sauf stipulation contraire, LABEL ENERGIE s'engage à effectuer les démarches nécessaires à l'obtention du certificat d'économie d'énergie (CEE) et de la subvention de l'ANAH, sous réserve de la remise par le Client de la documentation nécessaire et sincère et de la signature des documents requis. Les démarches visant l'obtention d'un crédit d'impôt sont à la charge exclusive du Client, qui a pu vérifier au préalable ses critères d'éligibilité.",
    ],
  },
  {
    title: "Article 11 : Garantie",
    paragraphs: [
      "Garanties légales de conformité et des vices cachés : le Client bénéficie de la garantie légale de conformité (article L.217-4 et suivants du Code de la consommation) et de la garantie des défauts cachés (articles 1641 à 1649 du Code civil). Le consommateur dispose d'un délai de deux ans à compter de la délivrance du bien pour agir en garantie légale de conformité, peut choisir entre réparation et remplacement, et est dispensé de prouver le défaut durant les 24 mois suivant la délivrance.",
      "Garantie du fabricant : le matériel est couvert par la garantie du fabricant, dont le détail est précisé au devis et au bon de commande. Cette garantie est exclue en cas d'usure normale, de défaut d'entretien ou d'utilisation non conforme aux prescriptions du fabricant. Les pièces détachées indispensables restent disponibles sur le marché pendant deux ans à compter de la signature du bon de commande.",
      "Garantie des travaux d'installation : LABEL ÉNERGIE a souscrit une police d'assurance responsabilité civile professionnelle (MAAF Assurances SA) couvrant la conception et les travaux d'installation contre tout défaut de conformité pendant deux ans à compter du procès-verbal de réception. Cette garantie est limitée à la réparation ou, au choix de LABEL ENERGIE, au remplacement à neuf (pièce, main-d'œuvre et déplacement inclus), et exclue en cas d'usure normale, de défaut d'entretien ou d'utilisation non conforme. Le détail de cette police est communiqué sur simple demande au service juridique.",
      "Garantie décennale : conformément à la loi n°78-12 du 4 janvier 1978, LABEL ÉNERGIE a souscrit une police d'assurance au titre de sa responsabilité susceptible d'être engagée sur le fondement des articles 1792 et suivants du Code civil. Le détail de cette police est communiqué sur simple demande au service juridique.",
      "Application et mise en œuvre : la garantie s'applique dans la mesure où le Client respecte les règles de bon fonctionnement et maintient l'équipement en bon état d'entretien conformément au manuel fourni. En cas de sinistre pendant la période de garantie, le Client en informe LABEL ENERGIE sans délai, par écrit, à l'adresse : LABEL ENERGIE, service juridique, 3 allée du 1er mai, 77183 Croissy-Beaubourg.",
      "Exclusions de garantie : la garantie ne couvre pas notamment le vol, la casse non consécutive à un usage normal, le non-paiement de la commande, les détériorations accidentelles (chocs, surtension, foudre, inondation, incendie...), les interventions par un tiers non agréé, le défaut d'entretien, les vices apparents, ou l'usure naturelle. Elle ne saurait financièrement dépasser le montant payé pour l'acquisition du Produit.",
      "Exclusions de responsabilité : LABEL ENERGIE ne saurait être tenue responsable d'une modification légale ou réglementaire des aides et subventions, des conditions d'octroi du crédit d'impôt, de l'obtention ou non des aides par le Client, ou des délais d'intervention des gestionnaires de réseau pour le raccordement. Si le problème du Service Après-Vente découle de l'installation initiale du Client ou d'une tierce partie (et non de l'installation réalisée par LABEL ÉNERGIE), un forfait de déplacement et de diagnostic de 299 € sera facturé au Client.",
    ],
  },
  {
    title: "Article 12 : Engagements et responsabilité du Client",
    paragraphs: [
      "Au terme des travaux, le Client doit signer l'ensemble des documents remis par les techniciens (attestation de prise en charge, de mise en service, de fin de travaux) et transmettre les pièces nécessaires à la valorisation de son dossier auprès des organismes concernés.",
      "Pour les Clients bénéficiant de MaPrimeRénov' : renvoi de l'attestation de consentement à l'ANAH, soumission aux contrôles sur place, réponse aux sollicitations du mandataire et de l'ANAH, transmission des documents et photos nécessaires.",
      "Pour les Clients bénéficiant de la prime CEE : soumission aux contrôles COFRAC, signature du dossier CEE complet, transmission de pièces sincères et à jour (avis d'imposition, pièce d'identité, taxe foncière ou acte notarié, bail pour les propriétaires bailleurs). Les propriétaires bailleurs s'engagent à louer le bien comme résidence principale pendant au moins 6 ans, sous peine de devoir rembourser une partie de l'aide perçue.",
      "En cas de non-respect de ces engagements, de fausse déclaration ou de manœuvre frauduleuse, le Client s'expose au retrait et au reversement de tout ou partie de l'aide, et LABEL ENERGIE se réserve le droit de facturer le montant des subventions non accordées mais déjà déduites des factures.",
    ],
  },
  {
    title: "Article 13 : Résiliation du contrat",
    paragraphs: [
      "En cas de retard de plus de 30 jours du début de l'installation par rapport à la date convenue, le Client peut demander, dans un délai de 60 jours ouvrés à compter de l'expiration du délai figurant au bon de commande, la résolution anticipée du contrat par lettre recommandée avec accusé de réception.",
    ],
  },
  {
    title: "Article 14 : Sous-traitance",
    paragraphs: [
      "LABEL ENERGIE se réserve le droit de sous-traiter à un tiers tout ou partie des prestations prévues, sans que le Client puisse s'y opposer. La sous-traitance ne modifie pas les droits et obligations découlant du contrat ; LABEL ENERGIE reste seule responsable des sous-traitants qu'elle désigne.",
    ],
  },
  {
    title: "Article 15 : Force majeure",
    paragraphs: [
      "LABEL ENERGIE ne pourra être considérée comme ayant failli à ses obligations si leur exécution est retardée, entravée ou empêchée par un cas de force majeure au sens de l'article 1218 du Code civil (guerres, émeutes, épidémie, pandémie, grèves, sinistres, intempéries...).",
    ],
  },
  {
    title: "Article 16 : Délai de rétractation",
    paragraphs: [
      "Lorsque les dispositions de l'article L.221-18 du Code de la consommation lui sont applicables, le Client dispose d'un délai de 14 jours pour exercer son droit de rétractation, sans avoir à justifier de motif ni à payer de pénalité.",
      "Pour exercer ce droit, le Client adresse à LABEL ÉNERGIE, par lettre recommandée avec accusé de réception à l'adresse du siège social, le formulaire de rétractation complété ou toute déclaration dénuée d'ambiguïté exprimant sa volonté de se rétracter.",
      "En cas de rétractation dans le délai légal, LABEL ENERGIE rembourse le prix perçu dans un délai de 14 jours, par le même moyen de paiement que celui utilisé initialement, sans frais pour le Client. Le Client peut demander expressément l'exécution de la prestation avant la fin du délai de rétractation ; il renonce alors à ce droit une fois la prestation entièrement exécutée, et devra sinon verser un montant proportionnel à ce qui lui a été fourni.",
    ],
  },
  {
    title: "Article 17 : Protection des données à caractère personnel (RGPD)",
    paragraphs: [
      "Conformément à la loi n°78-17 du 6 janvier 1978 modifiée et au Règlement général sur la protection des données 2016/679 du 27 avril 2016 (RGPD), les données à caractère personnel des Clients font l'objet d'un traitement informatique par LABEL ÉNERGIE, responsable de traitement, notamment pour la gestion des relations commerciales, l'identification des Clients, l'information sur les Produits et services, et des actions de prospection et d'analyses statistiques. Ces données ne sont pas transférées hors de l'Espace économique européen.",
      "Le Client ou le prospect dispose à tout moment d'un droit d'accès, de rectification, d'opposition, d'effacement, de limitation et, si la technique le permet, de portabilité de ses données personnelles, en adressant sa demande par courrier postal au siège de LABEL ÉNERGIE. Il dispose également de la possibilité d'introduire une réclamation auprès de la CNIL. Le détail de ce traitement est précisé dans notre politique de confidentialité.",
    ],
  },
  {
    title: "Article 18 : Cadre juridique",
    paragraphs: [
      "Les informations communiquées par le Client étant indispensables au traitement de son dossier, leur absence entraîne la déchéance des garanties prévues au contrat. Dans le cadre d'un contrôle de qualité, les conversations téléphoniques entre le Client et les services de LABEL ÉNERGIE pourraient donner lieu à enregistrement.",
    ],
  },
  {
    title: "Article 19 : Règlement des litiges – droit applicable",
    paragraphs: [
      "Les prestations mentionnées au bon de commande sont soumises au droit français. Les litiges non résolus entre LABEL ENERGIE et le Client seront soumis aux tribunaux compétents selon les règles de droit commun (domicile du défendeur ou, au choix du demandeur, lieu de livraison effective ou de signature du contrat).",
      "En cas de contestation, le Client peut adresser une réclamation écrite à : SERVICE JURIDIQUE LABEL ENERGIE, 3 allée du 1er mai, 77183 Croissy-Beaubourg. Conformément à l'article L.616-1 du Code de la consommation, le Client a également le droit de recourir gratuitement au service de médiation de la consommation proposé par LABEL ÉNERGIE : l'association MÉDIATION EN SEINE, 17/25 avenue du maréchal Joffre, 92000 Nanterre, ou par voie électronique via consommation@mediation-en-seine.org.",
    ],
  },
];

export default function CgvPage() {
  return (
    <LegalLayout
      title="Conditions générales de vente"
      updatedAt="29 septembre 2026"
      breadcrumbLabel="CGV"
      path="/cgv"
    >
      <p>
        Les présentes conditions générales de vente s&apos;appliquent à toute commande de fourniture et,
        le cas échéant, d&apos;installation d&apos;équipements passée auprès de LABEL ENERGIE. Elles sont
        contresignées par le consommateur au moment de la signature du bon de commande.
      </p>
      {articles.map((a) => (
        <div key={a.title}>
          <h2>{a.title}</h2>
          {a.paragraphs.map((p, i) => (
            <p key={i} className="mt-3">
              {p}
            </p>
          ))}
        </div>
      ))}
    </LegalLayout>
  );
}
