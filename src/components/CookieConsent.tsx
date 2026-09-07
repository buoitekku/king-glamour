"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CONSENT_EVENT, readConsent, writeConsent } from "@/lib/consent";

/**
 * Panel zgód: pasek przy dolnej krawędzi (rejestr C4 z design.md), trzy
 * równorzędne decyzje bez ciemnych wzorców: wszystkie, tylko niezbędne,
 * własny wybór. Otwiera się ponownie z linku „Cookies” w stopce.
 */
export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const current = readConsent();
    if (!current) setOpen(true);
    else {
      setAnalytics(current.analytics);
      setMarketing(current.marketing);
    }
    const reopen = () => { setCustom(true); setOpen(true); };
    window.addEventListener(`${CONSENT_EVENT}-open`, reopen);
    return () => window.removeEventListener(`${CONSENT_EVENT}-open`, reopen);
  }, []);

  if (!open) return null;

  const decide = (choice: { analytics: boolean; marketing: boolean }) => {
    writeConsent(choice);
    setOpen(false);
    setCustom(false);
  };

  return (
    <section
      role="dialog"
      aria-labelledby="consent-title"
      className="fixed inset-x-0 bottom-0 z-[var(--z-modal)] border-t-2 border-ink bg-paper"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="container-page grid gap-4 py-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-10">
        <div className="max-w-[60ch]">
          <h2 id="consent-title" className="font-display text-xl font-title leading-tight text-ink">Cookies w King Glamour</h2>
          <p className="mt-1.5 text-sm text-ink-2">
            Niezbędne pliki obsługują koszyk i ulubione. Analityczne i marketingowe włączamy tylko za Twoją zgodą. Szczegóły w{" "}
            <Link href="/polityka-prywatnosci" className="link-typo">polityce prywatności</Link>.
          </p>
          {custom && (
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-2">
              <label className="flex items-center gap-2"><input type="checkbox" checked disabled className="h-4 w-4 accent-[var(--color-ink)]" /> Niezbędne</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="h-4 w-4 accent-[var(--color-ink)]" /> Analityczne</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} className="h-4 w-4 accent-[var(--color-ink)]" /> Marketingowe</label>
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2 md:justify-end">
          {custom ? (
            <button type="button" onClick={() => decide({ analytics, marketing })} className="btn-primary">Zapisz wybór</button>
          ) : (
            <>
              <button type="button" onClick={() => decide({ analytics: true, marketing: true })} className="btn-primary">Akceptuję wszystkie</button>
              <button type="button" onClick={() => decide({ analytics: false, marketing: false })} className="btn-secondary">Tylko niezbędne</button>
              <button type="button" onClick={() => setCustom(true)} className="link-typo self-center px-2 text-sm">Ustawienia</button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
