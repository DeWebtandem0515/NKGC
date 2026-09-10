import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { CtaSection } from "@/components/sections/CtaSection";
import { researchProjects } from "@/content/research";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "knowledge.research" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: buildAlternates(locale as Locale, "/kennis-onderzoek/praktijkonderzoek"),
  };
}

export default async function PracticeResearchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("knowledge.research");
  const tNav = await getTranslations("nav");

  return (
    <>
      <Breadcrumbs
        homeLabel={tNav("home")}
        items={[
          { href: "/kennis-onderzoek", label: tNav("knowledge") },
          { href: "/kennis-onderzoek/praktijkonderzoek", label: t("title") },
        ]}
      />
      <PageHero title={t("title")} lead={t("lead")} />

      <Container className="py-16 sm:py-24">
        {researchProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {researchProjects.map((project) => (
              <div
                key={project.slug}
                className="flex flex-col overflow-hidden rounded-card bg-white shadow-card ring-1 ring-nkgc-sand-200"
              >
                <Media
                  src={project.image}
                  alt=""
                  placeholderLabel={project.title[locale as "nl" | "en"]}
                  aspect="wide"
                  className="rounded-none"
                />
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-nkgc-green-700">
                    {project.category} · {project.period}
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-nkgc-blue-900">
                    {project.title[locale as "nl" | "en"]}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-nkgc-blue-700">
                    {project.summary[locale as "nl" | "en"]}
                  </p>
                </div>
              </div>
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

      <CtaSection heading={t("cta")} cta={tNav("contact")} />
    </>
  );
}
