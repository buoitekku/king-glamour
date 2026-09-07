import type { Metadata } from "next";
import { StaticPage } from "@/components/StaticPage";
import { shippingMethods, FREE_SHIPPING_FROM } from "@/lib/commerce";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = { title: "Koszty i czas dostawy" };

export default function ShippingPage() {
  return (
    <StaticPage title="Dostawa" lead={`Darmowa dostawa od ${formatPrice(FREE_SHIPPING_FROM)}. Zamówienia z działu 24h wysyłamy tego samego dnia.`}>
      <h2>Formy dostawy</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-ink-100 text-left text-ink-500"><th className="py-2">Metoda</th><th className="py-2">Czas</th><th className="py-2">Koszt</th></tr></thead>
          <tbody>
            {shippingMethods.map((m) => (
              <tr key={m.id} className="border-b border-ink-100"><td className="py-2">{m.name}</td><td className="py-2">{m.eta}</td><td className="py-2">{m.price === 0 ? "0,00 zł" : formatPrice(m.price)}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2>Wysyłka w 24 h</h2>
      <p>Produkty oznaczone „Wysyłka 24h” są w naszym magazynie w Łodzi. Zamówienia opłacone do 14:00 w dni robocze przekazujemy kurierowi tego samego dnia.</p>
      <h2>Produkty na zamówienie</h2>
      <p>Siodła, oficerki na miarę i część odzieży sprowadzamy od producenta. Czas realizacji podajemy przy produkcie (zwykle 3–5 dni roboczych, siodła do 3 tygodni).</p>
      <h2 id="rozmiary">Tabele rozmiarów</h2>
      <p>Kaski: obwód głowy w cm mierzony 1 cm nad brwiami. Bryczesy: rozmiar europejski (36 = S, 38 = M, 40 = L). Derki: długość od środka piersi do zadu w cm. Ogłowia: Pony (do 140 cm), Cob (140–155 cm), Full (155–170 cm), X-Full (powyżej 170 cm).</p>
    </StaticPage>
  );
}
