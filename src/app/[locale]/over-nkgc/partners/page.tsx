import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { partners } from "@/content/partners";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.partners" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: buildAlternates(locale as Locale, "/over-nkgc/partners"),
  };
}

export default async function PartnersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about.partners");
  const tNav = await getTranslations("nav");
  const l = locale as "nl" | "en";

  return (
    <>
      <Breadcrumbs
        homeLabel={tNav("home")}
        items={[
          { href: "/over-nkgc", label: tNav("about") },
          { href: "/over-nkgc/partners", label: t("title") },
        ]}
      />
      <PageHero title={t("title")} lead={t("lead")} />

      <Container className="py-16 sm:py-24">
        {partners.length > 0 ? (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {partners.map((partner) => (
              <a
                key={partner.slug}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 rounded-card bg-white p-6 text-center shadow-card ring-1 ring-nkgc-sand-200"
              >
                <span className="text-sm font-semibold text-nkgc-blue-900">{partner.name}</span>
                <span className="text-xs text-nkgc-blue-600">{partner.description[l]}</span>
              </a>
            ))}
          </div>
        ) : (
          <div className="rounded-card bg-nkgc-sand-50 p-8 sm:p-12">
            <h2 className="text-xl font-bold text-nkgc-blue-900">{t("placeholderHeading")}</h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-nkgc-blue-700">
              {t("placeholderBody")}
            </p>
          </div>
        )}
      </Container>
    </>
  );
}
