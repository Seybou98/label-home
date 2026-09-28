import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { getPortalData } from "./data";
import type { PortalData } from "./types";

/** Données du client connecté (redirige vers la connexion si la session est absente). */
export async function getMyPortal(): Promise<PortalData> {
  const s = await getSession();
  if (!s) redirect("/connexion");
  return getPortalData(s.clientId, s.source, s.name, s.email);
}

export * from "./format";
export * from "./types";
