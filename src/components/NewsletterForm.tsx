"use client";

import { useState, type FormEvent } from "react";
import { subscribeNewsletter } from "@/lib/orders";

export function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setState("loading");
    const ok = subscribeNewsletter(email);
    setState(ok ? "ok" : "error");
    if (ok) setEmail("");
  };

  if (state === "ok") {
    return <p className={`border-l-2 pl-3 text-sm ${dark ? "border-ink-on-dark text-ink-on-dark" : "border-forest text-ink-2"}`}>Dziękujemy! Sprawdź skrzynkę, wysłaliśmy kod rabatowy.</p>;
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-2 sm:flex-row">
      <label className="flex-1">
        <span className="sr-only">Adres e-mail</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Twój adres e-mail"
          className={dark ? "input border-muted-on-dark/40 bg-transparent text-ink-on-dark placeholder:text-muted-on-dark focus:border-ink-on-dark" : "input"}
        />
      </label>
      <button type="submit" disabled={state === "loading"} className={dark ? "btn-primary !bg-paper !text-ink hover:!bg-paper-2" : "btn-primary"}>
        {state === "loading" ? "Zapisywanie…" : "Zapisz się"}
      </button>
      {state === "error" && <p className="text-xs text-accent sm:w-full">Nie udało się zapisać. Spróbuj ponownie.</p>}
    </form>
  );
}
