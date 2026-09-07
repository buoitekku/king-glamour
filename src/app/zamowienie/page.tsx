import type { Metadata } from "next";
import { CheckoutForm } from "@/components/CheckoutForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = { title: "Zamówienie" };

export default function CheckoutPage() {
  return (
    <div className="container-page py-6">
      <Breadcrumbs items={[{ name: "Koszyk", href: "/koszyk" }, { name: "Zamówienie" }]} />
      <h1 className="mt-4 mb-6 font-serif text-3xl font-semibold text-ink-900">Dostawa i płatność</h1>
      <CheckoutForm />
    </div>
  );
}
