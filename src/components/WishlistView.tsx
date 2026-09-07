"use client";

import Link from "next/link";
import { products } from "@/data/products";
import { useHydrated, useWishlist } from "@/store/cart";
import { ProductGrid } from "./ProductGrid";

export function WishlistView() {
  const hydrated = useHydrated();
  const ids = useWishlist((s) => s.ids);
  if (!hydrated) return <p className="text-ink-500">Ładowanie…</p>;
  const list = ids.map((id) => products.find((p) => p.id === id)).filter(Boolean) as typeof products;
  if (!list.length) {
    return (
      <div className="rounded-lg border border-dashed border-ink-300 p-12 text-center">
        <p className="text-lg font-medium text-ink-900">Lista ulubionych jest pusta</p>
        <p className="mt-1 text-sm text-ink-500">Kliknij serduszko przy produkcie, aby go tu zapisać.</p>
        <Link href="/nowosci" className="btn-primary mt-6">Zobacz nowości</Link>
      </div>
    );
  }
  return <ProductGrid products={list} />;
}
