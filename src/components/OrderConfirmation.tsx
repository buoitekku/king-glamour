"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { formatPrice } from "@/lib/format";
import { paymentMethods } from "@/lib/commerce";

export function OrderConfirmation() {
  return (
    <Suspense fallback={<p className="text-muted">Ładowanie…</p>}>
      <Inner />
    </Suspense>
  );
}

function Inner() {
  const sp = useSearchParams();
  const nr = sp.get("nr") ?? "—";
  const total = Number(sp.get("kwota") ?? 0);
  const payment = paymentMethods.find((p) => p.id === sp.get("platnosc"));
  return (
    <div className="container-page grid gap-8 pt-16 pb-10 md:grid-cols-[3fr_2fr] md:gap-16 md:pt-24">
      <div>
        <p className="caps">Zamówienie przyjęte</p>
        <h1 className="display mt-3 text-[2.6rem] leading-none text-ink md:text-[3.75rem]">Dziękujemy.</h1>
        <p className="mt-5 max-w-[46ch] text-base text-ink-2">
          Potwierdzenie wysłaliśmy na Twój adres e-mail. O nadaniu paczki poinformujemy Cię SMS-em.
        </p>
        <p className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="btn-primary">Wróć do sklepu</Link>
          <Link href="/konto" className="btn-secondary">Moje zamówienia</Link>
        </p>
      </div>
      <dl className="h-fit divide-y divide-rule border-y-2 border-ink text-sm md:mt-2">
        <div className="grid grid-cols-[8rem_1fr] gap-4 py-3"><dt className="caps">Numer</dt><dd className="font-semibold tabular-nums text-ink">{nr}</dd></div>
        <div className="grid grid-cols-[8rem_1fr] gap-4 py-3"><dt className="caps">Kwota</dt><dd className="font-semibold tabular-nums text-ink">{formatPrice(total)}</dd></div>
        <div className="grid grid-cols-[8rem_1fr] gap-4 py-3"><dt className="caps">Płatność</dt><dd className="text-ink">{payment?.name ?? "—"}</dd></div>
      </dl>
    </div>
  );
}
