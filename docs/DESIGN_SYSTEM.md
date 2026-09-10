# Design system

## Uitgangspunt

Geen rebranding. De bestaande NKGC-identiteit (logo, groen, blauw) is het
uitgangspunt; dit document beschrijft hoe die digitaal gemoderniseerd is met
meer witruimte, rustigere toepassing van kleur en een leesbare typografie —
niet hoe die vervangen is.

## Redesign-pass: van "nette template" naar editorial art direction

Na de eerste bouwronde is de homepage (en de gedeelde componenten die
overal worden hergebruikt) onderworpen aan een gerichte visuele
redesign-pass, met als doel weg te bewegen van herkenbare AI/SaaS-
templatepatronen (drie identieke cards, tekst-links/foto-rechts,
pil-vormige knoppen, kleine eyebrow-labels boven bijna elke kop) richting
een "premium editorial agriculture meets veterinary expertise"-uitstraling.
Dat raakte drie dingen:

1. **Compositie** — nieuwe primitieven (`EditorialSplit`, `BrandStatement`,
   de herbouwde `ProcessSteps`) vervangen symmetrische grids door
   overlappende beeld/tekst-composities en een gestaffeld stappenproces.
2. **Kleur** — een rijkere, diepere navy (zie tabel hieronder) en warmere
   off-white, met groen nadrukkelijker als spaarzaam accent.
3. **Fotoplaceholders** — zie de sectie hieronder; deze zijn herzien van
   een technisch ogend label naar een geloofwaardige fototint.

Dit is bewust **alleen een visuele pas** geweest: routes, i18n, MijnNKGC-
logica, formulieren, SEO en de bestaande testsuite zijn ongewijzigd
gebleven (de tests zijn alleen aangepast waar ze een tekst/structuur
verwachtten die met opzet is herschreven, zie `docs/TESTING.md`).

## Kleuren — gemeten uit de originele assets, met een premium navy-variant

De basiskleuren zijn **niet** gekozen op gevoel, maar gesampled uit de
daadwerkelijke pixels van `original-assets/logo.png` en
`original-assets/favicon.png` (dominante kleur per gebied, gemeten met
Pillow).

| Token | HEX | Bron | Gebruik |
|---|---|---|---|
| `nkgc-green-500` (= `DEFAULT`) | `#76B404` | logo, klauwsymbool | lichte accenten, iconkleur op donkere achtergrond |
| `nkgc-green-700` | `#517C03` (afgeleid) | — | knoppen/CTA-tekst — zie contrastnoot hieronder |
| `nkgc-blue-600` | `#04539D` | logo, woordmerk-tekst | primaire merkblauw, linkkleur |
| `nkgc-blue-900` | `#082B49` (afgeleid, verrijkt) | — | grote donkere vlakken: hero, MijnNKGC-banner, CTA-band, dienstenpagina-hero's |
| `nkgc-blue-950` | `#051B30` (afgeleid) | — | het diepste punt van de "sectiereis": footer, video-band |
| `nkgc-sky` | `#2977E6` | favicon-achtergrond | secundair, spaarzaam gebruikt |
| `nkgc-sand-50/100/200` | `#F7F6F2` / `#F1EEE6` / `#E7E2D5` | — | warme off-white achtergronden |
| `nkgc-stone-600/700/800` | `#5B6570` / `#454E57` / `#333A41` | — | basis voor de fotografische placeholder-gradients (zie hieronder), niet elders gebruikt |

Volledige schaal staat in `tailwind.config.ts` onder `theme.extend.colors.nkgc`.

**Waarom een rijkere navy dan de kale meting?** De letterlijk gemeten
donkerblauwe pixels uit het logo liggen dicht bij zwart en ogen op grote
oppervlaktes eerder "onderhoudsscherm" dan "premium merk". `blue-900` is
daarom bewust verrijkt naar `#082B49` — nog steeds evident hetzelfde
blauw, alleen met meer diepte or grote vlakken. De originele, letterlijk
gemeten waarde blijft intact voor tekst/links (`blue-600`/`700`).

**Regel:** groen is een accentkleur (CTA's, bullets, actieve status), nooit
een grote achtergrondkleur. Navy draagt vertrouwen/professionaliteit op
grote vlakken. Witruimte en `nkgc-sand`-tinten dragen de lichte pagina's.
De "sectiereis" op de homepage wisselt bewust af: off-white → wit → navy →
wit → warm grijs (fotografisch) → navy (video) → wit/sand → navy (CTA) →
het diepste navy (footer) — zie `src/app/[locale]/page.tsx`.

**Contrastnoot (WCAG AA):** het gemeten logogroen (`#76B404`) haalt met
witte tekst slechts 3.36:1 contrast — onvoldoende voor de 4.5:1 die AA
vereist bij normale tekstgrootte. `.btn-primary` (`globals.css`) gebruikt
daarom bewust de diepere `green-700` (`#517C03`, 4.96:1 op wit) als
knopachtergrond. Dit is geverifieerd met een berekende contrastratio
tijdens de bouw, niet op het oog geschat. Kleine decoratieve elementen
(bullet-dots, focus-rings) gebruiken wel het lichtere groen — daarvoor
geldt de lagere 3:1-eis voor niet-tekstuele UI-componenten (WCAG 1.4.11).
`white` op het nieuwe, rijkere `blue-900` haalt 14.46:1 (ruim boven AAA).

## Typografie

**Manrope**, geladen via `next/font/google` (self-hosted, geen extern
lettertype-verzoek, geen layout shift).

Herziene schaal (groter en met meer lucht dan de eerste bouwronde, conform
de editorial art direction):

| Niveau | Mobiel | Desktop |
|---|---|---|
| H1 (hero) | 2.5rem (40px) | 4.25rem (68px) |
| H2 (sectiekop, `SectionHeading`) | 2.25rem (36px) | 3.25rem (52px) |
| Statement (`BrandStatement`, `.text-statement`) | 1.875rem (30px) | 2.75rem (44px) |
| Body | 1rem–1.125rem | 1.125rem–1.25rem |

Zie `src/components/ui/SectionHeading.tsx` en `.text-statement` in
`globals.css`.

## Spacing, radius, shadows

- `rounded-card` (0.75rem) voor kaarten en media;
- `rounded-btn` (0.625rem) voor knoppen — **geen** `rounded-full` meer: een
  pil-knop is een van de meest herkenbare AI-templatepatronen en is
  bewust losgelaten;
- `shadow-card` voor lichte kaarten, `shadow-premium` (grotere, zachtere
  schaduw) voor donkere/grote elementen zoals de videoplayer;
- sectie-padding overwegend `py-24 sm:py-32` op de homepage (was
  `py-16 sm:py-24`) voor meer ademruimte tussen de grotere composities;
- container-breedte gemaximeerd op 1280px (`.container`), met een bredere
  `max-w-site` (1600px) specifiek voor de hero.

## Componentklassen (`globals.css`)

`.btn-primary`, `.btn-secondary`, `.btn-on-dark`, `.btn-outline-on-dark`
(nieuw: transparante knop met witte rand, voor secundaire CTA's op een
foto/donkere hero) en `.skip-link`. Bewust minimaal: de meeste styling
gebeurt via Tailwind-utilities direct in components.

## Compositie-primitieven (nieuw in de redesign-pass)

| Component | Waar | Doel |
|---|---|---|
| `EditorialSplit` (`components/ui`) | 3 pijlers, praktijk/kennis, workshops (lege staat), vacature | Beeld (7/12) + tekstpaneel (5/12) dat er met een negatieve marge overheen schuift — vervangt de klassieke "tekst-links/foto-rechts"-sectie |
| `BrandStatement` (`components/sections`) | Direct na de hero | Groot typografisch statement (de missiequote), geen kaart, geen icoon-grid |
| `ProcessSteps` (herbouwd) | Homepage + koppelbehandeling-pagina | Gestaffeld editorial proces met grote, licht-getinte nummers i.p.v. vijf identieke kolommen |

Zie ook de herbouwde `Hero`, `MijnNkgcBanner`, `VideoSection`, `CtaSection`
en `Footer` — geen nieuwe primitieven, maar wel herzien qua compositie,
schaal en diepte.

**Belangrijk implementatiedetail:** elke sectie met een randbleed-motief
(het `HoofMark`-symbool met een negatieve positie, zoals `-right-16`) staat
in een element met `overflow-hidden`, én `html` heeft daarnaast
`overflow-x: clip` als vangnet. Zonder dat eerste ontstond tijdens de bouw
een echte, gemeten horizontale overflow (zie `docs/TESTING.md`) doordat een
zo'n motief buiten de sectie uitstak.

## Fotografie: geloofwaardige placeholders

Zie `src/components/ui/PhotoPlaceholder.tsx` en `Media.tsx`. Er is geen
echte NKGC-fotografie in dit project aangeleverd. De eerste versie van de
placeholder toonde een groot "Foto volgt — [beschrijving]"-label op een
donker vlak met diagonale rasterlijnen — functioneel eerlijk, maar
oogde nadrukkelijk als een technische tijdelijke oplossing, wat de
editorial art direction ondermijnde.

De herziene placeholder:

- gebruikt een **middentonige, getemperde gradient** per `tone` (blauw,
  groen, zand) die een belichte foto suggereert, niet nog meer donkere
  UI-achtergrond — dit is essentieel op een navy hero: een te donkere
  placeholder valt visueel weg tegen de sectie-achtergrond;
- heeft **geen dominant label** meer — alleen een klein, laag-contrast
  onderschrift rechtsonder ("NKGC photography"), zoals een echte
  fotocredit zou staan;
- behoudt het subtiele `HoofMark`-watermerk als grafisch detail;
- gebruikt exact dezelfde geometrie/aspect-ratio als de uiteindelijke
  echte foto zou krijgen (`aspect-video/square/portrait/wide/cover`), zodat
  vervangen door `<Media src="...">` later geen enkele layout-aanpassing
  vereist.

## Wat bewust vermeden is

Geen gradients-als-decoratie, geen blobs, geen glassmorphism, geen
overdreven scroll-animaties, geen fictieve statistiek-badges — en, na de
redesign-pass, ook geen pil-knoppen, geen drie-identieke-cards-grids en
geen kleine eyebrow-label boven vrijwel elke kop meer. Zie sectie 51 van de
oorspronkelijke projectbrief en de expliciete redesign-instructie — dit
document is de tegenhanger daarvan: wat wél is gebruikt en waarom.
