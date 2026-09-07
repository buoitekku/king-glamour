import type { Metadata } from "next";
import { StaticPage } from "@/components/StaticPage";

export const metadata: Metadata = { title: "Polityka prywatności" };

export default function PrivacyPage() {
  return (
    <StaticPage title="Polityka prywatności" lead="Jak przetwarzamy dane osobowe i jakich plików cookie używamy.">
      <h2>Administrator danych</h2>
      <p>Administratorem danych jest King Glamour sp. z o.o., ul. Jeździecka 1, 90-001 Łódź. Kontakt: rodo@kingglamour.pl.</p>
      <h2>Cele przetwarzania</h2>
      <ul>
        <li>Realizacja zamówień i obsługa zwrotów (art. 6 ust. 1 lit. b RODO).</li>
        <li>Wysyłka newslettera na podstawie zgody (art. 6 ust. 1 lit. a RODO).</li>
        <li>Analityka i marketing na podstawie prawnie uzasadnionego interesu.</li>
      </ul>
      <h2>Pliki cookie</h2>
      <p>Używamy plików cookie niezbędnych do działania koszyka oraz, za zgodą, analitycznych i marketingowych. Zgodę można zmienić w ustawieniach przeglądarki.</p>
      <h2>Twoje prawa</h2>
      <p>Masz prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia oraz wniesienia skargi do Prezesa UODO.</p>
    </StaticPage>
  );
}
