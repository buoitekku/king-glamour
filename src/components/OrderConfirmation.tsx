"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { formatPrice } from "@/lib/format";
import { paymentMethods } from "@/lib/commerce";
import { CheckIcon } from "./Icons";

export function OrderConfirmation() {
  return (
    <Suspense fallback={<p className="text-center text-ink-500">Ładowanie…</p>}>
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
    <div className="mx-auto max-w-xl rounded-lg border border-ink-100 p-8 text-center">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-100 text-emerald-700"><CheckIcon width={28} height={28} /></span>
      <h1 className="mt-4 font-serif text-3xl font-semibold text-ink-900">Dziękujemy za zamówienie!</h1>
      <p className="mt-2 text-ink-500">Numer zamówienia</p>
      <p className="font-mono text-xl font-semibold text-ink-900">{nr}</p>
      <dl className="mt-6 space-y-1 text-sm text-ink-700">
        <div className="flex justify-between"><dt>Kwota</dt><dd className="font-semibold">{formatPrice(total)}</dd></div>
        <div className="flex justify-between"><dt>Płatność</dt><dd>{payment?.name ?? "—"}</dd></div>
      </dl>
      <p className="mt-6 text-sm text-ink-500">Potwierdzenie wysłaliśmy na Twój adres e-mail. O nadaniu paczki poinformujemy Cię SMS-em.</p>
      <div className="mt-6 flex justify-center gap-3">
        <Link href="/" className="btn-primary">Wróć do sklepu</Link>
        <Link href="/konto" className="btn-secondary">Moje zamówienia</Link>
      </div>
    </div>
  );
}
