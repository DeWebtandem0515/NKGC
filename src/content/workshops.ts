/**
 * Workshops/lezingen met een datum. De bestaande site toont geen actuele
 * geplande workshops (verwijst naar een webwinkel voor inschrijving) — er
 * worden hier dus geen verzonnen data/locaties toegevoegd. Zodra NKGC
 * actuele workshops aanlevert, worden ze als item in deze array gezet en
 * verschijnt de workshoplijst automatisch i.p.v. de lege-staat CTA.
 */
export interface Workshop {
  slug: string;
  title: { nl: string; en: string };
  description: { nl: string; en: string };
  date: string; // ISO 8601
  location: string;
  image: string | null;
  registrationUrl: string | null;
  active: boolean;
}

export const workshops: Workshop[] = [];
