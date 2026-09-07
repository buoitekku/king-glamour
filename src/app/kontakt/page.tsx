import type { Metadata } from "next";
import { StaticPage } from "@/components/StaticPage";

export const metadata: Metadata = { title: "Kontakt" };

export default function ContactPage() {
  return (
    <StaticPage title="Kontakt" lead="Doradcy King Glamour to czynni jeźdźcy. Chętnie pomożemy dobrać sprzęt.">
      <h2>Sklep stacjonarny</h2>
      <p>ul. Jeździecka 1, 90-001 Łódź<br />pon–pt 10:00–18:00, sob 10:00–14:00</p>
      <h2>Telefon i e-mail</h2>
      <ul>
        <li>Obsługa klienta: <a href="tel:+48420000000" className="underline">+48 42 000 00 00</a> (pn–pt 9–17)</li>
        <li>Zamówienia: <a href="mailto:sklep@kingglamour.pl" className="underline">sklep@kingglamour.pl</a></li>
        <li>Zwroty i reklamacje: <a href="mailto:zwroty@kingglamour.pl" className="underline">zwroty@kingglamour.pl</a></li>
        <li>Współpraca i hurt: <a href="mailto:b2b@kingglamour.pl" className="underline">b2b@kingglamour.pl</a></li>
      </ul>
      <h2>Dane firmy</h2>
      <p>King Glamour sp. z o.o., ul. Jeździecka 1, 90-001 Łódź. NIP 000-000-00-00, KRS 0000000000.</p>
    </StaticPage>
  );
}
