"use client";

import Link from "next/link";
import { products } from "@/data/products";
import { useHydrated, useWishlist } from "@/store/cart";
import { ProductGrid } from "./ProductGrid";

export function WishlistView() {
  const hydrated = useHydrated();
  const ids = useWishlist((s) => s.ids);
  if (!hydrated) return <p className="text-muted">Ładowanie…</p>;
  const list = ids.map((id) => products.find((p) => p.id === id)).filter(Boolean) as typeof products;
  if (!list.length) {
    return (
      <div className="max-w-[46ch] border-b border-rule pb-8">
        <p className="display text-2xl leading-none text-ink">Lista ulubionych jest pusta.</p>
        <p className="mt-3 text-base text-muted">Kliknij serduszko przy produkcie, aby go tu zapisać.</p>
        <p className="mt-5"><Link href="/nowosci" className="btn-primary">Zobacz nowości</Link></p>
      </div>
    );
  }
  return <ProductGrid products={list} />;
}
