# Label Énergie — site vitrine

Site vitrine Next.js (App Router) + TypeScript + Tailwind CSS pour Label Énergie
(pompes à chaleur, climatisation, solaire, eau chaude), orienté SEO :
métadonnées par page, données structurées schema.org (LocalBusiness, Service,
FAQPage, BreadcrumbList), `sitemap.xml` et `robots.txt` générés automatiquement,
images optimisées via `next/image`.

## Lancer le projet

```bash
npm install
npm run dev
```

```bash
npm run build
npm run start
```

## Structure

- `app/(marketing)/` — pages publiques (accueil, solutions, aides, à propos, etc.)
  avec header/footer communs.
- `app/(funnel)/` — tunnels de conversion (simulateur, souscription contrat
  d'entretien) avec un layout minimal (sans navigation complète).
- `app/(client-portal)/espace-client/` — espace client authentifié (`noindex`),
  layout avec menu latéral.
- `app/api/` — routes API (formulaires de contact et de souscription).
- `lib/content/` — contenu structuré par page (solutions, entretien, accueil).
- `components/` — composants React organisés par domaine (layout, home,
  solutions, entretien, funnel, client-portal, seo, marketing).
- `styles/legacy.css` — feuille de style historique de la page d'accueil
  (conservée pour la fidélité visuelle avec la maquette d'origine) ; les
  nouvelles pages utilisent Tailwind.

## À faire ensuite

- Contenu détaillé des formules du contrat d'entretien (le tunnel
  `/deja-client/entretien/souscrire` est fonctionnel mais utilise des données
  provisoires dans `lib/content/entretien.ts`).
- Authentification réelle de l'espace client (`/connexion` et
  `/espace-client/*` sont pour l'instant des maquettes statiques).
- Fournisseur de paiement si les contrats d'entretien doivent être payés en
  ligne.
- Remplacer les images Unsplash de démonstration par les vraies photos
  Label Énergie.
