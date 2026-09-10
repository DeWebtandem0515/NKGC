import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "education.overview" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates(locale as Locale, "/scholing"),
  };
}

export default async function EducationOverviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("education.overview");
  const tNav = await getTranslations("nav");
  const tCommon = await getTranslations("common");

  return (
    <>
      <Breadcrumbs homeLabel={tNav("home")} items={[{ href: "/scholing", label: t("title") }]} />
      <PageHero title={t("title")} lead={t("description")} />

      <Container className="py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Link
            href="/scholing/lezingen"
            className="group flex flex-col overflow-hidden rounded-card bg-white shadow-card ring-1 ring-nkgc-sand-200"
          >
            <Media
              src={null}
              alt=""
              placeholderLabel="NKGC-lezing voor een groep veehouders"
              aspect="wide"
              tone="blue"
              className="rounded-none"
            />
            <div className="p-6">
              <h2 className="text-lg font-bold text-nkgc-blue-900">{t("lecturesTitle")}</h2>
              <p className="mt-2 text-sm leading-relaxed text-nkgc-blue-700">
                {t("lecturesDescription")}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-nkgc-green-700 group-hover:underline">
                {tCommon("readMore")}
                <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>

          <Link
            href="/scholing/workshops"
            className="group flex flex-col overflow-hidden rounded-card bg-white shadow-card ring-1 ring-nkgc-sand-200"
          >
            <Media
              src={null}
              alt=""
              placeholderLabel="Workshop klauwgezondheid met praktijkoefening"
              aspect="wide"
              tone="green"
              className="rounded-none"
            />
            <div className="p-6">
              <h2 className="text-lg font-bold text-nkgc-blue-900">{t("workshopsTitle")}</h2>
              <p className="mt-2 text-sm leading-relaxed text-nkgc-blue-700">
                {t("workshopsDescription")}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-nkgc-green-700 group-hover:underline">
                {tCommon("readMore")}
                <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        </div>
      </Container>
    </>
  );
}
