import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { getStorage } from "firebase-admin/storage";
import { Timestamp } from "firebase-admin/firestore";
import { db } from "@/lib/auth/firebaseAdmin";
import { getSession } from "@/lib/auth/session";
import { allowKey } from "@/lib/auth/rateLimit";
import { SESSION_COOKIE, SESSION_MAX_AGE, signSession } from "@/lib/auth/token";
import { equipmentTypes, isFormulaId, isProductId, totalMonthly, type ProductId } from "@/lib/content/entretien";
import { addOneYear, CONTRACT_NUMBER_RE, equipmentLabel, type SubscriptionPayload } from "@/lib/entretien/types";
import {
  BackendError,
  createContractAndSendForSignature,
  createMaintenanceForContract,
} from "@/lib/entretien/backend";
import { todayIso } from "@/lib/portal/format";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_PDF_BYTES = 5 * 1024 * 1024;
const YMD = /^\d{4}-\d{2}-\d{2}$/;
const CRM_SOURCES = new Set(["clients", "client_entretien"]);

const fail = (error: string, status = 400) => NextResponse.json({ error }, { status });
const text = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Valide la charge utile ; le montant, les dates et le numéro de client ne viennent jamais du navigateur. */
function parsePayload(raw: unknown): SubscriptionPayload | string {
  if (!raw || typeof raw !== "object") return "Requête invalide.";
  const b = raw as Record<string, unknown>;

  const contractNumber = text(b.contractNumber, 20);
  if (!CONTRACT_NUMBER_RE.test(contractNumber)) return "Numéro de contrat invalide.";
  if (!isFormulaId(b.formule)) return "Formule invalide.";
  if (!Array.isArray(b.products) || b.products.length < 1 || b.products.length > equipmentTypes.length) {
    return "Sélectionnez au moins un équipement.";
  }
  const products = Array.from(new Set(b.products)).filter(isProductId) as ProductId[];
  if (products.length !== b.products.length) return "Équipement invalide.";

  const eq = (b.equipment ?? {}) as Record<string, Record<string, unknown>>;
  const equipment: SubscriptionPayload["equipment"] = {};
  for (const id of products) {
    const d = eq[id] ?? {};
    const marque = text(d.marque, 80);
    const modele = text(d.modele, 80);
    const dateMiseEnService = text(d.dateMiseEnService, 10);
    if (!marque || !modele || !YMD.test(dateMiseEnService)) return "Renseignez la marque, le modèle et la date de mise en service de chaque équipement.";
    equipment[id] = { marque, modele, dateMiseEnService };
  }

  const paymentDate = Number(b.paymentDate);
  if (!Number.isInteger(paymentDate) || paymentDate < 1 || paymentDate > 28) return "Le jour de prélèvement doit être compris entre 1 et 28.";

  const h = (b.holder ?? {}) as Record<string, unknown>;
  const holder = {
    name: text(h.name, 100),
    address: text(h.address, 150),
    postalCode: text(h.postalCode, 5),
    city: text(h.city, 80),
    phone: text(h.phone, 20),
  };
  if (holder.name.length < 2 || holder.address.length < 3 || !/^\d{5}$/.test(holder.postalCode) || holder.city.length < 2) {
    return "Renseignez le nom du titulaire et une adresse complète.";
  }

  return { contractNumber, formule: b.formule, products, equipment, paymentDate, notes: text(b.notes, 1000), holder };
}

/** Client d'entretien du CRM : réutilise celui de la même adresse e-mail, sinon le crée. */
async function ensureEntretienClient(email: string, holder: SubscriptionPayload["holder"], first: string, last: string) {
  const existing = await db().collection("client_entretien").where("contact.email", "==", email).limit(1).get();
  if (!existing.empty) return existing.docs[0].id;

  const ref = db().collection("client_entretien").doc();
  const now = Timestamp.now();
  await ref.set({
    id: ref.id,
    name: holder.name,
    contact: { firstName: first, lastName: last, email, phone: holder.phone },
    address: { street: holder.address, postalCode: holder.postalCode, city: holder.city, country: "France" },
    createdAt: now,
    updatedAt: now,
    status: "entretien",
  });
  return ref.id;
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return fail("Connectez-vous pour souscrire un contrat.", 401);

  let payload: SubscriptionPayload | string;
  let pdf: Buffer;
  try {
    const form = await request.formData();
    payload = parsePayload(JSON.parse(String(form.get("payload") ?? "null")));
    const file = form.get("pdf");
    if (!(file instanceof File) || file.size === 0 || file.size > MAX_PDF_BYTES) return fail("Le contrat PDF est manquant ou trop volumineux.");
    pdf = Buffer.from(await file.arrayBuffer());
    if (pdf.subarray(0, 5).toString() !== "%PDF-") return fail("Le fichier du contrat n'est pas un PDF valide.");
  } catch {
    return fail("Requête invalide.");
  }
  if (typeof payload === "string") return fail(payload);
  const p = payload;

  if (!(await allowKey(`souscription:${session.email}`, 5, 60 * 60 * 1000))) {
    return fail("Trop de tentatives. Réessayez dans une heure ou contactez-nous.", 429);
  }

  try {
    // Numéro de contrat unique (évite un double envoi).
    const dup = await db().collection("contracts").where("contractNumber", "==", p.contractNumber).limit(1).get();
    if (!dup.empty) return fail("Ce contrat a déjà été envoyé. Vérifiez votre boîte e-mail.", 409);

    const email = session.email.trim().toLowerCase();
    const [firstName = "", ...rest] = p.holder.name.split(/\s+/).filter(Boolean);
    const lastName = rest.join(" ");

    // 1) Client : CRM existant, ou création d'un client d'entretien pour les inscrits du site.
    let clientId = session.clientId;
    let clientSource = session.source;
    let newSessionCookie: string | null = null;
    if (!CRM_SOURCES.has(session.source)) {
      clientId = await ensureEntretienClient(email, p.holder, firstName, lastName);
      clientSource = "client_entretien";
      newSessionCookie = await signSession({ clientId, source: clientSource, email, name: p.holder.name });
    }

    // 2) Dates et montant : calculés ici.
    const start = todayIso();
    const end = addOneYear(start);
    const monthlyAmount = totalMonthly(p.products, p.formule);
    const names = p.products.map((id) => equipmentTypes.find((e) => e.slug === id)!.crmName);
    const equipmentName = equipmentLabel(names);
    const common = {
      contractNumber: p.contractNumber,
      signerEmail: email,
      contractStartDate: start,
      contractEndDate: end,
      monthlyAmount,
      paymentDate: p.paymentDate,
      paymentMethod: "gocardless" as const,
      equipmentName,
      // L'IBAN n'est jamais collecté ici : le mandat SEPA est finalisé après signature via le lien sécurisé GoCardless.
      gocardlessIban: "",
      gocardlessAccountHolder: p.holder.name,
      gocardlessAddress: p.holder.address,
      gocardlessPostalCode: p.holder.postalCode,
      gocardlessCity: p.holder.city,
      gocardlessCountry: "France",
    };

    // 3) Maintenance : réutilise celle du client si elle existe (comme le portail Entretien), sinon la crée via le backend.
    const col = db().collection("maintenances");
    const found = (
      await Promise.all([
        col.where("clientId", "==", clientId).limit(1).get(),
        col.where("clientContact.email", "==", email).limit(1).get(),
        col.where("signerEmail", "==", email).limit(1).get(),
      ])
    ).flatMap((s) => s.docs)[0];
    const maintenanceId =
      found?.id ?? (await createMaintenanceForContract({ ...common, clientId, clientName: p.holder.name })).maintenanceId;

    // 4) PDF dans Storage (lien à jeton, même format que les fichiers du CRM).
    const bucket = getStorage().bucket();
    const path = `maintenances/${maintenanceId}/documents/${p.contractNumber}.pdf`;
    const token = randomUUID();
    await bucket.file(path).save(pdf, {
      resumable: false,
      contentType: "application/pdf",
      metadata: { metadata: { firebaseStorageDownloadTokens: token } },
    });
    const pdfUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(path)}?alt=media&token=${token}`;

    // 5) Backend : création du contrat + envoi en signature électronique.
    const created = await createContractAndSendForSignature({
      ...common,
      maintenanceId,
      pdfUrl,
      signerFirstName: firstName,
      signerLastName: lastName,
    });

    // 6) Remarques du client (facultatives) : conservées sur la maintenance.
    if (p.notes) {
      await col
        .doc(maintenanceId)
        .set({ notes: `${found?.data().notes ? `${found.data().notes}\n` : ""}[Site web ${start}] ${p.notes}` }, { merge: true })
        .catch((err) => console.error("[souscription] notes non enregistrées :", err));
    }

    const res = NextResponse.json({ ok: true, contractId: created.contractId });
    if (newSessionCookie) {
      res.cookies.set(SESSION_COOKIE, newSessionCookie, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: SESSION_MAX_AGE,
      });
    }
    return res;
  } catch (err) {
    console.error("[souscription]", err);
    if (err instanceof BackendError) {
      return fail("Le service de signature est momentanément indisponible. Réessayez dans quelques minutes ou contactez-nous.", 502);
    }
    return fail("Une erreur est survenue. Réessayez ou contactez-nous.", 500);
  }
}
