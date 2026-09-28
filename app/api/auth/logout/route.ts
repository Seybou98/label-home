import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth/token";

export const runtime = "nodejs";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  // Mêmes attributs qu'à la création du cookie (verify-code), sinon certains navigateurs ne le suppriment pas.
  res.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });
  res.headers.set("Cache-Control", "no-store");
  return res;
}
