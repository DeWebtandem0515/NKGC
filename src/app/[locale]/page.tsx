import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { BrandStatement } from "@/components/sections/BrandStatement";
import { ThreePillars } from "@/components/sections/ThreePillars";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { MijnNkgcBanner } from "@/components/sections/MijnNkgcBanner";
import { PracticeResearch } from "@/components/sections/PracticeResearch";
import { VideoSection } from "@/components/sections/VideoSection";
import { WorkshopsSection } from "@/components/sections/WorkshopsSection";
import { VacancySection } from "@/components/sections/VacancySection";
import { CtaSection } from "@/components/sections/CtaSection";
import { siteSettings } from "@/content/settings";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("defaultTitle"), description: t("defaultDescription") };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home.finalCta" });
  const tAbout = await getTranslations({ locale, namespace: "about.overview" });

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "VeterinaryCare",
    name: siteSettings.organisationName,
    alternateName: siteSettings.organisationShort,
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nkgc.nl",
    email: siteSettings.email,
    telephone: siteSettings.phoneHref.replace("tel:", ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: siteSettings.address.street,
      postalCode: siteSettings.address.postalCode,
      addressLocality: siteSettings.address.city,
      addressCountry: siteSettings.address.country,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <Hero />
      <BrandStatement quote={tAbout("missionQuote")} />
      <ThreePillars />
      <MijnNkgcBanner />
      <ProcessSteps />
      <PracticeResearch />
      <VideoSection />
      <WorkshopsSection />
      <VacancySection />
      <CtaSection heading={t("heading")} description={t("description")} cta={t("cta")} />
    </>
  );
}
