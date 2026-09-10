/**
 * Team/eigenaren. Shape mirrort een toekomstig CMS "teamlid"-contenttype
 * (zie docs/CONTENT_STRUCTURE.md), zodat migratie naar een CMS mechanisch is.
 *
 * `verified: false` betekent: functie/rol-informatie is afkomstig van de
 * bestaande website en moet door NKGC worden bevestigd voordat dit als
 * actuele feiten wordt gepresenteerd (zie instructie in de projectbrief).
 * Geen foto's beschikbaar in de assets — `photo: null` totdat NKGC deze levert.
 */
export interface TeamMember {
  slug: string;
  name: string;
  role: { nl: string; en: string };
  bio: { nl: string; en: string };
  photo: string | null;
  verified: boolean;
}

export const teamMembers: TeamMember[] = [
  {
    slug: "marcel-drint",
    name: "Marcel Drint",
    role: {
      nl: "Rundveedierenarts, Wellensiek Dierenartsen — medeoprichter NKGC",
      en: "Cattle veterinarian, Wellensiek Dierenartsen — NKGC co-founder",
    },
    bio: {
      nl: "Marcel Drint studeerde in 1999 af als dierenarts en werkte daarna als algemeen practicus in de Betuwe. Hij bracht een jaar door op melkveebedrijven in Nieuw-Zeeland en is sinds augustus 2004 werkzaam als erkend rundveedierenarts in Nijkerk, met een focus op koe-gericht management, huisvesting en klauwgezondheid.",
      en: "Marcel Drint graduated as a veterinarian in 1999 and subsequently worked as a general practitioner in the Betuwe region. He spent a year on dairy farms in New Zealand and has worked as a recognised cattle veterinarian in Nijkerk since August 2004, focusing on cow-oriented management, housing and hoof health.",
    },
    photo: null,
    verified: false,
  },
  {
    slug: "gerben-meerema",
    name: "Gerben Meerema",
    role: {
      nl: "Rundveedierenarts, DAP West-Betuwe — medeoprichter NKGC",
      en: "Cattle veterinarian, DAP West-Betuwe — NKGC co-founder",
    },
    bio: {
      nl: "Gerben Meerema is rundveedierenarts bij DAP West-Betuwe in Meteren. Hij is ervan overtuigd dat specialisatie nodig is om echte stappen vooruit te zetten, en richt zich op koppelbehandeling, het analyseren van bedrijfssituaties en het implementeren van oplossingen.",
      en: "Gerben Meerema is a cattle veterinarian at DAP West-Betuwe in Meteren. He believes specialisation is necessary to make real progress, and focuses on herd treatment, analysing farm situations and implementing solutions.",
    },
    photo: null,
    verified: false,
  },
  {
    slug: "jan-lievaart",
    name: "Jan Lievaart",
    role: {
      nl: "Verbonden aan DairySkills en Charles Sturt University — medeoprichter NKGC",
      en: "Affiliated with DairySkills and Charles Sturt University — NKGC co-founder",
    },
    bio: {
      nl: "Jan Lievaart volgde de agrarische hogeschool in Dronten en studeerde in 2000 af als dierenarts aan de faculteit in Utrecht. Hij werkte in een praktijk in Tubbergen, was faculteitsdierenarts (2002–2007) en werkte als veterinair epidemioloog aan de Charles Sturt University in Australië (2007–2011). Momenteel voert hij onderzoeksprojecten uit, geeft hij lezingen en is hij adjunct senior lecturer in de veterinaire epidemiologie.",
      en: "Jan Lievaart studied at the agricultural college in Dronten and graduated as a veterinarian from the Utrecht faculty in 2000. He worked in a practice in Tubbergen, was a faculty veterinarian (2002–2007) and worked as a veterinary epidemiologist at Charles Sturt University in Australia (2007–2011). He currently conducts research projects, gives lectures, and serves as an adjunct senior lecturer in veterinary epidemiology.",
    },
    photo: null,
    verified: false,
  },
];
