/**
 * Praktijkonderzoek-projecten. De bestaande /praktijkonderzoek/-pagina's op
 * nkgc.nl bevatten geen inhoudelijke tekst over concrete projecten
 * (bevestigd bij crawl). Er worden hier dus bewust GEEN fictieve
 * onderzoeksprojecten toegevoegd — zie docs/CONTENT_STRUCTURE.md.
 * Zodra NKGC titels, samenvattingen en eventuele publicaties/PDF's
 * aanlevert, worden ze als item in deze array gezet.
 */
export interface ResearchProject {
  slug: string;
  title: { nl: string; en: string };
  category: string;
  period: string;
  summary: { nl: string; en: string };
  body: { nl: string; en: string };
  image: string | null;
  pdfUrl: string | null;
  externalUrl: string | null;
}

export const researchProjects: ResearchProject[] = [];
