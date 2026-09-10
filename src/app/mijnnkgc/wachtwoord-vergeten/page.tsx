import type { Metadata } from "next";
import Link from "next/link";
import { siteSettings } from "@/content/settings";

export const metadata: Metadata = {
  title: "Wachtwoord vergeten — MijnNKGC",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-card bg-white p-8 shadow-card ring-1 ring-nkgc-sand-200 sm:p-10">
        <h1 className="text-xl font-bold text-nkgc-blue-900">Wachtwoord vergeten</h1>
        <p className="mt-3 text-sm leading-relaxed text-nkgc-blue-700">
          Een geautomatiseerde wachtwoord-resetflow is nog niet gekoppeld aan MijnNKGC in deze
          omgeving. Neem contact op met NKGC om uw wachtwoord te laten resetten.
        </p>
        <div className="mt-6 space-y-2 text-sm">
          <a href={`mailto:${siteSettings.email}`} className="block font-medium text-nkgc-blue-800 hover:underline">
            {siteSettings.email}
          </a>
          <a href={siteSettings.phoneHref} className="block font-medium text-nkgc-blue-800 hover:underline">
            {siteSettings.phone}
          </a>
        </div>
        <Link href="/mijnnkgc/inloggen" className="btn-secondary mt-6 w-full">
          Terug naar inloggen
        </Link>
      </div>
    </div>
  );
}
