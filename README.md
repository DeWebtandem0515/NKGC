# NKGC — website

Nieuwe, tweetalige (NL/EN) website voor het Nederlands Klauw Gezondheids
Centrum. Zie `/docs` voor de volledige projectdocumentatie:

- [`docs/PROJECT_OVERVIEW.md`](docs/PROJECT_OVERVIEW.md) — context, stack, wat wel/niet is gebouwd
- [`docs/INFORMATION_ARCHITECTURE.md`](docs/INFORMATION_ARCHITECTURE.md) — sitemap en navigatie
- [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) — kleuren, typografie, componenten
- [`docs/CONTENT_STRUCTURE.md`](docs/CONTENT_STRUCTURE.md) — waar content vandaan komt en waar die leeft
- [`docs/I18N.md`](docs/I18N.md) — NL/EN-opzet, te verifiëren vakterminologie
- [`docs/MIJNNKGC_INTEGRATION.md`](docs/MIJNNKGC_INTEGRATION.md) — **lees dit voor je aan MijnNKGC werkt**
- [`docs/SEO_MIGRATION.md`](docs/SEO_MIGRATION.md) — redirectmap, hreflang, sitemap
- [`docs/SECURITY.md`](docs/SECURITY.md) — beveiligingsmaatregelen en open punten
- [`docs/TESTING.md`](docs/TESTING.md) — hoe en wat er getest is

## Snel starten

```bash
npm install
cp .env.example .env.local   # vul minimaal MIJNNKGC_SESSION_SECRET in
npm run dev
```

Open <http://localhost:3000>.

Om de MijnNKGC-inlogflow lokaal te proberen (development-fixtures, zie
`docs/MIJNNKGC_INTEGRATION.md`), zet in `.env.local`:

```
MIJNNKGC_USE_DEV_FIXTURES=1
MIJNNKGC_SESSION_SECRET=een-lokale-test-waarde
```

en log in op `/mijnnkgc/inloggen` met gebruikersnaam `demo` en wachtwoord
`demo1234`.

## Scripts

| Commando | Doet |
|---|---|
| `npm run dev` | Development-server (Turbopack) |
| `npm run build` | Productiebuild |
| `npm run start` | Start de productiebuild |
| `npm run lint` | ESLint (flat config, `eslint-config-next`) |
| `npm run typecheck` | TypeScript, strict, geen `emit` |
| `npm run test` | Vitest unit-tests |
| `npm run test:e2e` | Playwright end-to-end tests (start de dev-server automatisch) |

## Environment variables

Zie `.env.example` voor de volledige lijst met toelichting. Belangrijkste
categorieën:

- **Publiek**: `NEXT_PUBLIC_SITE_URL` (canonical/sitemap-domein)
- **Contactformulier**: `CONTACT_FORM_TO_EMAIL`, `CONTACT_FORM_FROM_EMAIL`,
  `EMAIL_PROVIDER_API_KEY` (Resend HTTP API, zie `src/lib/email.ts`)
- **MijnNKGC**: `MIJNNKGC_SESSION_SECRET` (verplicht, ook in development),
  `MIJNNKGC_USE_DEV_FIXTURES` (nooit `"1"` in productie — wordt ook
  hard afgedwongen in code)

Nooit echte secrets committen. `.env.local` staat in `.gitignore`.

## CMS

Er is bewust (nog) geen CMS gekoppeld — content staat typed in
`src/content/*.ts`, in een vorm die direct migreerbaar is naar Sanity of
Payload zodra daar behoefte aan is. Zie `docs/CONTENT_STRUCTURE.md` voor de
volledige motivatie.

## MijnNKGC — belangrijkste openstaande afhankelijkheid

De grootste onbekende in dit project is **niet** de publieke website, maar
de koppeling met het bestaande NKGC-klantportaal (vermoedelijk een systeem
van GMWconsult). Er is een volledig werkende frontend gebouwd plus een
duidelijk afgebakende integratielaag (`src/lib/mijnnkgc/`), maar géén nieuw
backend-systeem verzonnen. **Lees `docs/MIJNNKGC_INTEGRATION.md` voordat je
hieraan verder bouwt** — daar staat exact welke vragen eerst beantwoord
moeten worden door NKGC/GMWconsult.

## Deployment

Geen platform-specifieke configuratie is hier vastgelegd (bv. Vercel-project-
instellingen) — dit is een keuze die bij NKGC of de beherende partij hoort.
De applicatie is een standaard Next.js App Router-project en draait op elk
platform dat Node.js/Next.js server-side rendering ondersteunt. Zorg bij
deployment in ieder geval voor:

- alle environment variables uit `.env.example` correct ingevuld;
- `MIJNNKGC_USE_DEV_FIXTURES` **niet** gezet (of expliciet `0`/leeg);
- HTTPS afgedwongen (nodig voor secure cookies, zie `docs/SECURITY.md`).
