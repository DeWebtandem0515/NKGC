import NextLink from "next/link";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { HoofMark } from "@/components/ui/HoofMark";

/**
 * Abstracte, contentloze rapport-suggestie — géén nagebouwd dashboard met
 * cijfers of percentages (die data bestaat hier niet, zie
 * docs/MIJNNKGC_INTEGRATION.md). Puur grafisch: geeft de vorm van "een
 * rapport" aan zonder iets te beweren over de inhoud ervan.
 */
function ReportPreview() {
  return (
    <div className="rounded-card bg-white/[0.06] p-8 ring-1 ring-white/10">
      <div className="flex items-center justify-between">
        <div className="h-2.5 w-24 rounded-full bg-white/25" />
        <div className="h-6 w-6 rounded-full bg-nkgc-green-500/40" />
      </div>
      <div className="mt-8 space-y-3.5">
        <div className="h-2.5 w-full rounded-full bg-white/15" />
        <div className="h-2.5 w-5/6 rounded-full bg-white/15" />
        <div className="h-2.5 w-4/6 rounded-full bg-white/15" />
      </div>
      <div className="mt-8 grid grid-cols-3 gap-3">
        <div className="h-16 rounded bg-white/10" />
        <div className="h-16 rounded bg-white/10" />
        <div className="h-16 rounded bg-nkgc-green-500/20" />
      </div>
    </div>
  );
}

export function MijnNkgcBanner() {
  const t = useTranslations("home.mijnNkgc");

  return (
    <section className="relative overflow-hidden bg-nkgc-blue-900 py-14 sm:py-20">
      <HoofMark
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-72 w-auto text-white/[0.04] sm:h-[28rem]"
      />
      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-7">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-nkgc-green-500">
              MijnNKGC
            </p>
            <h2 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
              {t("heading")}
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-white/75">
              {t("description")}
            </p>
            <NextLink href="/mijnnkgc/inloggen" className="btn-on-dark mt-9">
              {t("cta")}
            </NextLink>
          </div>
          <div className="hidden lg:col-span-5 lg:block">
            <ReportPreview />
          </div>
        </div>
      </Container>
    </section>
  );
}
