import type { Config } from "tailwindcss";

// Colors sampled directly from the original NKGC logo/favicon assets
// (see docs/DESIGN_SYSTEM.md for the exact sampling method and values).
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1180px",
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        nkgc: {
          green: {
            DEFAULT: "#76B404",
            50: "#F3F9E8",
            100: "#E4F2C9",
            200: "#CBE697",
            300: "#AEd75F",
            400: "#93C830",
            500: "#76B404",
            600: "#659B03",
            700: "#517C03",
            800: "#3D5D02",
            900: "#2A3F02",
          },
          blue: {
            DEFAULT: "#04539D",
            50: "#EAF2FA",
            100: "#CADFF2",
            200: "#96BFE5",
            300: "#5E9BD5",
            400: "#2C78C2",
            500: "#0D5EA9",
            600: "#04539D",
            700: "#043F78",
            800: "#0B3153",
            // Rijkere, premium navy voor grote donkere vlakken (hero, banners,
            // footer) — dieper dan het gemeten woordmerkblauw hierboven, dat
            // los blijft bestaan voor tekst/links. Zie docs/DESIGN_SYSTEM.md.
            900: "#082B49",
            950: "#051B30",
          },
          sky: {
            DEFAULT: "#2977E6",
          },
          sand: {
            50: "#F7F6F2",
            100: "#F1EEE6",
            200: "#E7E2D5",
          },
          // Neutrale, "fotografische" tinten voor MediaPlaceholder — bewust
          // geen blauw/groen, zodat een placeholder oogt als een getemperde
          // foto in plaats van een gekleurd UI-vlak.
          stone: {
            600: "#5B6570",
            700: "#454E57",
            800: "#333A41",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose: "68ch",
        site: "1600px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(3, 44, 84, 0.06), 0 4px 16px rgba(3, 44, 84, 0.08)",
        premium: "0 24px 64px -24px rgba(5, 27, 48, 0.35)",
      },
      borderRadius: {
        card: "0.75rem",
        btn: "0.625rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
