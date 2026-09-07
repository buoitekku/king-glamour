import Link from "next/link";
import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";
import { AccountForms } from "@/components/AccountForms";

export const metadata: Metadata = { title: "Moje konto" };

export default function AccountPage() {
  return (
    <div className="pb-6">
      <PageHead
        crumbs={[{ name: "Moje konto" }]}
        title="Moje konto"
        size="md"
        lead={<>Śledzenie zamówień, zapisane adresy, szybszy checkout. Konto nie jest wymagane, <Link href="/zamowienie" className="link-typo">możesz kupować jako gość</Link>.</>}
      />
      <div className="container-page pt-8">
        <AccountForms />
      </div>
    </div>
  );
}
