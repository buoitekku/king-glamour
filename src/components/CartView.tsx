"use client";

import Link from "next/link";
import { products } from "@/data/products";
import { useCart, useHydrated } from "@/store/cart";
import { FREE_SHIPPING_FROM } from "@/lib/commerce";
import { formatPrice, pluralize } from "@/lib/format";
import { ProductImage } from "./ProductImage";
import { MinusIcon, PlusIcon, TrashIcon } from "./Icons";

export function useCartLines() {
  const items = useCart((s) => s.items);
  return items
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return product ? { ...item, product, lineTotal: product.price * item.quantity } : null;
    })
    .filter(Boolean) as (typeof items[number] & { product: (typeof products)[number]; lineTotal: number })[];
}

export function CartView() {
  const hydrated = useHydrated();
  const lines = useCartLines();
  const setQuantity = useCart((s) => s.setQuantity);
  const remove = useCart((s) => s.remove);
  const subtotal = lines.reduce((n, l) => n + l.lineTotal, 0);
  const missing = Math.max(0, FREE_SHIPPING_FROM - subtotal);

  if (!hydrated) return <p className="text-ink-500">Ładowanie koszyka…</p>;

  if (!lines.length) {
    return (
      <div className="rounded-lg border border-dashed border-ink-300 p-12 text-center">
        <p className="text-lg font-medium text-ink-900">Twój koszyk jest pusty</p>
        <p className="mt-1 text-sm text-ink-500">Zajrzyj do bestsellerów albo działu 24h.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/" className="btn-primary">Strona główna</Link>
          <Link href="/24h" className="btn-secondary">Dział 24h</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div>
        <div className="mb-4 rounded-md bg-brand-50 px-4 py-3 text-sm text-ink-700">
          {missing > 0 ? <>Dodaj produkty za <strong>{formatPrice(missing)}</strong>, aby otrzymać darmową dostawę.</> : <strong className="text-emerald-700">Masz darmową dostawę!</strong>}
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white">
            <div className="h-full bg-brand-700 transition-all" style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_FROM) * 100)}%` }} />
          </div>
        </div>
        <ul className="divide-y divide-ink-100 rounded-lg border border-ink-100">
          {lines.map((l) => (
            <li key={`${l.productId}-${l.size}-${l.color}`} className="flex gap-4 p-4">
              <Link href={`/produkt/${l.product.slug}`} className="shrink-0">
                <ProductImage product={l.product} color={l.product.colors.find((c) => c.name === l.color)?.hex} className="h-24 w-24 rounded-md" />
              </Link>
              <div className="flex flex-1 flex-col gap-1">
                <Link href={`/produkt/${l.product.slug}`} className="font-medium text-ink-900 hover:underline">{l.product.name}</Link>
                <p className="text-xs text-ink-500">
                  Kolor: {l.color}{l.size ? ` · Rozmiar: ${l.size}` : ""} · SKU {l.product.sku}
                </p>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center rounded-md border border-ink-300">
                    <button type="button" onClick={() => setQuantity(l.productId, l.size, l.color, l.quantity - 1)} className="p-2" aria-label="Zmniejsz ilość"><MinusIcon width={14} height={14} /></button>
                    <span className="w-8 text-center text-sm">{l.quantity}</span>
                    <button type="button" onClick={() => setQuantity(l.productId, l.size, l.color, Math.min(l.product.stock, l.quantity + 1))} className="p-2" aria-label="Zwiększ ilość"><PlusIcon width={14} height={14} /></button>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-ink-900">{formatPrice(l.lineTotal)}</span>
                    <button type="button" onClick={() => remove(l.productId, l.size, l.color)} className="text-ink-500 hover:text-accent" aria-label="Usuń z koszyka"><TrashIcon width={18} height={18} /></button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <aside className="h-fit rounded-lg border border-ink-100 bg-brand-50 p-5 lg:sticky lg:top-36">
        <h2 className="font-serif text-xl font-semibold text-ink-900">Podsumowanie</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between"><dt className="text-ink-500">{lines.length} {pluralize(lines.length, "produkt", "produkty", "produktów")}</dt><dd>{formatPrice(subtotal)}</dd></div>
          <div className="flex justify-between"><dt className="text-ink-500">Dostawa</dt><dd>{missing > 0 ? "od 12,99 zł" : "0,00 zł"}</dd></div>
          <div className="flex justify-between border-t border-ink-100 pt-2 text-base font-semibold"><dt>Razem</dt><dd>{formatPrice(subtotal)}</dd></div>
        </dl>
        <Link href="/zamowienie" className="btn-primary mt-5 w-full py-3">Przejdź do zamówienia</Link>
        <Link href="/" className="btn-secondary mt-2 w-full">Kontynuuj zakupy</Link>
        <p className="mt-4 text-xs text-ink-500">Płatności: BLIK, karta, Przelewy24, za pobraniem. 30 dni na zwrot.</p>
      </aside>
    </div>
  );
}
