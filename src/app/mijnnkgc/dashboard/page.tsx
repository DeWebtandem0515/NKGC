import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession, listReports } from "@/lib/mijnnkgc/client";
import { logoutAction } from "../actions";

export const metadata: Metadata = {
  title: "Dashboard — MijnNKGC",
  robots: { index: false, follow: false },
};

const reportTypeLabels: Record<string, string> = {
  koppelbehandeling: "Koppelbehandeling",
  advies: "Advies",
  overig: "Overig",
};

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) {
    redirect("/mijnnkgc/inloggen");
  }

  const reports = await listReports(session);
  const [latest] = reports;
  const dateFormatter = new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="container max-w-4xl py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-nkgc-blue-600">Goedemiddag</p>
          <h1 className="text-2xl font-bold text-nkgc-blue-900">{session.companyName}</h1>
        </div>
        <form action={logoutAction}>
          <button type="submit" className="btn-secondary">
            Uitloggen
          </button>
        </form>
      </div>

      {latest && (
        <section className="mt-8 rounded-card bg-nkgc-blue-900 p-6 text-white sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-nkgc-green-500">
            Laatste rapportage
          </p>
          <p className="mt-2 text-lg font-bold">{dateFormatter.format(new Date(latest.date))}</p>
          <p className="text-nkgc-blue-100">{reportTypeLabels[latest.type] ?? latest.type}</p>
          <Link href={`/mijnnkgc/rapporten/${latest.id}`} className="btn-on-dark mt-5">
            Bekijk rapport
          </Link>
        </section>
      )}

      <section className="mt-10">
        <h2 className="text-lg font-bold text-nkgc-blue-900">Rapportages</h2>

        {reports.length === 0 ? (
          <p className="mt-4 text-sm text-nkgc-blue-700">
            Er zijn nog geen rapportages beschikbaar.
          </p>
        ) : (
          <div className="mt-4 overflow-hidden rounded-card ring-1 ring-nkgc-sand-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-nkgc-sand-50 text-nkgc-blue-600">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Datum</th>
                  <th scope="col" className="px-4 py-3 font-medium">Type</th>
                  <th scope="col" className="px-4 py-3 font-medium text-right">Actie</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-nkgc-sand-200 bg-white">
                {reports.map((report) => (
                  <tr key={report.id}>
                    <td className="px-4 py-3 text-nkgc-blue-800">
                      {dateFormatter.format(new Date(report.date))}
                    </td>
                    <td className="px-4 py-3 text-nkgc-blue-800">
                      {reportTypeLabels[report.type] ?? report.type}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/mijnnkgc/rapporten/${report.id}`}
                        className="font-medium text-nkgc-green-700 hover:underline"
                      >
                        Bekijken
                      </Link>
                      {/* PDF-download is bewust nog niet gebouwd: er is geen
                          bestaand systeem gekoppeld dat een PDF kan leveren
                          (report.pdfAvailable staat klaar voor zodra dat er
                          is — zie docs/MIJNNKGC_INTEGRATION.md). */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
