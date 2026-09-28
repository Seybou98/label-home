import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { getStorage } from "firebase-admin/storage";
import { Timestamp } from "firebase-admin/firestore";
import { db } from "@/lib/auth/firebaseAdmin";
import { getSession } from "@/lib/auth/session";
import { allowKey } from "@/lib/auth/rateLimit";
import {
  SAV_ISSUE_TYPES,
  SAV_MAX_DESCRIPTION,
  SAV_MAX_PHOTOS,
  SAV_MAX_PHOTO_BYTES,
  SAV_MIN_DESCRIPTION,
  type SavRequestPayload,
} from "@/lib/portal/sav";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CRM_SOURCES = new Set(["clients", "client_entretien"]);
const MAX_OPEN_REQUESTS = 3;

const fail = (error: string, status = 400) => NextResponse.json({ error }, { status });
const text = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/**
 * Crée une « demande client » dans sav_tickets (statut en_attente_validation), exactement comme l'application
 * mobile : l'équipe SAV la voit dans l'onglet « Demandes clients » du CRM et la valide pour créer le ticket.
 */
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return fail("Connectez-vous pour déclarer un SAV.", 401);
  if (!CRM_SOURCES.has(session.source)) {
    return fail("La déclaration en ligne est réservée aux clients ayant un projet Label Énergie. Contactez-nous.", 403);
  }

  let p: SavRequestPayload;
  const photos: Buffer[] = [];
  try {
    const form = await request.formData();
    const raw = JSON.parse(String(form.get("payload") ?? "null")) as Record<string, unknown> | null;
    if (!raw || typeof raw !== "object") return fail("Requête invalide.");

    const issueType = SAV_ISSUE_TYPES.find((t) => t === raw.issueType);
    const description = text(raw.description, SAV_MAX_DESCRIPTION);
    if (!issueType) return fail("Choisissez un type de problème.");
    if (description.length < SAV_MIN_DESCRIPTION) return fail(`Décrivez le problème en au moins ${SAV_MIN_DESCRIPTION} caractères.`);
    p = { issueType, description, projectId: text(raw.projectId, 40), equipment: text(raw.equipment, 120) };

    const files = form.getAll("photos").filter((f): f is File => f instanceof File && f.size > 0);
    if (files.length > SAV_MAX_PHOTOS) return fail(`Vous pouvez joindre ${SAV_MAX_PHOTOS} photos au maximum.`);
    for (const f of files) {
      if (f.size > SAV_MAX_PHOTO_BYTES) return fail("Une photo dépasse 2 Mo.");
      const buf = Buffer.from(await f.arrayBuffer());
      // Uniquement des JPEG (le navigateur recompresse les images avant l'envoi).
      if (buf[0] !== 0xff || buf[1] !== 0xd8 || buf[2] !== 0xff) return fail("Format de photo non pris en charge.");
      photos.push(buf);
    }
  } catch {
    return fail("Requête invalide.");
  }

  if (!(await allowKey(`sav:${session.clientId}`, 5, 60 * 60 * 1000))) {
    return fail("Trop de demandes en peu de temps. Réessayez plus tard ou appelez-nous.", 429);
  }

  try {
    // Projet : doit appartenir au client de la session.
    let project: { id: string; name: string; status: string } | null = null;
    if (p.projectId) {
      const snap = await db().collection("projects").doc(p.projectId).get();
      const d = snap.data();
      if (!d || d.client?.id !== session.clientId) return fail("Équipement introuvable.", 404);
      project = { id: snap.id, name: String(d.name ?? ""), status: String(d.status ?? "") };
    } else if (p.equipment.length < 2) {
      return fail("Indiquez l'équipement concerné.");
    }

    // Anti-doublon / anti-abus : quelques demandes en attente maximum.
    const pending = await db()
      .collection("sav_tickets")
      .where("clientId", "==", session.clientId)
      .where("status", "==", "en_attente_validation")
      .get();
    if (pending.size >= MAX_OPEN_REQUESTS) {
      return fail("Vous avez déjà plusieurs demandes en cours de traitement. Notre équipe vous répond très prochainement.", 409);
    }

    const ref = db().collection("sav_tickets").doc();
    const mediaUrls: string[] = [];
    const bucket = getStorage().bucket();
    for (const [i, buf] of photos.entries()) {
      const path = `sav_tickets/${ref.id}/media/photo-${i + 1}.jpg`;
      const token = randomUUID();
      await bucket.file(path).save(buf, {
        resumable: false,
        contentType: "image/jpeg",
        metadata: { metadata: { firebaseStorageDownloadTokens: token } },
      });
      mediaUrls.push(`https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(path)}?alt=media&token=${token}`);
    }

    const now = Timestamp.now();
    await ref.set({
      projectId: project?.id ?? null,
      clientId: session.clientId,
      clientName: session.name,
      clientEmail: session.email,
      projectTitle: project?.name || p.equipment,
      // Même présentation que les demandes de l'application : « Type de problème » puis description.
      description: `${p.issueType}\n\n${p.description}`,
      tags: [],
      mediaUrls,
      chatHistory: [],
      status: "en_attente_validation",
      priority: "normal",
      source: "web_portal",
      equipmentInfo: project ? { title: project.name, subtitle: null, status: project.status } : null,
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({ ok: true, id: ref.id });
  } catch (err) {
    console.error("[sav]", err);
    return fail("Une erreur est survenue. Réessayez ou appelez-nous.", 500);
  }
}
