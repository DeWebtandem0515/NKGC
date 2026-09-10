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
  const t = await getTranslations({ locale, namespace: "education.lectures" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: buildAlternates(locale as Locale, "/scholing/lezingen"),
  };
}

export default async function LecturesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("education.lectures");
  const tNav = await getTranslations("nav");

  const traits = ["practical", "interactive", "caseBased"] as const;

  return (
    <>
      <Breadcrumbs
        homeLabel={tNav("home")}
        items={[
          { href: "/scholing", label: tNav("education") },
          { href: "/scholing/lezingen", label: t("title") },
        ]}
      />
      <PageHero title={t("title")} lead={t("lead")} />

      <Container className="py-16 sm:py-24">
        <p className="max-w-3xl text-[17px] leading-relaxed text-nkgc-blue-700">{t("intro")}</p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {traits.map((trait) => (
            <div key={trait} className="rounded-card bg-nkgc-sand-50 p-6">
              <h2 className="text-lg font-bold text-nkgc-blue-900">
                {t(`traits.${trait}.title`)}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-nkgc-blue-700">
                {t(`traits.${trait}.description`)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-bold text-nkgc-blue-900">{t("methodHeading")}</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-nkgc-blue-700">
              {t("methodBody")}
            </p>
          </div>
          <Media
            src={null}
            alt=""
            placeholderLabel="Interactieve lezing met discussie"
            aspect="wide"
            tone="blue"
          />
        </div>
      </Container>

      <CtaSection heading={t("cta")} cta={tNav("contact")} />
    </>
  );
}
