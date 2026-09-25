import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySession, type Session } from "./token";

export async function getSession(): Promise<Session | null> {
  const store = await cookies();
  return verifySession(store.get(SESSION_COOKIE)?.value);
}
