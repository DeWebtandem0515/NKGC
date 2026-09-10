import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getReportDetail, getSession } from "@/lib/mijnnkgc/client";

export const metadata: Metadata = {
  title: "Rapport — MijnNKGC",
  robots: { index: false, follow: false },
};

const reportTypeLabels: Record<string, string> = {
  koppelbehandeling: "Koppelbehandeling",
  advies: "Advies",
  overig: "Overig",
};

/**
 * Server-side eigendomscheck: getReportDetail geeft alléén een rapport terug
 * dat bij de ingelogde sessie hoort. Een gok naar een ander ID levert hier
 * altijd notFound() op, nooit andermans rapport (bescherming tegen IDOR).
 */
export default async function ReportDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSession();
  if (!session) {
    redirect("/mijnnkgc/inloggen");
  }

  const report = await getReportDetail(session, id);
  if (!report) {
    notFound();
  }

  const dateFormatter = new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="container max-w-3xl py-12">
      <Link href="/mijnnkgc/dashboard" className="text-sm text-nkgc-blue-700 hover:underline">
        ← Terug naar dashboard
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-nkgc-blue-900">
        {reportTypeLabels[report.type] ?? report.type} — {dateFormatter.format(new Date(report.date))}
      </h1>
      <div className="mt-6 rounded-card bg-white p-6 ring-1 ring-nkgc-sand-200 sm:p-8">
        <p className="whitespace-pre-line text-[15px] leading-relaxed text-nkgc-blue-800">
          {report.content}
        </p>
      </div>
    </div>
  );
}
