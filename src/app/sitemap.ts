import type { MetadataRoute } from "next";
import { getPathname, routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/seo";

const PATHS = Object.keys(routing.pathnames) as Array<keyof typeof routing.pathnames>;

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((href) => {
    const nl = `${siteUrl}${getPathname({ locale: "nl", href })}`;
    const en = `${siteUrl}${getPathname({ locale: "en", href })}`;

    return {
      url: nl,
      lastModified: new Date(),
      alternates: { languages: { "nl-NL": nl, en } },
    };
  });
}
