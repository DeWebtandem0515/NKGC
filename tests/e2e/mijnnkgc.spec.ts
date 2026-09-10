import { test, expect } from "@playwright/test";

/**
 * Deze tests draaien tegen de development-fixture van de MijnNKGC-
 * integratielaag (MIJNNKGC_USE_DEV_FIXTURES=1, zie playwright.config.ts en
 * docs/MIJNNKGC_INTEGRATION.md). Ze testen het frontend-gedrag en de
 * autorisatiegrenzen van `src/lib/mijnnkgc`, niet het echte NKGC-systeem.
 */
test.describe("MijnNKGC", () => {
  test("niet-ingelogde bezoeker wordt vanaf het dashboard naar inloggen gestuurd", async ({
    page,
  }) => {
    await page.goto("/mijnnkgc/dashboard");
    await expect(page).toHaveURL(/\/mijnnkgc\/inloggen$/);
  });

  test("fout wachtwoord toont een foutmelding, geen sessie", async ({ page }) => {
    await page.goto("/mijnnkgc/inloggen");
    await page.locator("#username").fill("demo");
    await page.locator("#password").fill("verkeerd-wachtwoord");
    await page.getByRole("button", { name: "Inloggen" }).click();
    // Scope op tekst i.p.v. kale role="alert": Next.js' eigen
    // route-announcer (__next-route-announcer__) heeft ook role="alert" en
    // zou anders een strict-mode "meerdere matches"-fout geven.
    await expect(page.getByRole("alert").filter({ hasText: "niet gelukt" })).toBeVisible();
    await expect(page).toHaveURL(/\/mijnnkgc\/inloggen$/);
  });

  test("correcte fixture-inloggegevens geven toegang tot het dashboard", async ({ page }) => {
    await page.goto("/mijnnkgc/inloggen");
    await page.locator("#username").fill("demo");
    await page.locator("#password").fill("demo1234");
    await page.getByRole("button", { name: "Inloggen" }).click();
    await expect(page).toHaveURL(/\/mijnnkgc\/dashboard$/);
    // getByRole i.p.v. getByText: voorkomt een strict-mode botsing met
    // Next.js' route-announcer, die de paginatekst dupliceert voor a11y.
    await expect(page.getByRole("heading", { name: /Voorbeeldbedrijf/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Rapportages" })).toBeVisible();
  });

  test("een niet-bestaand rapport-ID geeft 404, nooit andermans data (IDOR-check)", async ({
    page,
  }) => {
    await page.goto("/mijnnkgc/inloggen");
    await page.locator("#username").fill("demo");
    await page.locator("#password").fill("demo1234");
    await page.getByRole("button", { name: "Inloggen" }).click();
    await page.waitForURL(/\/mijnnkgc\/dashboard$/);

    const response = await page.goto("/mijnnkgc/rapporten/niet-bestaand-of-andermans-id");
    expect(response?.status()).toBe(404);
  });

  test("uitloggen verwijdert de sessie: dashboard is daarna weer afgeschermd", async ({ page }) => {
    await page.goto("/mijnnkgc/inloggen");
    await page.locator("#username").fill("demo");
    await page.locator("#password").fill("demo1234");
    await page.getByRole("button", { name: "Inloggen" }).click();
    await page.waitForURL(/\/mijnnkgc\/dashboard$/);

    await page.getByRole("button", { name: "Uitloggen" }).click();
    await expect(page).toHaveURL(/\/mijnnkgc\/inloggen$/);

    await page.goto("/mijnnkgc/dashboard");
    await expect(page).toHaveURL(/\/mijnnkgc\/inloggen$/);
  });
});
