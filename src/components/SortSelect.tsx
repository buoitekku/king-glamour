"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type { SortKey } from "@/lib/commerce";

const options: { value: SortKey; label: string }[] = [
  { value: "popular", label: "Popularność" },
  { value: "new", label: "Nowości" },
  { value: "price-asc", label: "Cena: od najniższej" },
  { value: "price-desc", label: "Cena: od najwyższej" },
  { value: "name", label: "Nazwa A–Z" },
];

export function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const current = (params.get("sort") as SortKey) ?? "popular";
  return (
    <label className="flex items-center gap-2 text-sm text-ink-2">
      <span className="caps hidden sm:inline">Sortuj</span>
      <select
        value={current}
        onChange={(e) => {
          const next = new URLSearchParams(params.toString());
          next.set("sort", e.target.value);
          next.delete("strona");
          router.push(`${pathname}?${next.toString()}`, { scroll: false });
        }}
        className="input w-auto py-1.5"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  );
}
