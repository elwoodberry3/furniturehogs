import type { Config } from "tailwindcss";

// Design tokens sourced directly from the Furniture Hogs brand sheet.
// One source of truth — components consume these, never raw hex.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        hog: {
          red: "#E32128",
          black: "#1A1A1A",
          grey: "#545454",
          white: "#FFFFFF",
        },
        navy: {
          DEFAULT: "#0A2440",
          deep: "#061A30",
        },
        silver: "#BABABA",
        sienna: "#CC663E", // button-text accent per brand sheet
        oak: "#C9A056",
        panel: {
          DEFAULT: "#12233B",
          alt: "#0C1B30",
        },
      },
      borderRadius: {
        brand: "5px", // locked button radius
      },
      fontFamily: {
        // Futura display/body. Jost is the geometric-sans web proxy (Futura isn't a webfont).
        sans: ["var(--font-jost)", "Futura", "Century Gothic", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        eyebrow: "0.22em",
      },
      boxShadow: {
        card: "0 18px 50px -20px rgba(0,0,0,.65)",
      },
    },
  },
  plugins: [],
};

export default config;
