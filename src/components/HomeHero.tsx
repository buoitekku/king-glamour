import Link from "next/link";
import { ClockIcon, ReturnIcon, ShieldIcon, TruckIcon } from "./Icons";

export function HomeHero() {
  return (
    <section className="bg-brand-900 text-brand-50">
      <div className="container-page grid items-center gap-8 py-14 md:grid-cols-2 md:py-20">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-brand-300">Kolekcja jesień 2026</p>
          <h1 className="font-serif text-4xl font-semibold leading-tight md:text-5xl">
            Wszystko dla jeźdźca<br />i konia. W jednym miejscu.
          </h1>
          <p className="mt-4 max-w-md text-brand-200">
            Kaski Samshield i KEP, derki Horseware, siodła Prestige, odzież Pikeur. Ponad 12 000 produktów, wysyłka w 24 h.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/nowosci" className="btn-primary bg-brand-100 text-brand-900 hover:bg-white">Zobacz nowości</Link>
            <Link href="/promocje" className="btn-secondary border-brand-500 bg-transparent text-brand-50 hover:border-white">Promocje</Link>
          </div>
        </div>
        <div className="relative hidden aspect-[4/3] md:block">
          <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden>
            <defs>
              <linearGradient id="hg" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="#5a432d" />
                <stop offset="1" stopColor="#2a1f16" />
              </linearGradient>
            </defs>
            <rect width="400" height="300" rx="16" fill="url(#hg)" />
            <circle cx="300" cy="90" r="60" fill="#bda684" fillOpacity="0.25" />
            <path
              d="M60 240c10-50 30-90 80-110 25-10 50-10 75-35l20-35 35 12-12 40c15 25 5 60-30 75l-20 6-12 70h-16l8-64c-25-2-55-8-70-25-20 20-30 45-32 66H60z"
              fill="none"
              stroke="#ebe4d8"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M110 240l6-40M180 240l-4-36" stroke="#ebe4d8" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      <div className="border-t border-brand-800 bg-brand-950/40">
        <ul className="container-page grid grid-cols-2 gap-4 py-4 text-xs text-brand-200 md:grid-cols-4 md:text-sm">
          <li className="flex items-center gap-2"><TruckIcon width={18} height={18} /> Darmowa dostawa od 299 zł</li>
          <li className="flex items-center gap-2"><ClockIcon width={18} height={18} /> Wysyłka w 24 h</li>
          <li className="flex items-center gap-2"><ReturnIcon width={18} height={18} /> 30 dni na zwrot</li>
          <li className="flex items-center gap-2"><ShieldIcon width={18} height={18} /> Bezpieczne płatności</li>
        </ul>
      </div>
    </section>
  );
}
