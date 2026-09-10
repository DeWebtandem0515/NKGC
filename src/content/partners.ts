/**
 * Partners. De bestaande /partners/-pagina op nkgc.nl bevat geen inhoud
 * (bevestigd bij crawl, zie docs/CONTENT_STRUCTURE.md). Er zijn dus geen
 * echte partners bekend om hier te tonen — expliciet leeg houden i.p.v.
 * fictieve partners verzinnen.
 */
export interface Partner {
  slug: string;
  name: string;
  description: { nl: string; en: string };
  logo: string;
  url: string;
}

export const partners: Partner[] = [];
