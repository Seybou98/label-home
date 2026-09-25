import { createHash } from "crypto";
import { db } from "./firebaseAdmin";

/** Limite le nombre de demandes de code par adresse IP (true = autorisé). */
export async function allowIp(request: Request, max = 10, windowMs = 60 * 60 * 1000): Promise<boolean> {
  const ip =
    request.headers.get("x-nf-client-connection-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    "unknown";
  const ref = db().collection("webAuthRateLimits").doc(createHash("sha256").update(ip).digest("hex"));
  const now = Date.now();

  return db().runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const prev = snap.data();
    const fresh = !prev || now - prev.windowStart > windowMs;
    const count = fresh ? 0 : prev!.count;
    if (count >= max) return false;
    tx.set(ref, { windowStart: fresh ? now : prev!.windowStart, count: count + 1 });
    return true;
  });
}
