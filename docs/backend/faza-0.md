# Faza 0 — wymagania i wybór platformy

Cel: jedna decyzja o platformie i lista integracji z konkretnymi nazwami,
zanim napiszemy pierwszy adapter. Storefront jest gotowy na każdą opcję:
całe API handlu przechodzi przez `src/lib/commerce/provider.ts`.

## Checklista wymagań (Polska, 2026)

| # | Wymaganie | Dlaczego | Status w storefroncie |
| --- | --- | --- | --- |
| 1 | BLIK, Przelewy24 lub PayU, karty, pobranie | oczekiwane przez klientów PL | UI gotowe (`paymentMethods`), realizacja po stronie platformy |
| 2 | InPost Paczkomaty z wyborem punktu, DPD, DHL, odbiór osobisty | najczęstsze formy dostawy | UI gotowe; pole kodu paczkomatu do zamiany na geowidget InPost |
| 3 | Faktury VAT przez KSeF | obowiązek od 2026 | poza storefrontem; platforma lub narzędzie fakturujące z KSeF |
| 4 | Omnibus: najniższa cena z 30 dni przy obniżce | dyrektywa UE, UOKiK | **gotowe**: pole `lowestPrice30d`, komponent `Price` |
| 5 | Zgody cookies, Consent Mode v2 | RODO, wymóg Google od 2024 | **gotowe**: `CookieConsent`, `src/lib/consent.ts` |
| 6 | Zdarzenia e-commerce GA4 | analityka, remarketing | **gotowe**: `src/lib/analytics.ts` (view_item, add_to_cart, begin_checkout, purchase, search) |
| 7 | Regulamin, polityka prywatności, prawo odstąpienia 14 dni (u nas 30) | prawo konsumenckie | szkice stron; do przeglądu prawnego |
| 8 | Feed produktów Google Merchant / Ceneo | pozyskanie ruchu | po stronie platformy lub mały skrypt w fazie 1 |
| 9 | Stany magazynowe per wariant (rozmiar × kolor) | uczciwa dostępność | typ `CartItem.variantId` przygotowany; dane lokalne mają jeden stan na produkt |
| 10 | Zwroty i reklamacje online | prawo, obsługa | po stronie platformy |
| 11 | Konta klientów | zamówienia, adresy | UI gotowe (`AccountForms`), auth po stronie platformy |
| 12 | Allegro / marketplace, ERP | opcjonalne | tylko platforma |

## Macierz porównawcza

| Kryterium | Shopify | Saleor | IdoSell / Shoper |
| --- | --- | --- | --- |
| Headless API (katalog, koszyk, checkout) | bardzo dojrzałe (Storefront API, GraphQL) | bardzo dobre (GraphQL, Checkout API) | ograniczone, projektowane pod własny front |
| Płatności PL | aplikacje PayU / P24 / Tpay, prowizje | aplikacja do napisania lub społecznościowa | w standardzie |
| InPost + kurierzy | aplikacje | do napisania | w standardzie |
| Faktury KSeF | aplikacje (Fakturownia, wFirma) | integracja własna | w standardzie lub aplikacje |
| Omnibus | pole w metafields lub aplikacja | pole własne w modelu | w standardzie |
| Konta klientów | Customer Accounts | wbudowane | wbudowane |
| Hosting backendu | SaaS | Saleor Cloud lub własny | SaaS |
| Koszt stały | abonament + prowizje | 0 przy self-hosting, czas zespołu | abonament |
| Czas do pierwszej sprzedaży (1 osoba) | ok. 8–10 tyg. | ok. 11–15 tyg. | 6–8 tyg., ale front platformy zamiast naszego |
| Ryzyko główne | koszty prowizji, zależność od aplikacji | integracje PL do napisania | słabe API headless |

## Szablon decyzji (ADR)

```
# ADR-0001: Platforma e-commerce dla King Glamour
Data: YYYY-MM-DD
Status: proponowana | zaakceptowana

## Kontekst
Storefront Next.js z warstwą adaptera (src/lib/commerce). Wymagania 1–12 powyżej.

## Decyzja
Wybieramy: <Shopify | Saleor | IdoSell | Shoper>.
Płatności: <PayU | Przelewy24 | Tpay> przez <aplikacja / integracja>.
Dostawa: InPost przez <aplikacja>, kurierzy przez <...>.
Faktury KSeF: <Fakturownia | wFirma | wbudowane>.
Hosting storefrontu: <Vercel | Cloudflare | własny Node>.

## Konsekwencje
+ ...
− ...
Odrzucone alternatywy i dlaczego: ...
```

## Kryteria wyjścia z fazy 0

- ADR-0001 zaakceptowany.
- Konto testowe na platformie z 10 produktami w wariantach.
- Lista aplikacji / integracji z cenami.
- Decyzja o hostingu storefrontu (eksport statyczny odpada w fazie 1).
