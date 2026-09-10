import { describe, expect, it } from "vitest";
// @ts-expect-error -- plain .mjs config module, geen typedeclaratie nodig voor deze test
import { legacyRedirects } from "../../redirects.config.mjs";

interface Redirect {
  source: string;
  destination: string;
  permanent: boolean;
}

describe("legacyRedirects", () => {
  const redirects = legacyRedirects as Redirect[];
  const sources = redirects.map((r) => r.source);
  const destinations = new Set(redirects.map((r) => r.destination));

  it("bevat geen dubbele bronpaden", () => {
    expect(new Set(sources).size).toBe(sources.length);
  });

  it("vormt geen redirectketens (een destination is nooit ook een source)", () => {
    const chained = sources.filter((source) => destinations.has(source));
    expect(chained).toEqual([]);
  });

  it("is altijd permanent (301)", () => {
    expect(redirects.every((r) => r.permanent)).toBe(true);
  });

  it("bevat de kernroutes uit de SEO-migratie", () => {
    expect(sources).toContain("/koppelbehandeling");
    expect(sources).toContain("/login");
    expect(sources).toContain("/lezingen-workshops/advies");
  });
});
