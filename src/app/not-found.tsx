import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <p className="text-xs uppercase tracking-[0.25em] text-ink-500">Błąd 404</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold text-ink-900">Nie znaleźliśmy tej strony</h1>
      <p className="mt-3 text-ink-500">Produkt mógł zostać wycofany lub adres jest nieprawidłowy.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="btn-primary">Strona główna</Link>
        <Link href="/szukaj" className="btn-secondary">Wyszukiwarka</Link>
      </div>
    </div>
  );
}
