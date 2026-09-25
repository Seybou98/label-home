import { NextResponse } from "next/server";
import { db } from "@/lib/auth/firebaseAdmin";
import { findClientByEmail } from "@/lib/auth/clients";
import { createSiteClient } from "@/lib/auth/siteClients";
import { CODES_COLLECTION, EMAIL_RE, MAX_ATTEMPTS, codeDocId, hashCode, safeEqual } from "@/lib/auth/otp";
import { SESSION_COOKIE, SESSION_MAX_AGE, signSession } from "@/lib/auth/token";
import type { PendingRegistration } from "@/lib/auth/types";

export const runtime = "nodejs";

const INVALID = { error: "Code invalide ou expiré." };

type Outcome = { status: "invalid" | "locked" } | { status: "ok"; pending: PendingRegistration | null };

export async function POST(request: Request) {
  let email = "";
  let code = "";
  try {
    const body = await request.json();
    email = typeof body.email === "string" ? body.email.trim() : "";
    code = typeof body.code === "string" ? body.code.trim() : "";
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  if (!EMAIL_RE.test(email) || !/^\d{6}$/.test(code)) {
    return NextResponse.json(INVALID, { status: 400 });
  }

  try {
    const ref = db().collection(CODES_COLLECTION).doc(codeDocId(email));

    const outcome = await db().runTransaction<Outcome>(async (tx) => {
      const snap = await tx.get(ref);
      if (!snap.exists) return { status: "invalid" };
      const data = snap.data()!;

      if (Date.now() > data.expiresAt) {
        tx.delete(ref);
        return { status: "invalid" };
      }
      if (data.attempts >= MAX_ATTEMPTS) {
        tx.delete(ref);
        return { status: "locked" };
      }
      if (!safeEqual(hashCode(email, code), data.codeHash)) {
        tx.update(ref, { attempts: data.attempts + 1 });
        return { status: "invalid" };
      }
      tx.delete(ref);
      return { status: "ok", pending: data.pending ?? null };
    });

    if (outcome.status === "locked") {
      return NextResponse.json({ error: "Trop de tentatives. Demandez un nouveau code." }, { status: 429 });
    }
    if (outcome.status !== "ok") return NextResponse.json(INVALID, { status: 400 });

    // Client existant (CRM ou site), sinon création du client du site si une inscription était en attente.
    let client = await findClientByEmail(email);
    if (!client && outcome.pending) client = await createSiteClient(email, outcome.pending);
    if (!client) return NextResponse.json(INVALID, { status: 400 });

    const token = await signSession({ clientId: client.id, source: client.source, email: client.email, name: client.name });
    const res = NextResponse.json({ ok: true });
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE,
    });
    return res;
  } catch (err) {
    console.error("[auth] verify-code :", err);
    return NextResponse.json({ error: "Service momentanément indisponible." }, { status: 500 });
  }
}
