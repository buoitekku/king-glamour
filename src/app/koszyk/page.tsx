import type { Metadata } from "next";
import { CartView } from "@/components/CartView";
import { PageHead } from "@/components/PageHead";

export const metadata: Metadata = { title: "Koszyk" };

export default function CartPage() {
  return (
    <div className="pb-6">
      <PageHead crumbs={[{ name: "Koszyk" }]} title="Koszyk" size="md" />
      <div className="container-page pt-8">
        <CartView />
      </div>
    </div>
  );
}
