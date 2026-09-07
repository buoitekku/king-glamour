import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AccountForms } from "@/components/AccountForms";

export const metadata: Metadata = { title: "Moje konto" };

export default function AccountPage() {
  return (
    <div className="container-page py-6">
      <Breadcrumbs items={[{ name: "Moje konto" }]} />
      <h1 className="mt-4 mb-2 font-serif text-3xl font-semibold text-ink-900">Moje konto</h1>
      <p className="mb-8 max-w-2xl text-ink-500">
        Zaloguj się, aby śledzić zamówienia, zapisać adresy i szybciej finalizować zakupy. Konto nie jest wymagane do złożenia zamówienia,{" "}
        <Link href="/zamowienie" className="text-brand-700 underline">możesz kupować jako gość</Link>.
      </p>
      <AccountForms />
    </div>
  );
}
