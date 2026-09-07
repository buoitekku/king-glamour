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
  const [compact, setCompact] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  // N12: baner chowa się przy przewijaniu w dół, wraca przy przewijaniu w górę.
  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < 48) setCompact(false);
        else if (y > last + 4) setCompact(true);
        else if (y < last - 4) setCompact(false);
        last = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (q.trim()) router.push(`/szukaj?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <header
      className={`sticky top-0 z-[var(--z-sticky-nav)] border-b border-rule bg-paper transition-transform duration-[320ms] ease-out motion-reduce:transition-none ${
        compact && !dismissed ? "-translate-y-[var(--banner-h)]" : ""
      }`}
    >
      {!dismissed && (
        <div className="bg-paper-3 text-muted-on-dark">
          <div className="container-page flex h-[var(--banner-h)] items-center justify-between gap-4 text-xs">
            <p className="truncate">
              <span className="text-ink-on-dark">Darmowa dostawa</span> od 299 zł · zwrot do 30 dni · wysyłka w 24 h z działu 24h
            </p>
            <div className="flex items-center gap-4">
              <div className="hidden gap-4 md:flex">
                <Link href="/dostawa" className="whitespace-nowrap hover:text-ink-on-dark">Dostawa</Link>
                <Link href="/kontakt" className="whitespace-nowrap hover:text-ink-on-dark">Kontakt</Link>
                <a href="tel:+48420000000" className="whitespace-nowrap hover:text-ink-on-dark">+48 42 000 00 00</a>
              </div>
              <button type="button" onClick={() => setDismissed(true)} aria-label="Zamknij pasek informacyjny" className="hover:text-ink-on-dark">
                <CloseIcon width={14} height={14} />
              </button>
            </div>
          </div>
        </div>
      )}

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
              className="input py-2 pl-3.5 pr-10"
            />
            <button type="submit" aria-label="Szukaj" className="absolute right-1 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center text-ink-2 hover:text-ink">
              <SearchIcon width={16} height={16} />
            </button>
          </label>
        </form>
        <nav className="ml-auto flex items-center gap-0 md:ml-0 md:gap-2" aria-label="Konto i koszyk">
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

      <nav className="hidden border-t border-rule-2 lg:block" aria-label="Kategorie">
        <ul className="container-page flex items-center gap-1">
          {mainCategories.map((cat) => (
            <li key={cat.slug} className="group relative">
              <Link href={`/kategoria/${cat.slug}`} className="caps flex items-center gap-1 whitespace-nowrap px-3 py-3 !text-ink hover:!text-ink-2">
                {cat.name} <ChevronDownIcon width={12} height={12} />
              </Link>
              <div className="invisible absolute left-0 top-full z-[var(--z-dropdown)] w-[560px] border border-rule bg-paper p-6 opacity-0 shadow-whisper transition-opacity duration-[220ms] ease-out group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="caps mb-2">Podkategorie</p>
                    <ul className="space-y-1.5">
                      {getSubcategories(cat.slug).map((sub) => (
                        <li key={sub.slug}>
                          <Link href={`/kategoria/${sub.slug}`} className="block text-sm text-ink-2 hover:text-ink hover:underline">
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                      <li className="pt-2">
                        <Link href={`/kategoria/${cat.slug}`} className="link-typo text-sm">Wszystko z działu {cat.name}</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="border-l border-rule pl-6">
                    <p className="caps mb-2">Marki</p>
                    <ul className="space-y-1.5">
                      {brands.slice(0, 6).map((b) => (
                        <li key={b.slug}>
                          <Link href={`/marki/${b.slug}`} className="text-sm text-ink-2 hover:text-ink hover:underline">{b.name}</Link>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-xs text-muted">{cat.description}</p>
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
                className={`caps flex items-center gap-1 whitespace-nowrap px-3 py-3 ${l.accent ? "!text-accent" : "!text-ink hover:!text-ink-2"}`}
              >
                {l.accent && <ClockIcon width={13} height={13} />}
                {l.label}
              </Link>
            ))}
          </li>
        </ul>
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="absolute inset-0 bg-ink-900/50" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-[88%] max-w-sm flex-col overflow-y-auto bg-paper">
            <div className="flex items-center justify-between border-b border-rule p-4">
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
                className="input"
              />
            </form>
            <ul className="divide-y divide-rule">
              {mainCategories.map((cat) => (
                <li key={cat.slug} className="p-4">
                  <Link href={`/kategoria/${cat.slug}`} className="font-display text-lg text-ink">{cat.name}</Link>
                  <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5">
                    {getSubcategories(cat.slug).map((sub) => (
                      <li key={sub.slug}>
                        <Link href={`/kategoria/${sub.slug}`} className="text-sm text-ink-2">{sub.name}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
              <li className="p-4">
                <ul className="space-y-2">
                  {quickLinks.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className={`text-sm ${l.accent ? "text-accent" : "text-ink"}`}>{l.label}</Link>
                    </li>
                  ))}
                  <li><Link href="/konto" className="text-sm text-ink-2">Moje konto</Link></li>
                  <li><Link href="/kontakt" className="text-sm text-ink-2">Kontakt</Link></li>
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
    <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-ink px-1 text-[10px] font-medium tabular-nums text-paper">
      {n}
    </span>
  );
}
