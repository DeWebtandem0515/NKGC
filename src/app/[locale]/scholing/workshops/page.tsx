import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link, type Locale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { workshops } from "@/content/workshops";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "education.workshops" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: buildAlternates(locale as Locale, "/scholing/workshops"),
  };
}

export default async function WorkshopsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("education.workshops");
  const tNav = await getTranslations("nav");
  const activeWorkshops = workshops.filter((w) => w.active);
  const topics = ["explanation", "demonstration", "practice", "environment", "management"] as const;

  const dateFormatter = new Intl.DateTimeFormat(locale === "nl" ? "nl-NL" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <Breadcrumbs
        homeLabel={tNav("home")}
        items={[
          { href: "/scholing", label: tNav("education") },
          { href: "/scholing/workshops", label: t("title") },
        ]}
      />
      <PageHero title={t("title")} lead={t("lead")} />

      <Container className="py-16 sm:py-24">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-bold text-nkgc-blue-900">{t("topicsHeading")}</h2>
            <p className="mt-3 text-[15px] text-nkgc-blue-700">{t("topicsIntro")}</p>
            <ul className="mt-5 space-y-3">
              {topics.map((topic) => (
                <li key={topic} className="flex items-start gap-3 text-[15px] text-nkgc-blue-800">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-nkgc-green-600" />
                  {t(`topics.${topic}`)}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-nkgc-blue-900">{t("basisHeading")}</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-nkgc-blue-700">
              {t("basisBody")}
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-nkgc-blue-900">{t("currentHeading")}</h2>

          {activeWorkshops.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {activeWorkshops.map((workshop) => (
                <div
                  key={workshop.slug}
                  className="flex flex-col overflow-hidden rounded-card bg-white shadow-card ring-1 ring-nkgc-sand-200"
                >
                  <Media
                    src={workshop.image}
                    alt=""
                    placeholderLabel={workshop.title[locale as "nl" | "en"]}
                    aspect="wide"
                    className="rounded-none"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-sm font-semibold text-nkgc-green-700">
                      {dateFormatter.format(new Date(workshop.date))} · {workshop.location}
                    </p>
                    <h3 className="mt-2 text-lg font-bold text-nkgc-blue-900">
                      {workshop.title[locale as "nl" | "en"]}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-nkgc-blue-700">
                      {workshop.description[locale as "nl" | "en"]}
                    </p>
                    {workshop.registrationUrl && (
                      <a
                        href={workshop.registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary mt-4 self-start"
                      >
                        {tNav("contact")}
                      </a>
                    )}
                  </div>
                </div>
              ))}
              <p className="col-span-full text-xs text-nkgc-blue-500">{t("externalNote")}</p>
            </div>
          ) : (
            <div className="mt-8 rounded-card bg-nkgc-sand-50 p-8 sm:p-12">
              <h3 className="text-xl font-bold text-nkgc-blue-900">{t("noneHeading")}</h3>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-nkgc-blue-700">
                {t("noneBody")}
              </p>
              <Link href="/contact" className="btn-secondary mt-6 inline-flex">
                {t("cta")}
              </Link>
            </div>
          )}
        </div>
      </Container>
    </>
  );
}
