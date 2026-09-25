import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "le_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

export type Session = { clientId: string; source: string; email: string; name: string };

function secretKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("AUTH_SECRET manquant ou trop court (32 caractères minimum).");
  }
  return new TextEncoder().encode(secret);
}

export async function signSession(session: Session): Promise<string> {
  return new SignJWT({ email: session.email, name: session.name, source: session.source })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(session.clientId)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(secretKey());
}

export async function verifySession(token: string | undefined): Promise<Session | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey(), { algorithms: ["HS256"] });
    if (!payload.sub || typeof payload.email !== "string") return null;
    return {
      clientId: payload.sub,
      source: String(payload.source ?? "clients"),
      email: payload.email,
      name: String(payload.name ?? ""),
    };
  } catch {
    return null;
  }
}
