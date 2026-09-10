import { useTranslations } from "next-intl";

export interface NavLink {
  href: string;
  label: string;
}

export interface NavGroup {
  label: string;
  href: string;
  children?: NavLink[];
}

/** Eén bron voor de navigatiestructuur, gebruikt door zowel desktop- als mobiele navigatie. */
export function useNavGroups(): NavGroup[] {
  const t = useTranslations("nav");

  return [
    {
      label: t("services"),
      href: "/diensten",
      children: [
        { href: "/diensten/koppelbehandeling", label: t("servicesItems.herdTreatment") },
        { href: "/diensten/klauwgezondheid-melkvee", label: t("servicesItems.dairyHoofHealth") },
        { href: "/diensten/klauwgezondheid-jongvee", label: t("servicesItems.youngStockHoofHealth") },
        { href: "/diensten/advies-begeleiding", label: t("servicesItems.advice") },
      ],
    },
    {
      label: t("education"),
      href: "/scholing",
      children: [
        { href: "/scholing/lezingen", label: t("educationItems.lectures") },
        { href: "/scholing/workshops", label: t("educationItems.workshops") },
      ],
    },
    {
      label: t("knowledge"),
      href: "/kennis-onderzoek",
      children: [
        { href: "/kennis-onderzoek/praktijkonderzoek", label: t("knowledgeItems.research") },
      ],
    },
    {
      label: t("about"),
      href: "/over-nkgc",
      children: [
        { href: "/over-nkgc", label: t("aboutItems.overview") },
        { href: "/over-nkgc/team", label: t("aboutItems.team") },
        { href: "/over-nkgc/partners", label: t("aboutItems.partners") },
      ],
    },
    { label: t("contact"), href: "/contact" },
  ];
}
