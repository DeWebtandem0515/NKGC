import type { Metadata } from "next";
import Image from "next/image";
import { LoginForm } from "@/components/mijnnkgc/LoginForm";

export const metadata: Metadata = {
  title: "Inloggen op MijnNKGC",
  robots: { index: false, follow: false },
};

export default function MijnNkgcLoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-card bg-white p-8 shadow-card ring-1 ring-nkgc-sand-200 sm:p-10">
        <Image
          src="/brand/logo.png"
          alt="Nederlands Klauw Gezondheids Centrum"
          width={150}
          height={50}
          className="h-10 w-auto"
        />
        <h1 className="mt-6 text-xl font-bold text-nkgc-blue-900">Inloggen op MijnNKGC</h1>
        <p className="mt-2 text-sm text-nkgc-blue-700">
          Log in om uw persoonlijke verslagen en rapportages te bekijken.
        </p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
