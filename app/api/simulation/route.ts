import { NextResponse } from "next/server";
import { db } from "@/lib/auth/firebaseAdmin";
import { allowIp } from "@/lib/auth/rateLimit";

export async function POST(request: Request) {
  const data = await request.json();

  // Honeypot : champ invisible pour les humains, rempli seulement par les robots.
  if (typeof data.website === "string" && data.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const allowed = await allowIp(request, 8, 60 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json({ ok: false, error: "Trop de demandes, réessayez plus tard." }, { status: 429 });
  }

  await db()
    .collection("simulation_requests")
    .add({
      ...data,
      status: "nouveau",
      createdAt: new Date().toISOString(),
    });

  return NextResponse.json({ ok: true });
}
