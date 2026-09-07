"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { useCart } from "@/store/cart";
import { FREE_SHIPPING_FROM } from "@/lib/commerce";
import { formatPrice } from "@/lib/format";
import { ProductImage } from "./ProductImage";
import { CartIcon, CheckIcon, MinusIcon, PlusIcon } from "./Icons";
import { WishlistButton } from "./WishlistButton";
import { StickyBar } from "./StickyBar";
import { Price } from "./Price";

/**
 * Dyptyk produktu (Split Studio): obraz po lewej, panel zakupu po prawej.
 * Nagłówek (marka, tytuł, cena) przychodzi z serwera jako `head`.
 */
export function ProductPurchase({ product, head }: { product: Product; head: React.ReactNode }) {
  const add = useCart((s) => s.add);
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState<string | undefined>(product.sizes?.length === 1 ? product.sizes[0] : undefined);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  const submit = (fromBar = false) => {
    if (product.sizes?.length && !size) {
      setError("Wybierz rozmiar.");
      if (fromBar) document.getElementById("rozmiar")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setError(null);
    add({ productId: product.id, size, color: color.name, quantity: qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const chip = (active: boolean) =>
    `min-w-11 rounded-card border px-3 py-2 text-sm tabular-nums ${active ? "border-ink bg-ink text-paper" : "border-rule text-ink hover:border-ink"}`;

  return (
    <div className="container-page mt-5 grid gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
      <div>
        <div className="bg-paper-2">
          <ProductImage product={product} color={color.hex} className="aspect-square w-full" priority />
        </div>
        {product.colors.length > 1 && (
          <ul className="mt-3 flex gap-2">
            {product.colors.map((c) => (
              <li key={c.name}>
                <button
                  type="button"
                  onClick={() => setColor(c)}
                  aria-label={`Kolor ${c.name}`}
                  aria-pressed={c.name === color.name}
                  className={`block border-b-2 pb-1 ${c.name === color.name ? "border-ink" : "border-transparent hover:border-rule"}`}
                >
                  <ProductImage product={product} color={c.hex} className="h-16 w-16" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-col gap-6 md:self-start lg:sticky lg:top-40">
        <div>{head}</div>

        <div>
          <p className="caps mb-2">
            Kolor <span className="normal-case tracking-normal text-ink">· {color.name}</span>
          </p>
          <ul className="flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <li key={c.name}>
                <button
                  type="button"
                  onClick={() => setColor(c)}
                  aria-label={c.name}
                  aria-pressed={c.name === color.name}
                  className={`h-8 w-8 rounded-full border-2 ${c.name === color.name ? "border-ink" : "border-paper outline outline-1 outline-rule"}`}
                  style={{ backgroundColor: c.hex }}
                />
              </li>
            ))}
          </ul>
        </div>

        {product.sizes && (
          <div id="rozmiar" className="scroll-mt-40">
            <div className="mb-2 flex items-baseline justify-between">
              <p className="caps">
                Rozmiar <span className="normal-case tracking-normal text-ink">· {size ?? "wybierz"}</span>
              </p>
              <Link href="/dostawa#rozmiary" className="link-typo text-xs">Tabela rozmiarów</Link>
            </div>
            <ul className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <li key={s}>
                  <button type="button" onClick={() => { setSize(s); setError(null); }} aria-pressed={s === size} className={chip(s === size)}>
                    {s}
                  </button>
                </li>
              ))}
            </ul>
            {error && <p className="mt-2 text-sm text-accent">{error}</p>}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center rounded-card border border-rule">
            <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} className="p-2.5 hover:text-ink-2" aria-label="Zmniejsz ilość"><MinusIcon width={16} height={16} /></button>
            <span className="w-8 text-center text-sm tabular-nums" aria-live="polite">{qty}</span>
            <button type="button" onClick={() => setQty(Math.min(product.stock, qty + 1))} className="p-2.5 hover:text-ink-2" aria-label="Zwiększ ilość"><PlusIcon width={16} height={16} /></button>
          </div>
          <button id="kup" type="button" onClick={() => submit()} disabled={product.stock === 0} className={`btn-primary flex-1 py-3 ${added ? "!bg-forest" : ""}`}>
            {added ? <><CheckIcon width={18} height={18} /> Dodano do koszyka</> : <><CartIcon width={18} height={18} /> Dodaj do koszyka</>}
          </button>
          <WishlistButton productId={product.id} />
        </div>

        {added && (
          <p className="text-sm text-ink-2">
            <Link href="/koszyk" className="link-typo">Przejdź do koszyka</Link> lub kontynuuj zakupy.
          </p>
        )}

        <ul className="divide-y divide-rule border-y border-rule text-sm">
          <li className="flex justify-between gap-4 py-2.5">
            <span className="text-muted">Dostępność</span>
            <span>{product.stock > 5 ? <span className="text-forest">Dostępny</span> : product.stock > 0 ? <span className="text-cognac">Ostatnie sztuki ({product.stock})</span> : <span className="text-accent">Niedostępny</span>}</span>
          </li>
          <li className="flex justify-between gap-4 py-2.5">
            <span className="text-muted">Wysyłka</span>
            <span>{product.ships24h ? "24 h, zamów do 14:00" : "3–5 dni roboczych"}</span>
          </li>
          <li className="flex justify-between gap-4 py-2.5">
            <span className="text-muted">Dostawa</span>
            <span>InPost, DPD, DHL · darmowa od {formatPrice(FREE_SHIPPING_FROM)}</span>
          </li>
          <li className="flex justify-between gap-4 py-2.5">
            <span className="text-muted">Zwrot</span>
            <span>30 dni bez podania przyczyny</span>
          </li>
        </ul>
      </div>

      <StickyBar targetId="kup">
        <div className="min-w-0">
          <p className="truncate text-sm text-ink">{product.name}</p>
          <Price price={product.price} oldPrice={product.oldPrice} size="sm" />
        </div>
        <button type="button" onClick={() => submit(true)} disabled={product.stock === 0} className={`btn-primary shrink-0 ${added ? "!bg-forest" : ""}`}>
          {added ? <><CheckIcon width={16} height={16} /> Dodano</> : <><CartIcon width={16} height={16} /> Do koszyka</>}
        </button>
      </StickyBar>
    </div>
  );
}
