"use client";

import { Suspense, useEffect, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductListing } from "./ProductListing";

export function SearchResults() {
  return (
    <Suspense fallback={<p className="mt-6 text-ink-500">Ładowanie…</p>}>
      <Inner />
    </Suspense>
  );
}

function Inner() {
  const router = useRouter();
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const [value, setValue] = useState(q);
  useEffect(() => setValue(q), [q]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    router.push(value.trim() ? `/szukaj?q=${encodeURIComponent(value.trim())}` : "/szukaj");
  };

  return (
    <>
      <form onSubmit={submit} className="mt-4 mb-6 flex max-w-xl gap-2">
        <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Czego szukasz?" className="input" aria-label="Szukaj" autoFocus={!q} />
        <button type="submit" className="btn-primary">Szukaj</button>
      </form>
      <h1 className="mb-6 font-serif text-3xl font-semibold text-ink-900">
        {q ? <>Wyniki dla: <span className="text-brand-700">„{q}”</span></> : "Wszystkie produkty"}
      </h1>
      <ProductListing key={q} base={{ q }} basePath="/szukaj" />
    </>
  );
}
