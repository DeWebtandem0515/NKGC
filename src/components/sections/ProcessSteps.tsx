import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const STEP_KEYS = ["step1", "step2", "step3", "step4", "step5"] as const;

/**
 * Editorial procesweergave: grote, licht-getinte nummers en een gestaffelde
 * inspringing per rij in plaats van vijf identieke, symmetrische kolommen.
 * Op mobiel valt de stagger vanzelf weg en blijft een rustige verticale
 * tijdlijn over.
 */
export function ProcessSteps() {
  const t = useTranslations("home.process");

  return (
    <section className="bg-white py-14 sm:py-20">
      <Container>
        <SectionHeading title={t("heading")} description={t("intro")} />

        <ol className="mt-10 space-y-10 sm:mt-12 sm:space-y-12">
          {STEP_KEYS.map((key, index) => (
            <li
              key={key}
              className={index % 2 === 1 ? "lg:pl-[16.6667%]" : undefined}
            >
              <div className="grid grid-cols-[auto,1fr] gap-6 border-t border-nkgc-sand-200 pt-8 sm:grid-cols-12 sm:gap-8">
                <span
                  aria-hidden="true"
                  className="col-span-1 select-none text-6xl font-bold leading-none text-nkgc-green-600/20 sm:col-span-3 sm:text-8xl"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="sm:col-span-7">
                  <h3 className="text-xl font-bold text-nkgc-blue-900 sm:text-2xl">
                    {t(`steps.${key}.title`)}
                  </h3>
                  <p className="mt-2.5 max-w-md text-base leading-relaxed text-nkgc-blue-700">
                    {t(`steps.${key}.description`)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-14">
          <Link href="/diensten/koppelbehandeling" className="btn-secondary">
            {t("cta")}
          </Link>
        </div>
      </Container>
    </section>
  );
}
