"use client";

import Script from "next/script";
import { useEffect } from "react";
import { applyConsent, readConsent } from "@/lib/consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Ładuje gtag tylko, gdy ustawiono NEXT_PUBLIC_GA_ID. Domyślny stan zgód to
 * „denied” (Consent Mode v2); po decyzji użytkownika stan jest aktualizowany.
 */
export function Analytics() {
  useEffect(() => {
    const consent = readConsent();
    if (consent) applyConsent(consent);
  }, []);

  if (!GA_ID) return null;
  return (
    <>
      <Script id="consent-default" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});`}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}
