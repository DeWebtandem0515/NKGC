import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.terms" });
  return { title: t("title"), alternates: buildAlternates(locale as Locale, "/voorwaarden") };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal.terms");
  const tLegal = await getTranslations("legal");

  return (
    <>
      <PageHero title={t("title")} />
      <Container className="max-w-prose py-16 sm:py-24">
        <p className="text-[17px] leading-relaxed text-nkgc-blue-700">{t("intro")}</p>
        <p className="mt-8 rounded-xl bg-nkgc-sand-50 p-4 text-sm text-nkgc-blue-600">
          {tLegal("placeholderNote")}
        </p>
      </Container>
    </>
  );
}
