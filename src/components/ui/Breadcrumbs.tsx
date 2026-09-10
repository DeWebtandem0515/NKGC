import { Link } from "@/i18n/routing";

export interface Crumb {
  href: string;
  label: string;
}

export function Breadcrumbs({ items, homeLabel }: { items: Crumb[]; homeLabel: string }) {
  const allLabels = [homeLabel, ...items.map((item) => item.label)];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allLabels.map((name, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="border-b border-nkgc-sand-200 bg-nkgc-sand-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="container flex flex-wrap items-center gap-1.5 py-3 text-sm text-nkgc-blue-600">
        <li>
          <Link href="/" className="hover:text-nkgc-blue-900 hover:underline">
            {homeLabel}
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-1.5">
            <span aria-hidden="true">/</span>
            {index === items.length - 1 ? (
              <span aria-current="page" className="font-medium text-nkgc-blue-900">
                {item.label}
              </span>
            ) : (
              <Link href={item.href as never} className="hover:text-nkgc-blue-900 hover:underline">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
