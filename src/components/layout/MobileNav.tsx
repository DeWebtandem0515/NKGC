"use client";

import { useEffect } from "react";
import NextLink from "next/link";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { NavGroup } from "./nav-data";

export function MobileNav({
  open,
  onClose,
  groups,
}: {
  open: boolean;
  onClose: () => void;
  groups: NavGroup[];
}) {
  const t = useTranslations("nav");

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true">
      <button
        type="button"
        aria-label={t("closeMenu")}
        onClick={onClose}
        className="absolute inset-0 bg-nkgc-blue-900/40"
      />
      <div className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white p-6 shadow-card">
        <div className="mb-6 flex items-center justify-between">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={onClose}
            aria-label={t("closeMenu")}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-nkgc-blue-800 hover:bg-nkgc-sand-100"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav aria-label="Mobiele navigatie" className="flex-1 overflow-y-auto">
          <ul className="space-y-1">
            {groups.map((group) =>
              group.children ? (
                <li key={group.href}>
                  <details className="group/details">
                    <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between rounded-xl px-3 py-3 text-base font-semibold text-nkgc-blue-900 hover:bg-nkgc-sand-100">
                      {group.label}
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                        className="transition-transform group-open/details:rotate-180"
                      >
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                    </summary>
                    <ul className="mb-2 ml-3 space-y-1 border-l border-nkgc-sand-200 pl-3">
                      {group.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href as never}
                            onClick={onClose}
                            className="flex min-h-11 items-center rounded-lg px-3 py-2.5 text-[15px] text-nkgc-blue-700 hover:bg-nkgc-sand-100"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ) : (
                <li key={group.href}>
                  <Link
                    href={group.href as never}
                    onClick={onClose}
                    className="flex min-h-11 items-center rounded-xl px-3 py-3 text-base font-semibold text-nkgc-blue-900 hover:bg-nkgc-sand-100"
                  >
                    {group.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>

        <NextLink href="/mijnnkgc/inloggen" className="btn-primary mt-4 w-full">
          {t("mijnNkgc")}
        </NextLink>
      </div>
    </div>
  );
}
