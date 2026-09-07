"use client";

import Link from "next/link";
import { products } from "@/data/products";
import { useCart, useHydrated } from "@/store/cart";
import { FREE_SHIPPING_FROM } from "@/lib/commerce";
import { formatPrice, pluralize } from "@/lib/format";
import { ProductImage } from "./ProductImage";
import { MinusIcon, PlusIcon, TrashIcon } from "./Icons";
import { StickyBar } from "./StickyBar";

export function useCartLines() {
  const items = useCart((s) => s.items);
  return items
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return product ? { ...item, product, lineTotal: product.price * item.quantity } : null;
    })
    .filter(Boolean) as (typeof items[number] & { product: (typeof products)[number]; lineTotal: number })[];
}

/** Koszyk (Workbench): wiersze z liniami, przyklejone podsumowanie na paper-2. */
export function CartView() {
  const hydrated = useHydrated();
  const lines = useCartLines();
  const setQuantity = useCart((s) => s.setQuantity);
  const remove = useCart((s) => s.remove);
  const subtotal = lines.reduce((n, l) => n + l.lineTotal, 0);
  const missing = Math.max(0, FREE_SHIPPING_FROM - subtotal);

  if (!hydrated) return <p className="text-muted">Ładowanie koszyka…</p>;

  if (!lines.length) {
    return (
      <div className="max-w-[46ch] border-b border-rule pb-8">
        <p className="display text-2xl leading-none text-ink">Koszyk jest pusty.</p>
        <p className="mt-3 text-base text-muted">Zajrzyj do bestsellerów albo do działu 24h.</p>
        <p className="mt-5 flex flex-wrap gap-3">
          <Link href="/" className="btn-primary">Strona główna</Link>
          <Link href="/24h" className="btn-secondary">Dział 24h</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
      <div>
        <div className="mb-2 flex items-baseline justify-between text-sm">
          <span className="text-ink-2">
            {missing > 0 ? <>Do darmowej dostawy brakuje <strong className="tabular-nums">{formatPrice(missing)}</strong>.</> : <strong className="text-forest">Masz darmową dostawę.</strong>}
          </span>
          <span className="caps tabular-nums">{lines.length} {pluralize(lines.length, "produkt", "produkty", "produktów")}</span>
        </div>
        <div className="h-0.5 w-full bg-rule-2">
          <div className="h-full bg-forest" style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_FROM) * 100)}%`, transition: "width var(--dur-short) var(--ease-out)" }} />
        </div>
        <ul className="mt-2 divide-y divide-rule border-b border-rule">
          {lines.map((l) => (
            <li key={`${l.productId}-${l.size}-${l.color}`} className="grid grid-cols-[5rem_minmax(0,1fr)] gap-4 py-5 sm:grid-cols-[6rem_minmax(0,1fr)_auto] sm:gap-6">
              <Link href={`/produkt/${l.product.slug}`} className="block bg-paper-2">
                <ProductImage product={l.product} color={l.product.colors.find((c) => c.name === l.color)?.hex} plain className="aspect-square w-full" />
              </Link>
              <div className="min-w-0">
                <Link href={`/produkt/${l.product.slug}`} className="font-display text-lg font-title leading-tight text-ink hover:underline">{l.product.name}</Link>
                <p className="caps mt-1">
                  {l.color}{l.size ? ` · ${l.size}` : ""} · {l.product.sku}
                </p>
                <div className="mt-3 flex items-center gap-4">
                  <div className="flex items-center rounded-card border border-rule">
                    <button type="button" onClick={() => setQuantity(l.productId, l.size, l.color, l.quantity - 1)} className="p-2 hover:text-ink-2" aria-label="Zmniejsz ilość"><MinusIcon width={14} height={14} /></button>
                    <span className="w-8 text-center text-sm tabular-nums">{l.quantity}</span>
                    <button type="button" onClick={() => setQuantity(l.productId, l.size, l.color, Math.min(l.product.stock, l.quantity + 1))} className="p-2 hover:text-ink-2" aria-label="Zwiększ ilość"><PlusIcon width={14} height={14} /></button>
                  </div>
                  <button type="button" onClick={() => remove(l.productId, l.size, l.color)} className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent" aria-label={`Usuń ${l.product.name} z koszyka`}>
                    <TrashIcon width={16} height={16} /> Usuń
                  </button>
                </div>
              </div>
              <p className="col-start-2 text-lg font-semibold tabular-nums text-ink sm:col-start-3 sm:text-right">{formatPrice(l.lineTotal)}</p>
            </li>
          ))}
        </ul>
      </div>
      <aside className="h-fit bg-paper-2 p-5 lg:sticky lg:top-40 lg:p-6">
        <h2 className="display border-b-2 border-ink pb-3 text-2xl leading-none text-ink">Podsumowanie</h2>
        <dl className="mt-4 space-y-2 text-sm tabular-nums">
          <div className="flex justify-between"><dt className="text-muted">Produkty</dt><dd>{formatPrice(subtotal)}</dd></div>
          <div className="flex justify-between"><dt className="text-muted">Dostawa</dt><dd>{missing > 0 ? "od 12,99 zł" : "0,00 zł"}</dd></div>
          <div className="flex justify-between border-t border-rule pt-3 text-lg font-semibold"><dt>Razem</dt><dd>{formatPrice(subtotal)}</dd></div>
        </dl>
        <Link id="do-zamowienia" href="/zamowienie" className="btn-primary mt-5 w-full py-3">Przejdź do zamówienia</Link>
        <p className="mt-3 text-center text-sm"><Link href="/" className="link-typo">Kontynuuj zakupy</Link></p>
        <p className="mt-5 text-xs text-muted">BLIK, karta, Przelewy24, za pobraniem. 30 dni na zwrot.</p>
      </aside>
      <StickyBar targetId="do-zamowienia">
        <p className="text-sm text-ink">
          <span className="caps">Razem</span> <strong className="ml-2 text-lg tabular-nums">{formatPrice(subtotal)}</strong>
        </p>
        <Link href="/zamowienie" className="btn-primary shrink-0">Do zamówienia</Link>
      </StickyBar>
    </div>
  );
}
