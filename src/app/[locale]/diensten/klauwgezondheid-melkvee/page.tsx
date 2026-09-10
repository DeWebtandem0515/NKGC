import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
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
  const t = await getTranslations({ locale, namespace: "services.dairyHoofHealth" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: buildAlternates(locale as Locale, "/diensten/klauwgezondheid-melkvee"),
  };
}

export default async function DairyHoofHealthPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services.dairyHoofHealth");
  const tNav = await getTranslations("nav");

  return (
    <>
      <Breadcrumbs
        homeLabel={tNav("home")}
        items={[
          { href: "/diensten", label: tNav("services") },
          { href: "/diensten/klauwgezondheid-melkvee", label: t("title") },
        ]}
      />
      <PageHero title={t("title")} lead={t("lead")} />

      <Container className="py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-bold text-nkgc-blue-900">{t("sectionHeading")}</h2>
            <div className="mt-4 space-y-4 text-[17px] leading-relaxed text-nkgc-blue-700">
              <p>{t("body1")}</p>
              <p>{t("body2")}</p>
              <p>{t("body3")}</p>
              <p>{t("body4")}</p>
            </div>
          </div>
          <Media
            src={null}
            alt=""
            placeholderLabel="Melkkoe tijdens klauwbehandeling"
            aspect="portrait"
            tone="blue"
          />
        </div>

        <div className="mt-14 rounded-card bg-nkgc-sand-50 p-8 sm:p-10">
          <h2 className="text-lg font-bold text-nkgc-blue-900">{t("linksHeading")}</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            <li>
              <Link href="/diensten/koppelbehandeling" className="btn-secondary">
                {tNav("servicesItems.herdTreatment")}
              </Link>
            </li>
            <li>
              <Link href="/diensten/klauwgezondheid-jongvee" className="btn-secondary">
                {tNav("servicesItems.youngStockHoofHealth")}
              </Link>
            </li>
            <li>
              <Link href="/diensten/advies-begeleiding" className="btn-secondary">
                {tNav("servicesItems.advice")}
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <CtaSection heading={t("cta")} cta={tNav("contact")} />
    </>
  );
}
