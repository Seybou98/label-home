// Utilitaires de dates : le CRM mélange ISO (2026-02-04), JJ/MM/AAAA et Timestamps Firestore.

type Stampable = { toDate: () => Date };

const isStamp = (v: unknown): v is Stampable =>
  !!v && typeof v === "object" && typeof (v as Stampable).toDate === "function";

/** Normalise n'importe quelle date du CRM en "AAAA-MM-JJ" (ou undefined). */
export function toIsoDay(value: unknown): string | undefined {
  if (!value) return undefined;
  if (isStamp(value)) return value.toDate().toISOString().slice(0, 10);
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value !== "string") return undefined;
  const s = value.trim();
  const fr = s.match(/^(\d{2})\/(\d{2})\/(\d{4})/);
  if (fr) return `${fr[3]}-${fr[2]}-${fr[1]}`;
  const iso = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  return iso ? `${iso[1]}-${iso[2]}-${iso[3]}` : undefined;
}

/** "2026-02-04" -> "04/02/2026". */
export function frDate(iso?: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return y && m && d ? `${d}/${m}/${y}` : "";
}

const MONTHS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
const MONTHS_SHORT = ["JANV", "FÉVR", "MARS", "AVR", "MAI", "JUIN", "JUIL", "AOÛT", "SEPT", "OCT", "NOV", "DÉC"];

/** "2026-02-04" -> "4 février 2026". */
export function frLongDate(iso?: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return y && m && d ? `${d} ${MONTHS[m - 1]} ${y}` : "";
}

export function dayAndMonth(iso: string): { day: string; month: string } {
  const [, m, d] = iso.split("-").map(Number);
  return { day: String(d), month: MONTHS_SHORT[m - 1] ?? "" };
}

/** Jour courant en heure de Paris ("AAAA-MM-JJ"). */
export function todayIso(): string {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Paris" }).format(new Date());
}

export function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

// "12000" -> "12 000 €" (espace insécable, sans dépendre des données ICU du serveur).
export const euro = (n: number) => `${String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €`;
