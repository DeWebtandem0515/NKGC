import "server-only";
import { cookies } from "next/headers";
import {
  MijnNkgcAuthError,
  MijnNkgcNotConfiguredError,
  type LoginCredentials,
  type MijnNkgcReportDetail,
  type MijnNkgcReportSummary,
  type MijnNkgcSession,
} from "./types";
import { createSessionCookieValue, mijnNkgcCookie, verifySessionCookieValue } from "./session";
import { FIXTURE_REPORTS, FIXTURE_SESSION, getFixtureReportDetail } from "./fixtures";

/**
 * Centrale integratielaag voor MijnNKGC (services/mijnnkgc-equivalent).
 *
 * Dit bestand is de ENIGE plek waar de rest van de applicatie met "het
 * bestaande NKGC-systeem" praat. Zolang dat systeem niet gekoppeld is,
 * draait deze laag in fixture-modus (alleen buiten productie). Zodra de
 * echte API-gegevens bekend zijn (zie docs/MIJNNKGC_INTEGRATION.md),
 * wordt alleen dit bestand aangepast — components en routes blijven gelijk.
 */

function fixturesEnabled(): boolean {
  return process.env.NODE_ENV !== "production" && process.env.MIJNNKGC_USE_DEV_FIXTURES === "1";
}

export async function login(credentials: LoginCredentials): Promise<void> {
  if (!fixturesEnabled()) {
    throw new MijnNkgcNotConfiguredError();
  }

  // Ontwikkelfixture: één vast demo-account. Geen echte authenticatie.
  if (credentials.username !== "demo" || credentials.password !== "demo1234") {
    throw new MijnNkgcAuthError();
  }

  const cookieStore = await cookies();
  cookieStore.set(
    mijnNkgcCookie.name,
    createSessionCookieValue(FIXTURE_SESSION.companyId),
    mijnNkgcCookie.options
  );
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(mijnNkgcCookie.name);
}

export async function getSession(): Promise<MijnNkgcSession | null> {
  const cookieStore = await cookies();
  const companyId = verifySessionCookieValue(cookieStore.get(mijnNkgcCookie.name)?.value);
  if (!companyId) return null;

  if (fixturesEnabled() && companyId === FIXTURE_SESSION.companyId) {
    return FIXTURE_SESSION;
  }

  // Geen echte backend gekoppeld: een geverifieerde cookie zonder bekend
  // account levert nooit een sessie op.
  return null;
}

export async function listReports(
  session: MijnNkgcSession
): Promise<MijnNkgcReportSummary[]> {
  if (fixturesEnabled() && session.companyId === FIXTURE_SESSION.companyId) {
    return FIXTURE_REPORTS;
  }
  throw new MijnNkgcNotConfiguredError();
}

/**
 * Haalt één rapport op — én controleert dat het rapport bij het bedrijf van
 * de ingelogde sessie hoort. Dit is de plek waar IDOR-bescherming hoort:
 * nooit een rapport-ID vertrouwen zonder deze server-side eigendomscheck.
 */
export async function getReportDetail(
  session: MijnNkgcSession,
  reportId: string
): Promise<MijnNkgcReportDetail | null> {
  if (fixturesEnabled() && session.companyId === FIXTURE_SESSION.companyId) {
    return getFixtureReportDetail(reportId);
  }
  throw new MijnNkgcNotConfiguredError();
}
