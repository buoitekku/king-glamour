import { test, expect } from "@playwright/test";

const CONSENT_DECIDED = JSON.stringify({ necessary: true, analytics: false, marketing: false, decidedAt: "2026-01-01T00:00:00.000Z" });

/** Ścieżka krytyczna: katalog → produkt → koszyk → zamówienie → potwierdzenie. */
test.describe("Ścieżka zakupu", () => {
  test.beforeEach(async ({ page }, info) => {
    if (info.title.includes("cookies")) return;
    await page.addInitScript((value) => window.localStorage.setItem("kg-consent", value), CONSENT_DECIDED);
  });

  test("strona główna, listing i filtry", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Dla jeźdźca");
    await page.goto("/kategoria/derki?marka=horseware&sort=price-asc");
    await expect(page.getByText(/1 produkt$/)).toBeVisible();
    await expect(page.getByRole("link", { name: /Derka Horseware Rambo/ }).first()).toBeVisible();
  });

  test("wyszukiwarka", async ({ page }) => {
    await page.goto("/szukaj?q=derka%20200");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("derka 200");
    await expect(page.getByRole("link", { name: /Derka Horseware Rambo Original 200 g/ }).first()).toBeVisible();
  });

  test("produkt wymaga rozmiaru, potem trafia do koszyka", async ({ page }) => {
    await page.goto("/produkt/kask-samshield-shadowmatt");
    await page.locator("#kup").click();
    await expect(page.getByText("Wybierz rozmiar.")).toBeVisible();
    await page.getByRole("button", { name: "57", exact: true }).click();
    await page.locator("#kup").click();
    await expect(page.locator("#kup")).toContainText("Dodano");
    await page.goto("/koszyk");
    await expect(page.getByText("Kask Samshield Shadowmatt")).toBeVisible();
    await expect(page.getByText("Masz darmową dostawę.")).toBeVisible();
  });

  test("cena promocyjna pokazuje najniższą cenę z 30 dni (Omnibus)", async ({ page }) => {
    await page.goto("/produkt/kask-kep-cromo-2-0-textile");
    await expect(page.getByText(/Najniższa cena z 30 dni przed obniżką/).first()).toBeVisible();
  });

  test("zamówienie kończy się potwierdzeniem", async ({ page }) => {
    await page.goto("/produkt/derka-horseware-rambo-original-200-g");
    await page.getByRole("button", { name: "145", exact: true }).click();
    await page.locator("#kup").click();
    await page.goto("/zamowienie");
    await page.fill('input[name="email"]', "jan@example.com");
    await page.fill('input[name="phone"]', "600100200");
    await page.fill('input[name="firstName"]', "Jan");
    await page.fill('input[name="lastName"]', "Kowalski");
    await page.fill('input[name="street"]', "Jeździecka 5");
    await page.fill('input[name="postalCode"]', "90-001");
    await page.fill('input[name="city"]', "Łódź");
    await page.fill('input[name="parcelLocker"]', "LOD01A");
    await page.check('input[name="terms"]');
    await page.locator("#zamawiam").click();
    await page.waitForURL(/potwierdzenie/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Dziękujemy");
    await expect(page.getByText(/KG-\d{8}-[A-Z0-9]{5}/)).toBeVisible();
  });

  test("panel zgód cookies pojawia się raz i zapisuje decyzję", async ({ page }) => {
    await page.goto("/");
    const dialog = page.getByRole("dialog", { name: /Cookies/ });
    await expect(dialog).toBeVisible();
    await dialog.getByRole("button", { name: "Tylko niezbędne" }).click();
    await expect(dialog).toBeHidden();
    await page.reload();
    await expect(page.getByRole("dialog", { name: /Cookies/ })).toHaveCount(0);
    const consent = await page.evaluate(() => JSON.parse(localStorage.getItem("kg-consent") ?? "null"));
    expect(consent?.analytics).toBe(false);
  });
});

test("brak przewijania poziomego na szerokościach mobilnych", async ({ page }) => {
  await page.addInitScript((value) => window.localStorage.setItem("kg-consent", value), CONSENT_DECIDED);
  for (const width of [320, 375, 414, 768]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/", "/kategoria/kon", "/produkt/kask-samshield-shadowmatt", "/koszyk"]) {
      await page.goto(path);
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(scrollWidth, `${path} @ ${width}`).toBeLessThanOrEqual(width);
    }
  }
});
