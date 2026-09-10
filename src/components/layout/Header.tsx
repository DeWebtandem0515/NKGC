"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import { Link } from "@/i18n/routing";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNav } from "./MobileNav";
import { useNavGroups } from "./nav-data";

export function Header() {
  const t = useTranslations("nav");
  const groups = useNavGroups();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={clsx(
          "sticky top-0 z-50 border-b bg-white/95 backdrop-blur transition-shadow duration-200",
          scrolled ? "border-nkgc-sand-200 shadow-card" : "border-transparent"
        )}
      >
        <div className="container flex h-20 items-center justify-between gap-4 lg:h-24 lg:gap-6">
          <Link href="/" className="flex shrink-0 items-center" aria-label="NKGC — home">
            <Image
              src="/brand/logo.png"
              alt="Nederlands Klauw Gezondheids Centrum"
              width={208}
              height={69}
              priority
              className="h-11 w-auto sm:h-12 lg:h-12 xl:h-14"
            />
          </Link>

          <nav aria-label="Hoofdnavigatie" className="hidden lg:block">
            <ul className="flex items-center gap-0.5 xl:gap-2">
              {groups.map((group) => (
                <li key={group.href} className="group relative">
                  <Link
                    href={group.href as never}
                    className="flex items-center whitespace-nowrap px-2.5 py-2 text-[13px] font-semibold uppercase tracking-[0.04em] text-nkgc-blue-900/80 transition-colors hover:text-nkgc-blue-900 xl:px-4 xl:tracking-[0.08em]"
                  >
                    {group.label}
                  </Link>
                  {group.children && (
                    <div className="invisible absolute left-1/2 top-full z-10 min-w-64 -translate-x-1/2 -translate-y-1 rounded-md bg-white p-2 opacity-0 shadow-premium ring-1 ring-nkgc-sand-200 transition-all duration-150 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <ul>
                        {group.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href as never}
                              className="block rounded px-4 py-2.5 text-sm text-nkgc-blue-700 hover:bg-nkgc-sand-50 hover:text-nkgc-blue-900"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 lg:flex xl:gap-5">
            <LanguageSwitcher />
            <NextLink href="/mijnnkgc/inloggen" className="btn-primary">
              {t("mijnNkgc")}
            </NextLink>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <NextLink href="/mijnnkgc/inloggen" className="btn-primary !min-h-9 !px-4 !py-2 text-xs">
              {t("mijnNkgc")}
            </NextLink>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="inline-flex min-h-11 min-w-11 items-center justify-center text-nkgc-blue-900"
              aria-label={t("openMenu")}
              aria-expanded={mobileOpen}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Buiten <header> gerenderd: backdrop-blur op de header vormt een CSS
          containing block voor `position: fixed`, waardoor dit paneel anders
          t.o.v. de header i.p.v. de viewport zou worden gepositioneerd. */}
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} groups={groups} />
    </>
  );
}
