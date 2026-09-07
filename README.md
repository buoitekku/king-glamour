# King Glamour – sklep jeździecki (storefront Next.js)

Storefront sklepu internetowego wzorowany na strukturze gnl.pl: działy Jeździec / Koń / Stajnia i wybieg / Specjalistyczne, dział 24h, promocje, nowości, marki, blog, wyszukiwarka, filtry, koszyk, lista życzeń, checkout i strony informacyjne. Język: polski, waluta: PLN.

## Uruchomienie

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint && npm run typecheck
```

## Architektura

```
src/
  app/            trasy (App Router): /, /kategoria/[slug], /produkt/[slug], /szukaj,
                  /koszyk, /zamowienie, /marki, /blog, /konto, /ulubione, /24h,
                  /promocje, /nowosci, strony informacyjne, /api/orders, /api/newsletter
  components/     UI (nagłówek z megamenu, karta produktu, filtry, koszyk, checkout…)
  lib/commerce.ts warstwa dostępu do danych – jedyne miejsce, z którego strony pobierają katalog
  data/           lokalny katalog demo (kategorie, marki, produkty, wpisy blogowe)
  store/          koszyk i lista życzeń (zustand + localStorage)
```

### Podejście headless

Logika biznesowa sklepu (stany magazynowe, promocje, zamówienia, płatności, faktury, zwroty, konta) nie jest implementowana w tym repozytorium – należy do platformy e-commerce. Storefront rozmawia z nią wyłącznie przez `src/lib/commerce.ts` oraz dwa endpointy w `src/app/api`.

Podpięcie platformy (Shopify Storefront API, Medusa, Saleor, IdoSell, Shoper):

1. Zastąp implementacje funkcji w `src/lib/commerce.ts` (`queryProducts`, `getProductBySlug`, `getBestsellers`, …) wywołaniami API platformy. Sygnatury i typy z `src/lib/types.ts` pozostają bez zmian.
2. W `src/app/api/orders/route.ts` utwórz zamówienie/checkout w platformie i zwróć URL przekierowania do operatora płatności (Przelewy24, PayU, Stripe).
3. W `src/components/AccountForms.tsx` podłącz system kont platformy lub NextAuth.
4. Zamień `ProductImage` (ilustracje SVG) na `next/image` z adresami zdjęć z CDN platformy.
5. `src/app/api/newsletter/route.ts` – podłącz dostawcę newslettera.

Treści stron „Regulamin”, „Polityka prywatności” i „Zwroty” są szkicem do uzupełnienia z prawnikiem.
