import { NextResponse } from "next/server";
import { findClientByEmail } from "@/lib/auth/clients";
import { MailError, issueCode } from "@/lib/auth/codes";
import { EMAIL_RE, RESEND_COOLDOWN_MS } from "@/lib/auth/otp";
import { allowIp } from "@/lib/auth/rateLimit";

export const runtime = "nodejs";

const OK = { ok: true, retryAfter: RESEND_COOLDOWN_MS / 1000 };

export async function POST(request: Request) {
  let email = "";
  try {
    const body = await request.json();
    email = typeof body.email === "string" ? body.email.trim() : "";
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Adresse e-mail invalide." }, { status: 400 });
  }

  try {
    if (!(await allowIp(request))) {
      return NextResponse.json({ error: "Trop de demandes. Réessayez plus tard." }, { status: 429 });
    }

    const client = await findClientByEmail(email);

    // Même réponse que le compte existe ou non : on ne révèle pas quels e-mails sont clients.
    if (!client) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(`[auth] aucun client trouvé pour ${email} : aucun code envoyé (inscription nécessaire).`);
      }
      return NextResponse.json(OK);
    }

    await issueCode({ email, name: client.name });
    return NextResponse.json(OK);
  } catch (err) {
    if (err instanceof MailError) {
      return NextResponse.json({ error: "Envoi du code impossible. Réessayez dans un instant." }, { status: 502 });
    }
    console.error("[auth] request-code :", err);
    return NextResponse.json({ error: "Service momentanément indisponible." }, { status: 500 });
  }
}
