// Demande de SAV depuis l'espace client : mêmes types de problème que les tickets du CRM (champ issueType).
export const SAV_ISSUE_TYPES = [
  "Panne technique",
  "Bruit anormal",
  "Performance insuffisante",
  "Fuite",
  "Problème de régulation",
  "Autre",
] as const;

export const SAV_MIN_DESCRIPTION = 10;
export const SAV_MAX_DESCRIPTION = 1000;
export const SAV_MAX_PHOTOS = 3;
export const SAV_MAX_PHOTO_BYTES = 2 * 1024 * 1024;

export type SavRequestPayload = {
  /** Projet concerné (obligatoirement un projet du client) ; absent si le client n'en a pas. */
  projectId: string;
  /** Équipement saisi librement quand aucun projet n'est rattaché au compte. */
  equipment: string;
  issueType: (typeof SAV_ISSUE_TYPES)[number];
  description: string;
};
