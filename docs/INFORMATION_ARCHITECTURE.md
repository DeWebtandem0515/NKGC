# Informatiearchitectuur

## Sitemap (NL — canonieke paden, geen locale-prefix)

```
/                                          Home
/diensten                                  Diensten (overzicht)
/diensten/koppelbehandeling
/diensten/klauwgezondheid-melkvee
/diensten/klauwgezondheid-jongvee
/diensten/advies-begeleiding
/scholing                                  Scholing (overzicht)
/scholing/lezingen
/scholing/workshops
/kennis-onderzoek                          Kennis & onderzoek (overzicht)
/kennis-onderzoek/praktijkonderzoek
/over-nkgc                                 Over NKGC (overzicht + missie + geschiedenis)
/over-nkgc/team
/over-nkgc/partners
/contact
/privacy
/cookies
/voorwaarden

/mijnnkgc/inloggen                         los NL-only portaal, noindex
/mijnnkgc/dashboard
/mijnnkgc/rapporten/[id]
/mijnnkgc/wachtwoord-vergeten
```

Elke NL-route heeft een Engels equivalent onder `/en/...` met een eigen,
natuurlijk Engels pad (geen automatische vertaling van de URL) — zie
`src/i18n/routing.ts` (`pathnames`) en `I18N.md`.

## Navigatiestructuur (header)

```
NKGC-logo
Diensten ▾
  Koppelbehandeling
  Klauwgezondheid melkvee
  Klauwgezondheid jongvee
  Advies & begeleiding
Scholing ▾
  Lezingen
  Workshops
Kennis & onderzoek ▾
  Praktijkonderzoek
Over NKGC ▾
  Over het centrum
  Team / eigenaren
  Partners
Contact
NL | EN                    [ MijnNKGC ]
```

Dit vereenvoudigt de bestaande navigatie, die "Lezingen / Workshops / Advies"
als één ongelijksoortige groep toonde en geneste URL's had zoals
`/lezingen-workshops/advies/`. Advies is nu een dienst; scholing bevat alleen
lezingen en workshops.

## Waarom deze indeling

- **Diensten vs. Scholing vs. Kennis & onderzoek** volgt letterlijk de drie
  pijlers uit de eigen missie van NKGC (klauwverzorging, advies/begeleiding,
  scholing), aangevuld met een aparte kennis-tak voor praktijkonderzoek —
  precies de positionering die de opdracht benadrukt: "niet zomaar een
  klauwbekapbedrijf".
- **Eén niveau dieper, nooit meer.** De oude site had URL's die 3+ segmenten
  diep genest waren. Hier is de diepste route 2 segmenten (`/diensten/...`).
- **MijnNKGC buiten de talenstructuur.** Het is het bestaande, Nederlandse
  klantportaal — geen marketingpagina die vertaald hoeft te worden (zie
  `MIJNNKGC_INTEGRATION.md`).

## Bronmapping (oud → nieuw)

Zie `SEO_MIGRATION.md` voor de volledige, technische 301-redirectmap.
