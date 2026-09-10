"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";
import clsx from "clsx";
import { NLFlag, GBFlag } from "@/components/ui/Flags";

const LOCALE_META = {
  nl: { Flag: NLFlag, label: "Nederlands" },
  en: { Flag: GBFlag, label: "English" },
} as const;

export function LanguageSwitcher({ variant = "header" }: { variant?: "header" | "footer" }) {
  const t = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  function switchTo(nextLocale: "nl" | "en") {
    router.replace({ pathname, params } as never, { locale: nextLocale });
  }

  return (
    <div
      role="group"
      aria-label={t("language")}
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full p-0.5",
        variant === "header" ? "bg-nkgc-sand-100" : "bg-white/10"
      )}
    >
      {(["nl", "en"] as const).map((l) => {
        const { Flag, label } = LOCALE_META[l];
        const active = locale === l;
        return (
          <button
            key={l}
            type="button"
            onClick={() => switchTo(l)}
            aria-current={active ? "true" : undefined}
            aria-label={label}
            title={label}
            className={clsx(
              "flex min-h-9 min-w-9 items-center justify-center rounded-full p-1.5 transition-all",
              active
                ? variant === "header"
                  ? "bg-white shadow-card ring-1 ring-nkgc-sand-200"
                  : "bg-white/15 ring-1 ring-white/30"
                : "opacity-55 hover:opacity-100"
            )}
          >
            <Flag className="h-3.5 w-5 rounded-[2px]" />
          </button>
        );
      })}
    </div>
  );
}
