import { Container } from "@/components/ui/Container";
import { HoofMark } from "@/components/ui/HoofMark";

/**
 * Kort, cursief missiestatement direct na de hero — bewust klein en
 * ingetogen (geen grote hero-achtige kop) zodat het als een missie/quote
 * leest, niet als een tweede headline. Fungeert als korte brug tussen de
 * hero en de eerste inhoudelijke sectie, zonder de pagina onnodig te
 * verlengen.
 */
export function BrandStatement({ quote }: { quote: string }) {
  return (
    <section className="relative overflow-hidden bg-nkgc-sand-50 py-12 sm:py-16">
      <HoofMark
        aria-hidden="true"
        className="pointer-events-none absolute -left-14 top-1/2 h-40 w-auto -translate-y-1/2 text-nkgc-blue-900 opacity-[0.05] sm:h-52"
      />
      <Container className="relative text-center">
        <span aria-hidden="true" className="mx-auto mb-4 block h-0.5 w-10 bg-nkgc-green-600" />
        <p className="text-statement mx-auto max-w-2xl">{quote}</p>
      </Container>
    </section>
  );
}
