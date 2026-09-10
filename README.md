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

## Deployment (Netlify)

Dit project draait op **Netlify**. Netlify's Next.js-adapter is zero-config:
zodra de repo aan een Netlify-site is gekoppeld, detecteert Netlify Next.js
automatisch en regelt build/publish zelf — er is bewust **geen
`netlify.toml`** toegevoegd, want die is voor een standaardsetup niet nodig
(en overbodige configuratie kan de auto-detectie juist in de weg zitten).

Zorg bij het inrichten van de Netlify-site wél voor:

- **Build command**: `npm run build` (Netlify's default voor Next.js-projecten).
- **Environment variables** — in Netlify: Site settings → Environment
  variables. Vul alles in uit `.env.example`:
  - `NEXT_PUBLIC_SITE_URL` → het echte productiedomein;
  - `CONTACT_FORM_TO_EMAIL`, `CONTACT_FORM_FROM_EMAIL`, `EMAIL_PROVIDER_API_KEY`;
  - `MIJNNKGC_SESSION_SECRET` (verplicht, een lange willekeurige string);
  - `MIJNNKGC_USE_DEV_FIXTURES` **niet instellen** (of expliciet leeg/`0`) —
    dit mag nooit `1` zijn in productie; de code dwingt dit ook af via een
    `NODE_ENV`-check, maar zet 'm sowieso niet in Netlify's UI.
- **HTTPS** — staat standaard aan bij Netlify (gratis Let's Encrypt-certificaat
  per site/domein), nodig voor de secure cookies van MijnNKGC (zie
  `docs/SECURITY.md`).

**Belangrijke technische kanttekening — `middleware.ts`, niet `proxy.ts`:**
Next.js 16 heeft `middleware.ts` hernoemd naar `proxy.ts`. Netlify's eigen
Next.js-documentatie noemt op dit moment uitsluitend `middleware.ts`
(uitgevoerd via Edge Functions); `proxy.ts` wordt daar nergens genoemd, en
draait in Next.js 16 bovendien uitsluitend op de Node.js-runtime, niet op de
edge. Om te garanderen dat de NL/EN-routing (die op deze middleware leunt)
op Netlify werkt, gebruikt dit project bewust nog de — in Next 16 wel
gedeprecieerde, maar functioneel identieke — bestandsnaam `middleware.ts`
(zie `src/middleware.ts`). Zodra Netlify's runtime `proxy.ts` officieel
ondersteunt, kan het bestand zonder inhoudelijke wijziging hernoemd worden.
