import { NextResponse } from "next/server";
import { getProductById, paymentMethods, shippingMethods, FREE_SHIPPING_FROM } from "@/lib/commerce";

/**
 * Przyjmuje zamówienie ze storefrontu. W wersji produkcyjnej ten endpoint
 * tworzy zamówienie w platformie e-commerce (Shopify/Medusa/Saleor/IdoSell)
 * i zwraca URL przekierowania do operatora płatności.
 */
interface OrderBody {
  customer: Record<string, string>;
  shipping: string;
  payment: string;
  items: { productId: string; size?: string; color: string; quantity: number }[];
}

export async function POST(req: Request) {
  let body: OrderBody;
  try {
    body = (await req.json()) as OrderBody;
  } catch {
    return new NextResponse("Nieprawidłowe dane zamówienia.", { status: 400 });
  }

  if (!Array.isArray(body.items) || body.items.length === 0) {
    return new NextResponse("Koszyk jest pusty.", { status: 400 });
  }
  const ship = shippingMethods.find((s) => s.id === body.shipping);
  const pay = paymentMethods.find((p) => p.id === body.payment);
  if (!ship || !pay) return new NextResponse("Nieznana metoda dostawy lub płatności.", { status: 400 });

  const required = ["email", "phone", "firstName", "lastName", "street", "postalCode", "city"];
  for (const key of required) {
    if (!body.customer?.[key]?.trim()) return new NextResponse(`Brak wymaganego pola: ${key}.`, { status: 400 });
  }

  let subtotal = 0;
  for (const item of body.items) {
    const product = await getProductById(item.productId);
    if (!product) return new NextResponse("Produkt niedostępny.", { status: 400 });
    if (product.sizes?.length && (!item.size || !product.sizes.includes(item.size))) {
      return new NextResponse(`Nieprawidłowy rozmiar dla ${product.name}.`, { status: 400 });
    }
    if (item.quantity < 1 || item.quantity > product.stock) {
      return new NextResponse(`Brak wystarczającej ilości: ${product.name}.`, { status: 400 });
    }
    subtotal += product.price * item.quantity;
  }
  const shippingCost = subtotal >= FREE_SHIPPING_FROM || ship.id === "pickup" ? 0 : ship.price;
  const codFee = pay.id === "cod" ? 5 : 0;
  const total = Math.round((subtotal + shippingCost + codFee) * 100) / 100;

  const orderNumber = `KG-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

  return NextResponse.json({ orderNumber, total, currency: "PLN" }, { status: 201 });
}
