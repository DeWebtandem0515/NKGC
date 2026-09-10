# NKGC-website — projectoverzicht

## Wat dit is

Een volledig nieuwe, tweetalige (NL/EN) website voor het Nederlands Klauw
Gezondheids Centrum, gebouwd met Next.js (App Router), TypeScript, Tailwind
CSS en next-intl. Doel: dezelfde organisatie professioneler presenteren, niet
een ander bedrijf van maken (zie de oorspronkelijke opdracht voor de volledige
specificatie).

## Uitgangssituatie (analysefase)

Bij start van dit project bevatte de map alleen:

- `logo.png`, `favicon.png` — de enige beschikbare beeldmerken
- `belangrijke info over NKGC.pdf` — een analyse van de bestaande site en van
  MijnNKGC (zie hieronder)

Er was **geen bestaande code, geen git-repository en geen echte
NKGC-fotografie** aanwezig. Deze zijn verplaatst naar `/original-assets`.

De huidige productiesite (`https://www.nkgc.nl`) is gecrawld voor content,
navigatie en URL-structuur; zie `CONTENT_STRUCTURE.md` en `SEO_MIGRATION.md`
voor de resultaten.

### Belangrijkste bevinding: MijnNKGC is een extern systeem

Het bijgeleverde PDF-document legt uit dat MijnNKGC vermoedelijk draait op
een bestaand systeem, gebouwd door GMWconsult (PHP/Laravel/Livewire/Vue) voor
data-entry, analyse en rapportage tijdens klauwbekapbezoeken. Er was **geen
API-documentatie, geen databaseschema en geen inlogtoegang** beschikbaar in
dit project. Conform de opdracht is er daarom geen nieuw backend-systeem
verzonnen — zie `MIJNNKGC_INTEGRATION.md` voor de gekozen aanpak en de open
vragen voor NKGC/GMWconsult.

### Ontbrekende fotografie

Er is geen daadwerkelijke NKGC-fotografie in dit project aangeleverd. In
plaats van stockfoto's te tonen alsof het NKGC-fotografie is, gebruikt de
site een eerlijke, herkenbare placeholder-component (`PhotoPlaceholder`) die
per foto aangeeft wélke foto NKGC hier moet aanleveren. Zodra echte foto's
beschikbaar zijn, vervangt `<Media src="...">` de placeholder zonder dat de
layout verandert (vaste aspect-ratio's voorkomen layout shift).

## Technische stack

| Onderdeel | Keuze | Waarom |
|---|---|---|
| Framework | Next.js 16 (App Router) | Server components, ingebouwde image/SEO-tooling, actief onderhouden |
| Taal | TypeScript (strict) | Type-veiligheid, minder runtime-fouten |
| Styling | Tailwind CSS + centraal design system | Consistentie zonder ad-hoc classes, zie `DESIGN_SYSTEM.md` |
| i18n | next-intl | Volwassen App Router-ondersteuning, locale-aware routing/pathnames |
| Formulieren | React Hook Form + Zod | Gedeelde client/server-validatie |
| CMS | Bewust (nog) geen CMS | Zie toelichting hieronder |

### Waarom (nog) geen CMS

De opdracht vraagt om een gemotiveerde keuze. Sanity of Payload zijn
serieuze opties zodra NKGC zelf regelmatig workshops, vacatures of
teamleden wil bijwerken. Op dit moment is er:

- geen hostingbeslissing genomen namens NKGC,
- geen aangeleverde content voor onderzoek/partners (die pagina's zijn nu
  bewust leeg in plaats van gevuld met verzonnen content),
- geen bevestiging dat NKGC dit zelf wil beheren versus via de developer.

In plaats daarvan staat alle structurele content in `src/content/*.ts`:
typed data-modules die **exact dezelfde vorm** hebben als de voorgestelde
CMS-contenttypes in `CONTENT_STRUCTURE.md`. Een latere migratie naar Sanity
of Payload is daardoor grotendeels mechanisch (schema overnemen, data
overzetten) in plaats van een herontwerp. Zie `CONTENT_STRUCTURE.md` voor de
aanbeveling en afwegingen.

## Mappenstructuur (belangrijkste delen)

```
src/
  app/
    [locale]/           publieke, tweetalige site (NL zonder prefix, EN /en/...)
    mijnnkgc/            los NL-only klantportaal (geen i18n, noindex)
    api/contact/         contactformulier-endpoint
    sitemap.ts robots.ts
  components/
    layout/              Header, MobileNav, Footer, LanguageSwitcher
    sections/            homepage-secties (Hero, ProcessSteps, ...)
    ui/                  designsysteem-primitieven (Button-classes, Media, ...)
    forms/                ContactForm
    mijnnkgc/             LoginForm
  content/               typed content "as code" (team, workshops, research, ...)
  i18n/                  next-intl routing + request config
  lib/
    mijnnkgc/             integratielaag richting het bestaande NKGC-systeem
    validation/           gedeelde Zod-schema's
    seo.ts redirects (redirects.config.mjs op repo-root)
  messages/              nl.json / en.json (alle UI- en paginateksten)
original-assets/         onbewerkte bronbestanden (logo, favicon, infodocument)
docs/                    deze documentatie
```

## Fasering — wat is gedaan, wat staat open

Zie de "Definition of Done" in de oorspronkelijke opdracht. Kort:

**Gedaan:** informatiearchitectuur, design system, homepage, alle
dienstenpagina's, scholing, kennis & onderzoek (structuur, geen verzonnen
content), over NKGC, contact (werkend formulier), MijnNKGC-frontend met
integratieabstractie, NL/EN met correcte hreflang/sitemap, 301-redirects van
oude URL's, security-basis (zie `SECURITY.md`), accessibility-basis.

**Staat open / vereist input van NKGC:**
- Echte fotografie (op dit moment placeholders)
- Praktijkonderzoek- en partnerscontent (bewust leeg, geen verzonnen data)
- Teaminformatie geverifieerd door NKGC (nu overgenomen van de oude site)
- Antwoorden op de MijnNKGC-integratievragen (`MIJNNKGC_INTEGRATION.md`)
- E-mailprovider-koployment voor het contactformulier (`.env.example`)
- Eventuele CMS-keuze zodra bovenstaande content beschikbaar is
