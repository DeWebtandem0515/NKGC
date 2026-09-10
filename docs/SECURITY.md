# Security

## Scope

Twee delen met een verschillend risicoprofiel (zie ook `PROJECT_OVERVIEW.md`):

1. **Publieke website** — informatief, laag risico, standaard webhygiëne.
2. **MijnNKGC** — beveiligd klantportaal met bedrijfsrapportages. Hoger
   risico, behandeld met dezelfde zorgvuldigheid als een echt klantportaal,
   ook al draait het nu op development-fixtures (zie
   `MIJNNKGC_INTEGRATION.md`).

## Dependency-beveiliging

Bij aanvang stonden in een eerste `npm install` 13 kwetsbaarheden
(waaronder een **kritieke** Next.js-kwetsbaarheid: DoS via Server Actions,
plus meerdere cache-poisoning/SSRF-advisories). Opgelost door te upgraden
naar gepatchte major-versies vóór verdere ontwikkeling:

- Next.js 14.2.15 → **16.3.4**
- next-intl 3.19.1 → **4.14.2**
- React/React DOM 18 → **19.2.8**
- eslint 8 → **9.39.5**, postcss → **8.5.28**, vitest → **4.1.11**

`npm audit` staat op **0 kwetsbaarheden** (geverifieerd, zie sessieverslag).
Controleer dit periodiek opnieuw (`npm audit`) — dit is een momentopname.

## MijnNKGC-specifieke maatregelen (geïmplementeerd)

| Maatregel | Waar | Toelichting |
|---|---|---|
| httpOnly cookie | `src/lib/mijnnkgc/session.ts` | Niet leesbaar via `document.cookie` / JS, dus niet stealbaar via XSS |
| Secure cookie in productie | `session.ts` (`secure: NODE_ENV === "production"`) | Alleen over HTTPS verzonden |
| SameSite=Lax | `session.ts` | Basisbescherming tegen CSRF via cross-site requests |
| Server-side ondertekende sessie (HMAC) | `session.ts` | Sessiewaarde kan niet vervalst/aangepast worden zonder `MIJNNKGC_SESSION_SECRET` — getest met een "frankenstein"-aanval in `tests/unit/mijnnkgc-session.test.ts` |
| Sessie-expiratie (30 min.) | `session.ts` | Vervaltijd zit in de ondertekende payload, niet alleen in de cookie-header |
| IDOR-bescherming | `src/lib/mijnnkgc/client.ts` (`getReportDetail`) | Elk rapport wordt alleen teruggegeven als het bij `session.companyId` hoort — geen enkele route vertrouwt een ID uit de URL zonder deze check. Getest in `tests/e2e/mijnnkgc.spec.ts` |
| Server-side autorisatie | `dashboard/page.tsx`, `rapporten/[id]/page.tsx` | `getSession()` wordt server-side aangeroepen vóór er data wordt opgehaald — nooit client-side "verstoppen" van beveiligde content |
| Geen productiedata in de clientbundle | `client.ts` importeert `"server-only"` | Build faalt als dit bestand ooit per ongeluk in een client component wordt geïmporteerd |
| Geen mockdata die als echt kan worden aangezien | `fixtures.ts` | Elke fixture-waarde is expliciet herkenbaar als test-/ontwikkeldata ("Voorbeeldbedrijf (ontwikkelfixture)") en alleen actief buiten productie |
| noindex | elke `mijnnkgc/**/page.tsx` | Voorkomt dat inlogpagina's/dashboards in zoekresultaten verschijnen |

## Wat nog moet gebeuren zodra het échte systeem gekoppeld wordt

Dit is met opzet **niet** al gebouwd (zie `MIJNNKGC_INTEGRATION.md` voor de
volledige onderbouwing) — noteren zodat het niet vergeten wordt:

- Echte wachtwoord-hashing/verificatie (nu: alleen fixture-vergelijking)
- Rate limiting op de loginpoging zelf (nu alleen op `/api/contact`, zie
  onder) — voeg `isRateLimited()`-achtig patroon toe aan `loginAction()`
  zodra er een echte backend is om tegen te brute-forcen
  (`src/app/mijnnkgc/inloggen/actions.ts`)
- CSRF-bescherming op formulieren die niet via Next.js Server Actions lopen
  (Server Actions hebben ingebouwde bescherming; een toekomstige directe
  API-koppeling niet per se)
- Audit logging van rapporttoegang (wie bekeek welk rapport wanneer)
- Formele AVG-verwerkersovereenkomst met de partij die het achterliggende
  systeem beheert (GMWconsult of opvolger)

## Contactformulier

- **Server-side én client-side validatie** met hetzelfde Zod-schema
  (`src/lib/validation/contact-schema.ts`) — de server vertrouwt de client
  nooit blind (`src/app/api/contact/route.ts`).
- **Honeypot-veld** (`website`) i.p.v. een opdringerige CAPTCHA — conform de
  opdracht ("Geen overdreven CAPTCHA wanneer een minder storende oplossing
  mogelijk is"). Verborgen via CSS, met `tabIndex={-1}` en
  `autoComplete="off"` zodat het ook voor toetsenbordgebruikers onzichtbaar
  blijft; een ingevulde waarde laat het formulier "slagen" zonder dat er
  daadwerkelijk iets verstuurd wordt.
- **Rate limiting** per IP-adres (`src/lib/rate-limit.ts`), 5 verzoeken per
  10 minuten. **Bekende beperking:** dit is in-memory en dus per
  serverinstantie — bij meerdere gelijktijdige instanties (bv. meerdere
  serverless functies) is dit geen sluitende bescherming. Voor productie op
  schaal wordt een gedeelde store aanbevolen (bv. Upstash Redis).
- **Geen geheimen in de client-bundle**: het e-mailversturen
  (`src/lib/email.ts`) gebruikt `"server-only"` en leest de API-sleutel
  alleen uit server-side environment variables.
- **Geen gevoelige data in logs**: bij een mislukte verzending wordt alleen
  gelogd _dat_ het misging, nooit de inhoud van het bericht of
  persoonsgegevens (`route.ts`).

## Environment variables

Zie `.env.example`. Nooit echte secrets in de repository of README.
`MIJNNKGC_USE_DEV_FIXTURES` mag nooit op `"1"` staan in een productie-
omgeving — dit wordt bovendien hard afgedwongen in code (`NODE_ENV`-check),
niet alleen via documentatie.

## Accessibility als onderdeel van "veilig" gebruik

Niet strikt security, maar wel opgenomen omdat het in dezelfde reviewronde
hoort: focus-states (`:focus-visible` in `globals.css`), een skip-link,
semantische landmarks, labels bij elk formulierveld, en
`prefers-reduced-motion`-ondersteuning. Zie `TESTING.md` voor hoe dit
gecontroleerd is.
