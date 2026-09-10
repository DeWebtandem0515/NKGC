import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Media } from "@/components/ui/Media";
import { EditorialSplit } from "@/components/ui/EditorialSplit";
import { Container } from "@/components/ui/Container";
import { homeImages } from "@/content/media";

export function PracticeResearch() {
  const t = useTranslations("home.practiceResearch");

  return (
    <section className="bg-nkgc-sand-50 py-14 sm:py-20">
      <Container>
        <EditorialSplit
          media={
            <Media
              src={homeImages.practiceResearch}
              alt="NKGC-medewerker tijdens het bekappen van een klauw"
              placeholderLabel="Praktijkonderzoek tijdens een koppelbehandeling"
              aspect="wide"
              tone="blue"
              className="lg:aspect-[4/5]"
              sizes="(min-width: 1024px) 58vw, 100vw"
            />
          }
        >
          <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-nkgc-blue-900 sm:text-4xl">
            {t("heading")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-nkgc-blue-700">{t("description")}</p>
          <Link href="/kennis-onderzoek/praktijkonderzoek" className="btn-secondary mt-8">
            {t("cta")}
          </Link>
        </EditorialSplit>
      </Container>
    </section>
  );
}
