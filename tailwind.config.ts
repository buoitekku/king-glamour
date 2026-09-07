import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
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
          900: "#141210",
          700: "#3b3733",
          500: "#6b655e",
          300: "#b7b0a7",
          100: "#e9e4dd",
        },
        accent: "#b5122b",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(20,18,16,0.06), 0 8px 24px -12px rgba(20,18,16,0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
