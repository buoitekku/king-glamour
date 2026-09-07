"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import type { Brand } from "@/lib/types";
import { FilterIcon, CloseIcon } from "./Icons";

interface Props {
  brands: (Brand & { count: number })[];
  sizes: string[];
  minPrice: number;
  maxPrice: number;
  hideBrand?: boolean;
  hide24h?: boolean;
}

export function Filters({ brands, sizes, minPrice, maxPrice, hideBrand, hide24h }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [open, setOpen] = useState(false);
  const [, startTransition] = useTransition();

  const selectedBrands = params.getAll("marka");
  const selectedSizes = params.getAll("rozmiar");
  const ships24h = params.get("24h") === "1";
  const sale = params.get("promocja") === "1";
  const min = params.get("min") ?? "";
  const max = params.get("max") ?? "";

  const update = (mutate: (p: URLSearchParams) => void) => {
    const next = new URLSearchParams(params.toString());
    mutate(next);
    next.delete("strona");
    startTransition(() => router.push(`${pathname}?${next.toString()}`, { scroll: false }));
  };

  const toggleMulti = (key: string, value: string) =>
    update((p) => {
      const values = p.getAll(key);
      p.delete(key);
      (values.includes(value) ? values.filter((v) => v !== value) : [...values, value]).forEach((v) => p.append(key, v));
    });

  const toggleFlag = (key: string) => update((p) => (p.get(key) === "1" ? p.delete(key) : p.set(key, "1")));

  const activeCount = selectedBrands.length + selectedSizes.length + Number(ships24h) + Number(sale) + Number(!!min) + Number(!!max);

  const content = (
    <div className="space-y-6">
      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-ink-900">Dostępność</legend>
        {!hide24h && (
          <label className="flex items-center gap-2 text-sm text-ink-700">
            <input type="checkbox" checked={ships24h} onChange={() => toggleFlag("24h")} className="accent-brand-700" /> Wysyłka w 24h
          </label>
        )}
        <label className="mt-1 flex items-center gap-2 text-sm text-ink-700">
          <input type="checkbox" checked={sale} onChange={() => toggleFlag("promocja")} className="accent-brand-700" /> Tylko promocje
        </label>
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-ink-900">Cena (zł)</legend>
        <form
          className="flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            update((p) => {
              const a = String(data.get("min") ?? "");
              const b = String(data.get("max") ?? "");
              if (a) p.set("min", a); else p.delete("min");
              if (b) p.set("max", b); else p.delete("max");
            });
          }}
        >
          <input name="min" type="number" min={0} placeholder={String(minPrice)} defaultValue={min} className="input px-2 py-1.5" aria-label="Cena od" />
          <span className="text-ink-500">–</span>
          <input name="max" type="number" min={0} placeholder={String(maxPrice)} defaultValue={max} className="input px-2 py-1.5" aria-label="Cena do" />
          <button type="submit" className="btn-secondary px-3 py-1.5">OK</button>
        </form>
      </fieldset>

      {!hideBrand && brands.length > 1 && (
        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-ink-900">Marka</legend>
          <ul className="max-h-56 space-y-1 overflow-y-auto pr-1">
            {brands.map((b) => (
              <li key={b.slug}>
                <label className="flex items-center gap-2 text-sm text-ink-700">
                  <input type="checkbox" checked={selectedBrands.includes(b.slug)} onChange={() => toggleMulti("marka", b.slug)} className="accent-brand-700" />
                  <span className="flex-1">{b.name}</span>
                  <span className="text-xs text-ink-300">{b.count}</span>
                </label>
              </li>
            ))}
          </ul>
        </fieldset>
      )}

      {sizes.length > 1 && (
        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-ink-900">Rozmiar</legend>
          <ul className="flex flex-wrap gap-1.5">
            {sizes.map((s) => {
              const active = selectedSizes.includes(s);
              return (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() => toggleMulti("rozmiar", s)}
                    aria-pressed={active}
                    className={`rounded border px-2.5 py-1 text-xs ${active ? "border-brand-800 bg-brand-800 text-white" : "border-ink-300 text-ink-700 hover:border-ink-900"}`}
                  >
                    {s}
                  </button>
                </li>
              );
            })}
          </ul>
        </fieldset>
      )}

      {activeCount > 0 && (
        <button type="button" onClick={() => startTransition(() => router.push(pathname))} className="text-sm text-brand-700 underline">
          Wyczyść filtry ({activeCount})
        </button>
      )}
    </div>
  );

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="btn-secondary w-full lg:hidden">
        <FilterIcon width={16} height={16} /> Filtry {activeCount > 0 && `(${activeCount})`}
      </button>
      <aside className="hidden lg:block">{content}</aside>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filtry">
          <div className="absolute inset-0 bg-ink-900/50" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 right-0 w-[88%] max-w-sm overflow-y-auto bg-white p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold">Filtry</h2>
              <button type="button" onClick={() => setOpen(false)} aria-label="Zamknij"><CloseIcon /></button>
            </div>
            {content}
            <button type="button" onClick={() => setOpen(false)} className="btn-primary mt-6 w-full">Pokaż wyniki</button>
          </div>
        </div>
      )}
    </>
  );
}
