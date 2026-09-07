import { products } from "@/data/products";
import { categories, getCategoryTree } from "@/data/categories";
import { brands } from "@/data/brands";
import type { Product } from "@/lib/types";
import type { ProductQuery } from "./provider";

const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/ł/g, "l")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

/** Czyste filtrowanie i sortowanie listy produktów (używane przez adapter local i przez listingi po stronie klienta). */
export function filterProducts(query: ProductQuery, source: Product[] = products): Product[] {
  let list = source.slice();

  if (query.category) {
    const tree = getCategoryTree(query.category);
    list = list.filter((p) => tree.includes(p.category));
  }
  if (query.brand?.length) list = list.filter((p) => query.brand!.includes(p.brand));
  if (query.minPrice != null) list = list.filter((p) => p.price >= query.minPrice!);
  if (query.maxPrice != null) list = list.filter((p) => p.price <= query.maxPrice!);
  if (query.size?.length) list = list.filter((p) => p.sizes?.some((s) => query.size!.includes(s)));
  if (query.ships24h) list = list.filter((p) => p.ships24h);
  if (query.sale) list = list.filter((p) => p.oldPrice != null);
  if (query.isNew) list = list.filter((p) => p.isNew);

  if (query.q?.trim()) {
    const terms = normalize(query.q).split(/\s+/).filter(Boolean);
    list = list.filter((p) => {
      const hay = normalize(
        [p.name, p.description, p.brand, brands.find((b) => b.slug === p.brand)?.name ?? "", categories.find((c) => c.slug === p.category)?.name ?? "", ...p.features].join(" ")
      );
      return terms.every((t) => hay.includes(t));
    });
  }

  switch (query.sort) {
    case "price-asc":
      list.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      list.sort((a, b) => b.price - a.price);
      break;
    case "new":
      list.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew) || b.reviews - a.reviews);
      break;
    case "name":
      list.sort((a, b) => a.name.localeCompare(b.name, "pl"));
      break;
    default:
      list.sort((a, b) => Number(!!b.isBestseller) - Number(!!a.isBestseller) || b.reviews - a.reviews);
  }
  return list;
}

/** Dostępne wartości filtrów dla danego zbioru produktów. */
export function getFacets(list: Product[]) {
  const brandCount = new Map<string, number>();
  const sizeSet = new Set<string>();
  let min = Infinity;
  let max = 0;
  for (const p of list) {
    brandCount.set(p.brand, (brandCount.get(p.brand) ?? 0) + 1);
    p.sizes?.forEach((s) => sizeSet.add(s));
    min = Math.min(min, p.price);
    max = Math.max(max, p.price);
  }
  return {
    brands: brands.filter((b) => brandCount.has(b.slug)).map((b) => ({ ...b, count: brandCount.get(b.slug)! })),
    sizes: Array.from(sizeSet).sort((a, b) => a.localeCompare(b, "pl", { numeric: true })),
    minPrice: list.length ? min : 0,
    maxPrice: list.length ? max : 0,
  };
}
