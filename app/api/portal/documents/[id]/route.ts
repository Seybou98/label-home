import { NextResponse } from "next/server";
import { getStorage } from "firebase-admin/storage";
import { Readable } from "node:stream";
import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/auth/firebaseAdmin";
import { CRM_SOURCES, DOCUMENT_WHITELIST } from "@/lib/portal/data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Un identifiant de document = "c.<docId>" (clients/{id}/documents) ou "k.<contractId>" (PDF de contrat).
const ID_RE = /^([ck])\.([A-Za-z0-9_-]{5,64})$/;

/** Extrait le bucket et le chemin d'un lien firebasestorage (jamais renvoyé au navigateur). */
function parseStorageUrl(url: string): { bucket: string; path: string } | null {
  try {
    const u = new URL(url);
    if (u.hostname !== "firebasestorage.googleapis.com") return null;
    const m = u.pathname.match(/^\/v0\/b\/([^/]+)\/o\/(.+)$/);
    return m ? { bucket: m[1], path: decodeURIComponent(m[2]) } : null;
  } catch {
    return null;
  }
}

export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Non connecté." }, { status: 401 });

  const { id } = await ctx.params;
  const match = ID_RE.exec(id);
  if (!match || !CRM_SOURCES.has(session.source)) return NextResponse.json({ error: "Introuvable." }, { status: 404 });
  const [, kind, docId] = match;

  // Propriété vérifiée côté serveur : le document doit appartenir au client de la session.
  let url = "";
  let filename = "document";
  if (kind === "c") {
    const snap = await db().collection(session.source).doc(session.clientId).collection("documents").doc(docId).get();
    const d = snap.data();
    if (!d || !DOCUMENT_WHITELIST[String(d.type)]) return NextResponse.json({ error: "Introuvable." }, { status: 404 });
    url = String(d.url ?? "");
    filename = String(d.originalName || d.name || DOCUMENT_WHITELIST[String(d.type)].label);
  } else {
    const snap = await db().collection("contracts").doc(docId).get();
    const d = snap.data();
    if (!d || d.clientId !== session.clientId) return NextResponse.json({ error: "Introuvable." }, { status: 404 });
    url = String(d.pdfUrl ?? "");
    filename = `Contrat d'entretien${d.contractNumber ? ` ${d.contractNumber}` : ""}.pdf`;
  }

  const loc = parseStorageUrl(url);
  if (!loc) return NextResponse.json({ error: "Introuvable." }, { status: 404 });

  const file = getStorage().bucket(loc.bucket).file(loc.path);
  const [exists] = await file.exists();
  if (!exists) return NextResponse.json({ error: "Fichier indisponible." }, { status: 404 });
  const [meta] = await file.getMetadata();

  const download = new URL(req.url).searchParams.get("download") === "1";
  const safeName = filename.replace(/[\r\n"\\]/g, "").slice(0, 120);
  const headers = new Headers({
    "Content-Type": String(meta.contentType || "application/octet-stream"),
    "Content-Disposition": `${download ? "attachment" : "inline"}; filename*=UTF-8''${encodeURIComponent(safeName)}`,
    "Cache-Control": "private, no-store",
    "X-Content-Type-Options": "nosniff",
  });
  if (meta.size) headers.set("Content-Length", String(meta.size));

  return new Response(Readable.toWeb(file.createReadStream()) as ReadableStream, { headers });
}
