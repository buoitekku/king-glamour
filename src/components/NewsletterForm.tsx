"use client";

import { useState, type FormEvent } from "react";
import { subscribeNewsletter } from "@/lib/orders";

export function NewsletterForm() {
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
    return <p className="border-l border-ok pl-3 text-sm text-ink-2">Dziękujemy! Sprawdź skrzynkę, wysłaliśmy kod rabatowy.</p>;
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
          className="input"
        />
      </label>
      <button type="submit" disabled={state === "loading"} className="btn-primary">
        {state === "loading" ? "Zapisywanie…" : "Zapisz się"}
      </button>
      {state === "error" && <p className="text-xs text-accent sm:w-full">Nie udało się zapisać. Spróbuj ponownie.</p>}
    </form>
  );
}
