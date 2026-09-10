import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildAlternates } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { teamMembers } from "@/content/team";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.team" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: buildAlternates(locale as Locale, "/over-nkgc/team"),
  };
}

export default async function TeamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about.team");
  const tNav = await getTranslations("nav");
  const l = locale as "nl" | "en";

  return (
    <>
      <Breadcrumbs
        homeLabel={tNav("home")}
        items={[
          { href: "/over-nkgc", label: tNav("about") },
          { href: "/over-nkgc/team", label: t("title") },
        ]}
      />
      <PageHero title={t("title")} lead={t("lead")} />

      <Container className="py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {teamMembers.map((member) => (
            <div key={member.slug}>
              <Media
                src={member.photo}
                alt={member.name}
                placeholderLabel={member.name}
                aspect="square"
              />
              <h2 className="mt-4 text-lg font-bold text-nkgc-blue-900">{member.name}</h2>
              <p className="mt-1 text-sm font-medium text-nkgc-green-700">{member.role[l]}</p>
              <p className="mt-3 text-sm leading-relaxed text-nkgc-blue-700">{member.bio[l]}</p>
            </div>
          ))}
        </div>

        <p className="mt-12 max-w-2xl text-xs text-nkgc-blue-500">{t("verifyNote")}</p>
      </Container>
    </>
  );
}
