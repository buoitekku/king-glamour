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

  const field = (name: string, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <label className="block">
      <span className="caps mb-1.5 block">{label}</span>
      <input name={name} required className="input" {...props} />
    </label>
  );

  return (
    <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-16">
      <div className="max-w-md">
        <div className="flex gap-6 border-b border-rule" role="tablist">
          {(["login", "register"] as const).map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => { setTab(t); setMessage(null); }}
              className={`caps -mb-px border-b-2 py-3 ${tab === t ? "border-ink !text-ink" : "border-transparent hover:!text-ink"}`}
            >
              {t === "login" ? "Logowanie" : "Rejestracja"}
            </button>
          ))}
        </div>
        <form onSubmit={submit} className="mt-6 space-y-4">
          {tab === "register" && (
            <div className="grid gap-4 sm:grid-cols-2">
              {field("firstName", "Imię", { autoComplete: "given-name" })}
              {field("lastName", "Nazwisko", { autoComplete: "family-name" })}
            </div>
          )}
          {field("email", "E-mail", { type: "email", autoComplete: "email" })}
          {field("password", "Hasło", { type: "password", minLength: 8, autoComplete: tab === "login" ? "current-password" : "new-password" })}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button type="submit" className="btn-primary">{tab === "login" ? "Zaloguj się" : "Załóż konto"}</button>
            {tab === "login" && <a href="#" className="link-typo text-sm">Nie pamiętam hasła</a>}
          </div>
        </form>
        {message && <p className="mt-5 border-l-2 border-forest pl-3 text-sm text-ink-2">{message}</p>}
        <div className="mt-8 border-t border-rule pt-5">
          <p className="caps mb-3">lub kontynuuj przez</p>
          <div className="flex flex-wrap gap-2">
            {["Google", "Facebook", "Apple"].map((p) => (
              <button key={p} type="button" className="btn-secondary px-4 py-2 text-sm">{p}</button>
            ))}
          </div>
        </div>
      </div>
      <dl className="h-fit divide-y divide-rule border-y border-rule">
        {[
          ["Śledzenie zamówień", "Status i numer przesyłki w jednym miejscu."],
          ["Szybsze zakupy", "Zapisane adresy i preferowany sposób dostawy."],
          ["Program lojalnościowy", "Punkty za każde zamówienie do wymiany na rabaty."],
          ["Historia i zwroty", "Zwrot online w kilka kliknięć, do 30 dni."],
        ].map(([title, text]) => (
          <div key={title} className="py-4">
            <dt className="font-display text-xl font-title leading-tight text-ink">{title}</dt>
            <dd className="mt-1 text-sm text-muted">{text}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
