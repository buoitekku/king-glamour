import type { Metadata } from "next";
import { OrderConfirmation } from "@/components/OrderConfirmation";

export const metadata: Metadata = { title: "Dziękujemy za zamówienie" };

export default function ConfirmationPage() {
  return (
    <div className="container-page py-16">
      <OrderConfirmation />
    </div>
  );
}
