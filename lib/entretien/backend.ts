/**
 * Appels serveur vers le backend du CRM (Render) : création de maintenance et envoi du contrat en signature (Yousign).
 * Ces endpoints ne sont pas authentifiés : ils ne doivent JAMAIS être appelés depuis le navigateur.
 */

const baseUrl = () => (process.env.CRM_BACKEND_URL || "https://crm-back-lyvg.onrender.com").replace(/\/+$/, "");

export class BackendError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
  }
}

async function post(path: string, body: unknown): Promise<unknown> {
  let res: Response;
  try {
    // Le backend Render peut mettre ~1 min à se réveiller après une période d'inactivité.
    res = await fetch(`${baseUrl()}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(100_000),
    });
  } catch (err) {
    throw new BackendError(`Backend injoignable (${path}) : ${(err as Error).message}`);
  }
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new BackendError(`Backend HTTP ${res.status} (${path}) : ${text.slice(0, 500)}`, res.status);
  }
  return res.json();
}

export type ContractCommon = {
  contractNumber: string;
  signerEmail: string;
  contractStartDate: string; // AAAA-MM-JJ
  contractEndDate: string; // AAAA-MM-JJ
  monthlyAmount: number;
  paymentDate: number; // 1-28
  paymentMethod: "gocardless";
  equipmentName: string;
  gocardlessIban: string;
  gocardlessAccountHolder: string;
  gocardlessAddress: string;
  gocardlessPostalCode: string;
  gocardlessCity: string;
  gocardlessCountry: string;
};

export async function createMaintenanceForContract(args: ContractCommon & { clientId: string; clientName: string }) {
  const data = (await post("/api/portal/create-maintenance-for-contract", args)) as { maintenanceId?: unknown };
  if (typeof data?.maintenanceId !== "string") throw new BackendError("Réponse invalide (création maintenance).");
  return { maintenanceId: data.maintenanceId };
}

export async function createContractAndSendForSignature(
  args: ContractCommon & {
    maintenanceId: string;
    pdfUrl: string;
    signerFirstName: string;
    signerLastName: string;
  },
) {
  const data = (await post("/api/portal/create-contract", args)) as { contractId?: unknown; yousignRequestId?: unknown };
  if (typeof data?.contractId !== "string" || typeof data?.yousignRequestId !== "string") {
    throw new BackendError("Réponse invalide (création contrat).");
  }
  return { contractId: data.contractId, yousignRequestId: data.yousignRequestId };
}
