import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const locales = ["nl", "en"] as const;
export type Locale = (typeof locales)[number];

// Let op: bij localePrefix "as-needed" voegt next-intl het /en-prefix zelf
// toe. De `en`-waarden hieronder bevatten dus GEEN "/en" — anders ontstaat
// een dubbel voorvoegsel ("/en/en/...").
export const routing = defineRouting({
  locales,
  defaultLocale: "nl",
  // Nederlands is expliciet de standaardtaal (zie projectbrief §30): een
  // eerste bezoeker krijgt altijd NL, ongeacht browser-/OS-taalinstelling.
  // Alleen een bewuste klik op de taalwisselaar (die zijn eigen cookie zet)
  // toont EN. Zonder deze instelling negotieert next-intl automatisch op
  // basis van de Accept-Language header, wat een Engelstalige browser op
  // een NL-pad naar /en zou laten redirecten.
  localeDetection: false,
  // nl blijft zonder prefix (nkgc.nl/diensten/...), en krijgt /en/ (nkgc.nl/en/services/...)
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/diensten": { nl: "/diensten", en: "/services" },
    "/diensten/koppelbehandeling": {
      nl: "/diensten/koppelbehandeling",
      en: "/services/herd-hoof-care",
    },
    "/diensten/klauwgezondheid-melkvee": {
      nl: "/diensten/klauwgezondheid-melkvee",
      en: "/services/dairy-cattle-hoof-health",
    },
    "/diensten/klauwgezondheid-jongvee": {
      nl: "/diensten/klauwgezondheid-jongvee",
      en: "/services/young-stock-hoof-health",
    },
    "/diensten/advies-begeleiding": {
      nl: "/diensten/advies-begeleiding",
      en: "/services/advice-guidance",
    },
    "/scholing": { nl: "/scholing", en: "/education" },
    "/scholing/lezingen": { nl: "/scholing/lezingen", en: "/education/lectures" },
    "/scholing/workshops": { nl: "/scholing/workshops", en: "/education/workshops" },
    "/kennis-onderzoek": { nl: "/kennis-onderzoek", en: "/knowledge-research" },
    "/kennis-onderzoek/praktijkonderzoek": {
      nl: "/kennis-onderzoek/praktijkonderzoek",
      en: "/knowledge-research/applied-research",
    },
    "/over-nkgc": { nl: "/over-nkgc", en: "/about" },
    "/over-nkgc/team": { nl: "/over-nkgc/team", en: "/about/team" },
    "/over-nkgc/partners": { nl: "/over-nkgc/partners", en: "/about/partners" },
    "/contact": { nl: "/contact", en: "/contact" },
    "/privacy": { nl: "/privacy", en: "/privacy" },
    "/cookies": { nl: "/cookies", en: "/cookies" },
    "/voorwaarden": { nl: "/voorwaarden", en: "/terms" },
  },
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
