import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <Container className="flex min-h-[50vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-nkgc-green-700">
        {t("eyebrow")}
      </p>
      <h1 className="mt-3 text-3xl font-bold text-nkgc-blue-900 sm:text-4xl">{t("title")}</h1>
      <p className="mt-4 max-w-md text-nkgc-blue-700">{t("description")}</p>
      <Link href="/" className="btn-primary mt-8">
        {t("cta")}
      </Link>
    </Container>
  );
}
