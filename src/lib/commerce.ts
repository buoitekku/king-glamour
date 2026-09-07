/**
 * Warstwa dostępu do danych sklepu.
 *
 * Wszystkie komponenty i trasy pobierają dane wyłącznie przez ten moduł.
 * Dziś źródłem jest lokalny katalog demo (src/data). Docelowo funkcje te
 * mapują się 1:1 na API platformy headless (Shopify Storefront API, Medusa,
 * Saleor, IdoSell, Shoper), bez zmian w komponentach.
 */
import { products } from "@/data/products";
import { categories, getCategoryTree } from "@/data/categories";
import { brands } from "@/data/brands";
import type { Product } from "@/lib/types";

export type SortKey = "popular" | "price-asc" | "price-desc" | "new" | "name";

export interface ProductQuery {
  category?: string;
  brand?: string[];
  minPrice?: number;
  maxPrice?: number;
  size?: string[];
  ships24h?: boolean;
  sale?: boolean;
  isNew?: boolean;
  q?: string;
  sort?: SortKey;
}

const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/ł/g, "l")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

export async function getAllProducts(): Promise<Product[]> {
  return products;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return products.find((p) => p.slug === slug);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  return products.find((p) => p.id === id);
}

export async function getProductsByIds(ids: string[]): Promise<Product[]> {
  return ids.map((id) => products.find((p) => p.id === id)).filter(Boolean) as Product[];
}

export function filterProducts(query: ProductQuery): Product[] {
  let list = products.slice();

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

export async function queryProducts(query: ProductQuery): Promise<Product[]> {
  return filterProducts(query);
}

export async function getBestsellers(limit = 8) {
  return products.filter((p) => p.isBestseller).slice(0, limit);
}

export async function getNewArrivals(limit = 8) {
  return products.filter((p) => p.isNew).slice(0, limit);
}

export async function getSaleProducts(limit = 8) {
  return products.filter((p) => p.oldPrice).slice(0, limit);
}

export async function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category))
    .slice(0, limit);
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

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  eta: string;
}

export const FREE_SHIPPING_FROM = 299;

export const shippingMethods: ShippingMethod[] = [
  { id: "inpost", name: "InPost Paczkomat", description: "Odbiór w paczkomacie 24/7", price: 12.99, eta: "1–2 dni robocze" },
  { id: "dpd", name: "Kurier DPD", description: "Dostawa pod wskazany adres", price: 16.99, eta: "1–2 dni robocze" },
  { id: "dhl", name: "Kurier DHL", description: "Dostawa pod wskazany adres", price: 17.99, eta: "1–2 dni robocze" },
  { id: "pickup", name: "Odbiór osobisty", description: "Sklep stacjonarny, Łódź", price: 0, eta: "Dziś po 14:00" },
];

export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
}

export const paymentMethods: PaymentMethod[] = [
  { id: "blik", name: "BLIK", description: "Kod z aplikacji bankowej" },
  { id: "card", name: "Karta płatnicza", description: "Visa, Mastercard" },
  { id: "transfer", name: "Szybki przelew", description: "Przelewy24" },
  { id: "cod", name: "Za pobraniem", description: "Płatność przy odbiorze, +5 zł" },
];
