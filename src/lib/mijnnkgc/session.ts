import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Ondertekende, opaque sessiewaarde voor de httpOnly MijnNKGC-cookie.
 * Dit is een generiek, herbruikbaar patroon (HMAC-signed payload) — géén
 * vervanging voor het sessiebeheer van het uiteindelijke, gekoppelde
 * NKGC-systeem. Zie docs/SECURITY.md en docs/MIJNNKGC_INTEGRATION.md.
 */

const COOKIE_NAME = "mijnnkgc_session";
const MAX_AGE_SECONDS = 60 * 30; // 30 minuten — sessie-expiratie

function getSecret(): string {
  const secret = process.env.MIJNNKGC_SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "MIJNNKGC_SESSION_SECRET ontbreekt. Zet deze in .env.local (zie .env.example)."
    );
  }
  return secret;
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

export function createSessionCookieValue(companyId: string): string {
  const payload = `${companyId}.${Date.now() + MAX_AGE_SECONDS * 1000}`;
  const encodedPayload = Buffer.from(payload).toString("base64url");
  const signature = sign(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export function verifySessionCookieValue(value: string | undefined): string | null {
  if (!value) return null;
  const [encodedPayload, signature] = value.split(".");
  if (!encodedPayload || !signature) return null;

  const expectedSignature = sign(encodedPayload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expectedSignature);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  const payload = Buffer.from(encodedPayload, "base64url").toString("utf-8");
  const [companyId, expiresAt] = payload.split(".");
  if (!companyId || !expiresAt) return null;
  if (Date.now() > Number(expiresAt)) return null;

  return companyId;
}

export const mijnNkgcCookie = {
  name: COOKIE_NAME,
  maxAge: MAX_AGE_SECONDS,
  options: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  },
};
