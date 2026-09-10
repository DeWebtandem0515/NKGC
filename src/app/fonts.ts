import { Manrope } from "next/font/google";

// Manrope: moderne, zeer leesbare sans-serif — rustig genoeg voor een
// agrarisch/veterinair merk, zonder een "AI-startup"-uitstraling.
// next/font self-host: geen extern lettertype-verzoek, geen CLS.
export const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});
