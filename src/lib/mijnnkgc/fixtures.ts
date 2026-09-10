/**
 * DEVELOPMENT FIXTURES — nooit productiedata.
 *
 * Deze data bestaat uitsluitend om de MijnNKGC-frontend (inlogscherm,
 * dashboard, rapportlijst) te kunnen bouwen en tonen vóórdat er een
 * koppeling met het bestaande NKGC-systeem is. Alle waarden zijn duidelijk
 * fictief en mogen nooit als echte klant- of gezondheidsdata worden
 * gepresenteerd. Zie docs/MIJNNKGC_INTEGRATION.md.
 */
import type { MijnNkgcReportDetail, MijnNkgcReportSummary, MijnNkgcSession } from "./types";

export const FIXTURE_SESSION: MijnNkgcSession = {
  companyId: "dev-fixture-company",
  companyName: "Voorbeeldbedrijf (ontwikkelfixture)",
};

export const FIXTURE_REPORTS: MijnNkgcReportSummary[] = [
  { id: "fixture-1", date: "2026-08-12", type: "koppelbehandeling", pdfAvailable: true },
  { id: "fixture-2", date: "2026-04-14", type: "koppelbehandeling", pdfAvailable: true },
  { id: "fixture-3", date: "2025-12-08", type: "koppelbehandeling", pdfAvailable: false },
];

export function getFixtureReportDetail(id: string): MijnNkgcReportDetail | null {
  const summary = FIXTURE_REPORTS.find((r) => r.id === id);
  if (!summary) return null;
  return {
    ...summary,
    content:
      "Dit is een ontwikkelfixture. Zodra MijnNKGC is gekoppeld aan het bestaande NKGC-systeem, verschijnt hier de daadwerkelijke rapportinhoud.",
  };
}
