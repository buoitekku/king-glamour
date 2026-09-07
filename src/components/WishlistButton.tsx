"use client";

import { useHydrated, useWishlist } from "@/store/cart";
import { HeartIcon } from "./Icons";

export function WishlistButton({ productId, label }: { productId: string; label?: boolean }) {
  const hydrated = useHydrated();
  const ids = useWishlist((s) => s.ids);
  const toggle = useWishlist((s) => s.toggle);
  const active = hydrated && ids.includes(productId);
  return (
    <button
      type="button"
      onClick={() => toggle(productId)}
      aria-pressed={active}
      aria-label={active ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
      className={`inline-flex items-center gap-2 rounded-full border bg-white/90 p-2 text-sm transition ${
        active ? "border-accent text-accent" : "border-ink-100 text-ink-500 hover:text-accent"
      } ${label ? "px-4" : ""}`}
    >
      <HeartIcon width={18} height={18} fill={active ? "currentColor" : "none"} />
      {label && (active ? "W ulubionych" : "Do ulubionych")}
    </button>
  );
}
