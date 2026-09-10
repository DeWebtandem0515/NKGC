import { beforeAll, describe, expect, it } from "vitest";
import { createSessionCookieValue, verifySessionCookieValue } from "@/lib/mijnnkgc/session";

beforeAll(() => {
  process.env.MIJNNKGC_SESSION_SECRET = "test-secret-do-not-use-in-production";
});

describe("mijnnkgc session cookie", () => {
  it("round-trips a valid companyId", () => {
    const value = createSessionCookieValue("company-123");
    expect(verifySessionCookieValue(value)).toBe("company-123");
  });

  it("rejects a tampered signature", () => {
    const value = createSessionCookieValue("company-123");
    const [payload] = value.split(".");
    const tampered = `${payload}.not-a-valid-signature`;
    expect(verifySessionCookieValue(tampered)).toBeNull();
  });

  it("rejects a tampered payload (company-id swap attempt)", () => {
    const value = createSessionCookieValue("company-123");
    const otherValue = createSessionCookieValue("company-456");
    const [, signatureA] = value.split(".");
    const [payloadB] = otherValue.split(".");
    // Probeer de payload van bedrijf B te combineren met de handtekening van
    // bedrijf A — moet altijd falen (IDOR via cookie-manipulatie).
    const frankensteined = `${payloadB}.${signatureA}`;
    expect(verifySessionCookieValue(frankensteined)).toBeNull();
  });

  it("rejects undefined / empty input", () => {
    expect(verifySessionCookieValue(undefined)).toBeNull();
    expect(verifySessionCookieValue("")).toBeNull();
    expect(verifySessionCookieValue("garbage")).toBeNull();
  });
});
