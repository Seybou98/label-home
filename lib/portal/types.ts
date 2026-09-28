// Types renvoyés aux pages du portail : uniquement des chaînes / nombres sérialisables, jamais de données internes.

export type ProjectPhase = "planned" | "running" | "done" | "reschedule" | "cancelled" | "blocked" | "unknown";

export type PortalProfile = {
  civility: "M." | "Mme" | "";
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone: string;
  address: { street: string; postalCode: string; city: string } | null;
  kind: "crm" | "site";
};

export type TimelineStep = {
  title: string;
  date: string;
  text: string;
  done: boolean;
  doc?: { id: string; label: string };
};

export type PortalProject = {
  id: string;
  title: string;
  startDate?: string;
  phase: ProjectPhase;
  statusLabel: string;
  equipments: { name: string; type: string; installed: boolean }[];
  steps: TimelineStep[];
  address: string[];
  housing: string[];
  installDate?: string;
};

export type PortalAides = { mpr: number; cee: number; rac?: number; statut?: string };

export type PortalAppointment = {
  id: string;
  date: string;
  time: string;
  duration: string;
  days: number;
  kind: "installation" | "entretien" | "sav" | "autre";
  label: string;
  upcoming: boolean;
};

export type PortalContract = {
  id: string;
  number: string;
  formula: string;
  equipment: string[];
  start?: string;
  end?: string;
  monthlyAmount?: number;
  status: "active" | "expired" | "upcoming" | "signature";
  nextMaintenance?: string;
  lastMaintenance?: string;
  docId?: string;
};

export type PortalTicket = {
  id: string;
  /** "demande" = demande client en attente de validation (sav_tickets), "ticket" = ticket SAV du CRM. */
  kind: "demande" | "ticket";
  /** Vide pour une demande pas encore validée (le CRM attribue le numéro à la validation). */
  number: string;
  issue: string;
  product: string;
  date?: string;
  statusLabel: string;
  tone: "ok" | "info" | "muted";
  open: boolean;
};

export type PortalDocument = {
  id: string;
  name: string;
  type: string;
  category: "contrat" | "tech";
  date?: string;
  isPdf: boolean;
};

export type PortalNotification = {
  kind: "rdv" | "sav" | "contrat";
  title: string;
  text: string;
  date?: string;
  href: string;
};

export type PortalData = {
  profile: PortalProfile;
  /** false = aucun élément du CRM rattaché (nouveau client du site, ou compte sans dossier). */
  hasCrmData: boolean;
  projects: PortalProject[];
  aides: PortalAides | null;
  appointments: PortalAppointment[];
  contracts: PortalContract[];
  tickets: PortalTicket[];
  documents: PortalDocument[];
  notifications: PortalNotification[];
};
