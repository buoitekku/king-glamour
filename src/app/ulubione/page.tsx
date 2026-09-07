import type { Metadata } from "next";
import { WishlistView } from "@/components/WishlistView";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = { title: "Ulubione" };

export default function WishlistPage() {
  return (
    <div className="container-page py-6">
      <Breadcrumbs items={[{ name: "Ulubione" }]} />
      <h1 className="mt-4 mb-6 font-serif text-3xl font-semibold text-ink-900">Ulubione</h1>
      <WishlistView />
    </div>
  );
}
