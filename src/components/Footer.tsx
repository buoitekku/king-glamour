import Link from "next/link";
import { Logo } from "./Logo";
import { NewsletterForm } from "./NewsletterForm";
import { MailIcon, PhoneIcon, PinIcon } from "./Icons";

const columns = [
  {
    title: "Sklep",
    links: [
      ["/kategoria/jezdziec", "Jeździec"],
      ["/kategoria/kon", "Koń"],
      ["/kategoria/stajnia", "Stajnia i wybieg"],
      ["/kategoria/specjalistyczne", "Specjalistyczne"],
      ["/marki", "Marki"],
      ["/promocje", "Promocje"],
    ],
  },
  {
    title: "Strefa klienta",
    links: [
      ["/konto", "Moje konto"],
      ["/dostawa", "Koszty i czas dostawy"],
      ["/zwroty", "Zwroty i reklamacje"],
      ["/regulamin", "Regulamin"],
      ["/polityka-prywatnosci", "Polityka prywatności"],
      ["/kontakt", "Kontakt"],
    ],
  },
  {
    title: "O nas",
    links: [
      ["/o-nas", "O King Glamour"],
      ["/blog", "Blog"],
      ["/centrum-testowe", "Centrum testowe"],
      ["/kontakt", "Sklep stacjonarny"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-ink-100 bg-brand-50">
      <div className="container-page grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-ink-500">
            Największy wybór sprzętu jeździeckiego w Polsce. Sklep stacjonarny w Łodzi, wysyłka w 24 h, doradztwo doświadczonych jeźdźców.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-ink-700">
            <li className="flex items-center gap-2"><PinIcon width={16} height={16} /> ul. Jeździecka 1, 90-001 Łódź</li>
            <li className="flex items-center gap-2"><PhoneIcon width={16} height={16} /> <a href="tel:+48420000000">+48 42 000 00 00</a> (pn–pt 9–17)</li>
            <li className="flex items-center gap-2"><MailIcon width={16} height={16} /> <a href="mailto:sklep@kingglamour.pl">sklep@kingglamour.pl</a></li>
          </ul>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-900">{col.title}</h3>
            <ul className="space-y-2">
              {col.links.map(([href, label]) => (
                <li key={href + label}>
                  <Link href={href} className="text-sm text-ink-700 hover:text-brand-700 hover:underline">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-ink-100">
        <div className="container-page grid gap-6 py-8 md:grid-cols-2 md:items-center">
          <div>
            <h3 className="font-serif text-lg font-semibold text-ink-900">Newsletter</h3>
            <p className="text-sm text-ink-500">Zapisz się i odbierz 10% rabatu na pierwsze zamówienie.</p>
          </div>
          <NewsletterForm />
        </div>
      </div>
      <div className="border-t border-ink-100">
        <div className="container-page flex flex-col gap-3 py-5 text-xs text-ink-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} King Glamour. Wszystkie prawa zastrzeżone.</p>
          <p className="flex flex-wrap gap-x-3">
            <span>Płatności: BLIK · Visa · Mastercard · Przelewy24</span>
            <span>Dostawa: InPost · DPD · DHL</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
