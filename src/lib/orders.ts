/**
 * Zamówienie i klient: cienkie funkcje delegujące do dostawcy handlu.
 * Komponenty importują stąd, więc zmiana platformy nie dotyka UI.
 */
import { getProvider } from "./commerce/index";
import type { OrderInput, OrderResult } from "./commerce/provider";

export { OrderError } from "./commerce/provider";
export type { OrderInput, OrderResult };

export const createOrder = (input: OrderInput): Promise<OrderResult> => getProvider().createOrder(input);
export const subscribeNewsletter = (email: string): Promise<boolean> => getProvider().subscribeNewsletter(email);
export const subscribeStockAlert = (productId: string, email: string): Promise<boolean> => getProvider().subscribeStockAlert(productId, email);
