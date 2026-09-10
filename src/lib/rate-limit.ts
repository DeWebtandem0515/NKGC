/**
 * Eenvoudige in-memory rate limiter voor het contactformulier.
 *
 * Beperking: dit werkt per serverinstantie. Bij meerdere instanties
 * (bijvoorbeeld meerdere serverless functies) is dit geen sluitende
 * bescherming — voor productie op schaal wordt een gedeelde store
 * (bv. Upstash Redis) aanbevolen, zie docs/SECURITY.md.
 */
const attempts = new Map<string, number[]>();

const WINDOW_MS = 10 * 60 * 1000; // 10 minuten
const MAX_ATTEMPTS = 5;

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (attempts.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_ATTEMPTS) {
    attempts.set(key, timestamps);
    return true;
  }

  timestamps.push(now);
  attempts.set(key, timestamps);
  return false;
}
