/**
 * Fasada warstwy handlu. Strony importują stąd; implementacja żyje w
 * src/lib/commerce/* i jest wybierana przez rejestr dostawców.
 */
import { getProvider } from "./commerce/index";
import type { Product } from "./types";
import type { ProductQuery } from "./commerce/provider";

export type { SortKey, ProductQuery, ShippingMethod, PaymentMethod, OrderInput, OrderResult, OrderLine } from "./commerce/provider";
export { OrderError, getProvider, filterProducts, getFacets } from "./commerce/index";
export { FREE_SHIPPING_FROM, shippingMethods, paymentMethods } from "./commerce/local";

export const getProductBySlug = (slug: string) => getProvider().getProductBySlug(slug);
export const getProductById = (id: string) => getProvider().getProductById(id);
export const queryProducts = (query: ProductQuery) => getProvider().queryProducts(query);
export const getBestsellers = (limit?: number) => getProvider().getBestsellers(limit);
export const getNewArrivals = (limit?: number) => getProvider().getNewArrivals(limit);
export const getSaleProducts = (limit?: number) => getProvider().getSaleProducts(limit);
export const getRelatedProducts = (product: Product, limit?: number) => getProvider().getRelatedProducts(product, limit);
