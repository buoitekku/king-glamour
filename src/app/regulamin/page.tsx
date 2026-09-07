import type { Metadata } from "next";
import { StaticPage } from "@/components/StaticPage";

export const metadata: Metadata = { title: "Regulamin" };

export default function TermsPage() {
  return (
    <StaticPage title="Regulamin sklepu" lead="Regulamin sklepu internetowego kingglamour.pl obowiązujący od 1 września 2026 r.">
      <h2>§1 Postanowienia ogólne</h2>
      <p>Sklep internetowy prowadzony jest przez King Glamour sp. z o.o. z siedzibą w Łodzi. Regulamin określa zasady składania zamówień, płatności, dostawy oraz odstąpienia od umowy.</p>
      <h2>§2 Zamówienia</h2>
      <p>Zamówienia można składać przez stronę internetową 24 godziny na dobę. Umowa sprzedaży zostaje zawarta w momencie potwierdzenia przyjęcia zamówienia do realizacji.</p>
      <h2>§3 Ceny i płatności</h2>
      <p>Wszystkie ceny podane są w złotych polskich i zawierają podatek VAT. Dostępne formy płatności: BLIK, karta płatnicza, szybki przelew, płatność za pobraniem.</p>
      <h2>§4 Dostawa</h2>
      <p>Koszty i terminy dostawy określone są na stronie „Dostawa”. Darmowa dostawa przysługuje przy zamówieniach od 299 zł.</p>
      <h2>§5 Odstąpienie od umowy</h2>
      <p>Konsument może odstąpić od umowy w terminie 30 dni bez podania przyczyny. Szczegóły na stronie „Zwroty i reklamacje”.</p>
      <h2>§6 Postanowienia końcowe</h2>
      <p>W sprawach nieuregulowanych stosuje się przepisy Kodeksu cywilnego i ustawy o prawach konsumenta. Treść regulaminu należy dostosować z pomocą prawnika przed uruchomieniem sklepu.</p>
    </StaticPage>
  );
}
