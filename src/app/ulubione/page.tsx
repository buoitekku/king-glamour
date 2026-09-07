import type { Metadata } from "next";
import { WishlistView } from "@/components/WishlistView";
import { PageHead } from "@/components/PageHead";

export const metadata: Metadata = { title: "Ulubione" };

export default function WishlistPage() {
  return (
    <div className="pb-6">
      <PageHead crumbs={[{ name: "Ulubione" }]} title="Ulubione" lead="Zapisane produkty trzymamy w tej przeglądarce. Po zalogowaniu lista zsynchronizuje się z kontem." />
      <div className="container-page pt-8">
        <WishlistView />
      </div>
    </div>
  );
}
