import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { EditorialSplit } from "@/components/ui/EditorialSplit";
import { HoofMark } from "@/components/ui/HoofMark";
import { homeImages } from "@/content/media";

/**
 * De drie kernactiviteiten als drie verschillende composities in plaats van
 * drie identieke cards naast elkaar: twee overlappende editorial splits
 * (afwisselend van richting) en een full-bleed beeld met tekst-overlay voor
 * de derde. Elke pijler krijgt zo zijn eigen visuele gewicht.
 */
export function ThreePillars() {
  const t = useTranslations("home.pillars");

  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="space-y-10 sm:space-y-14">
        <Container>
          <EditorialSplit
            media={
              <Media
                src={homeImages.pillarHerdCare}
                alt="Klauwverzorger behandelt een klauw in de KVK800-box"
                placeholderLabel="Klauwverzorger behandelt klauw in de KVK800-box"
                aspect="wide"
                tone="blue"
                className="lg:aspect-[4/3]"
                sizes="(min-width: 1024px) 58vw, 100vw"
              />
            }
          >
            <h3 className="text-2xl font-bold text-nkgc-blue-900 sm:text-3xl">
              {t("care.title")}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-nkgc-blue-700">
              {t("care.description")}
            </p>
            <Link
              href="/diensten/koppelbehandeling"
              className="mt-6 inline-flex items-center gap-1.5 font-semibold text-nkgc-green-700 hover:underline"
            >
              {t("care.cta")}
              <span aria-hidden="true">→</span>
            </Link>
          </EditorialSplit>
        </Container>

        <Container>
          <EditorialSplit
            reverse
            media={
              <Media
                src={homeImages.pillarAdvice}
                alt="NKGC-team bespreekt de bevindingen bij de klauwbekapbox"
                placeholderLabel="NKGC-adviseur en veehouder in gesprek op het erf"
                aspect="wide"
                tone="green"
                className="lg:aspect-[4/3]"
                sizes="(min-width: 1024px) 58vw, 100vw"
              />
            }
          >
            <h3 className="text-2xl font-bold text-nkgc-blue-900 sm:text-3xl">
              {t("advice.title")}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-nkgc-blue-700">
              {t("advice.description")}
            </p>
            <Link
              href="/diensten/advies-begeleiding"
              className="mt-6 inline-flex items-center gap-1.5 font-semibold text-nkgc-green-700 hover:underline"
            >
              {t("advice.cta")}
              <span aria-hidden="true">→</span>
            </Link>
          </EditorialSplit>
        </Container>

        <div className="relative overflow-hidden">
          <Media
            src={homeImages.pillarEducation}
            alt="Werkzaamheden op locatie bij een melkveebedrijf"
            placeholderLabel="Workshop klauwgezondheid voor een groep deelnemers"
            aspect="wide"
            tone="sand"
            rounded={false}
            className="lg:aspect-[21/9]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-nkgc-blue-950/85 via-nkgc-blue-950/10 to-transparent"
          />
          <HoofMark
            aria-hidden="true"
            className="pointer-events-none absolute -right-6 -top-10 h-40 w-auto text-white/10 sm:h-56"
          />
          <div className="absolute inset-x-0 bottom-0">
            <Container className="max-w-lg py-8 sm:py-12">
              <h3 className="text-2xl font-bold text-white sm:text-3xl">
                {t("education.title")}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-white/85">
                {t("education.description")}
              </p>
              <Link
                href="/scholing"
                className="mt-5 inline-flex items-center gap-1.5 font-semibold text-white hover:underline"
              >
                {t("education.cta")}
                <span aria-hidden="true">→</span>
              </Link>
            </Container>
          </div>
        </div>
      </div>
    </section>
  );
}
