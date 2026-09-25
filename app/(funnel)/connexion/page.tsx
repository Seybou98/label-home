"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Mail, ShieldCheck } from "lucide-react";

const inputClass =
  "rounded-md border border-line px-3 py-3 text-sm text-ink outline-none focus:border-teal2";

function safeNext(value: string | null) {
  return value && value.startsWith("/espace-client") ? value : "/espace-client";
}

type Mode = "login" | "register";

function ConnexionForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [mode, setMode] = useState<Mode>("login");
  const [step, setStep] = useState<"form" | "code">("form");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState({ prenom: "", nom: "", telephone: "" });
  const [consent, setConsent] = useState(false);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  function switchMode(next: Mode) {
    setMode(next);
    setStep("form");
    setError("");
    setCode("");
  }

  async function requestCode() {
    setBusy(true);
    setError("");
    try {
      const isRegister = mode === "register";
      const res = await fetch(isRegister ? "/api/auth/register" : "/api/auth/request-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isRegister ? { email, ...profile, consent } : { email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Une erreur est survenue.");
        return false;
      }
      setCooldown(data.retryAfter ?? 60);
      return true;
    } catch {
      setError("Connexion impossible. Vérifiez votre réseau.");
      return false;
    } finally {
      setBusy(false);
    }
  }

  async function submitForm(e: React.FormEvent) {
    e.preventDefault();
    if (await requestCode()) {
      setCode("");
      setStep("code");
    }
  }

  async function submitCode(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Code invalide ou expiré.");
        return;
      }
      router.replace(safeNext(params.get("next")));
      router.refresh();
    } catch {
      setError("Connexion impossible. Vérifiez votre réseau.");
    } finally {
      setBusy(false);
    }
  }

  const isRegister = mode === "register";

  return (
    <div className="container flex min-h-[70vh] max-w-md items-center py-8">
      <div className="w-full rounded-card border border-line bg-white p-8 shadow-card">
        <h1 className="font-display text-xl text-navy">
          {isRegister ? "Créer mon espace client" : "Accéder à mon espace client"}
        </h1>

        {step === "form" && (
          <div className="mt-4 grid grid-cols-2 gap-1 rounded-lg bg-soft p-1 text-xs font-semibold">
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => switchMode(m)}
                className={`rounded-md py-2 ${mode === m ? "bg-white text-teal2 shadow-sm" : "text-navy"}`}
              >
                {m === "login" ? "Connexion" : "Inscription"}
              </button>
            ))}
          </div>
        )}

        {step === "form" ? (
          <>
            <p className="mt-4 text-sm text-muted">
              {isRegister
                ? "Pas encore client ? Créez votre espace : nous vérifions votre adresse e-mail avec un code à usage unique."
                : "Saisissez l'adresse e-mail de votre compte : nous vous envoyons un code de connexion à usage unique."}
            </p>
            <form className="mt-5 grid gap-3" onSubmit={submitForm}>
              {isRegister && (
                <>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      required
                      autoComplete="given-name"
                      placeholder="Prénom"
                      maxLength={60}
                      value={profile.prenom}
                      onChange={(e) => setProfile({ ...profile, prenom: e.target.value })}
                      className={inputClass}
                    />
                    <input
                      required
                      autoComplete="family-name"
                      placeholder="Nom"
                      maxLength={60}
                      value={profile.nom}
                      onChange={(e) => setProfile({ ...profile, nom: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <input
                    type="tel"
                    autoComplete="tel"
                    placeholder="Téléphone (facultatif)"
                    maxLength={25}
                    value={profile.telephone}
                    onChange={(e) => setProfile({ ...profile, telephone: e.target.value })}
                    className={inputClass}
                  />
                </>
              )}
              <input
                required
                type="email"
                autoComplete="email"
                placeholder="Adresse e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
              {isRegister && (
                <label className="flex items-start gap-2 text-xs text-muted">
                  <input
                    required
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 accent-teal2"
                  />
                  <span>
                    J&apos;accepte que Label Énergie traite mes données pour créer mon espace, selon la{" "}
                    <Link href="/confidentialite" target="_blank" className="text-teal2 underline">
                      politique de confidentialité
                    </Link>
                    .
                  </span>
                </label>
              )}
              {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
              <button type="submit" disabled={busy} className="btn btn-primary mt-2 justify-center disabled:opacity-60">
                {busy ? "ENVOI EN COURS…" : isRegister ? "CRÉER MON ESPACE" : "RECEVOIR MON CODE"} <ArrowRight size={16} />
              </button>
            </form>
          </>
        ) : (
          <>
            <p className="mt-4 flex items-start gap-2 text-sm text-muted">
              <Mail size={16} className="mt-0.5 shrink-0 text-teal2" />
              {isRegister ? (
                <span>
                  Un code à 6 chiffres vient d&apos;être envoyé à <strong className="text-navy">{email}</strong>. Il est
                  valable 15 minutes.
                </span>
              ) : (
                <span>
                  Si un compte existe pour <strong className="text-navy">{email}</strong>, un code à 6 chiffres vient
                  d&apos;être envoyé. Il est valable 15 minutes.
                </span>
              )}
            </p>
            <form className="mt-5 grid gap-3" onSubmit={submitCode}>
              <input
                required
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="\d{6}"
                maxLength={6}
                placeholder="Code à 6 chiffres"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                className={`${inputClass} text-center text-lg tracking-[0.5em]`}
              />
              {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
              <button
                type="submit"
                disabled={busy || code.length !== 6}
                className="btn btn-primary mt-2 justify-center disabled:opacity-60"
              >
                {busy ? "VÉRIFICATION…" : isRegister ? "VALIDER MON INSCRIPTION" : "SE CONNECTER"} <ArrowRight size={16} />
              </button>
            </form>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs">
              <button
                type="button"
                disabled={busy || cooldown > 0}
                onClick={requestCode}
                className="font-semibold text-teal2 disabled:text-muted"
              >
                {cooldown > 0 ? `Renvoyer le code (${cooldown}s)` : "Renvoyer le code"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setStep("form");
                  setError("");
                }}
                className="text-muted underline"
              >
                Modifier mes informations
              </button>
            </div>
          </>
        )}

        <p className="mt-6 flex items-center gap-2 text-xs text-muted">
          <ShieldCheck size={14} className="text-teal2" /> Connexion sécurisée, sans mot de passe.
        </p>
      </div>
    </div>
  );
}

export default function ConnexionPage() {
  return (
    <Suspense>
      <ConnexionForm />
    </Suspense>
  );
}
