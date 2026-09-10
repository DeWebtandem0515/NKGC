import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Sla /mijnnkgc (los NL-systeem), /api, en static assets over.
  matcher: ["/((?!api|mijnnkgc|_next|_vercel|.*\\..*).*)"],
};
