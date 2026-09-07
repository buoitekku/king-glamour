"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useCart, useHydrated } from "@/store/cart";
import { useCartLines } from "./CartView";
import { FREE_SHIPPING_FROM, paymentMethods, shippingMethods } from "@/lib/commerce";
import { formatPrice } from "@/lib/format";
import { ProductImage } from "./ProductImage";

export function CheckoutForm() {
  const router = useRouter();
  const hydrated = useHydrated();
  const lines = useCartLines();
  const clear = useCart((s) => s.clear);
  const [shipping, setShipping] = useState(shippingMethods[0].id);
  const [payment, setPayment] = useState(paymentMethods[0].id);
  const [invoice, setInvoice] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtotal = lines.reduce((n, l) => n + l.lineTotal, 0);
  const ship = shippingMethods.find((s) => s.id === shipping)!;
  const shippingCost = subtotal >= FREE_SHIPPING_FROM || ship.id === "pickup" ? 0 : ship.price;
  const codFee = payment === "cod" ? 5 : 0;
  const total = subtotal + shippingCost + codFee;

  if (!hydrated) return <p className="text-ink-500">Ładowanie…</p>;
  if (!lines.length) {
    return (
      <p className="rounded-lg border border-dashed border-ink-300 p-8 text-center text-ink-500">
        Koszyk jest pusty. <Link href="/" className="text-brand-700 underline">Wróć do sklepu</Link>.
      </p>
    );
  }

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    const customer = Object.fromEntries(form.entries());
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer,
          shipping,
          payment,
          items: lines.map((l) => ({ productId: l.productId, size: l.size, color: l.color, quantity: l.quantity })),
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = (await res.json()) as { orderNumber: string; total: number };
      clear();
      router.push(`/zamowienie/potwierdzenie?nr=${encodeURIComponent(data.orderNumber)}&kwota=${data.total}&platnosc=${payment}`);
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : "Nie udało się złożyć zamówienia. Spróbuj ponownie.");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit} className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <div className="space-y-8">
        <section>
          <h2 className="mb-4 font-serif text-xl font-semibold">1. Dane kontaktowe</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field name="email" label="E-mail" type="email" required autoComplete="email" />
            <Field name="phone" label="Telefon" type="tel" required autoComplete="tel" />
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-serif text-xl font-semibold">2. Adres dostawy</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field name="firstName" label="Imię" required autoComplete="given-name" />
            <Field name="lastName" label="Nazwisko" required autoComplete="family-name" />
            <Field name="street" label="Ulica i numer" required autoComplete="street-address" className="sm:col-span-2" />
            <Field name="postalCode" label="Kod pocztowy" required pattern="[0-9]{2}-[0-9]{3}" placeholder="00-000" autoComplete="postal-code" />
            <Field name="city" label="Miasto" required autoComplete="address-level2" />
          </div>
          <label className="mt-3 flex items-center gap-2 text-sm">
            <input type="checkbox" name="invoice" checked={invoice} onChange={(e) => setInvoice(e.target.checked)} className="accent-brand-700" /> Chcę otrzymać fakturę VAT
          </label>
          {invoice && (
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field name="company" label="Nazwa firmy" required />
              <Field name="nip" label="NIP" required pattern="[0-9]{10}" />
            </div>
          )}
        </section>

        <section>
          <h2 className="mb-4 font-serif text-xl font-semibold">3. Sposób dostawy</h2>
          <ul className="space-y-2">
            {shippingMethods.map((m) => (
              <li key={m.id}>
                <label className={`flex cursor-pointer items-center gap-3 rounded-md border p-3 ${shipping === m.id ? "border-brand-800 bg-brand-50" : "border-ink-100"}`}>
                  <input type="radio" name="shipping" value={m.id} checked={shipping === m.id} onChange={() => setShipping(m.id)} className="accent-brand-700" />
                  <span className="flex-1">
                    <span className="block text-sm font-medium text-ink-900">{m.name}</span>
                    <span className="block text-xs text-ink-500">{m.description} · {m.eta}</span>
                  </span>
                  <span className="text-sm font-medium">{m.price === 0 || subtotal >= FREE_SHIPPING_FROM ? "0,00 zł" : formatPrice(m.price)}</span>
                </label>
              </li>
            ))}
          </ul>
          {shipping === "inpost" && <Field name="parcelLocker" label="Kod paczkomatu (np. LOD01A)" required className="mt-3" />}
        </section>

        <section>
          <h2 className="mb-4 font-serif text-xl font-semibold">4. Płatność</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {paymentMethods.map((m) => (
              <li key={m.id}>
                <label className={`flex cursor-pointer items-center gap-3 rounded-md border p-3 ${payment === m.id ? "border-brand-800 bg-brand-50" : "border-ink-100"}`}>
                  <input type="radio" name="payment" value={m.id} checked={payment === m.id} onChange={() => setPayment(m.id)} className="accent-brand-700" />
                  <span>
                    <span className="block text-sm font-medium text-ink-900">{m.name}</span>
                    <span className="block text-xs text-ink-500">{m.description}</span>
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <label className="flex items-start gap-2 text-sm text-ink-700">
            <input type="checkbox" name="terms" required className="mt-1 accent-brand-700" />
            <span>Akceptuję <Link href="/regulamin" className="underline">regulamin</Link> i <Link href="/polityka-prywatnosci" className="underline">politykę prywatności</Link> sklepu King Glamour.</span>
          </label>
          <label className="mt-2 flex items-start gap-2 text-sm text-ink-700">
            <input type="checkbox" name="newsletter" className="mt-1 accent-brand-700" />
            <span>Chcę otrzymywać newsletter z promocjami i nowościami.</span>
          </label>
        </section>
      </div>

      <aside className="h-fit rounded-lg border border-ink-100 bg-brand-50 p-5 lg:sticky lg:top-36">
        <h2 className="font-serif text-xl font-semibold">Twoje zamówienie</h2>
        <ul className="mt-4 max-h-72 space-y-3 overflow-y-auto">
          {lines.map((l) => (
            <li key={`${l.productId}-${l.size}-${l.color}`} className="flex items-center gap-3 text-sm">
              <ProductImage product={l.product} color={l.product.colors.find((c) => c.name === l.color)?.hex} className="h-12 w-12 shrink-0 rounded" />
              <span className="flex-1">
                <span className="line-clamp-1 text-ink-900">{l.product.name}</span>
                <span className="text-xs text-ink-500">{l.quantity} szt. · {l.color}{l.size ? ` · ${l.size}` : ""}</span>
              </span>
              <span className="font-medium">{formatPrice(l.lineTotal)}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-4 space-y-2 border-t border-ink-100 pt-4 text-sm">
          <div className="flex justify-between"><dt className="text-ink-500">Produkty</dt><dd>{formatPrice(subtotal)}</dd></div>
          <div className="flex justify-between"><dt className="text-ink-500">Dostawa ({ship.name})</dt><dd>{formatPrice(shippingCost)}</dd></div>
          {codFee > 0 && <div className="flex justify-between"><dt className="text-ink-500">Opłata za pobranie</dt><dd>{formatPrice(codFee)}</dd></div>}
          <div className="flex justify-between border-t border-ink-100 pt-2 text-base font-semibold"><dt>Do zapłaty</dt><dd>{formatPrice(total)}</dd></div>
        </dl>
        {error && <p className="mt-3 rounded-md bg-red-50 px-3 py-2 text-sm text-accent">{error}</p>}
        <button type="submit" disabled={submitting} className="btn-primary mt-5 w-full py-3">
          {submitting ? "Składanie zamówienia…" : "Zamawiam i płacę"}
        </button>
        <p className="mt-3 text-xs text-ink-500">Po kliknięciu zostaniesz przekierowany do operatora płatności.</p>
      </aside>
    </form>
  );
}

function Field({ label, className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; name: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs font-medium text-ink-700">{label}{props.required && " *"}</span>
      <input {...props} className="input" />
    </label>
  );
}
