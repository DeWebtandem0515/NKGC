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
  const t = await getTranslations({ locale, namespace: "services.advice" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: buildAlternates(locale as Locale, "/diensten/advies-begeleiding"),
  };
}

export default async function AdvicePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services.advice");
  const tNav = await getTranslations("nav");

  const whatItems = [
    "situation",
    "animals",
    "environment",
    "management",
    "housing",
    "lyingBehaviour",
    "economics",
  ] as const;

  return (
    <>
      <Breadcrumbs
        homeLabel={tNav("home")}
        items={[
          { href: "/diensten", label: tNav("services") },
          { href: "/diensten/advies-begeleiding", label: t("title") },
        ]}
      />
      <PageHero title={t("title")} lead={t("lead")} />

      <Container className="py-16 sm:py-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-bold text-nkgc-blue-900">{t("whenHeading")}</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-nkgc-blue-700">{t("whenBody")}</p>
          </div>
          <Media
            src={null}
            alt=""
            placeholderLabel="NKGC-adviseur en veehouder bespreken bevindingen"
            aspect="wide"
            tone="blue"
          />
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-nkgc-blue-900">{t("whatHeading")}</h2>
          <p className="mt-3 max-w-2xl text-[15px] text-nkgc-blue-700">{t("whatIntro")}</p>
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {whatItems.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl bg-nkgc-sand-50 p-4 text-[15px] text-nkgc-blue-800"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-nkgc-green-600" />
                {t(`whatItems.${item}`)}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div>
            <h2 className="text-xl font-bold text-nkgc-blue-900">{t("practicalHeading")}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-nkgc-blue-700">
              {t("practicalBody")}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-nkgc-blue-900">{t("economicsHeading")}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-nkgc-blue-700">
              {t("economicsBody")}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-nkgc-blue-900">{t("followUpHeading")}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-nkgc-blue-700">
              {t("followUpBody")}
            </p>
          </div>
        </div>

        <div className="mt-16 rounded-card bg-nkgc-sand-50 p-8 sm:p-12">
          <h2 className="text-2xl font-bold text-nkgc-blue-900">{t("collaborationHeading")}</h2>
          <p className="mt-4 max-w-3xl text-[17px] leading-relaxed text-nkgc-blue-700">
            {t("collaborationBody")}
          </p>
        </div>
      </Container>

      <CtaSection heading={t("cta")} cta={tNav("contact")} />
    </>
  );
}
