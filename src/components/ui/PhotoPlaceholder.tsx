import { HoofMark } from "./HoofMark";
import clsx from "clsx";

/**
 * Eerlijke fotoplaceholder — er is geen echte NKGC-fotografie aangeleverd in
 * dit project (zie docs/CONTENT_STRUCTURE.md). In plaats van een technisch
 * ogend "foto volgt"-label nemen deze placeholders bewust de geometrie en
 * toon van echte fotografie aan: een getemperd, fotografisch kleurvlak met
 * een subtiele vignet en een klein, rustig randschrift — geen dominant
 * label, geen diagonale rasterlijnen. Zodra een echte foto beschikbaar is,
 * vervangt <Media src="..."> deze 1-op-1 zonder de compositie te wijzigen.
 */
export function PhotoPlaceholder({
  label,
  className,
  tone = "blue",
}: {
  label: string;
  className?: string;
  tone?: "blue" | "green" | "sand";
}) {
  // Bewust middentonig en getemperd (geen near-black) zodat een placeholder
  // ook naast/over de donkere navy-secties leesbaar blijft als "een foto",
  // niet als nog meer donkere achtergrond.
  const toneGradient = {
    blue: "linear-gradient(155deg, #3B6B8C 0%, #2C5470 55%, #1C3C54 100%)",
    green: "linear-gradient(155deg, #7C8B6C 0%, #5F6E52 55%, #414A38 100%)",
    sand: "linear-gradient(155deg, #A79C8A 0%, #8B8172 55%, #6B6255 100%)",
  }[tone];

  return (
    <div
      className={clsx("relative h-full w-full overflow-hidden", className)}
      style={{ backgroundImage: toneGradient }}
      title={label}
    >
      {/* Subtiele vignet: geeft diepte alsof het een getemperde foto is. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(120% 100% at 50% 30%, transparent 40%, rgba(0,0,0,0.28) 100%)",
        }}
      />
      <HoofMark
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[15%] -right-[8%] h-[70%] w-auto text-white opacity-[0.07]"
      />
      <span className="absolute bottom-4 right-4 text-[10px] font-medium uppercase tracking-[0.18em] text-white/50">
        NKGC photography
      </span>
    </div>
  );
}
