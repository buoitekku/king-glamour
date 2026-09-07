"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { filterProducts, getFacets, type ProductQuery } from "@/lib/commerce";
import { Filters } from "./Filters";
import { SortSelect } from "./SortSelect";
import { ProductGrid } from "./ProductGrid";
import { Pagination } from "./Pagination";
import { pluralize } from "@/lib/format";
import { ColumnsOneIcon, ColumnsTwoIcon } from "./Icons";

const GRID_KEY = "kg-grid";

const PER_PAGE = 12;

interface Props {
  base: ProductQuery;
  basePath: string;
  hideBrand?: boolean;
  hide24h?: boolean;
}

/**
 * Listing z filtrami i sortowaniem sterowany parametrami URL. Działa w pełni
 * po stronie klienta, dzięki czemu strony mogą być wyeksportowane statycznie.
 */
export function ProductListing(props: Props) {
  return (
    <Suspense fallback={<p className="text-muted">Ładowanie produktów…</p>}>
      <Listing {...props} />
    </Suspense>
  );
}

function Listing({ base, basePath, hideBrand, hide24h }: Props) {
  const params = useSearchParams();
  const key = params.toString();
  const [mobileColumns, setMobileColumns] = useState<1 | 2>(1);
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(GRID_KEY);
      if (saved === "2") setMobileColumns(2);
    } catch {}
  }, []);
  const chooseColumns = (n: 1 | 2) => {
    setMobileColumns(n);
    try { window.localStorage.setItem(GRID_KEY, String(n)); } catch {}
  };

  const { facets, all, page, pages, list } = useMemo(() => {
    const facets = getFacets(filterProducts(base));
    const query: ProductQuery = {
      ...base,
      brand: [...(base.brand ?? []), ...params.getAll("marka")],
      size: params.getAll("rozmiar"),
      minPrice: params.get("min") ? Number(params.get("min")) : undefined,
      maxPrice: params.get("max") ? Number(params.get("max")) : undefined,
      ships24h: base.ships24h || params.get("24h") === "1",
      sale: base.sale || params.get("promocja") === "1",
      sort: (params.get("sort") as ProductQuery["sort"]) ?? "popular",
    };
    if (!query.brand?.length) delete query.brand;
    const all = filterProducts(query);
    const pages = Math.max(1, Math.ceil(all.length / PER_PAGE));
    const page = Math.min(pages, Math.max(1, Number(params.get("strona") ?? 1) || 1));
    const list = all.slice((page - 1) * PER_PAGE, page * PER_PAGE);
    return { facets, all, page, pages, list };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base, key]);

  return (
    <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
      <Filters {...facets} hideBrand={hideBrand} hide24h={hide24h} />
      <div>
        <div className="mb-5 flex items-center justify-between gap-4 border-b border-rule pb-3">
          <p className="text-sm tabular-nums text-muted">
            {all.length} {pluralize(all.length, "produkt", "produkty", "produktów")}
          </p>
          <div className="flex items-center gap-4">
            <SortSelect />
            <div className="flex items-center border-l border-rule pl-3 md:hidden" role="group" aria-label="Układ siatki">
              <button type="button" onClick={() => chooseColumns(1)} aria-pressed={mobileColumns === 1} aria-label="Jedna kolumna" className={`grid h-9 w-9 place-items-center rounded-card ${mobileColumns === 1 ? "bg-ink text-paper" : "text-muted hover:text-ink"}`}>
                <ColumnsOneIcon width={18} height={18} />
              </button>
              <button type="button" onClick={() => chooseColumns(2)} aria-pressed={mobileColumns === 2} aria-label="Dwie kolumny" className={`grid h-9 w-9 place-items-center rounded-card ${mobileColumns === 2 ? "bg-ink text-paper" : "text-muted hover:text-ink"}`}>
                <ColumnsTwoIcon width={18} height={18} />
              </button>
            </div>
          </div>
        </div>
        <ProductGrid products={list} columns={4} mobileColumns={mobileColumns} />
        <Pagination page={page} pages={pages} basePath={basePath} params={params} />
      </div>
    </div>
  );
}
