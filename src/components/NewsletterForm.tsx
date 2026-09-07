"use client";

import { useState, type FormEvent } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setState(res.ok ? "ok" : "error");
      if (res.ok) setEmail("");
    } catch {
      setState("error");
    }
  };

  if (state === "ok") {
    return <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm text-emerald-800">Dziękujemy! Sprawdź skrzynkę, wysłaliśmy kod rabatowy.</p>;
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
