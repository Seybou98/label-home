"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ImagePlus, Loader2, X } from "lucide-react";
import {
  SAV_ISSUE_TYPES,
  SAV_MAX_DESCRIPTION,
  SAV_MAX_PHOTOS,
  SAV_MIN_DESCRIPTION,
  type SavRequestPayload,
} from "@/lib/portal/sav";

export type SavProjectOption = { id: string; label: string };

const inputClass = "w-full rounded-md border border-line px-3 py-2.5 text-[11.5px] text-navy outline-none focus:border-teal2";
const labelClass = "grid gap-1.5 text-[10.5px] font-bold text-navy";

/** Réduit une photo (JPEG, 1600 px max) avant l'envoi : rapide sur mobile et sous la limite du serveur. */
async function compress(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("compression"))), "image/jpeg", 0.8),
  );
}

export function SavRequestForm({ projects, initialProjectId }: { projects: SavProjectOption[]; initialProjectId?: string }) {
  const [projectId, setProjectId] = useState(projects.find((p) => p.id === initialProjectId)?.id ?? projects[0]?.id ?? "");
  const [equipment, setEquipment] = useState("");
  const [issueType, setIssueType] = useState<SavRequestPayload["issueType"] | "">("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const noProject = projects.length === 0;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (noProject && equipment.trim().length < 2) return setError("Indiquez l'équipement concerné.");
    if (!issueType) return setError("Choisissez un type de problème.");
    if (description.trim().length < SAV_MIN_DESCRIPTION) {
      return setError(`Décrivez le problème en au moins ${SAV_MIN_DESCRIPTION} caractères.`);
    }

    setBusy(true);
    try {
      const form = new FormData();
      form.set("payload", JSON.stringify({ projectId, equipment: equipment.trim(), issueType, description: description.trim() }));
      for (const [i, file] of photos.entries()) form.append("photos", await compress(file), `photo-${i + 1}.jpg`);

      const res = await fetch("/api/portal/sav", { method: "POST", body: form });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return setError(data.error ?? "Une erreur est survenue. Réessayez.");
      setDone(true);
    } catch {
      setError("Envoi impossible. Vérifiez votre connexion et réessayez.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-card border border-line bg-white p-8 text-center">
        <CheckCircle2 size={40} className="mx-auto text-teal2" />
        <h2 className="mt-3 text-base font-bold text-navy">Votre demande a bien été transmise</h2>
        <p className="mx-auto mt-2 max-w-md text-[11px] leading-relaxed text-muted">
          Notre équipe SAV va l&apos;examiner et vous recontacter. Vous pouvez suivre son avancement dans « Mes demandes ».
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link href="/espace-client/demandes" className="btn btn-primary py-2.5 text-[10px]">
            VOIR MES DEMANDES
          </Link>
          <Link href="/espace-client" className="btn btn-outline py-2.5 text-[10px]">
            RETOUR À L&apos;ACCUEIL
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-card border border-line bg-white p-5">
      {noProject ? (
        <label className={labelClass}>
          Équipement concerné *
          <input
            className={inputClass}
            maxLength={120}
            placeholder="ex. Pompe à chaleur Air/Eau Daikin"
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
          />
        </label>
      ) : (
        <label className={labelClass}>
          Équipement concerné *
          <select className={inputClass} value={projectId} onChange={(e) => setProjectId(e.target.value)}>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </label>
      )}

      <label className={labelClass}>
        Type de problème *
        <select className={inputClass} value={issueType} onChange={(e) => setIssueType(e.target.value as typeof issueType)}>
          <option value="">Sélectionnez un type de problème</option>
          {SAV_ISSUE_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      <label className={labelClass}>
        Description du problème *
        <textarea
          className={`${inputClass} min-h-[120px] resize-y`}
          maxLength={SAV_MAX_DESCRIPTION}
          placeholder="Décrivez ce que vous constatez : depuis quand, code erreur affiché, circonstances…"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <span className="text-right text-[9.5px] font-normal text-muted">
          {description.length} / {SAV_MAX_DESCRIPTION}
        </span>
      </label>

      <div className="grid gap-2">
        <p className="text-[10.5px] font-bold text-navy">Photos (facultatif, {SAV_MAX_PHOTOS} maximum)</p>
        <div className="flex flex-wrap items-center gap-2.5">
          {photos.map((f, i) => (
            <span key={i} className="inline-flex items-center gap-2 rounded-md border border-line bg-soft px-2.5 py-1.5 text-[10px] text-navy">
              <span className="max-w-[140px] truncate">{f.name}</span>
              <button type="button" aria-label="Retirer la photo" onClick={() => setPhotos(photos.filter((_, j) => j !== i))}>
                <X size={12} />
              </button>
            </span>
          ))}
          {photos.length < SAV_MAX_PHOTOS && (
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-[#9fc9b4] px-3 py-2 text-[10.5px] font-bold text-teal2">
              <ImagePlus size={14} /> Ajouter une photo
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) setPhotos([...photos, f].slice(0, SAV_MAX_PHOTOS));
                  e.target.value = "";
                }}
              />
            </label>
          )}
        </div>
      </div>

      {error && (
        <p role="alert" className="rounded-md border border-red-300 bg-red-50 p-3 text-[11px] text-red-700">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/espace-client/demandes" className="text-[10.5px] font-bold text-muted hover:text-navy">
          Annuler
        </Link>
        <button type="submit" disabled={busy} className="btn btn-primary py-2.5 text-[10px] disabled:opacity-60">
          {busy && <Loader2 size={13} className="animate-spin" />} ENVOYER MA DEMANDE
        </button>
      </div>
    </form>
  );
}
