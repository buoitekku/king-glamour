import { Suspense } from "react";
import { getFacets, queryProducts, type ProductQuery } from "@/lib/commerce";
import { Filters } from "./Filters";
import { SortSelect } from "./SortSelect";
import { ProductGrid } from "./ProductGrid";
import { Pagination } from "./Pagination";
import { pluralize } from "@/lib/format";

export type SearchParams = Record<string, string | string[] | undefined>;

const PER_PAGE = 12;

const arr = (v: string | string[] | undefined) => (v == null ? [] : Array.isArray(v) ? v : [v]);

export function toURLSearchParams(sp: SearchParams) {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(sp)) arr(v).forEach((x) => p.append(k, x));
  return p;
}

export async function ProductListing({
  base,
  searchParams,
  basePath,
  hideBrand,
  hide24h,
}: {
  base: ProductQuery;
  searchParams: SearchParams;
  basePath: string;
  hideBrand?: boolean;
  hide24h?: boolean;
}) {
  const facetsSource = await queryProducts(base);
  const facets = getFacets(facetsSource);

  const query: ProductQuery = {
    ...base,
    brand: [...(base.brand ?? []), ...arr(searchParams.marka)],
    size: arr(searchParams.rozmiar),
    minPrice: searchParams.min ? Number(searchParams.min) : undefined,
    maxPrice: searchParams.max ? Number(searchParams.max) : undefined,
    ships24h: base.ships24h || searchParams["24h"] === "1",
    sale: base.sale || searchParams.promocja === "1",
    sort: (arr(searchParams.sort)[0] as ProductQuery["sort"]) ?? "popular",
  };
  if (!query.brand?.length) delete query.brand;

  const all = await queryProducts(query);
  const pages = Math.max(1, Math.ceil(all.length / PER_PAGE));
  const page = Math.min(pages, Math.max(1, Number(arr(searchParams.strona)[0] ?? 1) || 1));
  const list = all.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
      <Suspense>
        <Filters {...facets} hideBrand={hideBrand} hide24h={hide24h} />
      </Suspense>
      <div>
        <div className="mb-4 flex items-center justify-between gap-4">
          <p className="text-sm text-ink-500">
            {all.length} {pluralize(all.length, "produkt", "produkty", "produktów")}
          </p>
          <Suspense>
            <SortSelect />
          </Suspense>
        </div>
        <ProductGrid products={list} columns={4} />
        <Pagination page={page} pages={pages} basePath={basePath} params={toURLSearchParams(searchParams)} />
      </div>
    </div>
  );
}
