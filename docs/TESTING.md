# Testen

## Overzicht

| Laag | Tool | Locatie | Wat het dekt |
|---|---|---|---|
| Unit | Vitest | `tests/unit/` | Zod-validatie, sessie-ondertekening/IDOR-logica, integriteit van de redirectmap |
| End-to-end | Playwright | `tests/e2e/` | Publieke site, i18n, contactformulier, volledige MijnNKGC-flow |
| Build | `next build` | — | TypeScript strict, productiebundel |

## Draaien

```bash
npm run test        # vitest (unit)
npm run test:e2e    # playwright (e2e, start de devserver automatisch)
npm run typecheck   # tsc --noEmit
npm run build       # production build
```

`playwright.config.ts` start de dev-server zelf (`webServer`) met
`MIJNNKGC_USE_DEV_FIXTURES=1`, zodat de MijnNKGC-tests reproduceerbaar zijn
zonder een `.env.local` te vereisen.

## Unit-tests — wat ze bewijzen

- **`contact-schema.test.ts`**: het Zod-schema accepteert geldige
  formulieren en wijst ongeldige e-mailadressen, te korte berichten,
  onbekende onderwerpen én een ingevulde honeypot af.
- **`mijnnkgc-session.test.ts`**: een sessie-cookie rondt correct, een
  gemanipuleerde handtekening wordt geweigerd, en — het belangrijkste —
  een poging om de payload van bedrijf B te combineren met de handtekening
  van bedrijf A wordt geweigerd (directe test van de IDOR-dreiging).
- **`redirects.test.ts`**: geen dubbele bronnen, geen redirectketens, en
  alle kernroutes uit de SEO-migratie zijn aanwezig.

## End-to-end tests — wat ze bewijzen

`tests/e2e/public-site.spec.ts`, `contact-form.spec.ts`, `mijnnkgc.spec.ts`
draaien tegen twee projecten: `chromium` (desktop) en `mobile-safari`
(iPhone 13-viewport, WebKit-engine — de meest realistische beschikbare
proxy voor daadwerkelijk mobiel Safari-gedrag).

Belangrijkste scenario's:

- Homepage, dienstenpagina, i18n-taalwisselaar die op dezelfde
  inhoudelijke pagina blijft.
- Mobiel hamburgermenu opent daadwerkelijk **full-screen** — dit ving in de
  praktijk een echte bug op (zie hieronder).
- Contactformulier: client-side validatiefouten, server-side afwijzing bij
  ontbrekende velden, honeypot-gedrag.
- MijnNKGC: geen toegang zonder sessie, foute inloggegevens geven een
  foutmelding, juiste (fixture-)inloggegevens geven toegang, een
  niet-bestaand/vreemd rapport-ID geeft 404 (IDOR), uitloggen schermt het
  dashboard weer af.
- SEO: sitemap bevat beide talen, oude URL's redirecten, MijnNKGC staat op
  noindex.

## Een bug die deze aanpak daadwerkelijk heeft gevonden

Tijdens het bouwen leek het mobiele menu er in screenshots goed uit te
zien, maar automatische tests op de daadwerkelijke `boundingBox()` van de
menu-dialog toonden een hoogte van **80px in plaats van de volledige
viewport**. Oorzaak: `backdrop-blur` op de `<header>` vormt een CSS
containing block voor `position: fixed`-kinderen, waardoor het menu zich
positioneerde ten opzichte van de 80px hoge header in plaats van het
scherm. Opgelost door `<MobileNav>` als sibling van `<header>` te renderen
in plaats van als kind (`src/components/layout/Header.tsx`). Dit is precies
het soort bug dat alleen in een echte browser (niet alleen visueel, ook via
DOM-metingen) aan het licht komt — vandaar de expliciete
`boundingBox()`-assertie in `public-site.spec.ts`.

## Bugs gevonden tijdens de visuele redesign-pass

De homepage is daarna onderworpen aan een gerichte visuele redesign
(zie `docs/DESIGN_SYSTEM.md`). Ook die pas ving concrete bugs op, niet
alleen esthetische verbeteringen:

- **Dubbele `<h1>`**: de eerste versie van de nieuwe `Hero` rendered een
  volledig aparte tekst/CTA-boom voor mobiel én voor desktop (verborgen via
  `lg:hidden`/`hidden lg:block`). Beide bomen staan altijd in de DOM —
  alleen zichtbaarheid wisselt via CSS — dus de pagina had twee keer
  dezelfde `<h1>`. Playwright's strict-mode locators (`page.locator("h1")`)
  vingen dit direct op met een "resolved to 2 elements"-fout. Opgelost door
  de tekst/CTA-inhoud precies één keer te renderen en alleen de
  **afbeelding** (waar echt een andere compositie nodig is tussen mobiel en
  desktop) responsief te wisselen (`src/components/sections/Hero.tsx`).
  Geverifieerd met een expliciete `h1`-telling op beide breakpoints.
- **Horizontale overflow door een randbleed-motief**: de derde,
  full-bleed pijler-sectie miste `overflow-hidden` op zijn wrapper, waardoor
  het decoratieve `HoofMark`-symbool (bewust met een negatieve positie
  net buiten de sectierand geplaatst) buiten de viewport uitstak.
  `document.documentElement.scrollWidth` lag daardoor consequent 24px boven
  `clientWidth` op alle geteste breedtes. Gevonden door bisectie (secties
  één voor één verbergen en `scrollWidth` opnieuw meten) — visuele
  screenshots alleen lieten dit niet zien. Opgelost door `overflow-hidden`
  toe te voegen aan die wrapper, plus een globale `overflow-x: clip` op
  `html` als vangnet tegen vergelijkbare sub-pixel gevallen.
- **Navigatie brak op twee regels bij 1024px**: het grotere logo en de
  breder gespatieerde hoofdletter-navigatie pasten niet meer op één regel
  op de smalste desktop-breedte. Gevonden door de header apart te
  screenshotten op 1024/1180/1280/1440px. Opgelost met een tussenliggende
  `lg:`-only compactere opmaak (kleinere letter-spacing/padding/gap) die
  vanaf `xl` weer opent naar de volle, ruimere maatvoering.

## Visuele QA (handmatig uitgevoerd tijdens de bouw)

Naast geautomatiseerde tests is de site handmatig doorlopen in een browser
op meerdere viewportbreedtes (375, 390, 768, 1024, 1280px) via Playwright-
screenshots, met controle op: afgesneden tekst, ongelukkige image-crops,
verspringende knoppen, header/footer-gedrag, en horizontale overflow. Geen
van deze problemen is aangetroffen na de mobiel-menu-fix hierboven.

## Wat nog niet is getest (en waarom)

- **Echte MijnNKGC-koppeling**: kan pas getest worden zodra er een echt
  systeem is om tegen te testen (zie `MIJNNKGC_INTEGRATION.md`).
- **Wachtwoord-vergeten-flow**: er is bewust geen geautomatiseerde reset-
  flow gebouwd zolang er geen backend is (zie dezelfde reden) — de pagina
  verwijst nu naar direct contact met NKGC.
- **E-mailverzending vanuit het contactformulier**: `sendContactEmail()`
  vereist een echte `EMAIL_PROVIDER_API_KEY`; dit is met een unit-testbare
  functiegrens gebouwd, maar niet end-to-end getest tegen een echte
  Resend-account (die dit project niet heeft).
