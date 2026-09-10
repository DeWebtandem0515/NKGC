import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { manrope } from "../fonts";
import "../../styles/globals.css";

/**
 * MijnNKGC is bewust een los NL-only segment buiten de [locale]-routing
 * (zie docs/MIJNNKGC_INTEGRATION.md): het is het bestaande klantportaal,
 * geen onderdeel van de publieke, meertalige marketingsite.
 */
export const metadata: Metadata = {
  title: "MijnNKGC",
  robots: { index: false, follow: false },
};

export default function MijnNkgcLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={manrope.variable} data-scroll-behavior="smooth">
      <body className="flex min-h-screen flex-col bg-nkgc-sand-50 font-sans">
        <header className="border-b border-nkgc-sand-200 bg-white">
          <div className="container flex h-16 items-center">
            <Link href="/" aria-label="NKGC — terug naar de website">
              <Image
                src="/brand/logo.png"
                alt="Nederlands Klauw Gezondheids Centrum"
                width={140}
                height={46}
                className="h-9 w-auto"
              />
            </Link>
          </div>
        </header>
        <main className="flex flex-1 flex-col">{children}</main>
      </body>
    </html>
  );
}
