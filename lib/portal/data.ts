import { cache } from "react";
import { db } from "@/lib/auth/firebaseAdmin";
import { addDays, frDate, toIsoDay, todayIso } from "./format";
import type {
  PortalAppointment,
  PortalContract,
  PortalData,
  PortalDocument,
  PortalNotification,
  PortalProfile,
  PortalProject,
  PortalTicket,
  ProjectPhase,
  TimelineStep,
} from "./types";

/**
 * Couche de données du portail client.
 *
 * Règles de sécurité :
 *  - toutes les requêtes sont filtrées par l'identifiant du client de la session (Admin SDK = pas de règles Firestore) ;
 *  - seuls des champs explicitement choisis ici sont renvoyés (jamais d'IBAN, gocardless*, notes internes, équipes…) ;
 *  - aucun lien de fichier n'est exposé : les documents passent par /api/portal/documents/[id] qui revérifie la propriété.
 */

// Collections de clients autorisées (la source vient du cookie de session signé).
const CRM_SOURCES = new Set(["clients", "client_entretien"]);
const SITE_SOURCE = "site_clients";

type Doc = FirebaseFirestore.DocumentData;
const str = (v: unknown): string => (typeof v === "string" ? v.trim() : "");
const num = (v: unknown): number | undefined => (typeof v === "number" && Number.isFinite(v) ? v : undefined);

// ─── Documents visibles par le client ────────────────────────────────────────
// clients/{id}/documents : seuls ces types sont exposés (liasse, mandat, cadre de contribution, notes de
// dimensionnement, dossier client… restent internes).
export const DOCUMENT_WHITELIST: Record<string, { label: string; category: PortalDocument["category"] }> = {
  devis: { label: "Devis", category: "contrat" },
  contrat_assemblage_mise_service: { label: "Contrat d'assemblage et de mise en service", category: "contrat" },
  pv_reception: { label: "PV de réception", category: "tech" },
  attestation_mise_en_service: { label: "Attestation de mise en service", category: "tech" },
  att_fin_travaux: { label: "Attestation de fin de travaux", category: "tech" },
};

// ─── Projets ─────────────────────────────────────────────────────────────────
const DONE = new Set(["terminer", "facturer_mpr", "facturer_cee", "facturer_cee_mpr"]);
const RUNNING = new Set(["commencer", "encours"]);
const PLANNED = new Set(["placer", "confirmer", "preparer", "charger"]);

function phaseOf(status: string): ProjectPhase {
  if (DONE.has(status)) return "done";
  if (RUNNING.has(status)) return "running";
  if (PLANNED.has(status)) return "planned";
  if (status === "adecaler") return "reschedule";
  if (status === "annuler") return "cancelled";
  if (status === "infaisable") return "blocked";
  return "unknown";
}

const PHASE_LABEL: Record<ProjectPhase, string> = {
  planned: "Installation planifiée",
  running: "Installation en cours",
  done: "Installation terminée",
  reschedule: "À replanifier",
  cancelled: "Projet annulé",
  blocked: "Installation impossible",
  unknown: "En cours de traitement",
};

const SUBVENTION_LABEL: Record<string, string> = {
  a_deposer: "Dossier d'aides en préparation",
  deposer: "Dossier d'aides déposé",
  incomplet_depot: "Pièces complémentaires demandées",
  incomplet_octroi: "Pièces complémentaires demandées",
  controle_admin_valider: "Dossier d'aides validé",
  facturer: "Dossier d'aides finalisé",
};
const SUBVENTION_DONE = new Set(["controle_admin_valider", "facturer"]);

function productTitle(p: Doc): string {
  const names = ((p.products as Doc[]) ?? []).map((x) => str(x.name)).filter(Boolean);
  if (names.length) return Array.from(new Set(names)).join(" + ");
  // Repli : "NOM - PRODUIT (date) #xxxx" -> "PRODUIT"
  const raw = str(p.name);
  const after = raw.includes(" - ") ? raw.split(" - ").slice(1).join(" - ") : raw;
  return after.replace(/\s*\(\d{2}\/\d{2}\/\d{4}\)\s*#\w+$/, "").trim() || "Installation";
}

function stepOf(p: Doc, id: number): Doc | undefined {
  return ((p.steps as Doc[]) ?? []).find((s) => s.id === id);
}
const stepDone = (s?: Doc) => s?.status === "valide";
const stepDate = (s?: Doc) => toIsoDay(s?.timestamps?.valide?.date);

function buildProject(
  id: string,
  p: Doc,
  subv: Doc | undefined,
  documents: PortalDocument[],
  client: Doc | undefined,
  installDays: string[],
): PortalProject {
  const status = str(p.status);
  const phase = phaseOf(status);
  const active = phase === "planned" || phase === "running" || phase === "done";

  // Dates d'installation : rendez-vous du client (collection "appointments"), sinon ceux embarqués dans le projet.
  const appts = installDays.length
    ? installDays
    : ((p.appointments as Doc[]) ?? [])
        .map((a) => toIsoDay(a.installationDate) ?? toIsoDay(a.date))
        .filter((d): d is string => !!d)
        .sort();
  const firstDay = appts[0];
  const lastDay = appts[appts.length - 1];

  const receptionStep = stepOf(p, 7);
  const finishStep = stepOf(p, 6);
  const installDate = stepDate(finishStep) ?? toIsoDay(p.completedAt) ?? lastDay;
  const subvStatut = str(subv?.dossier?.statut);

  const pv = documents.find((d) => d.type === "pv_reception");
  const steps: TimelineStep[] = [
    {
      title: "Projet enregistré",
      date: "",
      text: "Votre dossier est ouvert chez Label Énergie.",
      done: true,
    },
    {
      title: "Installation planifiée",
      date: firstDay ? (lastDay && lastDay !== firstDay ? `${frDate(firstDay)} → ${frDate(lastDay)}` : frDate(firstDay)) : "",
      text: active ? "Un rendez-vous d'installation est fixé avec nos équipes." : "La date d'installation sera confirmée par nos équipes.",
      done: active,
    },
    {
      title: "Installation réalisée",
      date: phase === "done" ? frDate(installDate) : "",
      text: "Pose de vos équipements par nos techniciens.",
      done: phase === "done",
    },
    {
      title: "Réception & signature du dossier",
      date: stepDone(receptionStep) ? frDate(stepDate(receptionStep)) : "",
      text: "Contrôle des travaux, mise en service et signature de votre dossier.",
      done: stepDone(receptionStep),
      doc: pv ? { id: pv.id, label: pv.name } : undefined,
    },
  ];
  if (subv) {
    steps.push({
      title: "Dossier d'aides",
      date: "",
      text: SUBVENTION_LABEL[subvStatut] ?? "Votre dossier d'aides est en cours de traitement.",
      done: SUBVENTION_DONE.has(subvStatut),
    });
  }
  steps.push({
    title: "Service après-vente",
    date: "Disponible",
    text: "Un souci avec votre installation ? Déclarez une demande SAV en 2 minutes.",
    done: false,
  });

  const info = (p.questionnaire?.info ?? client?.questionnaireAnswers?.info ?? {}) as Doc;
  const surface = str(info.surface);
  const year = str(info.year);
  const housingKind = str(info.housingType) === "maison" ? `Maison ${str(info.maisonType)}`.trim() : "";
  const housing = [housingKind, [surface && `${surface} m²`, year && `construite en ${year}`].filter(Boolean).join(" · ")].filter(Boolean);

  const address = client?.address
    ? [str(client.address.street), [str(client.address.postalCode), str(client.address.city)].filter(Boolean).join(" ")].filter(Boolean)
    : [];

  return {
    id,
    title: productTitle(p),
    startDate: toIsoDay(p.startDate),
    phase,
    statusLabel: PHASE_LABEL[phase],
    equipments: ((p.products as Doc[]) ?? []).map((x) => ({
      name: str(x.name) || "Équipement",
      type: str(x.type),
      installed: x.installationStatus === "installed",
    })),
    steps,
    address,
    housing,
    installDate: phase === "done" ? installDate : undefined,
  };
}

// ─── Chargement ──────────────────────────────────────────────────────────────
function emptyData(profile: PortalProfile): PortalData {
  return {
    profile,
    hasCrmData: false,
    projects: [],
    aides: null,
    appointments: [],
    contracts: [],
    tickets: [],
    documents: [],
    notifications: [],
  };
}

async function loadProfile(clientId: string, source: string, fallbackName: string, email: string): Promise<{ profile: PortalProfile; raw?: Doc }> {
  const base: PortalProfile = {
    civility: "",
    firstName: "",
    lastName: "",
    name: fallbackName,
    email,
    phone: "",
    address: null,
    kind: source === SITE_SOURCE ? "site" : "crm",
  };
  if (source !== SITE_SOURCE && !CRM_SOURCES.has(source)) return { profile: base };
  const snap = await db().collection(source).doc(clientId).get();
  if (!snap.exists) return { profile: base };
  const d = snap.data()!;
  if (source === SITE_SOURCE) {
    return {
      profile: { ...base, firstName: str(d.prenom), lastName: str(d.nom), phone: str(d.telephone), name: [str(d.prenom), str(d.nom)].filter(Boolean).join(" ") || fallbackName },
      raw: d,
    };
  }
  const c = (d.contact ?? {}) as Doc;
  const civility = str(c.civility).toLowerCase();
  return {
    profile: {
      ...base,
      civility: civility === "madame" ? "Mme" : civility === "monsieur" ? "M." : "",
      firstName: str(c.firstName),
      lastName: str(c.lastName),
      phone: str(c.phone),
      address: d.address
        ? { street: str(d.address.street), postalCode: str(d.address.postalCode), city: str(d.address.city) }
        : null,
    },
    raw: d,
  };
}

const TICKET_STATUS: Record<string, { label: string; tone: PortalTicket["tone"] }> = {
  resolu: { label: "Résolue", tone: "ok" },
  resolu_distance: { label: "Résolue", tone: "ok" },
  annule: { label: "Annulée", tone: "muted" },
  nouveau: { label: "Reçue", tone: "info" },
  ticket_ouvert: { label: "Reçue", tone: "info" },
  programmer_intervention: { label: "Intervention à planifier", tone: "info" },
  piece: { label: "Pièce en commande", tone: "info" },
};
const ticketStatus = (s: string) => TICKET_STATUS[s] ?? { label: "En cours de traitement", tone: "info" as const };

function apptKind(a: Doc): { kind: PortalAppointment["kind"]; label: string } {
  if (/sav/i.test(str(a.title))) return { kind: "sav", label: "Intervention SAV" };
  if (a.type === "installation") return { kind: "installation", label: "Installation" };
  if (a.type === "maintenance") return { kind: "entretien", label: "Entretien" };
  return { kind: "autre", label: "Rendez-vous" };
}

async function loadPortal(clientId: string, source: string, name: string, email: string): Promise<PortalData> {
  const { profile, raw } = await loadProfile(clientId, source, name, email);
  // Les clients inscrits sur le site n'ont pas (encore) de données CRM.
  if (!CRM_SOURCES.has(source)) return emptyData(profile);

  const col = (c: string) => db().collection(c);
  const [projectsSnap, subvSnap, apptSnap, contractSnap, maintSnap, ticketSnap, docsSnap, demandeSnap] = await Promise.all([
    col("projects").where("client.id", "==", clientId).get(),
    col("subventions").where("clientId", "==", clientId).get(),
    col("appointments").where("client.id", "==", clientId).get(),
    col("contracts").where("clientId", "==", clientId).get(),
    col("maintenances").where("clientId", "==", clientId).get(),
    col("tickets").where("client.id", "==", clientId).get(),
    col(source).doc(clientId).collection("documents").get(),
    col("sav_tickets").where("clientId", "==", clientId).get(),
  ]);

  // Documents (liste blanche) + PDF des contrats signés.
  const documents: PortalDocument[] = [];
  docsSnap.docs.forEach((d) => {
    const x = d.data();
    const rule = DOCUMENT_WHITELIST[str(x.type)];
    if (!rule || !str(x.url)) return;
    documents.push({
      id: `c.${d.id}`,
      name: str(x.name) || rule.label,
      type: str(x.type),
      category: rule.category,
      date: toIsoDay(x.uploadedAt),
      isPdf: /\.pdf(\?|$)/i.test(str(x.originalName) || str(x.path) || str(x.url)),
    });
  });
  contractSnap.docs.forEach((d) => {
    const x = d.data();
    if (!str(x.pdfUrl)) return;
    documents.push({
      id: `k.${d.id}`,
      name: `Contrat d'entretien${str(x.contractNumber) ? ` n°${str(x.contractNumber)}` : ""}`,
      type: "contrat_entretien",
      category: "contrat",
      date: toIsoDay(x.createdAt),
      isPdf: true,
    });
  });
  documents.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));

  // Aides : la subvention rattachée au client (subventionId) sinon la plus récente.
  const subvDocs = subvSnap.docs.map((d) => ({ id: d.id, ...d.data() }) as Doc);
  subvDocs.sort((a, b) => (toIsoDay(b.createdAt) ?? "").localeCompare(toIsoDay(a.createdAt) ?? ""));
  const subv = subvDocs.find((s) => s.id === raw?.subventionId) ?? subvDocs[0];

  const installDays = apptSnap.docs
    .map((d) => d.data())
    .filter((a) => a.type === "installation" && !/sav/i.test(str(a.title)))
    .map((a) => toIsoDay(a.installationDate) ?? toIsoDay(a.date))
    .filter((d): d is string => !!d)
    .sort();

  const projects = projectsSnap.docs
    .map((d) => buildProject(d.id, d.data(), subv, documents, raw, installDays))
    .filter((p) => p.phase !== "cancelled" || projectsSnap.size === 1)
    .sort((a, b) => (b.startDate ?? "").localeCompare(a.startDate ?? ""));

  const mpr = num(subv?.primeMprTotal) ?? 0;
  const cee = num(subv?.primeCeeTotal) ?? 0;
  const racFromSubv = num(subv?.racTotal);
  const racFromClient = raw?.RAC?.hasToCollect ? num(raw.RAC.amount) : undefined;
  const rac = racFromSubv ?? racFromClient;
  const aides = subv || rac !== undefined
    ? {
        mpr,
        cee,
        rac,
        statut: subv ? (SUBVENTION_LABEL[str(subv.dossier?.statut)] ?? "En cours de traitement") : undefined,
      }
    : null;

  const today = todayIso();

  const appointments: PortalAppointment[] = apptSnap.docs
    .map((d) => d.data())
    .filter((a) => a.isFirstDay !== false)
    .map((a) => {
      const date = toIsoDay(a.installationDate) ?? toIsoDay(a.date) ?? "";
      const k = apptKind(a);
      return {
        id: str(a.id),
        date,
        time: str(a.time),
        duration: str(a.duration),
        days: typeof a.daysSpan === "number" && a.daysSpan > 1 ? a.daysSpan : 1,
        kind: k.kind,
        label: k.label,
        upcoming: date >= today,
      };
    })
    .filter((a) => a.date)
    .sort((a, b) => a.date.localeCompare(b.date));

  // Contrats d'entretien : contrats + suivi de maintenance (jamais d'IBAN ni de données de prélèvement).
  const maints = maintSnap.docs.map((d) => ({ id: d.id, ...d.data() }) as Doc);
  const contractIds = new Set<string>();
  const contracts: PortalContract[] = contractSnap.docs.map((d) => {
    const x = d.data();
    const m = maints.find((y) => y.contractId === d.id || (str(y.contractNumber) && y.contractNumber === x.contractNumber));
    if (m) contractIds.add(m.id);
    return toContract(d.id, x, m, today, `k.${d.id}`, !!str(x.pdfUrl));
  });
  maints.filter((m) => !contractIds.has(m.id)).forEach((m) => contracts.push(toContract(`m.${m.id}`, m, m, today)));
  contracts.sort((a, b) => (b.start ?? "").localeCompare(a.start ?? ""));

  const crmTickets: PortalTicket[] = ticketSnap.docs.map((d) => {
    const x = d.data();
    const st = ticketStatus(str(x.status));
    return {
      id: d.id,
      kind: "ticket" as const,
      number: str(x.number) || d.id.slice(0, 8).toUpperCase(),
      issue: str(x.issueType) || "Demande",
      product: str(x.product?.name),
      date: toIsoDay(x.createdAt),
      statusLabel: st.label,
      tone: st.tone,
      open: st.tone === "info",
    };
  });
  const knownNumbers = new Set(crmTickets.map((t) => t.number));

  // Demandes clients (sav_tickets) : en attente de validation par l'équipe SAV, puis transformées en ticket CRM.
  const demandes: PortalTicket[] = demandeSnap.docs
    .map((d) => ({ id: d.id, ...d.data() }) as Doc)
    .filter((x) => !(x.crmTicketNumber && knownNumbers.has(str(x.crmTicketNumber)))) // déjà affichée via son ticket
    .map((x) => {
      const waiting = x.status === "en_attente_validation";
      return {
        id: x.id as string,
        kind: "demande" as const,
        number: str(x.crmTicketNumber),
        issue: str(x.description).split("\n")[0] || "Demande SAV",
        product: str(x.projectTitle),
        date: toIsoDay(x.createdAt),
        statusLabel: waiting ? "Demande reçue" : "En cours de traitement",
        tone: "info" as const,
        open: true,
      };
    });

  const tickets: PortalTicket[] = [...crmTickets, ...demandes].sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));

  const notifications = buildNotifications(appointments, tickets, contracts, today);

  return { profile, hasCrmData: projects.length + contracts.length + tickets.length + appointments.length > 0, projects, aides, appointments, contracts, tickets, documents, notifications };
}

function toContract(id: string, x: Doc, m: Doc | undefined, today: string, docId?: string, hasPdf?: boolean): PortalContract {
  const start = toIsoDay(x.contractStartDate);
  const end = toIsoDay(x.contractEndDate) ?? toIsoDay(m?.contractEndDate);
  // Le CRM met parfois à jour `maintenances.signatureStatus` sans réussir à mettre à jour `contracts.signatureStatus`
  // (webhook DocuSign) : un "signé" de n'importe quelle des deux sources fait foi.
  const signed = x.signatureStatus === "signed" || m?.signatureStatus === "signed";
  const pendingSignature = !signed && (x.signatureStatus === "pending" || m?.signatureStatus === "pending");
  const status: PortalContract["status"] = pendingSignature
    ? "signature"
    : end && end < today
      ? "expired"
      : start && start > today
        ? "upcoming"
        : "active";
  return {
    id,
    number: str(x.contractNumber),
    formula: str(x.formulaName),
    equipment: ((x.equipmentNames as string[]) ?? []).filter(Boolean),
    start,
    end,
    monthlyAmount: num(x.monthlyAmount),
    status,
    nextMaintenance: toIsoDay(m?.nextMaintenance),
    lastMaintenance: toIsoDay(m?.lastMaintenance),
    docId: hasPdf ? docId : undefined,
  };
}

function buildNotifications(
  appointments: PortalAppointment[],
  tickets: PortalTicket[],
  contracts: PortalContract[],
  today: string,
): PortalNotification[] {
  const list: PortalNotification[] = [];
  const soon = addDays(today, 14);
  const next = appointments.find((a) => a.upcoming && a.date <= soon);
  if (next) {
    list.push({
      kind: "rdv",
      title: `${next.label} le ${frDate(next.date)}${next.time ? ` à ${next.time}` : ""}.`,
      text: "Notre équipe se présentera à votre domicile.",
      date: next.date,
      href: "/espace-client/rendez-vous",
    });
  }
  tickets.filter((t) => t.open).slice(0, 2).forEach((t) =>
    list.push({
      kind: "sav",
      title: `Votre demande SAV${t.number ? ` n°${t.number}` : ""} est en cours de traitement.`,
      text: "Nous reviendrons vers vous rapidement.",
      date: t.date,
      href: "/espace-client/demandes",
    }),
  );
  const limit = addDays(today, 60);
  contracts.forEach((c) => {
    if (c.status === "active" && c.end && c.end <= limit) {
      list.push({
        kind: "contrat",
        title: `Votre contrat d'entretien arrive à échéance le ${frDate(c.end)}.`,
        text: "Pensez à le renouveler pour garantir la performance de vos équipements.",
        date: c.end,
        href: "/espace-client/contrats",
      });
    }
    if (c.status === "signature") {
      list.push({
        kind: "contrat",
        title: `Votre contrat d'entretien${c.number ? ` n°${c.number}` : ""} attend votre signature.`,
        text: "Consultez l'e-mail de signature qui vous a été envoyé.",
        date: c.start,
        href: "/espace-client/contrats",
      });
    }
  });
  return list;
}

/** Données du portail pour la session courante (mises en cache le temps d'une requête). */
export const getPortalData = cache(
  (clientId: string, source: string, name: string, email: string): Promise<PortalData> =>
    loadPortal(clientId, source, name, email),
);

// Ré-export pratique pour les routes.
export { CRM_SOURCES };
