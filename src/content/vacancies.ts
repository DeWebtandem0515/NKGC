/**
 * Vacatures. Op de huidige site staat één actieve vacature (klauwverzorger),
 * die extern via Wellensiek Dierenartsen wordt afgehandeld. `active: false`
 * laat de hele vacaturesectie op de homepage verdwijnen (zie sectie 14 van
 * de projectbrief) — dat is de schakelaar die NKGC later zelf omzet.
 */
import { homeImages } from "./media";

export interface Vacancy {
  slug: string;
  active: boolean;
  title: { nl: string; en: string };
  intro: { nl: string; en: string };
  image: string | null;
  imageAlt?: string;
  externalUrl: string;
}

export const vacancies: Vacancy[] = [
  {
    slug: "klauwverzorger",
    active: true,
    title: { nl: "Klauwverzorger", en: "Hoof trimmer" },
    intro: {
      nl: "Afwisselend werk aan de klauwgezondheid van melkvee, in nauwe samenwerking met veehouders op het gebied van voeding, stalinrichting en management.",
      en: "Varied work on the hoof health of dairy cattle, working closely with farmers on nutrition, barn layout and management.",
    },
    image: homeImages.vacancy,
    imageAlt: "Digitale registratie tijdens een koppelbehandeling",
    externalUrl: "https://wellensiek.nl/nkgc-klauwverzorger/",
  },
];
