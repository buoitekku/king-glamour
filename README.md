# King Glamour – sklep jeździecki (storefront Next.js)

Storefront sklepu internetowego wzorowany na strukturze gnl.pl: działy Jeździec / Koń / Stajnia i wybieg / Specjalistyczne, dział 24h, promocje, nowości, marki, blog, wyszukiwarka, filtry, koszyk, lista życzeń, checkout i strony informacyjne. Język: polski, waluta: PLN.

## Uruchomienie

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint && npm run typecheck
```

## Demo na GitHub Pages

Workflow `.github/workflows/pages.yml` buduje statyczną wersję (`STATIC_EXPORT=1`, `BASE_PATH=/<nazwa-repo>`) i publikuje ją na GitHub Pages przy każdym pushu.

Jednorazowa konfiguracja w repozytorium: **Settings → Pages → Build and deployment → Source: „GitHub Actions”**. Bez tego krok `configure-pages` kończy się błędem „Resource not accessible by integration”. Adres demo: `https://<user>.github.io/<nazwa-repo>/`.

Lokalnie:

```bash
STATIC_EXPORT=1 BASE_PATH=/king-glamour npm run build   # wynik w katalogu out/
```

## Design

Strona główna została przeprojektowana skillem Hallmark (makrostruktura Bento Grid, motyw Atelier, ton luxury). Tokeny OKLCH, fonty (Fraunces + Source Serif 4, samohostowane przez `@fontsource`) i skala odstępów są w `src/styles/tokens.css`; historia runów Hallmark w `.hallmark/log.json`.

## Architektura

```
src/
  app/            trasy (App Router): /, /kategoria/[slug], /produkt/[slug], /szukaj,
                  /koszyk, /zamowienie, /marki, /blog, /konto, /ulubione, /24h,
                  /promocje, /nowosci, strony informacyjne
  components/     UI (nagłówek z megamenu, karta produktu, filtry, koszyk, checkout…)
  lib/commerce.ts warstwa dostępu do danych – jedyne miejsce, z którego strony pobierają katalog
  lib/orders.ts   walidacja i wycena zamówienia (w wersji demo po stronie klienta)
  data/           lokalny katalog demo (kategorie, marki, produkty, wpisy blogowe)
  store/          koszyk i lista życzeń (zustand + localStorage)
```

### Podejście headless

Logika biznesowa sklepu (stany magazynowe, promocje, zamówienia, płatności, faktury, zwroty, konta) nie jest implementowana w tym repozytorium – należy do platformy e-commerce. Storefront rozmawia z nią wyłącznie przez `src/lib/commerce.ts` i `src/lib/orders.ts`.

Podpięcie platformy (Shopify Storefront API, Medusa, Saleor, IdoSell, Shoper):

1. Zastąp implementacje funkcji w `src/lib/commerce.ts` (`queryProducts`, `getProductBySlug`, `getBestsellers`, …) wywołaniami API platformy. Sygnatury i typy z `src/lib/types.ts` pozostają bez zmian.
2. W `src/lib/orders.ts` zastąp `createOrder` wywołaniem Checkout API platformy i przekieruj do operatora płatności (Przelewy24, PayU, Stripe). Przy renderowaniu serwerowym (bez `STATIC_EXPORT`) można to zrobić w Route Handlerze lub Server Action.
3. W `src/components/AccountForms.tsx` podłącz system kont platformy lub NextAuth.
4. Zamień `ProductImage` (ilustracje SVG) na `next/image` z adresami zdjęć z CDN platformy.
5. `subscribeNewsletter` w `src/lib/orders.ts` – podłącz dostawcę newslettera.

Treści stron „Regulamin”, „Polityka prywatności” i „Zwroty” są szkicem do uzupełnienia z prawnikiem.
