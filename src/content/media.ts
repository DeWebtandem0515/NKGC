/**
 * Centrale plek voor de daadwerkelijk aangeleverde NKGC-fotografie
 * (aangeleverd door de klant, zie public/images/). Eén bron van waarheid
 * i.p.v. paden verspreid over componenten — en de plek om uit te breiden
 * zodra er meer foto's beschikbaar komen voor de resterende placeholders.
 */
export const homeImages = {
  hero: "/images/hero-koppelbehandeling.png",
  pillarHerdCare: "/images/pillar-klauwverzorging.png",
  pillarAdvice: "/images/pillar-advies.png",
  pillarEducation: "/images/pillar-scholing.png",
  practiceResearch: "/images/praktijk-kennis.png",
  videoThumbnail: "/images/video-thumbnail.png",
  workshop: "/images/workshop.png",
  vacancy: "/images/vacature.png",
} as const;
