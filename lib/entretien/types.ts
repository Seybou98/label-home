import type { FormulaId, ProductId } from "@/lib/content/entretien";

export type EquipmentDetails = { marque: string; modele: string; dateMiseEnService: string };

/** Charge utile envoyée par le tunnel de souscription (le montant est recalculé côté serveur). */
export type SubscriptionPayload = {
  contractNumber: string;
  formule: FormulaId;
  products: ProductId[];
  equipment: Record<string, EquipmentDetails>;
  paymentDate: number;
  notes: string;
  holder: {
    name: string;
    address: string;
    postalCode: string;
    city: string;
    phone: string;
  };
};

export const CONTRACT_NUMBER_RE = /^CONTRACT-[A-Z0-9]{8}$/;

/** Numéro de contrat au format du CRM (CONTRACT-XXXXXXXX). */
export function newContractNumber(): string {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  return `CONTRACT-${Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("")}`;
}

/** Libellé récapitulatif des équipements, comme dans le CRM. */
export function equipmentLabel(names: string[]): string {
  return names.length <= 1 ? (names[0] ?? "") : `${names[0]} + ${names.length - 1} autre(s)`;
}

/** Date de fin = début + 1 an (calcul identique au CRM, en UTC). */
export function addOneYear(ymd: string): string {
  const [y, m, d] = ymd.split("-").map(Number);
  const end = new Date(Date.UTC(y, m - 1, d));
  end.setUTCFullYear(end.getUTCFullYear() + 1);
  return end.toISOString().slice(0, 10);
}
