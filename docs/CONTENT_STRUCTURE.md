# Contentstructuur

## Herkomst van de content

Alle inhoudelijke teksten op de publieke site zijn afgeleid van een crawl van
`https://www.nkgc.nl` (uitgevoerd tijdens de bouw van deze site) en van het
bijgeleverde document `original-assets/belangrijke info over NKGC.pdf`. Waar
de opdracht vraagt om spelling te corrigeren of tekst beter te structureren
is dat gedaan (bijv. de kop "Nederlands Klauw Gezondsheids Centrum" op de
oude homepage bevatte een tikfout — hier gecorrigeerd naar "Gezondheids").
Er is **geen nieuwe feitelijke inhoud verzonnen**.

## Waar content staat

| Type content | Locatie | Waarom |
|---|---|---|
| Doorlopende paginateksten, UI-labels | `src/messages/nl.json` / `en.json` | next-intl namespace per pagina, vertaald |
| Bedrijfsgegevens (adres, telefoon, e-mail) | `src/content/settings.ts` | één bron, niet 20x hardcoded (zie opdracht §41) |
| Team/oprichters | `src/content/team.ts` | array met `verified: false`-vlag |
| Partners | `src/content/partners.ts` | **leeg array** — geen content beschikbaar |
| Workshops | `src/content/workshops.ts` | **leeg array** — geen actuele workshops bekend |
| Praktijkonderzoek | `src/content/research.ts` | **leeg array** — brontekst bevatte geen projectcontent |
| Vacatures | `src/content/vacancies.ts` | 1 item (klauwverzorger), `active`-vlag stuurt zichtbaarheid |

## Fotografie — echte NKGC-foto's aangeleverd

Na de eerste bouwronde heeft NKGC acht echte actiefoto's aangeleverd (via
`public/`). Deze zijn verplaatst naar `public/images/`, hernoemd naar hun
functie, en centraal aangesloten via `src/content/media.ts` (`homeImages`) —
dezelfde plek als andere content, niet los in componenten gehardcode.
Ze vervangen de eerlijke placeholders op de homepage 1-op-1, zonder dat de
compositie (aspect-ratio's, overlap-panelen) hoefde te veranderen — precies
het doel van de placeholder-aanpak uit de redesign-pass.

| Slot | Bestand | Inhoud |
|---|---|---|
| Hero | `hero-koppelbehandeling.png` | Twee koeien in de stal, close-up |
| Pijler "Klauwverzorging" | `pillar-klauwverzorging.png` | Klauwverzorger behandelt een klauw in de KVK800-box |
| Pijler "Advies & begeleiding" | `pillar-advies.png` | Drie NKGC-medewerkers bespreken bevindingen bij het beeldscherm van de box |
| Pijler "Scholing" (full-bleed) | `pillar-scholing.png` | Overzichtsfoto van de klauwbekapruimte tijdens werkzaamheden |
| "Van praktijk naar kennis" | `praktijk-kennis.png` | Klauwverzorger aan het werk met het hydraulische systeem |
| Video-thumbnail | `video-thumbnail.png` | Close-up van een klauwbehandeling |
| Workshops (lege-staat) | `workshop.png` | Twee medewerkers onderzoeken samen een klauw |
| Vacature | `vacature.png` | De digitale registratie-laptop aangesloten op de box |

Er zijn nog geen foto's voor de subpagina's (dienstenpagina's, team,
partners) — die tonen vooralsnog nog steeds de eerlijke placeholder. Zodra
daar materiaal voor komt, geldt dezelfde aanpak: bestand in
`public/images/`, pad toevoegen aan een `content/media.ts`-achtige plek,
`src={null}` vervangen door het pad in de betreffende `Media`-aanroep.

## Bewust lege content — waarom dit geen bug is

Bij het crawlen van `/praktijkonderzoek/` en `/partners/` op de bestaande
site bleek er **geen inhoudelijke tekst** aanwezig te zijn buiten de
navigatiestructuur. De opdracht is expliciet: "Verzin absoluut geen
onderzoeksprojecten" en "Gebruik geen fictieve partners." Daarom:

- `researchProjects` en `partners` zijn lege arrays;
- de bijbehorende pagina's (`/kennis-onderzoek/praktijkonderzoek`,
  `/over-nkgc/partners`) tonen in dat geval een nette, eerlijke
  placeholder-sectie in plaats van een lege of kapotte pagina;
- zodra NKGC materiaal aanlevert, is het toevoegen van een item aan de
  array voldoende — de pagina's renderen de kaartenlay-out automatisch
  zodra er data is (zie de conditionals in beide `page.tsx`-bestanden).

Hetzelfde patroon geldt voor `workshops.ts`: de oude site verwijst voor
actuele workshops naar een webwinkel en toont geen gestructureerde,
crawlbare workshopdata. Er zijn dus geen workshops met verzonnen datums
toegevoegd.

## Teaminformatie: verificatie vereist

`src/content/team.ts` bevat de namen, functies en achtergrond van Marcel
Drint, Gerben Meerema en Jan Lievaart zoals vermeld op de bestaande site.
Elk teamlid heeft een `verified: false`-veld. Dit is een expliciete markering
(conform opdracht §23: "Controleer de actuele situatie voordat functies of
rollen als feit worden gepresenteerd") dat deze functieomschrijvingen en
rollen door NKGC bevestigd moeten worden vóór productie — mensen kunnen van
functie of praktijk zijn veranderd sinds de brontekst werd geschreven.

## CMS-aanbeveling (voor later)

Zodra bovenstaande content beschikbaar is én NKGC deze zelf periodiek wil
bijwerken (workshops, vacatures, eventueel team), is **Sanity** de
aanbevolen keuze:

- genereert een bruikbare studio-UI zonder zelf een admin-paneel te bouwen;
- content-schema's kunnen vrijwel 1-op-1 worden overgenomen van de
  TypeScript-interfaces in `src/content/*.ts` (`Workshop`, `ResearchProject`,
  `Partner`, `TeamMember`, `Vacancy` zijn al in CMS-vriendelijke vorm
  geschreven: platte velden, `{nl, en}`-paren voor vertaalbare tekst);
- hoeft niet zelf gehost te worden (belangrijk als NKGC geen eigen
  serverbeheer wil).

**Payload CMS** is het alternatief als zelf hosten (en dus volledige controle
over data-opslag) een vereiste wordt — bijvoorbeeld als MijnNKGC-achtige
gevoeligheid ook voor deze content zou gaan gelden, wat op dit moment niet
het geval is.

Voer deze migratie pas uit zodra er daadwerkelijk content is om te beheren —
een CMS toevoegen vóór er iets te bewerken valt, voegt alleen complexiteit
toe.
