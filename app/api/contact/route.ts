import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();

  // TODO: envoyer vers le CRM / boîte mail commerciale une fois le
  // fournisseur retenu.
  console.log("Nouveau message de contact:", data);

  return NextResponse.json({ ok: true });
}
