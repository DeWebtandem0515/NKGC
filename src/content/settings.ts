/**
 * Centrale, non-vertaalde bedrijfsgegevens. Eén bron van waarheid i.p.v.
 * verspreide hardcoded adressen/telefoonnummers door de hele codebase.
 * Bron: contactpagina + footer van www.nkgc.nl (gecrawld 2026-09-07).
 */
export const siteSettings = {
  organisationName: "Nederlands Klauw Gezondheids Centrum",
  organisationShort: "NKGC",
  address: {
    street: "Holkerweg 52",
    postalCode: "3861 PB",
    city: "Nijkerk",
    country: "NL",
  },
  phone: "033 246 03 05",
  phoneHref: "tel:+31332460305",
  mobile: "06 24135779",
  mobileHref: "tel:+31624135779",
  email: "info@nkgc.nl",
  directContact: {
    name: "Marcel Drint",
    mobile: "06 24135779",
    mobileHref: "tel:+31624135779",
  },
  youtubeVideoId: "ElxQSeDWTb8",
} as const;
