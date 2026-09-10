import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { EditorialSplit } from "@/components/ui/EditorialSplit";
import { workshops } from "@/content/workshops";
import { homeImages } from "@/content/media";
import type { Locale } from "@/i18n/routing";

export function WorkshopsSection() {
  const t = useTranslations("home.workshops");
  const locale = useLocale() as Locale;
  const activeWorkshops = workshops.filter((w) => w.active).slice(0, 3);

  const dateFormatter = new Intl.DateTimeFormat(locale === "nl" ? "nl-NL" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (activeWorkshops.length === 0) {
    return (
      <section className="bg-nkgc-sand-50 py-14 sm:py-20">
        <Container>
          <EditorialSplit
            reverse
            media={
              <Media
                src={homeImages.workshop}
                alt="Klauwverzorgers beoordelen samen een klauw"
                placeholderLabel="Workshop klauwgezondheid met praktijkoefening"
                aspect="wide"
                tone="sand"
                sizes="(min-width: 1024px) 58vw, 100vw"
              />
            }
          >
            <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-nkgc-blue-900 sm:text-4xl">
              {t("emptyHeading")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-nkgc-blue-700">
              {t("emptyDescription")}
            </p>
            <Link href="/contact" className="btn-secondary mt-8">
              {t("emptyCta")}
            </Link>
          </EditorialSplit>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-white py-14 sm:py-20">
      <Container>
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-nkgc-blue-900 sm:text-4xl">
            {t("heading")}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-nkgc-blue-700">{t("intro")}</p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {activeWorkshops.map((workshop) => (
            <div key={workshop.slug} className="flex flex-col">
              <Media
                src={workshop.image}
                alt=""
                placeholderLabel={workshop.title[locale]}
                aspect="wide"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
              <p className="mt-5 text-sm font-semibold text-nkgc-green-700">
                {dateFormatter.format(new Date(workshop.date))} · {workshop.location}
              </p>
              <h3 className="mt-1.5 text-xl font-bold text-nkgc-blue-900">
                {workshop.title[locale]}
              </h3>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-nkgc-blue-700">
                {workshop.description[locale]}
              </p>
              <Link
                href="/scholing/workshops"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-nkgc-green-700 hover:underline"
              >
                {t("cardCta")}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
