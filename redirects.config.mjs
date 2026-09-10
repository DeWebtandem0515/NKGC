/**
 * 301-redirectmap: oude nkgc.nl-URL's (huidige site) → nieuwe route-structuur.
 * Bron: sitemap.xml crawl van www.nkgc.nl, zie docs/SEO_MIGRATION.md voor de volledige tabel.
 * Elke regel is één hop — geen keten van redirects. Gebruikt door next.config.mjs.
 */
export const legacyRedirects = [
  { source: "/over-ons", destination: "/over-nkgc", permanent: true },
  { source: "/over-ons/achtergrond bedrijf", destination: "/over-nkgc", permanent: true },
  { source: "/over-ons/achtergrond eigenaren", destination: "/over-nkgc/team", permanent: true },
  { source: "/over-ons/partners", destination: "/over-nkgc/partners", permanent: true },
  { source: "/partners", destination: "/over-nkgc/partners", permanent: true },

  { source: "/koppelbehandeling", destination: "/diensten/koppelbehandeling", permanent: true },
  {
    source: "/koppelbehandeling/klauwgezondheid melkvee",
    destination: "/diensten/klauwgezondheid-melkvee",
    permanent: true,
  },
  {
    source: "/koppelbehandeling/klauwgezondheid jongvee",
    destination: "/diensten/klauwgezondheid-jongvee",
    permanent: true,
  },

  { source: "/lezingen-workshops", destination: "/scholing", permanent: true },
  { source: "/lezingen-workshops/lezingen", destination: "/scholing/lezingen", permanent: true },
  { source: "/lezingen-workshops/workshops", destination: "/scholing/workshops", permanent: true },
  {
    source: "/lezingen-workshops/advies",
    destination: "/diensten/advies-begeleiding",
    permanent: true,
  },

  { source: "/praktijkonderzoek", destination: "/kennis-onderzoek", permanent: true },
  {
    source: "/praktijkonderzoek/praktijkonderzoek",
    destination: "/kennis-onderzoek/praktijkonderzoek",
    permanent: true,
  },
  {
    source: "/praktijkonderzoek/productontwikkeling",
    destination: "/kennis-onderzoek",
    permanent: true,
  },

  { source: "/inschrijven", destination: "/scholing/workshops", permanent: true },
  { source: "/webwinkel", destination: "/scholing/workshops", permanent: true },
  { source: "/nieuwsbrief", destination: "/contact", permanent: true },

  { source: "/login", destination: "/mijnnkgc/inloggen", permanent: true },

  { source: "/contact/telefonisch / e-mail", destination: "/contact", permanent: true },
  { source: "/contact/formulier", destination: "/contact", permanent: true },
  { source: "/contact.php", destination: "/contact", permanent: true },
];
