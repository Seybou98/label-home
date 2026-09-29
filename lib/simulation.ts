// Moteur du simulateur d'aides (/simuler-mon-projet) : mêmes barèmes et logique que
// lib/mprBareme.ts (déjà utilisé par /aides-financement/calculer-mes-aides), avec en plus
// la fourchette de prime CEE et les données du parcours de qualification (inspiré du
// simulateur déployé par le client sur labelenergiepac.fr).
import { PROFILES, fmt, limitsFor, zoneFromPostalCode, type Zone } from "./mprBareme";

export { fmt, zoneFromPostalCode };
export type { Zone };

export type Statut = "maison" | "appartement" | "locataire";
export type Age = "plus15" | "moins15" | "nsp";
export type Chauffage = "fioul" | "gaz" | "electrique" | "bois_autre";
export type Surface = "<70" | "70-100" | "100-150" | ">150";

export const STATUT_OPTIONS: { v: Statut; label: string; icon: string }[] = [
  { v: "maison", label: "Propriétaire d'une maison", icon: "maison" },
  { v: "appartement", label: "Propriétaire d'un appartement", icon: "immeuble" },
  { v: "locataire", label: "Locataire", icon: "cle" },
];

export const AGE_OPTIONS: { v: Age; label: string }[] = [
  { v: "plus15", label: "Plus de 15 ans" },
  { v: "moins15", label: "Moins de 15 ans" },
  { v: "nsp", label: "Je ne sais pas" },
];

export const CHAUFFAGE_OPTIONS: { v: Chauffage; label: string; icon: string }[] = [
  { v: "fioul", label: "Fioul", icon: "fioul" },
  { v: "gaz", label: "Gaz", icon: "gaz" },
  { v: "electrique", label: "Électrique", icon: "elec" },
  { v: "bois_autre", label: "Bois ou autre", icon: "bois" },
];

export const SURFACE_OPTIONS: { v: Surface; label: string }[] = [
  { v: "<70", label: "Moins de 70 m²" },
  { v: "70-100", label: "70 à 100 m²" },
  { v: "100-150", label: "100 à 150 m²" },
  { v: ">150", label: "Plus de 150 m²" },
];

export const FOYER_OPTIONS = [1, 2, 3, 4, 5] as const;

/** Fourchette de prime CEE (coup de pouce chauffage bonifié si remplacement d'une chaudière fossile). */
const CEE: Record<"fossile" | "autre", [number, number][]> = {
  fossile: [
    [3500, 5500],
    [3000, 5000],
    [2500, 4000],
    [2000, 3500],
  ],
  autre: [
    [1500, 2500],
    [1200, 2200],
    [1000, 2000],
    [800, 1500],
  ],
};

export type SimAnswers = {
  statut: Statut | "";
  age: Age | "";
  chauffage: Chauffage | "";
  surface: Surface | "";
  foyer: number;
  cp: string;
  rfr: string;
  prenom: string;
  nom: string;
  telephone: string;
  email: string;
  consentement: boolean;
  /** Honeypot anti-spam : doit rester vide, rempli seulement par les robots. */
  website: string;
};

export const emptySimAnswers: SimAnswers = {
  statut: "",
  age: "",
  chauffage: "",
  surface: "",
  foyer: 2,
  cp: "",
  rfr: "",
  prenom: "",
  nom: "",
  telephone: "",
  email: "",
  consentement: false,
  website: "",
};

/** Options de revenu fiscal de référence, calculées sur le vrai barème pour ce foyer/cette zone. */
export function revenuOptions(zone: Zone, foyer: number) {
  const [b, j, v] = limitsFor(zone, foyer);
  return [
    { v: "bleu" as const, label: `Moins de ${fmt(b)}` },
    { v: "jaune" as const, label: `Entre ${fmt(b)} et ${fmt(j)}` },
    { v: "violet" as const, label: `Entre ${fmt(j)} et ${fmt(v)}` },
    { v: "rose" as const, label: `Plus de ${fmt(v)}` },
  ];
}

export type AidesResult = {
  profileIndex: number; // 0 bleu, 1 jaune, 2 violet, 3 rose
  mprEligible: boolean;
  mpr: number;
  cee: [number, number];
  totalMin: number;
  totalMax: number;
};

const REVENU_BUCKET_INDEX: Record<string, number> = { bleu: 0, jaune: 1, violet: 2, rose: 3 };

/**
 * Calcule l'estimation à partir des réponses, sur le même barème que /calculer-mes-aides.
 * Ici l'utilisateur choisit directement sa tranche (bleu/jaune/violet/rose, calculée par
 * revenuOptions() sur son foyer et sa zone) au lieu de saisir un montant : `a.rfr` contient
 * donc la clé de la tranche, pas un revenu numérique — ne pas la passer à profileIndex().
 */
export function computeAides(a: SimAnswers): AidesResult {
  const pi = REVENU_BUCKET_INDEX[a.rfr] ?? 0;
  const mprEligible = a.age !== "moins15" && pi < 3;
  const mpr = mprEligible ? PROFILES[pi].primeAmount : 0;
  const fossile = a.chauffage === "fioul" || a.chauffage === "gaz";
  const cee = CEE[fossile ? "fossile" : "autre"][pi];
  return { profileIndex: pi, mprEligible, mpr, cee, totalMin: mpr + cee[0], totalMax: mpr + cee[1] };
}

export const DISQUALIF: Record<"locataire" | "appartement" | "horszone", { title: string; text: string; showPhone: boolean }> = {
  locataire: {
    title: "Les aides à l'installation sont réservées aux propriétaires",
    text: "MaPrimeRénov' et la prime CEE pour une pompe à chaleur sont versées au propriétaire du logement. Si votre propriétaire est ouvert au projet, transmettez-lui cette page : nous nous occupons du reste.",
    showPhone: true,
  },
  appartement: {
    title: "Notre offre concerne surtout les maisons individuelles",
    text: "La pompe à chaleur air/eau nécessite une unité extérieure, rarement possible en appartement. Une question sur une autre solution ? Appelez-nous, nous vous orienterons franchement.",
    showPhone: true,
  },
  horszone: {
    title: "Nous n'intervenons pas encore dans votre secteur",
    text: "Nos équipes couvrent la France métropolitaine. Nous ne pouvons pas encore vous proposer de visite technique dans votre zone.",
    showPhone: false,
  },
};

/** DOM-TOM (hors métropole) : hors zone de couverture actuelle. */
export const isOutOfZone = (cp: string) => ["97", "98"].includes(cp.slice(0, 2));
