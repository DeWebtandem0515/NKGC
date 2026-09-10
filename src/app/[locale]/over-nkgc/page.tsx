import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link, type Locale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { CtaSection } from "@/components/sections/CtaSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.overview" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: buildAlternates(locale as Locale, "/over-nkgc"),
  };
}

export default async function AboutOverviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about.overview");
  const tNav = await getTranslations("nav");

  const strengths = ["practice", "research", "innovation", "advice", "education"] as const;

  return (
    <>
      <Breadcrumbs homeLabel={tNav("home")} items={[{ href: "/over-nkgc", label: t("title") }]} />
      <PageHero title={t("title")} lead={t("lead")} />

      <Container className="py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-16">
          <section className="rounded-card bg-nkgc-blue-900 p-8 sm:p-12">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-nkgc-green-500">
              {t("missionHeading")}
            </h2>
            <p className="mt-4 max-w-3xl text-xl font-medium leading-relaxed text-white sm:text-2xl">
              &ldquo;{t("missionQuote")}&rdquo;
            </p>
          </section>

          <section className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-2xl font-bold text-nkgc-blue-900">{t("historyHeading")}</h2>
              <div className="mt-4 space-y-4 text-[17px] leading-relaxed text-nkgc-blue-700">
                <p>{t("historyBody1")}</p>
                <p>{t("historyBody2")}</p>
                <p>{t("historyBody3")}</p>
              </div>
            </div>
            <Media
              src={null}
              alt=""
              placeholderLabel="Oprichters van NKGC op een melkveebedrijf"
              aspect="wide"
              tone="blue"
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-nkgc-blue-900">{t("strengthHeading")}</h2>
            <p className="mt-3 text-[15px] text-nkgc-blue-700">{t("strengthIntro")}</p>
            <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-5">
              {strengths.map((strength) => (
                <li
                  key={strength}
                  className="rounded-xl bg-nkgc-sand-50 px-4 py-5 text-center text-sm font-semibold text-nkgc-blue-800"
                >
                  {t(`strengthItems.${strength}`)}
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col items-start gap-4 rounded-card ring-1 ring-nkgc-sand-200 p-8 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/over-nkgc/team" className="btn-secondary">
              {t("teamCta")}
            </Link>
            <Link href="/over-nkgc/partners" className="btn-secondary">
              {t("partnersCta")}
            </Link>
          </section>
        </div>
      </Container>

      <CtaSection heading={t("cta")} cta={tNav("contact")} />
    </>
  );
}
