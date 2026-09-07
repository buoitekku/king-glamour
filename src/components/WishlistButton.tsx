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
      className={`inline-flex items-center gap-2 whitespace-nowrap rounded-card border bg-paper p-2 text-sm ${
        active ? "border-accent text-accent" : "border-rule text-ink-2 hover:border-ink"
      } ${label ? "px-4 py-2.5" : ""}`}
      style={{ transition: "border-color var(--dur-micro) var(--ease-out), color var(--dur-micro) var(--ease-out)" }}
    >
      <HeartIcon width={18} height={18} fill={active ? "currentColor" : "none"} />
      {label && (active ? "W ulubionych" : "Do ulubionych")}
    </button>
  );
}
