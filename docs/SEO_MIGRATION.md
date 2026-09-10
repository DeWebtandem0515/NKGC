# SEO-migratie

## Gecrawlde bestaande URL-structuur

Bron: `https://www.nkgc.nl/sitemap.xml` (gecrawld tijdens de bouw van dit
project):

```
/
/over-ons/
/over-ons/achtergrond bedrijf/
/over-ons/achtergrond eigenaren/
/koppelbehandeling/
/koppelbehandeling/klauwgezondheid melkvee/
/koppelbehandeling/klauwgezondheid jongvee/
/lezingen-workshops/
/lezingen-workshops/lezingen/
/lezingen-workshops/workshops/
/lezingen-workshops/advies/
/praktijkonderzoek/
/praktijkonderzoek/praktijkonderzoek/
/praktijkonderzoek/productontwikkeling/
/inschrijven/
/login/
/contact/
/contact/telefonisch / e-mail/
/contact/formulier/
/contact.php?page=formulier
/webwinkel/
/nieuwsbrief/
```

Twee bevindingen die de migratie beïnvloeden:

1. Sommige URL's bevatten **spaties** (`/koppelbehandeling/klauwgezondheid
   melkvee/`) — technisch geldig maar niet SEO-vriendelijk. De nieuwe site
   gebruikt overal keurige kebab-case-slugs.
2. `/praktijkonderzoek/` en de `/partners/`-pagina bevatten bij crawl **geen
   inhoudelijke tekst** — zie `CONTENT_STRUCTURE.md`.

## 301-redirectmap

Gedefinieerd in `redirects.config.mjs` (repo-root, geïmporteerd door
`next.config.mjs`) en getest in `tests/unit/redirects.test.ts` (geen
dubbele bronnen, geen ketens, altijd `permanent: true`).

| Oud | Nieuw |
|---|---|
| `/over-ons` | `/over-nkgc` |
| `/over-ons/achtergrond bedrijf` | `/over-nkgc` |
| `/over-ons/achtergrond eigenaren` | `/over-nkgc/team` |
| `/over-ons/partners`, `/partners` | `/over-nkgc/partners` |
| `/koppelbehandeling` | `/diensten/koppelbehandeling` |
| `/koppelbehandeling/klauwgezondheid melkvee` | `/diensten/klauwgezondheid-melkvee` |
| `/koppelbehandeling/klauwgezondheid jongvee` | `/diensten/klauwgezondheid-jongvee` |
| `/lezingen-workshops` | `/scholing` |
| `/lezingen-workshops/lezingen` | `/scholing/lezingen` |
| `/lezingen-workshops/workshops` | `/scholing/workshops` |
| `/lezingen-workshops/advies` | `/diensten/advies-begeleiding` |
| `/praktijkonderzoek` | `/kennis-onderzoek` |
| `/praktijkonderzoek/praktijkonderzoek` | `/kennis-onderzoek/praktijkonderzoek` |
| `/praktijkonderzoek/productontwikkeling` | `/kennis-onderzoek` |
| `/inschrijven`, `/webwinkel` | `/scholing/workshops` |
| `/nieuwsbrief` | `/contact` |
| `/login` | `/mijnnkgc/inloggen` |
| `/contact/telefonisch / e-mail`, `/contact/formulier`, `/contact.php` | `/contact` |

Geen enkele `destination` in deze tabel is ook een `source` — dus geen
redirectketens (301 → 301 → uiteindelijke pagina), conform de eis in de
opdracht.

## Technische SEO-implementatie

| Eis | Implementatie |
|---|---|
| Canonical URLs | `buildAlternates()` in `src/lib/seo.ts`, per pagina toegepast via `generateMetadata` |
| hreflang (`nl-NL`, `en`) | Zelfde functie, gebruikt `getPathname()` van next-intl zodat de canonical/alternate URL's altijd overeenkomen met de daadwerkelijke localized route |
| XML-sitemap (beide talen) | `src/app/sitemap.ts` — itereert over alle `routing.pathnames`-keys en genereert NL+EN-alternates per URL |
| robots.txt | `src/app/robots.ts` — disallow op `/mijnnkgc` en `/api` |
| noindex op MijnNKGC | `metadata.robots = { index: false, follow: false }` in elke `src/app/mijnnkgc/**/page.tsx` |
| Organization/VeterinaryCare structured data | JSON-LD op de homepage (`src/app/[locale]/page.tsx`) |
| BreadcrumbList structured data | `src/components/ui/Breadcrumbs.tsx`, gebruikt op elke binnenpagina |
| Eén H1 per pagina | Elke pagina heeft precies één `<h1>` (hero-titel of `PageHero`) |
| Aangepaste 404 | `src/app/[locale]/not-found.tsx` |
| Unieke titles/descriptions per taal | Elke `page.tsx` haalt title/description uit de locale-specifieke messages via `generateMetadata` |

## Wat nog moet gebeuren vóór livegang

- De volledige URL-lijst hierboven is gebaseerd op `sitemap.xml`; er kunnen
  oudere, niet meer in de sitemap opgenomen URL's bestaan die elders nog
  geïndexeerd staan (bv. via Google Search Console-exports die NKGC apart
  zou moeten aanleveren).
- `NEXT_PUBLIC_SITE_URL` moet in productie daadwerkelijk op
  `https://www.nkgc.nl` staan (zie `.env.example`) — dit bepaalt de
  canonical/sitemap-domeinnaam.
