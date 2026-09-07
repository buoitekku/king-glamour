import { defineConfig, devices } from "@playwright/test";

/**
 * Testy e2e storefrontu. Lokalnie: `npm run e2e` (buduje i startuje serwer).
 * W CI: GitHub Actions uruchamia je na zbudowanej aplikacji.
 */
export default defineConfig({
  testDir: "tests/e2e",
  timeout: 30_000,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: process.env.E2E_BASE_URL ?? "http://localhost:3100",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1360, height: 900 } } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: "npx next start -p 3100",
        url: "http://localhost:3100",
        reuseExistingServer: !process.env.CI,
        timeout: 60_000,
      },
});
