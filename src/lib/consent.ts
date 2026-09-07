/**
 * Zgody na cookies zgodne z Google Consent Mode v2. Decyzja trzymana w
 * localStorage; do czasu wyboru wszystkie zgody poza niezbędnymi są odmówione.
 */
export interface Consent {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  decidedAt: string;
}

export const CONSENT_KEY = "kg-consent";
export const CONSENT_EVENT = "kg-consent-change";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function readConsent(): Consent | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Consent;
    return parsed && typeof parsed.analytics === "boolean" ? parsed : null;
  } catch {
    return null;
  }
}

export function writeConsent(choice: { analytics: boolean; marketing: boolean }): Consent {
  const consent: Consent = { necessary: true, ...choice, decidedAt: new Date().toISOString() };
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  } catch {}
  applyConsent(consent);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: consent }));
  return consent;
}

/** Przekazuje decyzję do Google Consent Mode v2 (gtag), jeśli tag jest załadowany. */
export function applyConsent(consent: Consent) {
  if (typeof window.gtag !== "function") return;
  const g = consent.analytics ? "granted" : "denied";
  const m = consent.marketing ? "granted" : "denied";
  window.gtag("consent", "update", {
    analytics_storage: g,
    ad_storage: m,
    ad_user_data: m,
    ad_personalization: m,
  });
}

/** Otwiera panel zgód ponownie (link w stopce). */
export function reopenConsent() {
  window.dispatchEvent(new CustomEvent(`${CONSENT_EVENT}-open`));
}
