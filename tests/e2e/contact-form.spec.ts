import { test, expect } from "@playwright/test";

test.describe("Contactformulier", () => {
  test("toont validatiefouten bij een leeg formulier", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: "Versturen" }).click();
    await expect(page.getByText("Dit veld is verplicht").first()).toBeVisible();
  });

  test("toont een fout bij een ongeldig e-mailadres", async ({ page }) => {
    await page.goto("/contact");
    // exact: true — anders matcht "Naam" ook op het "Bedrijfsnaam"-veld
    await page.getByLabel("Naam", { exact: true }).fill("Jan Jansen");
    await page.getByLabel("E-mailadres").fill("niet-een-emailadres");
    await page.getByLabel("Bericht").fill("Dit is een testbericht van tien tekens of meer.");
    await page.getByRole("button", { name: "Versturen" }).click();
    await expect(page.getByText("Vul een geldig e-mailadres in")).toBeVisible();
  });

  test("honeypot-veld is verborgen voor gebruikers", async ({ page }) => {
    await page.goto("/contact");
    const honeypot = page.locator("#website");
    await expect(honeypot).toBeHidden();
  });

  test("server wijst een verzoek zonder verplichte velden af (server-side validatie)", async ({
    request,
  }) => {
    const response = await request.post("/api/contact", {
      data: { name: "A" },
    });
    expect(response.status()).toBe(400);
  });

  test("server accepteert een honeypot-invulling stilzwijgend als spam", async ({ request }) => {
    const response = await request.post("/api/contact", {
      data: {
        name: "Test Bot",
        email: "bot@example.com",
        subject: "other",
        message: "Dit is een geautomatiseerd testbericht.",
        website: "http://spam.example",
      },
    });
    expect(response.status()).toBe(200);
  });
});
