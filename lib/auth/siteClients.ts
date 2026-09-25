import { db } from "./firebaseAdmin";
import { codeDocId, normalizeEmail } from "./otp";
import type { ClientRecord, PendingRegistration } from "./types";

/** Collection dédiée aux clients inscrits sur le site (distincte des collections du CRM). */
export const siteCollection = () => process.env.FIREBASE_SITE_CLIENTS_COLLECTION || "site_clients";

const toRecord = (id: string, email: string, data: FirebaseFirestore.DocumentData): ClientRecord => ({
  id,
  source: siteCollection(),
  email,
  name: [data.prenom, data.nom].filter(Boolean).join(" ").trim() || "client",
});

export async function getSiteClient(typedEmail: string): Promise<ClientRecord | null> {
  const email = normalizeEmail(typedEmail);
  const doc = await db().collection(siteCollection()).doc(codeDocId(email)).get();
  return doc.exists ? toRecord(doc.id, email, doc.data()!) : null;
}

/** Crée le client du site (identifiant = empreinte de l'e-mail : un seul compte par adresse). */
export async function createSiteClient(typedEmail: string, info: PendingRegistration): Promise<ClientRecord> {
  const email = normalizeEmail(typedEmail);
  const ref = db().collection(siteCollection()).doc(codeDocId(email));
  const data = {
    prenom: info.prenom,
    nom: info.nom,
    email,
    telephone: info.telephone,
    emailVerified: true,
    origine: "site-web",
    createdAt: new Date().toISOString(),
  };
  try {
    await ref.create(data);
  } catch (err) {
    if ((err as { code?: number }).code !== 6) throw err; // 6 = ALREADY_EXISTS : déjà inscrit
    const existing = await ref.get();
    return toRecord(ref.id, email, existing.data() ?? data);
  }
  return toRecord(ref.id, email, data);
}
