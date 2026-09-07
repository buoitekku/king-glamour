import type { Category, Brand, Product } from "@/lib/types";

/**
 * Kontrakt dostawcy handlu. Storefront rozmawia z backendem wyłącznie przez
 * ten interfejs. Implementacje: `local` (dane demo, działa też w eksporcie
 * statycznym) oraz docelowo `shopify` / `saleor` / inna platforma.
 * Mapowanie metod na API platform: docs/backend/adapter.md.
 */
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

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  eta: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
}

export interface OrderLine {
  productId: string;
  /** Identyfikator wariantu w platformie (rozmiar × kolor). Lokalnie pomijany. */
  variantId?: string;
  size?: string;
  color: string;
  quantity: number;
}

export interface OrderInput {
  customer: Record<string, string>;
  shipping: string;
  payment: string;
  items: OrderLine[];
}

export interface OrderResult {
  orderNumber: string;
  total: number;
  currency: "PLN";
  /** URL operatora płatności; gdy obecny, storefront przekierowuje zamiast pokazywać potwierdzenie. */
  redirectUrl?: string;
}

export class OrderError extends Error {}

export interface CommerceProvider {
  readonly name: string;

  // Katalog
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getProductById(id: string): Promise<Product | undefined>;
  queryProducts(query: ProductQuery): Promise<Product[]>;
  getBestsellers(limit?: number): Promise<Product[]>;
  getNewArrivals(limit?: number): Promise<Product[]>;
  getSaleProducts(limit?: number): Promise<Product[]>;
  getRelatedProducts(product: Product, limit?: number): Promise<Product[]>;
  getCategories(): Promise<Category[]>;
  getBrands(): Promise<Brand[]>;

  // Dostawa i płatność
  getShippingMethods(): Promise<ShippingMethod[]>;
  getPaymentMethods(): Promise<PaymentMethod[]>;
  readonly freeShippingFrom: number;

  // Zamówienie i klient
  createOrder(input: OrderInput): Promise<OrderResult>;
  subscribeNewsletter(email: string): Promise<boolean>;
  subscribeStockAlert(productId: string, email: string): Promise<boolean>;
}
