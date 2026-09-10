import { test, expect } from "@playwright/test";

test.describe("Publieke site — NL", () => {
  test("homepage toont hero, drie pijlers en werkwijze", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("klauwgezondheid bij rundvee");
    // Editorial redesign: geen generieke "Drie pijlers, één doel"-koptekst
    // meer boven de sectie — elke pijler draagt zijn eigen kop.
    await expect(page.getByRole("heading", { name: "Klauwverzorging" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Zo werkt een koppelbehandeling" })).toBeVisible();
  });

  test("workshops-sectie toont lege-staat CTA wanneer er geen actieve workshops zijn", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Interesse in een workshop voor uw organisatie?" })
    ).toBeVisible();
  });

  test("MijnNKGC-knop is aanwezig en onderscheidend in de header", async ({ page }) => {
    await page.goto("/");
    const cta = page.getByRole("link", { name: "MijnNKGC" }).first();
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", "/mijnnkgc/inloggen");
  });
});

test.describe("Publieke site — EN", () => {
  test("Engelse dienstenpagina heeft een eigen, natuurlijke URL", async ({ page }) => {
    await page.goto("/en/services/herd-hoof-care");
    await expect(page.locator("h1")).toHaveText("Herd hoof care");
  });
});

// Deze twee tests raken alleen de desktop-header (dropdown-nav en
// taalwisselaar zijn `hidden lg:flex`) — geforceerd naar een echte
// desktop-context (viewport én touch/mobile-emulatie uit) i.p.v. alleen het
// viewport te verbreden. Zonder `isMobile`/`hasTouch` uit te zetten bleef
// WebKit in de mobile-safari-projectconfig zich als touchscreen gedragen,
// wat het click-gedrag op deze knoppen onbetrouwbaar maakte.
test.describe("Desktop-header", () => {
  test.use({ viewport: { width: 1280, height: 900 }, isMobile: false, hasTouch: false });

  test("hoofdnavigatie linkt naar een dienstenpagina", async ({ page }) => {
    await page.goto("/");
    const link = page.getByRole("link", { name: "Koppelbehandeling" }).first();
    await expect(link).toHaveAttribute("href", "/diensten/koppelbehandeling");
    await page.goto("/diensten/koppelbehandeling");
    await expect(page.locator("h1")).toHaveText("Koppelbehandeling");
  });

  test("taalwisselaar blijft op dezelfde inhoudelijke pagina", async ({ page }) => {
    // Er staat ook een taalwisselaar in de footer — scope daarom expliciet
    // op de header (role="banner").
    await page.goto("/diensten/koppelbehandeling");
    // Taalwisselaar toont vlaggen i.p.v. tekst — geselecteerd via het
    // aria-label ("English") op de knop.
    await page
      .getByRole("banner")
      .getByRole("group", { name: "Taal" })
      .getByRole("button", { name: "English" })
      .click();
    await expect(page).toHaveURL(/\/en\/services\/herd-hoof-care$/);
  });
});

test.describe("Mobiele navigatie", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("hamburgermenu opent full-screen en toont alle navigatiegroepen", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Open menu").click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    const box = await dialog.boundingBox();
    expect(box?.height).toBeGreaterThan(800);
    await expect(dialog.getByText("Diensten")).toBeVisible();
  });
});

test.describe("SEO", () => {
  test("sitemap bevat NL- en EN-varianten", async ({ page }) => {
    const response = await page.goto("/sitemap.xml");
    const body = await response?.text();
    // Domein komt uit NEXT_PUBLIC_SITE_URL (productie: www.nkgc.nl) —
    // bewust niet hardcoded zodat de test ook lokaal/in CI werkt.
    expect(body).toContain("/diensten/koppelbehandeling");
    expect(body).toContain('hreflang="en"');
    expect(body).toContain('hreflang="nl-NL"');
  });

  test("oude URL redirect 301 naar nieuwe route", async ({ page }) => {
    const response = await page.goto("/koppelbehandeling", { waitUntil: "domcontentloaded" });
    expect(page.url()).toContain("/diensten/koppelbehandeling");
    expect(page.url()).not.toContain("/en/");
    expect(response?.status()).toBeLessThan(400);
  });

  test("MijnNKGC staat op noindex", async ({ page }) => {
    await page.goto("/mijnnkgc/inloggen");
    const robotsMeta = page.locator('meta[name="robots"]');
    await expect(robotsMeta).toHaveAttribute("content", /noindex/);
  });
});
