import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16 renamed middleware.ts -> proxy.ts, maar Netlify's Next.js
// Runtime documenteert (nog) alleen middleware.ts, uitgevoerd via Edge
// Functions — proxy.ts wordt daar nergens genoemd, en proxy.ts draait in
// Next 16 uitsluitend op de Node.js-runtime (geen edge-optie), wat niet
// aansluit op hoe Netlify middleware momenteel implementeert. middleware.ts
// is in Next 16 alleen *deprecated*, niet verwijderd — functioneel identiek.
// Bewust op de oude naam gehouden zodat de NL/EN-routing op Netlify
// gegarandeerd werkt. Zodra Netlify proxy.ts officieel ondersteunt, kan dit
// bestand zonder inhoudelijke wijziging hernoemd worden.
export default createMiddleware(routing);

export const config = {
  // Sla /mijnnkgc (los NL-systeem), /api, en static assets over.
  matcher: ["/((?!api|mijnnkgc|_next|_vercel|.*\\..*).*)"],
};
