import Link from "next/link";
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
 * Stopka Ft1 (mast-headed) na ciemnym papierze: wielki wordmark jako
 * masthead, tagline, jedna linia linków, newsletter obok, kolofon pod linią.
 */
export function Footer() {
  return (
    <footer className="mt-20 bg-paper-3 text-ink-on-dark">
      <div className="container-page grid gap-10 pb-10 pt-14 md:grid-cols-[1fr_auto] md:items-end md:gap-16">
        <div>
          <p className="display text-[2.8rem] text-ink-on-dark md:text-[4.5rem]">King Glamour</p>
          <p className="mt-3 max-w-[46ch] text-base leading-snug text-muted-on-dark">
            Sklep jeździecki z Łodzi. Doradzają czynni jeźdźcy, wysyłamy w 24 h, dajemy 30 dni na zwrot.
          </p>
          <p className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {links.map(([href, label]) => (
              <Link key={href} href={href} className="link-typo-dark">{label}</Link>
            ))}
          </p>
        </div>
        <div className="md:w-80">
          <p className="caps mb-2 text-muted-on-dark">Newsletter</p>
          <p className="mb-3 text-sm text-muted-on-dark">Nowe kolekcje i promocje, raz w miesiącu.</p>
          <NewsletterForm dark />
        </div>
      </div>
      <div className="rule-strong-dark">
        <p className="container-page flex flex-wrap gap-x-4 gap-y-1 py-4 text-xs text-muted-on-dark">
          <span>© {new Date().getFullYear()} King Glamour</span>
          <span>ul. Jeździecka 1, 90-001 Łódź</span>
          <a href="tel:+48420000000" className="hover:text-ink-on-dark">+48 42 000 00 00</a>
          <a href="mailto:sklep@kingglamour.pl" className="hover:text-ink-on-dark">sklep@kingglamour.pl</a>
          <span>BLIK · Visa · Mastercard · Przelewy24</span>
          <span>InPost · DPD · DHL</span>
        </p>
      </div>
    </footer>
  );
}
