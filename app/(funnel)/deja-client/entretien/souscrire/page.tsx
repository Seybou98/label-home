import { Suspense } from "react";
import { getSession } from "@/lib/auth/session";
import { getPortalData } from "@/lib/portal/data";
import { SouscrireWizard, type WizardPrefill } from "@/components/funnel/SouscrireWizard";

export default async function SouscrirePage() {
  const session = await getSession();

  // Pré-remplissage depuis la fiche du client (adresse, téléphone) quand elle existe.
  let prefill: WizardPrefill | null = null;
  if (session) {
    prefill = { name: session.name, email: session.email, phone: "", address: "", postalCode: "", city: "", needsPhone: false };
    try {
      const { profile } = await getPortalData(session.clientId, session.source, session.name, session.email);
      prefill = {
        name: profile.name || session.name,
        email: session.email,
        phone: profile.phone,
        address: profile.address?.street ?? "",
        postalCode: profile.address?.postalCode ?? "",
        city: profile.address?.city ?? "",
        // Les inscrits du site n'ont pas de fiche CRM : le téléphone est demandé pour créer leur client d'entretien.
        needsPhone: profile.kind === "site",
      };
    } catch {
      // fiche indisponible : le client saisit ses informations
    }
  }

  return (
    <Suspense>
      <SouscrireWizard prefill={prefill} />
    </Suspense>
  );
}
