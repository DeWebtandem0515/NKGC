import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { HoofMark } from "@/components/ui/HoofMark";

export function CtaSection({
  heading,
  description,
  cta,
  href = "/contact",
}: {
  heading: string;
  description?: string;
  cta: string;
  href?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-nkgc-blue-900 py-14 sm:py-20">
      <HoofMark
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -left-10 h-56 w-auto text-white/[0.05] sm:h-72"
      />
      <Container className="relative max-w-2xl text-center">
        <h2 className="text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl">
          {heading}
        </h2>
        {description && (
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/75">
            {description}
          </p>
        )}
        <Link href={href as never} className="btn-on-dark mt-9 inline-flex">
          {cta}
        </Link>
      </Container>
    </section>
  );
}
