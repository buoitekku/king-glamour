"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { useCart, useHydrated } from "@/store/cart";
import { useCartLines } from "./CartView";
import { FREE_SHIPPING_FROM, paymentMethods, shippingMethods } from "@/lib/commerce";
import { createOrder, OrderError } from "@/lib/orders";
import { track } from "@/lib/analytics";
import { formatPrice } from "@/lib/format";
import { ProductImage } from "./ProductImage";
import { StickyBar } from "./StickyBar";

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
  useEffect(() => {
    if (!hydrated || !lines.length) return;
    track("begin_checkout", { value: subtotal, items: lines.map((l) => ({ item_id: l.product.sku, item_name: l.product.name, item_brand: l.product.brand, price: l.product.price, quantity: l.quantity })) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);
  const ship = shippingMethods.find((s) => s.id === shipping)!;
  const shippingCost = subtotal >= FREE_SHIPPING_FROM || ship.id === "pickup" ? 0 : ship.price;
  const codFee = payment === "cod" ? 5 : 0;
  const total = subtotal + shippingCost + codFee;

  if (!hydrated) return <p className="text-muted">Ładowanie…</p>;
  if (!lines.length) {
    return (
      <p className="max-w-[46ch] border-b border-rule pb-8 text-base text-muted">
        Koszyk jest pusty. <Link href="/" className="link-typo">Wróć do sklepu</Link>.
      </p>
    );
  }

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    const customer = Object.fromEntries(Array.from(form.entries()).map(([k, v]) => [k, String(v)]));
    try {
      const data = await createOrder({
        customer,
        shipping,
        payment,
        items: lines.map((l) => ({ productId: l.productId, size: l.size, color: l.color, quantity: l.quantity })),
      });
      track("purchase", { transaction_id: data.orderNumber, value: data.total, shipping: shippingCost, items: lines.map((l) => ({ item_id: l.product.sku, item_name: l.product.name, item_brand: l.product.brand, price: l.product.price, quantity: l.quantity })) });
      clear();
      if (data.redirectUrl) {
        window.location.assign(data.redirectUrl);
        return;
      }
      router.push(`/zamowienie/potwierdzenie?nr=${encodeURIComponent(data.orderNumber)}&kwota=${data.total}&platnosc=${payment}`);
    } catch (err) {
      setError(err instanceof OrderError ? err.message : "Nie udało się złożyć zamówienia. Spróbuj ponownie.");
      setSubmitting(false);
    }
  };

  return (
    <form id="checkout" onSubmit={submit} className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
      <div className="max-w-[60ch] space-y-10">
        <section>
          <h2 className="display mb-4 border-b-2 border-ink pb-2 text-2xl leading-none text-ink"><span className="tabular-nums text-muted">1</span> Dane kontaktowe</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field name="email" label="E-mail" type="email" required autoComplete="email" />
            <Field name="phone" label="Telefon" type="tel" required autoComplete="tel" />
          </div>
        </section>

        <section>
          <h2 className="display mb-4 border-b-2 border-ink pb-2 text-2xl leading-none text-ink"><span className="tabular-nums text-muted">2</span> Adres dostawy</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field name="firstName" label="Imię" required autoComplete="given-name" />
            <Field name="lastName" label="Nazwisko" required autoComplete="family-name" />
            <Field name="street" label="Ulica i numer" required autoComplete="street-address" className="sm:col-span-2" />
            <Field name="postalCode" label="Kod pocztowy" required pattern="[0-9]{2}-[0-9]{3}" placeholder="00-000" autoComplete="postal-code" />
            <Field name="city" label="Miasto" required autoComplete="address-level2" />
          </div>
          <label className="mt-3 flex items-center gap-2 text-sm">
            <input type="checkbox" name="invoice" checked={invoice} onChange={(e) => setInvoice(e.target.checked)} className="h-4 w-4 accent-[var(--color-ink)]" /> Chcę otrzymać fakturę VAT
          </label>
          {invoice && (
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field name="company" label="Nazwa firmy" required />
              <Field name="nip" label="NIP" required pattern="[0-9]{10}" />
            </div>
          )}
        </section>

        <section>
          <h2 className="display mb-4 border-b-2 border-ink pb-2 text-2xl leading-none text-ink"><span className="tabular-nums text-muted">3</span> Sposób dostawy</h2>
          <ul className="divide-y divide-rule border-y border-rule">
            {shippingMethods.map((m) => (
              <li key={m.id}>
                <label className={`flex cursor-pointer items-center gap-3 px-2 py-3 ${shipping === m.id ? "bg-paper-2" : "hover:bg-paper-2/60"}`}>
                  <input type="radio" name="shipping" value={m.id} checked={shipping === m.id} onChange={() => setShipping(m.id)} className="h-4 w-4 accent-[var(--color-ink)]" />
                  <span className="flex-1">
                    <span className="block text-sm font-semibold text-ink">{m.name}</span>
                    <span className="block text-xs text-muted">{m.description} · {m.eta}</span>
                  </span>
                  <span className="text-sm font-semibold tabular-nums">{m.price === 0 || subtotal >= FREE_SHIPPING_FROM ? "0,00 zł" : formatPrice(m.price)}</span>
                </label>
              </li>
            ))}
          </ul>
          {shipping === "inpost" && <Field name="parcelLocker" label="Kod paczkomatu (np. LOD01A)" required className="mt-3" />}
        </section>

        <section>
          <h2 className="display mb-4 border-b-2 border-ink pb-2 text-2xl leading-none text-ink"><span className="tabular-nums text-muted">4</span> Płatność</h2>
          <ul className="divide-y divide-rule border-y border-rule">
            {paymentMethods.map((m) => (
              <li key={m.id}>
                <label className={`flex cursor-pointer items-center gap-3 px-2 py-3 ${payment === m.id ? "bg-paper-2" : "hover:bg-paper-2/60"}`}>
                  <input type="radio" name="payment" value={m.id} checked={payment === m.id} onChange={() => setPayment(m.id)} className="h-4 w-4 accent-[var(--color-ink)]" />
                  <span>
                    <span className="block text-sm font-semibold text-ink">{m.name}</span>
                    <span className="block text-xs text-muted">{m.description}</span>
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <label className="flex items-start gap-2 text-sm text-ink-2">
            <input type="checkbox" name="terms" required className="mt-1 h-4 w-4 accent-[var(--color-ink)]" />
            <span>Akceptuję <Link href="/regulamin" className="link-typo">regulamin</Link> i <Link href="/polityka-prywatnosci" className="link-typo">politykę prywatności</Link> sklepu King Glamour.</span>
          </label>
          <label className="mt-2 flex items-start gap-2 text-sm text-ink-2">
            <input type="checkbox" name="newsletter" className="mt-1 h-4 w-4 accent-[var(--color-ink)]" />
            <span>Chcę otrzymywać newsletter z promocjami i nowościami.</span>
          </label>
        </section>
      </div>

      <aside className="h-fit bg-paper-2 p-5 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:p-6">
        <h2 className="display border-b-2 border-ink pb-3 text-2xl leading-none text-ink">Twoje zamówienie</h2>
        <ul className="mt-4 max-h-72 divide-y divide-rule overflow-y-auto">
          {lines.map((l) => (
            <li key={`${l.productId}-${l.size}-${l.color}`} className="flex items-center gap-3 py-2.5 text-sm">
              <ProductImage product={l.product} color={l.product.colors.find((c) => c.name === l.color)?.hex} plain className="h-12 w-12 shrink-0 bg-paper" />
              <span className="min-w-0 flex-1">
                <span className="line-clamp-1 text-ink">{l.product.name}</span>
                <span className="text-xs text-muted">{l.quantity} szt. · {l.color}{l.size ? ` · ${l.size}` : ""}</span>
              </span>
              <span className="font-semibold tabular-nums">{formatPrice(l.lineTotal)}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-4 space-y-2 border-t border-rule pt-4 text-sm tabular-nums">
          <div className="flex justify-between"><dt className="text-muted">Produkty</dt><dd>{formatPrice(subtotal)}</dd></div>
          <div className="flex justify-between"><dt className="text-muted">Dostawa ({ship.name})</dt><dd>{formatPrice(shippingCost)}</dd></div>
          {codFee > 0 && <div className="flex justify-between"><dt className="text-muted">Opłata za pobranie</dt><dd>{formatPrice(codFee)}</dd></div>}
          <div className="flex justify-between border-t border-rule pt-3 text-lg font-semibold"><dt>Do zapłaty</dt><dd>{formatPrice(total)}</dd></div>
        </dl>
        {error && <p className="mt-3 border-l-2 border-accent pl-3 text-sm text-accent">{error}</p>}
        <button id="zamawiam" type="submit" disabled={submitting} className="btn-primary mt-5 w-full py-3">
          {submitting ? "Składanie zamówienia…" : "Zamawiam i płacę"}
        </button>
        <p className="mt-3 text-xs text-muted">Po kliknięciu zostaniesz przekierowany do operatora płatności.</p>
      </aside>
      <StickyBar targetId="zamawiam">
        <p className="text-sm text-ink">
          <span className="caps">Do zapłaty</span> <strong className="ml-2 text-lg tabular-nums">{formatPrice(total)}</strong>
        </p>
        <button type="submit" form="checkout" disabled={submitting} className="btn-primary shrink-0">
          {submitting ? "Składanie…" : "Zamawiam i płacę"}
        </button>
      </StickyBar>
    </form>
  );
}

function Field({ label, className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; name: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="caps mb-1.5 block">{label}{props.required && " *"}</span>
      <input {...props} className="input" />
    </label>
  );
}
