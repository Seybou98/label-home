import { db } from "./firebaseAdmin";
import { sendLoginCode } from "./emailjs";
import {
  CODES_COLLECTION,
  CODE_TTL_MS,
  MAX_SENDS_PER_HOUR,
  RESEND_COOLDOWN_MS,
  codeDocId,
  generateCode,
  hashCode,
  normalizeEmail,
} from "./otp";
import type { PendingRegistration } from "./types";

export class MailError extends Error {}

/**
 * Génère un code, l'enregistre (haché) et l'envoie par e-mail.
 * Renvoie false si l'envoi est ignoré (délai de 60 s ou plafond horaire).
 * `pending` mémorise une inscription en attente, créée seulement une fois le code validé.
 */
export async function issueCode(opts: { email: string; name: string; pending?: PendingRegistration }): Promise<boolean> {
  const { email, name, pending } = opts;
  const ref = db().collection(CODES_COLLECTION).doc(codeDocId(email));
  const code = generateCode();
  const now = Date.now();

  const allowed = await db().runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const prev = snap.data();
    let windowStart = prev?.windowStart ?? now;
    let sends = prev?.sends ?? 0;
    if (now - windowStart > 60 * 60 * 1000) {
      windowStart = now;
      sends = 0;
    }
    if (prev?.lastSentAt && now - prev.lastSentAt < RESEND_COOLDOWN_MS) return false;
    if (sends >= MAX_SENDS_PER_HOUR) return false;

    tx.set(ref, {
      email: normalizeEmail(email),
      codeHash: hashCode(email, code),
      expiresAt: now + CODE_TTL_MS,
      attempts: 0,
      lastSentAt: now,
      windowStart,
      sends: sends + 1,
      pending: pending ?? null,
    });
    return true;
  });

  if (!allowed) return false;

  try {
    await sendLoginCode({ to: normalizeEmail(email), name, code });
  } catch (err) {
    await ref.delete();
    console.error("[auth] envoi du code impossible :", err);
    throw new MailError("mail");
  }
  return true;
}
