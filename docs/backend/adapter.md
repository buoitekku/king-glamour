# Adapter handlu — mapowanie na platformy

Interfejs: `src/lib/commerce/provider.ts` (`CommerceProvider`).
Rejestr: `src/lib/commerce/index.ts`, wybór przez `NEXT_PUBLIC_COMMERCE_PROVIDER`.
Implementacja referencyjna: `src/lib/commerce/local.ts`.

Nowy adapter to jeden plik `src/lib/commerce/<nazwa>.ts` eksportujący obiekt
`CommerceProvider` i wpis w rejestrze. UI nie zmienia się.

| Metoda | Shopify (Storefront API) | Saleor (GraphQL) |
| --- | --- | --- |
| `getProductBySlug` | `product(handle:)` | `product(slug:, channel:)` |
| `getProductById` | `product(id:)` | `product(id:)` |
| `queryProducts` | `products(query:, sortKey:)` + `collection(handle:)` dla kategorii | `products(filter:, sortBy:, channel:)` + `category(slug:)` |
| `getBestsellers` / `getNewArrivals` / `getSaleProducts` | kolekcje `bestsellery`, `nowosci`, `promocje` | kolekcje o tych samych slugach |
| `getRelatedProducts` | `productRecommendations(productId:)` | ta sama kategoria, `products(filter:{categories:})` |
| `getCategories` / `getBrands` | `collections` (kategorie), `vendor` (marki) | `categories`, atrybut `brand` |
| `getShippingMethods` | `cart.deliveryGroups.deliveryOptions` | `checkout.shippingMethods` |
| `getPaymentMethods` | hostowany checkout decyduje | `checkout.availablePaymentGateways` |
| `createOrder` | `cartCreate` + `cartLinesAdd` → `cart.checkoutUrl` jako `redirectUrl` | `checkoutCreate` → `checkoutComplete` lub URL bramki jako `redirectUrl` |
| `subscribeNewsletter` | `customerCreate` z `acceptsMarketing` lub Klaviyo | Klaviyo / MailerLite / własny endpoint |
| `subscribeStockAlert` | aplikacja Back in Stock | własny webhook + mailing |

## Pola produktu, które platforma musi dostarczyć

- `lowestPrice30d` (Omnibus): Shopify: metafield `omnibus.lowest_price_30d` aktualizowany aplikacją; Saleor: atrybut lub metadata z zadaniem cyklicznym.
- `ships24h`: Shopify: tag `24h` lub lokalizacja magazynu; Saleor: `stocks.warehouse`.
- `stock` per wariant: `variants[].quantityAvailable` (Shopify) / `variant.quantityAvailable` (Saleor). `CartItem.variantId` jest gotowe na to mapowanie.
- Zdjęcia: `images[].url` → `next/image` z `remotePatterns` w `next.config.ts`.

## Zmiany poza adapterem przy przejściu na platformę

1. `next.config.ts`: wyłączyć `STATIC_EXPORT`, dodać `images.remotePatterns`.
2. `useCart` w `src/store/cart.ts`: identyfikator koszyka platformy w ciasteczku zamiast pełnych pozycji w `localStorage` (interfejs hooka bez zmian).
3. `OrderConfirmation`: czytać zamówienie po identyfikatorze zamiast z parametrów URL.
4. `Analytics`: `purchase` wysyłać po powrocie z bramki, nie przy wysłaniu formularza.
