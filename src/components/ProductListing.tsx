"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { filterProducts, getFacets, type ProductQuery } from "@/lib/commerce";
import { Filters } from "./Filters";
import { SortSelect } from "./SortSelect";
import { ProductGrid } from "./ProductGrid";
import { Pagination } from "./Pagination";
import { pluralize } from "@/lib/format";

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
    <Suspense fallback={<p className="text-ink-500">Ładowanie produktów…</p>}>
      <Listing {...props} />
    </Suspense>
  );
}

function Listing({ base, basePath, hideBrand, hide24h }: Props) {
  const params = useSearchParams();
  const key = params.toString();

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
    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
      <Filters {...facets} hideBrand={hideBrand} hide24h={hide24h} />
      <div>
        <div className="mb-4 flex items-center justify-between gap-4">
          <p className="text-sm text-ink-500">
            {all.length} {pluralize(all.length, "produkt", "produkty", "produktów")}
          </p>
          <SortSelect />
        </div>
        <ProductGrid products={list} columns={4} />
        <Pagination page={page} pages={pages} basePath={basePath} params={params} />
      </div>
    </div>
  );
}
