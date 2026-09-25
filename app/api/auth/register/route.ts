import { NextResponse } from "next/server";
import { findClientByEmail } from "@/lib/auth/clients";
import { MailError, issueCode } from "@/lib/auth/codes";
import { EMAIL_RE, RESEND_COOLDOWN_MS } from "@/lib/auth/otp";
import { allowIp } from "@/lib/auth/rateLimit";

export const runtime = "nodejs";

const OK = { ok: true, retryAfter: RESEND_COOLDOWN_MS / 1000 };
const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().replace(/\s+/g, " ").slice(0, max) : "");

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const prenom = clean(body.prenom, 60);
  const nom = clean(body.nom, 60);
  const email = clean(body.email, 254);
  const telephone = clean(body.telephone, 25);

  if (!prenom || !nom) return NextResponse.json({ error: "Renseignez votre prénom et votre nom." }, { status: 400 });
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: "Adresse e-mail invalide." }, { status: 400 });
  if (telephone && !/^[+\d][\d\s.()-]{5,24}$/.test(telephone)) {
    return NextResponse.json({ error: "Numéro de téléphone invalide." }, { status: 400 });
  }
  if (body.consent !== true) {
    return NextResponse.json({ error: "Vous devez accepter la politique de confidentialité." }, { status: 400 });
  }

  try {
    if (!(await allowIp(request))) {
      return NextResponse.json({ error: "Trop de demandes. Réessayez plus tard." }, { status: 429 });
    }

    // Adresse déjà connue (CRM ou site) : on envoie un code de connexion, réponse identique pour ne rien révéler.
    const existing = await findClientByEmail(email);
    if (existing) {
      await issueCode({ email, name: existing.name });
    } else {
      await issueCode({ email, name: prenom, pending: { prenom, nom, telephone } });
    }
    return NextResponse.json(OK);
  } catch (err) {
    if (err instanceof MailError) {
      return NextResponse.json({ error: "Envoi du code impossible. Réessayez dans un instant." }, { status: 502 });
    }
    console.error("[auth] register :", err);
    return NextResponse.json({ error: "Service momentanément indisponible." }, { status: 500 });
  }
}
