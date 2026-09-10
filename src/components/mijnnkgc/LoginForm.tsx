"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction, type LoginActionState } from "@/app/mijnnkgc/inloggen/actions";

const initialState: LoginActionState = { error: null };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="username" className="mb-1.5 block text-sm font-medium text-nkgc-blue-800">
          Gebruikersnaam of e-mailadres
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          autoComplete="username"
          className="w-full rounded-xl border border-nkgc-sand-200 bg-white px-4 py-3 text-[15px] text-nkgc-blue-900 focus:border-nkgc-green-600"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-nkgc-blue-800">
          Wachtwoord
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-xl border border-nkgc-sand-200 bg-white px-4 py-3 text-[15px] text-nkgc-blue-900 focus:border-nkgc-green-600"
        />
      </div>

      {state.error === "invalid_credentials" && (
        <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-800 ring-1 ring-red-200">
          Inloggen is niet gelukt. Controleer uw gegevens en probeer het opnieuw.
        </p>
      )}
      {state.error === "not_configured" && (
        <p role="alert" className="rounded-xl bg-amber-50 p-3 text-sm text-amber-800 ring-1 ring-amber-200">
          MijnNKGC is in deze omgeving nog niet gekoppeld aan het bestaande NKGC-systeem.
        </p>
      )}

      <button type="submit" disabled={pending} className="btn-primary w-full">
        {pending ? "Bezig met inloggen..." : "Inloggen"}
      </button>

      <div className="flex items-center justify-between text-sm">
        <Link href="/mijnnkgc/wachtwoord-vergeten" className="text-nkgc-blue-700 hover:underline">
          Wachtwoord vergeten?
        </Link>
        <Link href="/" className="text-nkgc-blue-700 hover:underline">
          Terug naar de website
        </Link>
      </div>
    </form>
  );
}
