import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { brands } from "@/data/brands";
import type { Product } from "@/lib/types";
import { filterProducts } from "./filter";
import { OrderError, type CommerceProvider, type OrderInput, type OrderResult, type PaymentMethod, type ShippingMethod } from "./provider";

export const FREE_SHIPPING_FROM = 299;

export const shippingMethods: ShippingMethod[] = [
  { id: "inpost", name: "InPost Paczkomat", description: "Odbiór w paczkomacie 24/7", price: 12.99, eta: "1–2 dni robocze" },
  { id: "dpd", name: "Kurier DPD", description: "Dostawa pod wskazany adres", price: 16.99, eta: "1–2 dni robocze" },
  { id: "dhl", name: "Kurier DHL", description: "Dostawa pod wskazany adres", price: 17.99, eta: "1–2 dni robocze" },
  { id: "pickup", name: "Odbiór osobisty", description: "Sklep stacjonarny, Łódź", price: 0, eta: "Dziś po 14:00" },
];

export const paymentMethods: PaymentMethod[] = [
  { id: "blik", name: "BLIK", description: "Kod z aplikacji bankowej" },
  { id: "card", name: "Karta płatnicza", description: "Visa, Mastercard" },
  { id: "transfer", name: "Szybki przelew", description: "Przelewy24" },
  { id: "cod", name: "Za pobraniem", description: "Płatność przy odbiorze, +5 zł" },
];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Adapter demo: katalog z src/data, wycena zamówienia w przeglądarce.
 * Działa w eksporcie statycznym (GitHub Pages) i w testach e2e.
 */
export const localProvider: CommerceProvider = {
  name: "local",
  freeShippingFrom: FREE_SHIPPING_FROM,

  async getProductBySlug(slug) {
    return products.find((p) => p.slug === slug);
  },
  async getProductById(id) {
    return products.find((p) => p.id === id);
  },
  async queryProducts(query) {
    return filterProducts(query);
  },
  async getBestsellers(limit = 8) {
    return products.filter((p) => p.isBestseller).slice(0, limit);
  },
  async getNewArrivals(limit = 8) {
    return products.filter((p) => p.isNew).slice(0, limit);
  },
  async getSaleProducts(limit = 8) {
    return products.filter((p) => p.oldPrice).slice(0, limit);
  },
  async getRelatedProducts(product: Product, limit = 4) {
    return products
      .filter((p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
      .sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category))
      .slice(0, limit);
  },
  async getCategories() {
    return categories;
  },
  async getBrands() {
    return brands;
  },
  async getShippingMethods() {
    return shippingMethods;
  },
  async getPaymentMethods() {
    return paymentMethods;
  },

  async createOrder(input: OrderInput): Promise<OrderResult> {
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
  },

  async subscribeNewsletter(email) {
    return EMAIL.test(email);
  },
  async subscribeStockAlert(productId, email) {
    return Boolean(productId) && EMAIL.test(email);
  },
};
