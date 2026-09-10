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
  const t = await getTranslations({ locale, namespace: "services.overview" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates(locale as Locale, "/diensten"),
  };
}

const SERVICES = [
  {
    href: "/diensten/koppelbehandeling",
    key: "herdTreatment",
    descriptionKey: "herdTreatment.heroLead",
    placeholder: "Koppelbehandeling in uitvoering",
  },
  {
    href: "/diensten/klauwgezondheid-melkvee",
    key: "dairyHoofHealth",
    descriptionKey: "dairyHoofHealth.lead",
    placeholder: "Klauwgezondheid bij melkvee",
  },
  {
    href: "/diensten/klauwgezondheid-jongvee",
    key: "youngStockHoofHealth",
    descriptionKey: "youngStockHoofHealth.lead",
    placeholder: "Klauwgezondheid bij jongvee",
  },
  {
    href: "/diensten/advies-begeleiding",
    key: "advice",
    descriptionKey: "advice.lead",
    placeholder: "Adviesgesprek op het erf",
  },
] as const;

export default async function ServicesOverviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services.overview");
  const tNav = await getTranslations("nav");
  const tServices = await getTranslations("services");
  const tCommon = await getTranslations("common");

  return (
    <>
      <Breadcrumbs homeLabel={tNav("home")} items={[{ href: "/diensten", label: t("title") }]} />
      <PageHero title={t("title")} lead={t("description")} />

      <Container className="py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {SERVICES.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="group flex flex-col overflow-hidden rounded-card bg-white shadow-card ring-1 ring-nkgc-sand-200 sm:flex-row"
            >
              <Media
                src={null}
                alt=""
                placeholderLabel={service.placeholder}
                aspect="square"
                className="rounded-none sm:w-56 sm:shrink-0"
              />
              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-lg font-bold text-nkgc-blue-900">
                  {tNav(`servicesItems.${service.key}`)}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-nkgc-blue-700">
                  {tServices(service.descriptionKey as never)}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-nkgc-green-700 group-hover:underline">
                  {tCommon("readMore")}
                  <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
