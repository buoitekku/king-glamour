import type { Metadata } from "next";
import { StaticPage } from "@/components/StaticPage";

export const metadata: Metadata = { title: "O nas" };

export default function AboutPage() {
  return (
    <StaticPage title="O King Glamour" lead="Sklep jeździecki prowadzony przez jeźdźców od 2012 roku.">
      <p>Zaczynaliśmy od małego sklepu przy stajni pod Łodzią. Dziś prowadzimy jeden z największych magazynów sprzętu jeździeckiego w Polsce, a nasz zespół to zawodnicy skoków, ujeżdżenia i WKKW.</p>
      <h2>Co nas wyróżnia</h2>
      <ul>
        <li>Ponad 12 000 produktów od 60 marek, większość dostępna od ręki.</li>
        <li>Centrum testowe: sprzęt testujemy na własnych koniach przed wprowadzeniem do oferty.</li>
        <li>Doradztwo telefoniczne i w sklepie stacjonarnym w Łodzi.</li>
        <li>Wysyłka w 24 h i 30 dni na zwrot.</li>
      </ul>
    </StaticPage>
  );
}
