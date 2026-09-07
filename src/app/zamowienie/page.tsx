import type { Metadata } from "next";
import { CheckoutForm } from "@/components/CheckoutForm";
import { PageHead } from "@/components/PageHead";

export const metadata: Metadata = { title: "Zamówienie" };

export default function CheckoutPage() {
  return (
    <div className="pb-6">
      <PageHead crumbs={[{ name: "Koszyk", href: "/koszyk" }, { name: "Zamówienie" }]} title="Dostawa i płatność" size="md" lead="Cztery kroki. Konto nie jest wymagane." />
      <div className="container-page pt-8">
        <CheckoutForm />
      </div>
    </div>
  );
}
