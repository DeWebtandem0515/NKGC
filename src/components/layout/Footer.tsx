import Image from "next/image";
import NextLink from "next/link";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { siteSettings } from "@/content/settings";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { HoofMark } from "../ui/HoofMark";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-nkgc-blue-950 text-nkgc-blue-100">
      <HoofMark
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -right-10 h-64 w-auto text-white/[0.035]"
      />
      <div className="container relative py-12 sm:py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Image
              src="/brand/logo.png"
              alt="Nederlands Klauw Gezondheids Centrum"
              width={150}
              height={50}
              className="h-9 w-auto brightness-0 invert"
            />
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-nkgc-blue-200">
              {t("description")}
            </p>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-nkgc-green-500">
              {t("servicesHeading")}
            </h2>
            <ul className="mt-3 space-y-1.5 text-sm text-nkgc-blue-200">
              <li><Link href="/diensten/koppelbehandeling" className="hover:text-white">{tNav("servicesItems.herdTreatment")}</Link></li>
              <li><Link href="/diensten/klauwgezondheid-melkvee" className="hover:text-white">{tNav("servicesItems.dairyHoofHealth")}</Link></li>
              <li><Link href="/diensten/klauwgezondheid-jongvee" className="hover:text-white">{tNav("servicesItems.youngStockHoofHealth")}</Link></li>
              <li><Link href="/diensten/advies-begeleiding" className="hover:text-white">{tNav("servicesItems.advice")}</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-nkgc-green-500">
              {t("knowledgeHeading")}
            </h2>
            <ul className="mt-3 space-y-1.5 text-sm text-nkgc-blue-200">
              <li><Link href="/scholing/lezingen" className="hover:text-white">{tNav("educationItems.lectures")}</Link></li>
              <li><Link href="/scholing/workshops" className="hover:text-white">{tNav("educationItems.workshops")}</Link></li>
              <li><Link href="/kennis-onderzoek/praktijkonderzoek" className="hover:text-white">{tNav("knowledgeItems.research")}</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-nkgc-green-500">
              {t("organisationHeading")}
            </h2>
            <ul className="mt-3 space-y-1.5 text-sm text-nkgc-blue-200">
              <li><Link href="/over-nkgc" className="hover:text-white">{tNav("aboutItems.overview")}</Link></li>
              <li><Link href="/over-nkgc/team" className="hover:text-white">{tNav("aboutItems.team")}</Link></li>
              <li><Link href="/over-nkgc/partners" className="hover:text-white">{tNav("aboutItems.partners")}</Link></li>
              <li><Link href="/contact" className="hover:text-white">{tNav("contact")}</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6">
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-nkgc-green-500">
            {t("contactHeading")}
          </h2>
          <div className="mt-3 grid gap-2 text-sm text-nkgc-blue-100 sm:grid-cols-2 lg:grid-cols-4">
            <p>
              {siteSettings.address.street}, {siteSettings.address.postalCode} {siteSettings.address.city}
            </p>
            <p>
              <a href={siteSettings.phoneHref} className="hover:text-white">
                {tCommon("phone")}: {siteSettings.phone}
              </a>
            </p>
            <p>
              <a href={siteSettings.mobileHref} className="hover:text-white">
                {tCommon("mobile")}: {siteSettings.mobile}
              </a>
            </p>
            <p>
              <a href={`mailto:${siteSettings.email}`} className="hover:text-white">
                {siteSettings.email}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-start gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-nkgc-blue-200">
            <NextLink href="/mijnnkgc/inloggen" className="font-semibold text-white hover:underline">
              {tNav("mijnNkgc")}
            </NextLink>
            <Link href="/privacy" className="hover:text-white">
              {t("privacy")}
            </Link>
            <Link href="/cookies" className="hover:text-white">
              {t("cookies")}
            </Link>
            <Link href="/voorwaarden" className="hover:text-white">
              {t("terms")}
            </Link>
          </div>
          <LanguageSwitcher variant="footer" />
        </div>

        <p className="mt-5 text-xs text-nkgc-blue-300">
          © {year} {t("copyright")}
        </p>
      </div>
    </footer>
  );
}
