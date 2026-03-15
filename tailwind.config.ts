import type { Config } from "tailwindcss";

/**
 * Tailwind configuration mapping CSS custom properties from tokens.css
 * to the Tailwind utility classes. This enforces design system constraints.
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-bg)",
        surface: "var(--color-surface)",
        "surface-2": "var(--color-surface-2)",
        "surface-3": "var(--color-surface-3)",
        border: {
          DEFAULT: "var(--color-border)",
          soft: "var(--color-border-soft)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          light: "var(--color-accent-light)",
        },
        cyan: "var(--color-cyan)",
        amber: "var(--color-amber)",
        green: "var(--color-green)",
        red: "var(--color-red)",
        text: {
          DEFAULT: "var(--color-text)",
          2: "var(--color-text-2)",
          3: "var(--color-text-3)",
        },
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
    },
  },
  plugins: [],
};

export default config;
