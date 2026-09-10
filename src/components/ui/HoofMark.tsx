/**
 * Vereenvoudigde, geometrische weergave van het NKGC-klauwsymbool.
 * Bedoeld als subtiel grafisch detail (zie docs/DESIGN_SYSTEM.md) — geen
 * exacte reproductie van het logo-bestand, dat als los beeldmerk (logo.png)
 * gebruikt blijft in header/footer.
 */
export function HoofMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" fill="none" aria-hidden="true" className={className}>
      <path
        d="M45 4C33 4 20 22 16 42c-3 16-2 33 10 42 8 6 17 3 20-6 2-7 2-16 2-27 0-18-1-34-3-47Z"
        fill="currentColor"
      />
      <path
        d="M75 4C87 4 100 22 104 42c3 16 2 33-10 42-8 6-17 3-20-6-2-7-2-16-2-27 0-18 1-34 3-47Z"
        fill="currentColor"
      />
    </svg>
  );
}
