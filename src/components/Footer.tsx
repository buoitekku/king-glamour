import Link from "next/link";
import { Logo } from "./Logo";
import { NewsletterForm } from "./NewsletterForm";

const links = [
  ["/dostawa", "Dostawa"],
  ["/zwroty", "Zwroty"],
  ["/regulamin", "Regulamin"],
  ["/polityka-prywatnosci", "Prywatność"],
  ["/kontakt", "Kontakt"],
  ["/konto", "Konto"],
  ["/o-nas", "O nas"],
  ["/blog", "Blog"],
];

/**
 * Stopka Ft1 (mast-headed): jedno pasmo z wordmarkiem i taglinem,
 * linia małych linków, adres i kolofon. Bez kolumn, bez rzędu ikon.
 */
export function Footer() {
  return (
    <footer className="mt-20 border-t border-rule bg-paper-2">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1fr_auto] md:items-start md:gap-16">
        <div>
          <Logo />
          <p className="mt-4 max-w-[46ch] text-base leading-snug text-ink-2">
            Sklep jeździecki z Łodzi. Doradzają czynni jeźdźcy, wysyłamy w 24 h, dajemy 30 dni na zwrot.
          </p>
          <p className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {links.map(([href, label]) => (
              <Link key={href} href={href} className="link-typo">{label}</Link>
            ))}
          </p>
        </div>
        <div className="md:w-80">
          <p className="caps mb-2">Newsletter</p>
          <p className="mb-3 text-sm text-muted">Nowe kolekcje i promocje, raz w miesiącu.</p>
          <NewsletterForm />
        </div>
      </div>
      <div className="border-t border-rule">
        <p className="container-page flex flex-wrap gap-x-4 gap-y-1 py-4 text-xs text-muted">
          <span>© {new Date().getFullYear()} King Glamour</span>
          <span>ul. Jeździecka 1, 90-001 Łódź</span>
          <a href="tel:+48420000000" className="hover:text-ink">+48 42 000 00 00</a>
          <a href="mailto:sklep@kingglamour.pl" className="hover:text-ink">sklep@kingglamour.pl</a>
          <span>BLIK · Visa · Mastercard · Przelewy24</span>
          <span>InPost · DPD · DHL</span>
        </p>
      </div>
    </footer>
  );
}
