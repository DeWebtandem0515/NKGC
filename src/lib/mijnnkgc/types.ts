/**
 * Typen voor de MijnNKGC-integratielaag.
 *
 * BELANGRIJK: deze shapes zijn NIET gebaseerd op een bekend databaseschema.
 * Ze zijn afgeleid van wat de bestaande inlogpagina (nkgc.nl/login/) belooft
 * ("uw persoonlijke verslagen bekijken of downloaden") en van het feit dat
 * NKGC een data-entry/analyse/rapportagesysteem laat bouwen door een externe
 * partij (zie docs/MIJNNKGC_INTEGRATION.md voor de volledige onderbouwing en
 * de open vragen die nog met NKGC afgestemd moeten worden).
 *
 * Voeg hier geen velden toe die "handig lijken" — elk veld hieronder moet
 * herleidbaar zijn tot iets dat de bestaande site daadwerkelijk toont.
 */

export interface MijnNkgcSession {
  companyId: string;
  companyName: string;
}

export type ReportType = "koppelbehandeling" | "advies" | "overig";

export interface MijnNkgcReportSummary {
  id: string;
  date: string; // ISO 8601
  type: ReportType;
  pdfAvailable: boolean;
}

export interface MijnNkgcReportDetail extends MijnNkgcReportSummary {
  // Vrije inhoud van het rapport is nog onbekend; als platte tekst/HTML
  // totdat het bestaande systeem een structuur oplevert.
  content: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export class MijnNkgcNotConfiguredError extends Error {
  constructor() {
    super(
      "MijnNKGC-integratie is nog niet geconfigureerd. Zie docs/MIJNNKGC_INTEGRATION.md."
    );
    this.name = "MijnNkgcNotConfiguredError";
  }
}

export class MijnNkgcAuthError extends Error {
  constructor(message = "Ongeldige inloggegevens.") {
    super(message);
    this.name = "MijnNkgcAuthError";
  }
}
