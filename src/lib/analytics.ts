import { readConsent } from "./consent";

/**
 * Zdarzenia e-commerce w schemacie GA4. Do dataLayer trafiają tylko przy
 * zgodzie analitycznej; bez zgody są pomijane. Nazwy i parametry zgodne z
 * GA4, więc pasują też do GTM, Meta CAPI przez GTM i większości platform.
 */
export type EcommerceEvent = "view_item" | "add_to_cart" | "remove_from_cart" | "view_cart" | "begin_checkout" | "purchase" | "search";

export interface EcommerceItem {
  item_id: string;
  item_name: string;
  item_brand?: string;
  item_category?: string;
  item_variant?: string;
  price: number;
  quantity?: number;
}

export function track(event: EcommerceEvent, params: Record<string, unknown> & { items?: EcommerceItem[] } = {}) {
  if (typeof window === "undefined") return;
  const consent = readConsent();
  if (!consent?.analytics) return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ecommerce: { currency: "PLN", ...params } });
}
