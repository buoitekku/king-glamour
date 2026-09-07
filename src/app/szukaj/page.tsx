import type { Metadata } from "next";
import { SearchResults } from "@/components/SearchResults";

export const metadata: Metadata = { title: "Wyszukiwarka" };

export default function SearchPage() {
  return (
    <div className="pb-6">
      <SearchResults />
    </div>
  );
}
