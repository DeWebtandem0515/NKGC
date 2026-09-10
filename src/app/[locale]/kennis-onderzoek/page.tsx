import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link, type Locale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "knowledge.overview" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates(locale as Locale, "/kennis-onderzoek"),
  };
}

export default async function KnowledgeOverviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("knowledge.overview");
  const tNav = await getTranslations("nav");

  return (
    <>
      <Breadcrumbs
        homeLabel={tNav("home")}
        items={[{ href: "/kennis-onderzoek", label: t("title") }]}
      />
      <PageHero title={t("title")} lead={t("description")} />

      <Container className="py-16 sm:py-24">
        <Link
          href="/kennis-onderzoek/praktijkonderzoek"
          className="inline-flex items-center gap-1.5 font-semibold text-nkgc-green-700 hover:underline"
        >
          {tNav("knowledgeItems.research")}
          <span aria-hidden="true">→</span>
        </Link>
      </Container>
    </>
  );
}
