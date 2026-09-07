import type { Metadata } from "next";
import { OrderConfirmation } from "@/components/OrderConfirmation";

export const metadata: Metadata = { title: "Dziękujemy za zamówienie" };

export default function ConfirmationPage() {
  return <OrderConfirmation />;
}
