"use client";

import { useState, type FormEvent } from "react";

/**
 * Formularze logowania i rejestracji. Uwierzytelnianie jest po stronie
 * platformy (Shopify Customer Accounts, Medusa Auth, Saleor) lub NextAuth –
 * tutaj tylko walidacja i stan UI.
 */
export function AccountForms() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [message, setMessage] = useState<string | null>(null);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setMessage(
      tab === "login"
        ? `Logowanie dla ${data.get("email")} zostanie obsłużone przez system kont platformy sklepowej.`
        : `Rejestracja konta ${data.get("email")} zostanie obsłużona przez system kont platformy sklepowej.`
    );
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="rounded-lg border border-ink-100 p-6">
        <div className="mb-5 flex gap-2 rounded-md bg-brand-50 p-1" role="tablist">
          {(["login", "register"] as const).map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => { setTab(t); setMessage(null); }}
              className={`flex-1 rounded px-3 py-2 text-sm font-medium ${tab === t ? "bg-white text-ink-900 shadow-sm" : "text-ink-500"}`}
            >
              {t === "login" ? "Logowanie" : "Rejestracja"}
            </button>
          ))}
        </div>
        <form onSubmit={submit} className="space-y-3">
          {tab === "register" && (
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block"><span className="mb-1 block text-xs font-medium text-ink-700">Imię</span><input name="firstName" required className="input" /></label>
              <label className="block"><span className="mb-1 block text-xs font-medium text-ink-700">Nazwisko</span><input name="lastName" required className="input" /></label>
            </div>
          )}
          <label className="block"><span className="mb-1 block text-xs font-medium text-ink-700">E-mail</span><input name="email" type="email" required autoComplete="email" className="input" /></label>
          <label className="block"><span className="mb-1 block text-xs font-medium text-ink-700">Hasło</span><input name="password" type="password" required minLength={8} autoComplete={tab === "login" ? "current-password" : "new-password"} className="input" /></label>
          {tab === "login" && <a href="#" className="block text-xs text-brand-700 underline">Nie pamiętam hasła</a>}
          <button type="submit" className="btn-primary w-full">{tab === "login" ? "Zaloguj się" : "Załóż konto"}</button>
        </form>
        {message && <p className="mt-4 rounded-md bg-brand-50 px-3 py-2 text-sm text-ink-700">{message}</p>}
        <div className="mt-5 border-t border-ink-100 pt-5">
          <p className="mb-2 text-center text-xs text-ink-500">lub kontynuuj przez</p>
          <div className="grid grid-cols-3 gap-2">
            {["Google", "Facebook", "Apple"].map((p) => (
              <button key={p} type="button" className="btn-secondary px-2 py-2 text-xs">{p}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {[
          ["Śledzenie zamówień", "Status i numer przesyłki w jednym miejscu."],
          ["Szybsze zakupy", "Zapisane adresy i preferowany sposób dostawy."],
          ["Program lojalnościowy", "Punkty za każde zamówienie do wymiany na rabaty."],
          ["Historia i zwroty", "Zwrot online w kilka kliknięć, do 30 dni."],
        ].map(([title, text]) => (
          <div key={title} className="rounded-lg bg-brand-50 p-4">
            <p className="font-medium text-ink-900">{title}</p>
            <p className="text-sm text-ink-500">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
