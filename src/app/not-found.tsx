import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page grid gap-6 pt-16 pb-16 md:grid-cols-[3fr_2fr] md:gap-16 md:pt-24">
      <div>
        <p className="caps">Błąd 404</p>
        <h1 className="display mt-3 text-[2.6rem] leading-none text-ink md:text-[3.75rem]">Nie znaleźliśmy<br />tej strony.</h1>
      </div>
      <div className="md:pt-2">
        <p className="max-w-[40ch] text-base text-ink-2">Produkt mógł zostać wycofany lub adres jest nieprawidłowy.</p>
        <p className="mt-6 flex flex-wrap gap-3">
          <Link href="/" className="btn-primary">Strona główna</Link>
          <Link href="/szukaj" className="btn-secondary">Wyszukiwarka</Link>
        </p>
      </div>
    </div>
  );
}
