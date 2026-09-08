import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();

  // TODO: persister le lead/contrat (CRM ou base de données) une fois le
  // fournisseur de paiement et le contenu définitif des formules confirmés.
  console.log("Nouvelle demande de contrat d'entretien:", data);

  return NextResponse.json({ ok: true });
}
