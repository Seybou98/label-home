import { readFileSync } from "node:fs";
import { applicationDefault, cert, getApps, initializeApp, type Credential } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function credential(): { credential: Credential; projectId?: string } {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (raw) {
    const json = raw.trim().startsWith("{") ? raw : Buffer.from(raw, "base64").toString("utf8");
    const account = JSON.parse(json);
    return { credential: cert(account), projectId: account.project_id };
  }
  const path = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (path) {
    try {
      // Lu directement (plutôt que applicationDefault()) pour connaître le project_id et déduire le bucket Storage.
      const account = JSON.parse(readFileSync(path, "utf8"));
      return { credential: cert(account), projectId: account.project_id };
    } catch {
      return { credential: applicationDefault() };
    }
  }
  throw new Error(
    "Firebase Admin non configuré : renseignez FIREBASE_SERVICE_ACCOUNT_JSON (ou GOOGLE_APPLICATION_CREDENTIALS).",
  );
}

export function db() {
  if (!getApps().length) {
    const { credential: cred, projectId } = credential();
    // Bucket Storage du CRM (contrats PDF) : FIREBASE_STORAGE_BUCKET, sinon <projet>.firebasestorage.app.
    const storageBucket = process.env.FIREBASE_STORAGE_BUCKET || (projectId ? `${projectId}.firebasestorage.app` : undefined);
    initializeApp({ credential: cred, storageBucket });
  }
  return getFirestore();
}
