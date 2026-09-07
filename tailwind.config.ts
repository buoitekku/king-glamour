import type { Config } from "tailwindcss";

/**
 * Semantyczne tokeny (paper / ink / rule / muted / accent) żyją w
 * src/styles/tokens.css jako OKLCH i są tu tylko mapowane. Skale brand-* i
 * ink-* zostają dla stron, które jeszcze ich używają.
 */
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: "var(--color-paper)", 2: "var(--color-paper-2)", 3: "var(--color-paper-3)" },
        rule: { DEFAULT: "var(--color-rule)", 2: "var(--color-rule-2)" },
        muted: { DEFAULT: "var(--color-muted)", "on-dark": "var(--color-muted-on-dark)" },
        focus: "var(--color-focus)",
        forest: { DEFAULT: "var(--color-forest)", soft: "var(--color-forest-soft)" },
        cognac: { DEFAULT: "var(--color-cognac)", soft: "var(--color-cognac-soft)" },
        brand: {
          50: "#f6f3ee",
          100: "#ebe4d8",
          200: "#d6c8b0",
          300: "#bda684",
          400: "#a68860",
          500: "#8c6d45",
          600: "#735638",
          700: "#5a432d",
          800: "#3f2f21",
          900: "#2a1f16",
          950: "#17110c",
        },
        ink: {
          DEFAULT: "var(--color-ink)",
          2: "var(--color-ink-2)",
          "on-dark": "var(--color-ink-on-dark)",
          900: "#141210",
          700: "#3b3733",
          500: "#6b655e",
          300: "#b7b0a7",
          100: "#e9e4dd",
        },
        accent: { DEFAULT: "var(--color-accent)", ink: "var(--color-accent-ink)" },
      },
      fontFamily: {
        sans: ["var(--font-body)", "Georgia", "serif"],
        serif: ["var(--font-display)", "Georgia", "serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "Georgia", "serif"],
      },
      fontSize: {
        display: ["var(--text-display)", { lineHeight: "1", letterSpacing: "var(--tracking-display)" }],
      },
      fontWeight: {
        display: "var(--weight-display)",
        title: "var(--weight-title)",
      },
      borderRadius: {
        card: "var(--radius-card)",
        input: "var(--radius-input)",
      },
      boxShadow: {
        card: "0 1px 2px oklch(20% 0.01 70 / 0.05)",
        whisper: "0 1px 2px oklch(20% 0.01 70 / 0.05)",
      },
      transitionTimingFunction: {
        out: "var(--ease-out)",
      },
    },
  },
  plugins: [],
};

export default config;
