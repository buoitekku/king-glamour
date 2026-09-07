"use client";

import { Suspense, useEffect, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductListing } from "./ProductListing";
import { PageHead } from "./PageHead";
import { track } from "@/lib/analytics";

export function SearchResults() {
  return (
    <Suspense fallback={<p className="container-page py-6 text-muted">Ładowanie…</p>}>
      <Inner />
    </Suspense>
  );
}

function Inner() {
  const router = useRouter();
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const [value, setValue] = useState(q);
  useEffect(() => {
    setValue(q);
    if (q) track("search", { search_term: q });
  }, [q]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    router.push(value.trim() ? `/szukaj?q=${encodeURIComponent(value.trim())}` : "/szukaj");
  };

  return (
    <>
      <PageHead
        crumbs={[{ name: "Wyszukiwanie" }]}
        title={q ? <>Wyniki: „{q}”</> : "Wszystkie produkty"}
        lead={
          <form onSubmit={submit} className="flex w-full gap-2">
            <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Czego szukasz?" className="input" aria-label="Szukaj" autoFocus={!q} />
            <button type="submit" className="btn-primary">Szukaj</button>
          </form>
        }
      />
      <div className="container-page pt-6">
        <ProductListing key={q} base={{ q }} basePath="/szukaj" />
      </div>
    </>
  );
}
