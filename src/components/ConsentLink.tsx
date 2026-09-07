"use client";

import { reopenConsent } from "@/lib/consent";

export function ConsentLink({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={reopenConsent} className={className}>
      Cookies
    </button>
  );
}
