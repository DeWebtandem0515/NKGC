import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { siteSettings } from "@/content/settings";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: buildAlternates(locale as Locale, "/contact"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const tNav = await getTranslations("nav");
  const tCommon = await getTranslations("common");

  return (
    <>
      <Breadcrumbs homeLabel={tNav("home")} items={[{ href: "/contact", label: t("title") }]} />
      <PageHero title={t("title")} lead={t("lead")} />

      <Container className="grid grid-cols-1 gap-12 py-16 sm:py-24 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-20">
        <div>
          <h2 className="text-lg font-bold text-nkgc-blue-900">{t("detailsHeading")}</h2>
          <dl className="mt-5 space-y-4 text-[15px] text-nkgc-blue-700">
            <div>
              <dt className="font-medium text-nkgc-blue-900">{tCommon("address")}</dt>
              <dd>
                {siteSettings.address.street}
                <br />
                {siteSettings.address.postalCode} {siteSettings.address.city}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-nkgc-blue-900">{tCommon("phone")}</dt>
              <dd>
                <a href={siteSettings.phoneHref} className="hover:underline">
                  {siteSettings.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-nkgc-blue-900">{tCommon("mobile")}</dt>
              <dd>
                <a href={siteSettings.mobileHref} className="hover:underline">
                  {siteSettings.mobile}
                </a>{" "}
                ({t("directContact")})
              </dd>
            </div>
            <div>
              <dt className="font-medium text-nkgc-blue-900">{tCommon("email")}</dt>
              <dd>
                <a href={`mailto:${siteSettings.email}`} className="hover:underline">
                  {siteSettings.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <h2 className="text-lg font-bold text-nkgc-blue-900">{t("form.heading")}</h2>
          <div className="mt-5">
            <ContactForm />
          </div>
        </div>
      </Container>
    </>
  );
}
