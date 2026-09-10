import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { EditorialSplit } from "@/components/ui/EditorialSplit";
import { vacancies } from "@/content/vacancies";
import type { Locale } from "@/i18n/routing";

/** Verdwijnt volledig wanneer er geen actieve vacature is (content/vacancies.ts). */
export function VacancySection() {
  const t = useTranslations("home.vacancy");
  const locale = useLocale() as Locale;
  const activeVacancies = vacancies.filter((v) => v.active);

  if (activeVacancies.length === 0) return null;

  return (
    <section className="bg-white py-14 sm:py-20">
      <Container>
        <div className="space-y-16">
          {activeVacancies.map((vacancy) => (
            <EditorialSplit
              key={vacancy.slug}
              panelTone="navy"
              media={
                <Media
                  src={vacancy.image}
                  alt={vacancy.imageAlt ?? ""}
                  placeholderLabel={vacancy.title[locale]}
                  aspect="wide"
                  tone="blue"
                  sizes="(min-width: 1024px) 58vw, 100vw"
                />
              }
            >
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-nkgc-green-500">
                {t("heading")}
              </p>
              <h2 className="mt-3 text-2xl font-bold leading-[1.15] text-white sm:text-3xl">
                {vacancy.title[locale]}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/75">
                {vacancy.intro[locale]}
              </p>
              <a
                href={vacancy.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-on-dark mt-7 inline-flex"
              >
                {t("cta")}
              </a>
            </EditorialSplit>
          ))}
        </div>
      </Container>
    </section>
  );
}
