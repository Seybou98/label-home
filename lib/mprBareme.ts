export type Zone = "hors" | "idf";

export const BAREME: Record<Zone, { base: number[][]; extra: number[] }> = {
  idf: {
    base: [
      [24031, 29253, 40851],
      [35270, 42933, 60051],
      [42357, 51564, 71846],
      [49455, 60208, 84562],
      [56580, 68877, 96817],
    ],
    extra: [7116, 8663, 12257],
  },
  hors: {
    base: [
      [17363, 22259, 31185],
      [25393, 32553, 45842],
      [30540, 39148, 55196],
      [35676, 45735, 64550],
      [40835, 52348, 73907],
    ],
    extra: [5151, 6598, 9357],
  },
};

export const PROFILES = [
  { name: "Profil bleu", sub: "Très modeste", est: "Profil bleu · Très modeste", prime: "5 000 €", primeAmount: 5000, color: "#1e6fd0", fg: "#fff", tint: "#eef4fc" },
  { name: "Profil jaune", sub: "Modeste", est: "Profil jaune · Modeste", prime: "4 000 €", primeAmount: 4000, color: "#f5b91e", fg: "#12334b", tint: "#fff8e6" },
  { name: "Profil violet", sub: "Intermédiaire", est: "Profil violet · Intermédiaire", prime: "3 000 €", primeAmount: 3000, color: "#7a5bc7", fg: "#fff", tint: "#f3effb" },
  { name: "Profil rose", sub: "Aisé", est: "Profil rose · Aisé", prime: "Non éligible", primeAmount: 0, color: "#e0708f", fg: "#fff", tint: "#fcf0f4" },
] as const;

export const fmt = (n: number) => n.toLocaleString("fr-FR").replace(/[  ]/g, " ") + " €";

/** Plafonds de ressources (bleu, jaune, violet) pour un foyer de n personnes. */
export function limitsFor(zone: Zone, people: number): number[] {
  const b = BAREME[zone];
  return people <= 5 ? b.base[people - 1] : b.base[4].map((v, i) => v + b.extra[i] * (people - 5));
}

/** Indice du profil (0 bleu, 1 jaune, 2 violet, 3 rose), ou -1 si le revenu est vide/invalide. */
export function profileIndex(zone: Zone, people: number, rfr: string): number {
  const r = parseFloat(rfr);
  if (rfr === "" || !(r >= 0)) return -1;
  const l = limitsFor(zone, people);
  if (r <= l[0]) return 0;
  if (r <= l[1]) return 1;
  if (r <= l[2]) return 2;
  return 3;
}

const IDF_DEPARTMENTS = ["75", "77", "78", "91", "92", "93", "94", "95"];

export function zoneFromPostalCode(cp: string): Zone {
  return IDF_DEPARTMENTS.includes(cp.slice(0, 2)) ? "idf" : "hors";
}
