import type { Metadata } from "next";
import { getPathname, routing, type Locale } from "@/i18n/routing";

type PathnameKey = Parameters<typeof getPathname>[0]["href"];

/**
 * Bouwt canonical + hreflang alternates voor een pagina die in beide talen
 * bestaat op hetzelfde inhoudelijke pad (zie routing.ts `pathnames`).
 */
export function buildAlternates(locale: Locale, href: PathnameKey): Metadata["alternates"] {
  const nl = getPathname({ locale: "nl", href });
  const en = getPathname({ locale: "en", href });

  return {
    canonical: locale === "nl" ? nl : en,
    languages: {
      "nl-NL": nl,
      en,
    },
  };
}

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nkgc.nl";
export const locales = routing.locales;
