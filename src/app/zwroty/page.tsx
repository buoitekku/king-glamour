import type { Metadata } from "next";
import { StaticPage } from "@/components/StaticPage";

export const metadata: Metadata = { title: "Zwroty i reklamacje" };

export default function ReturnsPage() {
  return (
    <StaticPage title="Zwroty i reklamacje" lead="Masz 30 dni na zwrot bez podawania przyczyny.">
      <h2>Jak zwrócić produkt</h2>
      <ul>
        <li>Zaloguj się na konto lub użyj formularza zwrotu z paczki.</li>
        <li>Zapakuj produkt w oryginalne opakowanie z metkami.</li>
        <li>Nadaj paczkę na adres: King Glamour, ul. Jeździecka 1, 90-001 Łódź.</li>
        <li>Zwrot pieniędzy realizujemy w ciągu 14 dni od otrzymania przesyłki.</li>
      </ul>
      <h2>Reklamacje</h2>
      <p>Wszystkie produkty objęte są dwuletnią rękojmią. Reklamację złóż mailowo na zwroty@kingglamour.pl, dołączając numer zamówienia, opis wady i zdjęcia. Odpowiadamy w ciągu 14 dni.</p>
      <h2>Wyjątki</h2>
      <p>Zwrotowi nie podlegają produkty personalizowane (np. kaski z indywidualnym grawerem) oraz pasze i suplementy po otwarciu opakowania.</p>
    </StaticPage>
  );
}
