import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SearchResults } from "@/components/SearchResults";

export const metadata: Metadata = { title: "Wyszukiwarka" };

export default function SearchPage() {
  return (
    <div className="container-page py-6">
      <Breadcrumbs items={[{ name: "Wyszukiwanie" }]} />
      <SearchResults />
    </div>
  );
}
