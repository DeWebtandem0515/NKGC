import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { CtaSection } from "@/components/sections/CtaSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services.herdTreatment" });
  return {
    title: t("title"),
    description: t("heroLead"),
    alternates: buildAlternates(locale as Locale, "/diensten/koppelbehandeling"),
  };
}

export default async function HerdTreatmentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services.herdTreatment");
  const tNav = await getTranslations("nav");

  const kvkPoints = ["noise", "comfort", "flow", "fixation", "ergonomic"] as const;

  return (
    <>
      <Breadcrumbs
        homeLabel={tNav("home")}
        items={[
          { href: "/diensten", label: tNav("services") },
          { href: "/diensten/koppelbehandeling", label: t("title") },
        ]}
      />
      <PageHero title={t("title")} lead={t("heroLead")} />

      <Container className="grid grid-cols-1 gap-16 py-16 sm:py-24">
        <section className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-bold text-nkgc-blue-900">{t("whyHeading")}</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-nkgc-blue-700">{t("whyBody")}</p>
          </div>
          <Media
            src={null}
            alt=""
            placeholderLabel="Koppelbehandeling bij melkvee op locatie"
            aspect="wide"
            tone="blue"
          />
        </section>
      </Container>

      <ProcessSteps />

      <Container className="py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-16">
          <section className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Media
              src={null}
              alt=""
              placeholderLabel="KVK800-klauwbekapbox in gebruik"
              aspect="square"
              tone="green"
              className="order-2 lg:order-1"
            />
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl font-bold text-nkgc-blue-900">{t("kvkHeading")}</h2>
              <p className="mt-4 text-[17px] leading-relaxed text-nkgc-blue-700">{t("kvkBody")}</p>
              <ul className="mt-5 space-y-3">
                {kvkPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-[15px] text-nkgc-blue-800">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-nkgc-green-600" />
                    {t(`kvkPoints.${point}`)}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-2xl font-bold text-nkgc-blue-900">{t("registrationHeading")}</h2>
              <p className="mt-4 text-[17px] leading-relaxed text-nkgc-blue-700">
                {t("registrationBody")}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-nkgc-blue-900">{t("analysisHeading")}</h2>
              <p className="mt-4 text-[17px] leading-relaxed text-nkgc-blue-700">
                {t("analysisBody")}
              </p>
            </div>
          </section>

          <section className="rounded-card bg-nkgc-sand-50 p-8 sm:p-12">
            <h2 className="text-2xl font-bold text-nkgc-blue-900">{t("planHeading")}</h2>
            <p className="mt-4 max-w-3xl text-[17px] leading-relaxed text-nkgc-blue-700">
              {t("planBody")}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-nkgc-blue-900">{t("collaborationHeading")}</h2>
            <p className="mt-4 max-w-3xl text-[17px] leading-relaxed text-nkgc-blue-700">
              {t("collaborationBody")}
            </p>
          </section>

          <section className="flex flex-col items-start gap-4 rounded-card ring-1 ring-nkgc-sand-200 p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-nkgc-blue-900">{t("youngStockHeading")}</h2>
              <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-nkgc-blue-700">
                {t("youngStockBody")}
              </p>
            </div>
            <Link href="/diensten/klauwgezondheid-jongvee" className="btn-secondary shrink-0">
              {t("youngStockCta")}
            </Link>
          </section>
        </div>
      </Container>

      <CtaSection heading={t("ctaHeading")} description={t("ctaDescription")} cta={tNav("contact")} />
    </>
  );
}
