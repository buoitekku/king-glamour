import type { CommerceProvider } from "./provider";
import { localProvider } from "./local";

/**
 * Rejestr dostawców. Wybór przez NEXT_PUBLIC_COMMERCE_PROVIDER
 * (local | shopify | saleor). Nieskonfigurowany dostawca rzuca czytelny
 * błąd zamiast cicho wracać do danych demo.
 */
const registry: Record<string, () => CommerceProvider> = {
  local: () => localProvider,
  shopify: () => {
    throw new Error("Adapter Shopify nie jest jeszcze zaimplementowany. Zobacz docs/backend/adapter.md.");
  },
  saleor: () => {
    throw new Error("Adapter Saleor nie jest jeszcze zaimplementowany. Zobacz docs/backend/adapter.md.");
  },
};

let cached: CommerceProvider | undefined;

export function getProvider(): CommerceProvider {
  if (cached) return cached;
  const key = process.env.NEXT_PUBLIC_COMMERCE_PROVIDER?.trim() || "local";
  const factory = registry[key];
  if (!factory) throw new Error(`Nieznany dostawca handlu: "${key}". Dostępne: ${Object.keys(registry).join(", ")}.`);
  cached = factory();
  return cached;
}

export * from "./provider";
export { filterProducts, getFacets } from "./filter";
