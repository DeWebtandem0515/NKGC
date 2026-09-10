import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
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
  const t = await getTranslations({ locale, namespace: "services.youngStockHoofHealth" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: buildAlternates(locale as Locale, "/diensten/klauwgezondheid-jongvee"),
  };
}

export default async function YoungStockHoofHealthPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services.youngStockHoofHealth");
  const tNav = await getTranslations("nav");

  const issues = ["deformities", "misalignment", "infectious"] as const;

  return (
    <>
      <Breadcrumbs
        homeLabel={tNav("home")}
        items={[
          { href: "/diensten", label: tNav("services") },
          { href: "/diensten/klauwgezondheid-jongvee", label: t("title") },
        ]}
      />
      <PageHero title={t("title")} lead={t("lead")} />

      <Container className="py-16 sm:py-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-bold text-nkgc-blue-900">{t("whyHeading")}</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-nkgc-blue-700">{t("whyBody")}</p>
          </div>
          <Media
            src={null}
            alt=""
            placeholderLabel="Jongvee in de wei"
            aspect="wide"
            tone="green"
          />
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-bold text-nkgc-blue-900">{t("issuesHeading")}</h2>
            <p className="mt-4 text-[15px] text-nkgc-blue-700">{t("issuesIntro")}</p>
            <ul className="mt-4 space-y-3">
              {issues.map((issue) => (
                <li key={issue} className="flex items-start gap-3 text-[15px] text-nkgc-blue-800">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-nkgc-green-600" />
                  {t(`issues.${issue}`)}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-nkgc-blue-900">{t("approachHeading")}</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-nkgc-blue-700">
              {t("approachBody")}
            </p>
          </div>
        </div>

        <div className="mt-16 rounded-card bg-nkgc-sand-50 p-8 sm:p-12">
          <h2 className="text-2xl font-bold text-nkgc-blue-900">{t("relationHeading")}</h2>
          <p className="mt-4 max-w-3xl text-[17px] leading-relaxed text-nkgc-blue-700">
            {t("relationBody")}
          </p>
        </div>
      </Container>

      <CtaSection heading={t("cta")} cta={tNav("contact")} />
    </>
  );
}
