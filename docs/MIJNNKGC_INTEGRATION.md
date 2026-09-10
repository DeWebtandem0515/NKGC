# MijnNKGC-integratie

## Het belangrijkste feit eerst

**MijnNKGC is hoogstwaarschijnlijk geen nieuw te bouwen systeem.** Uit het
bijgeleverde document (`original-assets/belangrijke info over NKGC.pdf`)
blijkt dat een externe partij, GMWconsult, voor NKGC een data-entry-,
analyse- en rapportagesysteem heeft gebouwd (stack: PHP, Laravel, Livewire,
Vue) waarmee tijdens klauwbekapbezoeken bevindingen worden geregistreerd en
waaruit automatisch rapportages worden gegenereerd die de veehouder via
MijnNKGC bekijkt/downloadt.

Er was in dit project **geen toegang tot, documentatie van, of bevestiging
over** dat systeem beschikbaar. Conform de expliciete instructie in de
opdracht ("BOUW NIET ZOMAAR EEN VOLLEDIG NIEUW BACKEND OF NIEUWE DATABASE
VOOR MIJNNKGC") is er dus **geen nieuw backend-systeem, databaseschema of
API gebouwd of verzonnen.**

## Wat er wél is gebouwd

Een volledige, werkende **frontend + integratieabstractie**:

```
src/lib/mijnnkgc/
  types.ts       — datamodellen, expliciet gemarkeerd als NIET geverifieerd
  client.ts       — de ENIGE plek die met "het systeem" praat
  session.ts      — ondertekende, httpOnly sessie-cookie (30 min. vervaltijd)
  fixtures.ts     — expliciet gelabelde development-only mockdata
```

`client.ts` exporteert `login()`, `logout()`, `getSession()`,
`listReports()`, `getReportDetail()`. **Alle** UI (loginpagina, dashboard,
rapportpagina) praat uitsluitend met deze functies — nooit direct met een
database, cookie-waarde of externe URL. Wanneer de echte koppeling er komt,
verandert alleen dit ene bestand; de rest van de applicatie blijft ongewijzigd.

### Development-fixtures (nooit productie)

Met `MIJNNKGC_USE_DEV_FIXTURES=1` (alleen actief wanneer
`NODE_ENV !== "production"`, zie `client.ts`) werkt de hele flow end-to-end
tegen overduidelijk gelabelde nepdata: gebruikersnaam `demo`, wachtwoord
`demo1234`, drie voorbeeldrapportages met tekst als "Dit is een
ontwikkelfixture." Dit bewijst dat de architectuur werkt (login → sessie →
autorisatie → rapportlijst → rapportdetail → logout), zonder ook maar één
verzonnen gegeven als echte NKGC-data te presenteren.

**Bewust nog niet gebouwd: PDF-download.** `MijnNkgcReportSummary.pdfAvailable`
staat al in het datamodel, maar het dashboard rendert er (nog) geen
downloadlink voor — er is geen bestaand systeem gekoppeld dat daadwerkelijk
PDF-bytes kan leveren, en een link naar een niet-bestaande route zou een
kapotte knop in productie betekenen. Zodra vraag 7 hieronder ("zijn
rapportages PDF-bestanden, of dynamisch opgebouwde content?") beantwoord is,
is dit een kwestie van één route toevoegen aan `client.ts` plus een link in
`src/app/mijnnkgc/dashboard/page.tsx`.

**Belangrijk:** deze fixture-modus kan per definitie niet per ongeluk in
productie draaien (harde `NODE_ENV`-check in `fixturesEnabled()`), en als
hij niet expliciet is aangezet, gooit elke functie een
`MijnNkgcNotConfiguredError` — de UI toont dan een nette melding
("MijnNKGC is nog niet gekoppeld...") in plaats van te doen alsof het werkt.

## Wat NIET is verzonnen

- Geen API-endpoints of URL's van een echt systeem
- Geen databaseschema (gebruikers, bedrijven, rapporten, klauwaandoeningen)
- Geen authenticatie-/wachtwoord-hashingmechanisme voor een echt systeem
- Geen gebruikersrollen buiten "bedrijf logt in en ziet eigen rapportages"
- Geen dashboardstatistieken, percentages, trends of scores — het dashboard
  toont uitsluitend "laatste rapportage" en een lijst van rapportages, zoals
  de bestaande loginpagina belooft ("uw persoonlijke verslagen bekijken of
  downloaden"), niets meer

## Beveiligingspatroon dat al staat, klaar voor de echte koppeling

- **IDOR-bescherming**: `getReportDetail(session, reportId)` geeft een
  rapport alléén terug als het bij `session.companyId` hoort. Zie
  `tests/unit/mijnnkgc-session.test.ts` en
  `tests/e2e/mijnnkgc.spec.ts` voor tests die expliciet proberen dit te
  omzeilen.
- **Sessie**: httpOnly, secure (in productie), `SameSite=Lax`,
  server-side HMAC-ondertekend, 30 minuten vervaltijd (`session.ts`).
- **Geen productiedata in de client-bundle**: alle MijnNKGC-logica draait
  server-side (`"server-only"`-import in `client.ts`).

Zie `SECURITY.md` voor het volledige overzicht.

## Openstaande integratievragen voor NKGC / GMWconsult

Dit zijn de vragen uit de brontekst-analyse, ongewijzigd overgenomen omdat
ze exact bepalen hoeveel werk "fase 9" (echte koppeling) wordt:

1. Is het systeem dat gekoppeld moet worden inderdaad het bestaande
   GMWconsult-systeem?
2. Wie beheert het systeem nu, en is GMWconsult daar nog verantwoordelijk voor?
3. Is er API-documentatie? Kunnen gebruikers- en rapportgegevens via een API
   worden opgehaald?
4. Zijn rapportages PDF-bestanden, of dynamisch opgebouwde content?
5. Welke database/opslag wordt gebruikt, en waar staat deze gehost?
6. Kunnen bestaande gebruikersaccounts en wachtwoorden (hashes) worden
   overgenomen, of is een migratie-/resetflow nodig?
7. Welke gebruikersrollen bestaan er (alleen veehouders, of ook medewerkers
   / klauwverzorgers die zelf data invoeren)?
8. Wie mag welk bedrijf en welke dieren zien (autorisatiemodel)?
9. Welke velden staan exact in een rapport?
10. Moeten historische rapportages gemigreerd worden, en zo ja, hoeveel?

## Aanbevolen vervolgpad

Optie **B** uit de brontekst-analyse — een nieuwe frontend/dashboard bovenop
het bestaande systeem via een API — heeft de voorkeur zodra bovenstaande
vragen beantwoord zijn: dan hoeft de veterinaire logica, rapportgenerator en
historische database niet opnieuw gebouwd te worden. Optie C (alles
opnieuw bouwen) is nadrukkelijk **niet** de default keuze en zou een
expliciete, aparte beslissing van NKGC vereisen.
