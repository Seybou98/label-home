"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function ConnexionPage() {
  const router = useRouter();

  return (
    <div className="container flex min-h-[70vh] max-w-md items-center">
      <div className="w-full rounded-card border border-line bg-white p-8 shadow-card">
        <h1 className="font-display text-xl text-navy">Accéder à mon espace client</h1>
        <p className="mt-2 text-sm text-muted">
          Connectez-vous pour suivre vos installations, vos documents et vos contrats.
        </p>
        <form
          className="mt-6 grid gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: brancher sur le fournisseur d'authentification une fois choisi
            router.push("/espace-client");
          }}
        >
          <input
            required
            type="email"
            placeholder="Adresse e-mail"
            className="rounded-md border border-line px-3 py-3 text-xs text-ink outline-none focus:border-teal2"
          />
          <input
            required
            type="password"
            placeholder="Mot de passe"
            className="rounded-md border border-line px-3 py-3 text-xs text-ink outline-none focus:border-teal2"
          />
          <button
            type="submit"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#0b5877] to-[#18b9a0] px-5 py-3 text-xs font-extrabold text-white shadow-lg"
          >
            SE CONNECTER <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
