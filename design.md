# Design — King Glamour

Zablokowany system projektowy sklepu. Każdy kolejny run Hallmark czyta ten
plik jako pierwszy; strony dostosowują się do niego. Nie generuj systemu per
strona: rozszerz lub popraw ten plik, gdy system ma urosnąć.

## Genre
editorial

## Macrostructure family
Strony w rodzinie dzielą kształt rodziny; różnią się tylko archetypami
komponentów.

- Marketing (strona główna, indeks marek): **Bento Grid** na stronie głównej
  (hero-dyptyk na ciemnym pasmie → bento → pasmo kolorowe → siatka produktów →
  indeks). Indeks marek: lista typograficzna z liniami (Catalogue).
- Sklep / listingi (kategoria, marka, szukaj, 24h, promocje, nowości,
  ulubione): **Catalogue**. Nagłówek strony, poziome zakładki podkategorii,
  filtry w lewej kolumnie, jednolita siatka F6, paginacja typograficzna.
- Produkt: **Split Studio**. Dyptyk obraz / panel zakupu, pod nim opis i
  arkusz danych (F3), potem siatka produktów podobnych.
- Aplikacja (koszyk, zamówienie, potwierdzenie, konto): **Workbench**
  w rejestrze formularzowym. Jedna kolumna kroków, wiersze z liniami zamiast
  kart, przyklejone podsumowanie na paper-2. Zero dekoracji.
- Treść (blog, wpis, strony informacyjne, 404): **Long Document**. Miara
  65 ch, interlinia 1.65, nagłówki w toku tekstu, tabele jako arkusz danych.

## Theme
- `--color-paper`        oklch(97% 0.012 78)
- `--color-paper-2`      oklch(94% 0.016 78)
- `--color-paper-3`      oklch(24% 0.028 62)   (ciemny brąz: hero, stopka, kafel bloga)
- `--color-ink`          oklch(20% 0.022 62)
- `--color-ink-2`        oklch(30% 0.022 62)
- `--color-ink-on-dark`  oklch(94% 0.012 80)
- `--color-muted`        oklch(44% 0.022 68)
- `--color-muted-on-dark` oklch(78% 0.02 78)
- `--color-rule`         oklch(84% 0.016 78)
- `--color-rule-2`       oklch(90% 0.013 78)
- `--color-accent`       oklch(46% 0.19 22)    (czerwień: wyłącznie promocje i ceny obniżone)
- `--color-forest`       oklch(34% 0.07 155)   (zieleń: dostępność, dział 24h, sukces, baner)
- `--color-forest-soft`  oklch(91% 0.03 150)
- `--color-cognac`       oklch(45% 0.11 58)    (koniak: kolekcja, ostatnie sztuki)
- `--color-cognac-soft`  oklch(92% 0.035 72)
- `--color-focus`        oklch(56% 0.16 55)
- Osie: light / high-contrast-serif / warm (+ zieleń i koniak jako kolory towarzyszące)

## Typography
- Display: Fraunces Variable, waga 640 (`--weight-display`), styl normal, tracking −0.025em, line-height 1
- Tytuły: Fraunces Variable, waga 560 (`--weight-title`)
- Body: Source Serif 4 Variable, waga 400, oldstyle-nums; liczby w tabelach i cenach tabular-nums
- Kapitaliki: `.caps` — 0.8rem, uppercase, tracking 0.1em, muted; jedyny tekst wersalikami
- Skala: `--text-display` = clamp(3rem, 6vw + 0.5rem, 5.5rem); reszta w tokens.css
- Kursywa nigdy w nagłówkach

## Spacing
Skala 4 pt, nazwana (`--space-3xs` … `--space-3xl`) w `src/styles/tokens.css`.
Strony używają nazwanych tokenów i klas Tailwind, nie surowych wartości.

## Motion
- Easings: `--ease-out` cubic-bezier(0.16, 1, 0.3, 1), `--ease-in`, `--ease-in-out`
- Reveal: tylko jednorazowe wejście kafli bento na stronie głównej (stagger CSS). Podstrony: brak reveal.
- Hover: obraz produktu skala 1.02, kolor linii/tła; nigdy cień + skala + kolor naraz
- Reduced-motion: wszystko ≤ 150 ms opacity, animacje kafli wyłączone

## Microinteractions stance
- Cichy sukces: dodanie do koszyka zmienia przycisk na zielony na 2,5 s, bez toastów
- Ulubione: optymistycznie, natychmiast
- Focus ring: 2 px `--color-focus`, offset 2 px, pojawia się bez animacji
- Formularze: etykieta nad polem, błąd pod polem w akcencie, bez wykrzykników

## CTA voice
- Primary: wypełnienie ink, tekst paper, promień 2 px, padding 0.625rem 1.25rem, jedna linia, czasownik
- Secondary: obrys rule → ink na hover, ten sam promień
- Accent (tylko dział 24h / promocje): obrys w kolorze, wypełnienie na hover
- Linki typograficzne: podkreślenie 1 px w kolorze rule, na hover ink; na ciemnym `.link-typo-dark`

## Nagłówek strony (wspólny rytm)
Okruszki w kapitalikach → `PageHead`: display h1 po lewej, lede po prawej,
gruba linia 2 px ink pod całością. Sekcje: gruba linia 2 px + display h2 +
link typograficzny na linii bazowej (`Section`). Bez eyebrow.

## Per-page allowances
- Marketing MOŻE używać pasm koloru (paper-3, forest, cognac) i ilustracji SVG jako placeholderów zdjęć.
- Listingi i produkt: bez pasm koloru; kolor tylko w etykietach i stanach.
- Aplikacja: bez ilustracji, bez pasm; paper-2 tylko dla przyklejonego podsumowania.
- Treść: sama typografia.

## What pages MUST share
- Logo (Fraunces, kółko z konikiem) i nagłówek N12 (zielony baner chowany przy przewijaniu, papier, megamenu).
- Stopkę Ft1 na ciemnym brązie.
- Paletę, fonty, `.caps`, głos CTA, linki typograficzne.
- Rytm nagłówków (`PageHead`, `Section`) i grubą linię 2 px.
- Kartę produktu F6 (obraz na paper-2, marka w kapitalikach, tytuł w display, cena półgruba).

## What pages MAY differ on
- Makrostrukturę w obrębie rodziny (np. indeks marek jako lista, a listing jako siatka).
- Obecność panelu bocznego (filtry / podsumowanie).
- Układ dyptyku na stronie produktu (obraz po lewej) vs. strona główna (tekst po lewej).

## Exports
Źródłem prawdy jest `src/styles/tokens.css`. Formaty Tailwind v4 `@theme`,
DTCG `tokens.json` i zmienne shadcn/ui dopiszę na prośbę
„extend design.md with Tailwind exports” (lub inny format) według
`references/export-formats.md`.
