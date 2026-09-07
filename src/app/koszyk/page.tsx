import type { Metadata } from "next";
import { CartView } from "@/components/CartView";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = { title: "Koszyk" };

export default function CartPage() {
  return (
    <div className="container-page py-6">
      <Breadcrumbs items={[{ name: "Koszyk" }]} />
      <h1 className="mt-4 mb-6 font-serif text-3xl font-semibold text-ink-900">Koszyk</h1>
      <CartView />
    </div>
  );
}
