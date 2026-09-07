import { products } from "@/data/products";
import { FREE_SHIPPING_FROM, paymentMethods, shippingMethods } from "@/lib/commerce";

/**
 * Walidacja i wycena zamówienia. W wersji produkcyjnej tę rolę przejmuje
 * platforma e-commerce (Checkout API), a storefront tylko przekazuje koszyk
 * i dane klienta oraz przekierowuje do operatora płatności.
 */
export interface OrderInput {
  customer: Record<string, string>;
  shipping: string;
  payment: string;
  items: { productId: string; size?: string; color: string; quantity: number }[];
}

export interface OrderResult {
  orderNumber: string;
  total: number;
  currency: "PLN";
}

export class OrderError extends Error {}

export function createOrder(input: OrderInput): OrderResult {
  if (!Array.isArray(input.items) || input.items.length === 0) throw new OrderError("Koszyk jest pusty.");
  const ship = shippingMethods.find((s) => s.id === input.shipping);
  const pay = paymentMethods.find((p) => p.id === input.payment);
  if (!ship || !pay) throw new OrderError("Nieznana metoda dostawy lub płatności.");

  const required = ["email", "phone", "firstName", "lastName", "street", "postalCode", "city"];
  for (const key of required) {
    if (!input.customer?.[key]?.trim()) throw new OrderError("Uzupełnij wszystkie wymagane pola.");
  }
  if (ship.id === "inpost" && !input.customer.parcelLocker?.trim()) throw new OrderError("Podaj kod paczkomatu.");

  let subtotal = 0;
  for (const item of input.items) {
    const product = products.find((p) => p.id === item.productId);
    if (!product) throw new OrderError("Produkt niedostępny.");
    if (product.sizes?.length && (!item.size || !product.sizes.includes(item.size))) {
      throw new OrderError(`Nieprawidłowy rozmiar dla ${product.name}.`);
    }
    if (item.quantity < 1 || item.quantity > product.stock) throw new OrderError(`Brak wystarczającej ilości: ${product.name}.`);
    subtotal += product.price * item.quantity;
  }
  const shippingCost = subtotal >= FREE_SHIPPING_FROM || ship.id === "pickup" ? 0 : ship.price;
  const codFee = pay.id === "cod" ? 5 : 0;
  const total = Math.round((subtotal + shippingCost + codFee) * 100) / 100;
  const orderNumber = `KG-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
  return { orderNumber, total, currency: "PLN" };
}

export function subscribeNewsletter(email: string): boolean {
  // Tu podłącz dostawcę newslettera (np. Mailchimp, GetResponse, Klaviyo).
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function subscribeStockAlert(productId: string, email: string): boolean {
  // Tu podłącz powiadomienia o dostępności po stronie platformy.
  return Boolean(productId) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
