"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/lib/types";

interface CartState {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (productId: string, size: string | undefined, color: string) => void;
  setQuantity: (productId: string, size: string | undefined, color: string, quantity: number) => void;
  clear: () => void;
  count: () => number;
}

const same = (a: CartItem, b: Omit<CartItem, "quantity">) =>
  a.productId === b.productId && a.size === b.size && a.color === b.color;

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) =>
        set((s) => {
          const existing = s.items.find((i) => same(i, item));
          if (existing) {
            return { items: s.items.map((i) => (same(i, item) ? { ...i, quantity: i.quantity + item.quantity } : i)) };
          }
          return { items: [...s.items, item] };
        }),
      remove: (productId, size, color) =>
        set((s) => ({ items: s.items.filter((i) => !same(i, { productId, size, color })) })),
      setQuantity: (productId, size, color, quantity) =>
        set((s) => ({
          items: quantity <= 0
            ? s.items.filter((i) => !same(i, { productId, size, color }))
            : s.items.map((i) => (same(i, { productId, size, color }) ? { ...i, quantity } : i)),
        })),
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((n, i) => n + i.quantity, 0),
    }),
    { name: "kg-cart" }
  )
);

interface WishlistState {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set((s) => ({ ids: s.ids.includes(id) ? s.ids.filter((x) => x !== id) : [...s.ids, id] })),
      has: (id) => get().ids.includes(id),
    }),
    { name: "kg-wishlist" }
  )
);

/** Hook chroniący przed niezgodnością SSR/CSR przy odczycie localStorage. */
import { useEffect, useState } from "react";
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
