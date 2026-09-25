import { db } from "./firebaseAdmin";
import { normalizeEmail } from "./otp";
import { getSiteClient } from "./siteClients";
import type { ClientRecord } from "./types";

export type { ClientRecord };

// Collections où vivent les clients (fiches "clients" et clients d'entretien).
const collections = () =>
  (process.env.FIREBASE_CLIENT_COLLECTIONS || "clients,client_entretien")
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);

// Dans la base Label Énergie, l'e-mail est dans contact.email (contact.secondaryEmail en repli).
const emailFields = () => [process.env.FIREBASE_CLIENTS_EMAIL_FIELD || "contact.email", "contact.secondaryEmail"];

function displayName(data: FirebaseFirestore.DocumentData): string {
  const c = data.contact ?? {};
  const full = [c.firstName ?? data.prenom ?? data.firstName, c.lastName ?? data.nom ?? data.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();
  return full || data.name || data.displayName || "client";
}

/**
 * Retrouve un client par e-mail :
 * 1. dans client_portal_users (comptes déjà utilisés par l'application mobile),
 * 2. sinon dans chaque collection de clients du CRM (contact.email puis contact.secondaryEmail),
 * 3. sinon dans la collection des clients inscrits sur le site.
 */
export async function findClientByEmail(typedEmail: string): Promise<ClientRecord | null> {
  const lower = normalizeEmail(typedEmail);
  const variants = Array.from(new Set([lower, typedEmail.trim()]));

  for (const value of variants) {
    const portal = await db().collection("client_portal_users").where("email", "==", value).limit(1).get();
    if (portal.empty) continue;
    const { clientId, clientSource } = portal.docs[0].data();
    if (!clientId) continue;
    const source = clientSource || "clients";
    const doc = await db().collection(source).doc(clientId).get();
    if (doc.exists) return { id: doc.id, source, email: lower, name: displayName(doc.data()!) };
  }

  for (const source of collections()) {
    for (const field of emailFields()) {
      for (const value of variants) {
        const snap = await db().collection(source).where(field, "==", value).limit(1).get();
        if (!snap.empty) {
          const doc = snap.docs[0];
          return { id: doc.id, source, email: lower, name: displayName(doc.data()) };
        }
      }
    }
  }
  // Enfin : clients inscrits sur le site (collection dédiée, séparée du CRM).
  return getSiteClient(lower);
}
