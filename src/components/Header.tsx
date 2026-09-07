"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { getMainCategories, getSubcategories } from "@/data/categories";
import { brands } from "@/data/brands";
import { useCart, useHydrated, useWishlist } from "@/store/cart";
import { Logo } from "./Logo";
import { CartIcon, ChevronDownIcon, CloseIcon, HeartIcon, MenuIcon, SearchIcon, UserIcon, ClockIcon } from "./Icons";

const mainCategories = getMainCategories();

const quickLinks = [
  { href: "/24h", label: "Dział 24h", accent: true },
  { href: "/promocje", label: "Promocje" },
  { href: "/nowosci", label: "Nowości" },
  { href: "/marki", label: "Marki" },
  { href: "/blog", label: "Blog" },
];

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const hydrated = useHydrated();
  const cartCount = useCart((s) => s.items.reduce((n, i) => n + i.quantity, 0));
  const wishCount = useWishlist((s) => s.ids.length);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => setOpen(false), [pathname]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (q.trim()) router.push(`/szukaj?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="bg-brand-900 text-brand-100">
        <div className="container-page flex h-8 items-center justify-between text-xs">
          <p className="truncate">
            <span className="font-semibold text-white">Darmowa dostawa</span> od 299 zł · Zwrot do 30 dni · Wysyłka w 24h z działu 24h
          </p>
          <div className="hidden gap-4 md:flex">
            <Link href="/dostawa" className="hover:text-white">Dostawa</Link>
            <Link href="/kontakt" className="hover:text-white">Kontakt</Link>
            <a href="tel:+48420000000" className="hover:text-white">+48 42 000 00 00</a>
          </div>
        </div>
      </div>

      <div className="container-page flex h-16 items-center gap-3 md:gap-6">
        <button type="button" className="lg:hidden" onClick={() => setOpen(true)} aria-label="Otwórz menu">
          <MenuIcon width={24} height={24} />
        </button>
        <Logo />
        <form onSubmit={submit} role="search" className="ml-auto hidden flex-1 md:block md:max-w-xl">
          <label className="relative block">
            <span className="sr-only">Szukaj produktów</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Szukaj: kask Samshield, derka 200 g, ochraniacze…"
              className="w-full rounded-full border border-ink-100 bg-brand-50 py-2.5 pl-4 pr-11 text-sm outline-none ring-brand-300 focus:ring-2"
            />
            <button type="submit" aria-label="Szukaj" className="absolute right-1 top-1 grid h-8 w-8 place-items-center rounded-full bg-brand-800 text-white">
              <SearchIcon width={16} height={16} />
            </button>
          </label>
        </form>
        <nav className="ml-auto flex items-center gap-1 md:ml-0 md:gap-2" aria-label="Konto i koszyk">
          <Link href="/szukaj" className="icon-btn md:hidden" aria-label="Szukaj">
            <SearchIcon />
          </Link>
          <Link href="/konto" className="icon-btn" aria-label="Moje konto">
            <UserIcon />
            <span className="hidden text-xs lg:block">Konto</span>
          </Link>
          <Link href="/ulubione" className="icon-btn relative" aria-label="Ulubione">
            <HeartIcon />
            <span className="hidden text-xs lg:block">Ulubione</span>
            {hydrated && wishCount > 0 && <Counter n={wishCount} />}
          </Link>
          <Link href="/koszyk" className="icon-btn relative" aria-label="Koszyk">
            <CartIcon />
            <span className="hidden text-xs lg:block">Koszyk</span>
            {hydrated && cartCount > 0 && <Counter n={cartCount} />}
          </Link>
        </nav>
      </div>

      <nav className="hidden border-t border-ink-100 lg:block" aria-label="Kategorie">
        <ul className="container-page flex items-center gap-1">
          {mainCategories.map((cat) => (
            <li key={cat.slug} className="group relative">
              <Link href={`/kategoria/${cat.slug}`} className="flex items-center gap-1 px-3 py-3 text-sm font-medium text-ink-900 hover:text-brand-700">
                {cat.name} <ChevronDownIcon width={14} height={14} />
              </Link>
              <div className="invisible absolute left-0 top-full z-30 w-[560px] rounded-b-lg border border-ink-100 bg-white p-6 opacity-0 shadow-card transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-500">Podkategorie</p>
                    <ul className="space-y-1.5">
                      {getSubcategories(cat.slug).map((sub) => (
                        <li key={sub.slug}>
                          <Link href={`/kategoria/${sub.slug}`} className="block text-sm text-ink-700 hover:text-brand-700 hover:underline">
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                      <li className="pt-1">
                        <Link href={`/kategoria/${cat.slug}`} className="text-sm font-medium text-brand-700 hover:underline">
                          Wszystko z działu {cat.name} →
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-brand-50 p-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-500">Popularne marki</p>
                    <ul className="space-y-1.5">
                      {brands.slice(0, 6).map((b) => (
                        <li key={b.slug}>
                          <Link href={`/marki/${b.slug}`} className="text-sm text-ink-700 hover:text-brand-700 hover:underline">{b.name}</Link>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-xs text-ink-500">{cat.description}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
          <li className="ml-auto flex items-center gap-1">
            {quickLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`flex items-center gap-1 px-3 py-3 text-sm font-medium ${l.accent ? "text-accent" : "text-ink-900 hover:text-brand-700"}`}
              >
                {l.accent && <ClockIcon width={15} height={15} />}
                {l.label}
              </Link>
            ))}
          </li>
        </ul>
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="absolute inset-0 bg-ink-900/50" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-[88%] max-w-sm flex-col overflow-y-auto bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-ink-100 p-4">
              <Logo />
              <button type="button" onClick={() => setOpen(false)} aria-label="Zamknij menu">
                <CloseIcon width={24} height={24} />
              </button>
            </div>
            <form onSubmit={submit} className="p-4">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Szukaj produktów…"
                className="w-full rounded-full border border-ink-100 bg-brand-50 px-4 py-2.5 text-sm"
              />
            </form>
            <ul className="divide-y divide-ink-100">
              {mainCategories.map((cat) => (
                <li key={cat.slug} className="p-4">
                  <Link href={`/kategoria/${cat.slug}`} className="font-semibold text-ink-900">{cat.name}</Link>
                  <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5">
                    {getSubcategories(cat.slug).map((sub) => (
                      <li key={sub.slug}>
                        <Link href={`/kategoria/${sub.slug}`} className="text-sm text-ink-700">{sub.name}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
              <li className="p-4">
                <ul className="space-y-2">
                  {quickLinks.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className={`text-sm font-medium ${l.accent ? "text-accent" : "text-ink-900"}`}>{l.label}</Link>
                    </li>
                  ))}
                  <li><Link href="/konto" className="text-sm text-ink-700">Moje konto</Link></li>
                  <li><Link href="/kontakt" className="text-sm text-ink-700">Kontakt</Link></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}

function Counter({ n }: { n: number }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
      {n}
    </span>
  );
}
