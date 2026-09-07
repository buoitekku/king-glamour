"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { useCart } from "@/store/cart";
import { ProductImage } from "./ProductImage";
import { CartIcon, CheckIcon, MinusIcon, PlusIcon } from "./Icons";
import { WishlistButton } from "./WishlistButton";

export function ProductPurchase({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState<string | undefined>(product.sizes?.length === 1 ? product.sizes[0] : undefined);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  const submit = () => {
    if (product.sizes?.length && !size) {
      setError("Wybierz rozmiar.");
      return;
    }
    setError(null);
    add({ productId: product.id, size, color: color.name, quantity: qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <div className="rounded-lg border border-ink-100">
        <ProductImage product={product} color={color.hex} className="aspect-square w-full rounded-lg" priority />
        <ul className="flex gap-2 p-3">
          {product.colors.map((c) => (
            <li key={c.name}>
              <button
                type="button"
                onClick={() => setColor(c)}
                aria-label={`Kolor ${c.name}`}
                aria-pressed={c.name === color.name}
                className={`rounded-md border-2 p-0.5 ${c.name === color.name ? "border-brand-800" : "border-transparent"}`}
              >
                <ProductImage product={product} color={c.hex} className="h-14 w-14 rounded" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-6">
        <div>
          <p className="mb-2 text-sm font-medium text-ink-900">
            Kolor: <span className="font-normal text-ink-500">{color.name}</span>
          </p>
          <ul className="flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <li key={c.name}>
                <button
                  type="button"
                  onClick={() => setColor(c)}
                  aria-label={c.name}
                  aria-pressed={c.name === color.name}
                  className={`h-8 w-8 rounded-full border-2 ${c.name === color.name ? "border-brand-800 ring-2 ring-brand-200" : "border-white shadow"}`}
                  style={{ backgroundColor: c.hex }}
                />
              </li>
            ))}
          </ul>
        </div>

        {product.sizes && (
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-medium text-ink-900">
                Rozmiar: <span className="font-normal text-ink-500">{size ?? "wybierz"}</span>
              </p>
              <Link href="/dostawa#rozmiary" className="text-xs text-brand-700 underline">Tabela rozmiarów</Link>
            </div>
            <ul className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() => { setSize(s); setError(null); }}
                    aria-pressed={s === size}
                    className={`min-w-11 rounded-md border px-3 py-2 text-sm ${s === size ? "border-brand-800 bg-brand-800 text-white" : "border-ink-300 text-ink-900 hover:border-ink-900"}`}
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
            {error && <p className="mt-2 text-sm text-accent">{error}</p>}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center rounded-md border border-ink-300">
            <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} className="p-2.5" aria-label="Zmniejsz ilość"><MinusIcon width={16} height={16} /></button>
            <span className="w-8 text-center text-sm font-medium" aria-live="polite">{qty}</span>
            <button type="button" onClick={() => setQty(Math.min(product.stock, qty + 1))} className="p-2.5" aria-label="Zwiększ ilość"><PlusIcon width={16} height={16} /></button>
          </div>
          <button type="button" onClick={submit} className={`btn-primary flex-1 py-3 ${added ? "!bg-forest" : ""}`}>
            {added ? <><CheckIcon width={18} height={18} /> Dodano do koszyka</> : <><CartIcon width={18} height={18} /> Dodaj do koszyka</>}
          </button>
          <WishlistButton productId={product.id} label />
        </div>

        {added && (
          <p className="text-sm text-ink-700">
            <Link href="/koszyk" className="font-medium text-brand-700 underline">Przejdź do koszyka</Link> lub kontynuuj zakupy.
          </p>
        )}

        <p className="text-sm text-ink-500">
          {product.stock > 5 ? <span className="text-forest">● Dostępny</span> : product.stock > 0 ? <span className="text-cognac">● Ostatnie sztuki ({product.stock})</span> : <span className="text-accent">● Niedostępny</span>}
          {product.ships24h ? " · wysyłka w 24 h" : " · wysyłka w 3–5 dni roboczych"}
        </p>
      </div>
    </div>
  );
}
