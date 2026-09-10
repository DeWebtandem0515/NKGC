import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Media } from "@/components/ui/Media";
import { Container } from "@/components/ui/Container";
import { homeImages } from "@/content/media";

/**
 * Beelddominante, asymmetrische hero: het beeld neemt op desktop ~68% van
 * de breedte in en de tekst ligt er met een donkere overvloeiing overheen
 * — geen keurige 50/50-split met een rechthoekige foto. Mobiel/tablet
 * krijgt een eigen beeldcompositie (vol boven, tekst eronder), maar de
 * teksblok — met het enige <h1> van de pagina — bestaat maar één keer in
 * de DOM; alleen het beeld wisselt van vorm per breakpoint.
 */
export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative overflow-hidden bg-nkgc-blue-900">
      <div className="relative lg:min-h-[calc(100svh-6rem)]">
        <div className="relative lg:absolute lg:inset-y-0 lg:right-0 lg:w-[68%]">
          {/* Mobiel/tablet-portrait: gestapeld beeld boven de tekst. */}
          <Media
            src={homeImages.hero}
            alt="Melkkoeien op stal bij NKGC"
            placeholderLabel="Koe in de wei, ochtendlicht"
            aspect="portrait"
            tone="green"
            rounded={false}
            priority
            sizes="(min-width: 1024px) 0px, 100vw"
            className="lg:hidden"
          />
          {/* Desktop / tablet-landscape: vult de volledige, geabsoluteerde beeldkolom. */}
          <Media
            src={homeImages.hero}
            alt="Melkkoeien op stal bij NKGC"
            placeholderLabel="Koe in de wei, ochtendlicht"
            aspect="cover"
            tone="green"
            rounded={false}
            priority
            sizes="68vw"
            className="hidden lg:block"
          />
        </div>

        <div
          aria-hidden="true"
          className="hidden lg:block lg:absolute lg:inset-0 lg:bg-gradient-to-r lg:from-nkgc-blue-900 lg:via-nkgc-blue-900/85 lg:to-nkgc-blue-900/0"
        />

        <div className="relative lg:flex lg:min-h-[calc(100svh-6rem)] lg:items-center">
          <Container className="py-14 lg:py-24">
            <div className="max-w-xl">
              <h1 className="text-[2.5rem] font-bold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-[4.25rem]">
                {t("title")}
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-white/80 lg:text-xl">
                {t("subtitle")}
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link href="/diensten/koppelbehandeling" className="btn-primary">
                  {t("ctaPrimary")}
                </Link>
                <Link href="/contact" className="btn-outline-on-dark">
                  {t("ctaSecondary")}
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
