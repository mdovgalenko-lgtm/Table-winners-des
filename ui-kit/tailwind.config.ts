import type { Config } from "tailwindcss";
import { primitives, tailwindTokens } from "./tokens";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [primitives.typography.family.general, "Helvetica", "sans-serif"],
      },
      colors: tailwindTokens.colors,
      borderRadius: tailwindTokens.borderRadius,
      fontSize: {
        xs: [`${primitives.typography.size.xs}px`, `${primitives.typography.lineHeight.xs}px`],
        sm: [`${primitives.typography.size.sm}px`, `${primitives.typography.lineHeight.sm}px`],
        md: [`${primitives.typography.size.md}px`, `${primitives.typography.lineHeight.md}px`],
        lg: [`${primitives.typography.size.lg}px`, `${primitives.typography.lineHeight.lg}px`],
        "lg+": [`${primitives.typography.size["lg+"]}px`, `${primitives.typography.lineHeight.xl}px`],
        xl: [`${primitives.typography.size.xl}px`, `${primitives.typography.lineHeight["2xl"]}px`],
        "2xl": [`${primitives.typography.size["2xl"]}px`, `${primitives.typography.lineHeight["2xl"]}px`],
        "3xl": [`${primitives.typography.size["3xl"]}px`, `${primitives.typography.lineHeight["3xl"]}px`],
        "4xl": [`${primitives.typography.size["4xl"]}px`, `${primitives.typography.lineHeight["4xl"]}px`],
        "5xl": [`${primitives.typography.size["5xl"]}px`, `${primitives.typography.lineHeight["5xl"]}px`],
      },
      spacing: {
        "space-01": "4px",
        "space-02": "8px",
        "space-06": "24px",
        "space-07": "32px",
      },
      boxShadow: {
        glass: "0 4px 24px 0 rgba(0,0,0,0.4)",
        card: "0 2px 12px 0 rgba(0,0,0,0.3)",
        brand: "0 0 20px 0 rgba(131,82,255,0.25)",
        header: "0 1px 5px 0 rgba(0,0,0,0.15)",
        "header-lg": "0 1px 5px 2px rgba(0,0,0,0.15)",
        nav: "0 -4px 7px 0 rgba(0,0,0,0.05)",
        widget: "0 1px 5px 0 rgba(0,0,0,0.15)",
      },
      backgroundImage: {
        "gradient-brand": `linear-gradient(135deg, ${primitives.color.brand["1"][500]} 0%, ${primitives.color.brand["2"][500]} 100%)`,
        "gradient-blue": `linear-gradient(135deg, ${primitives.color.brand["3"][500]} 0%, ${primitives.color.brand["1"][500]} 100%)`,
        "gradient-warm": "linear-gradient(133deg, #36282E 0%, #E77341 100%)",
        "gradient-warm-v": "linear-gradient(180deg, #36282E 0%, #E77341 100%)",
        "gradient-pink": "linear-gradient(105deg, #372539 3%, #F6568B 100%)",
        "gradient-purple-deep": "linear-gradient(133deg, #282544 0%, #6A53EC 100%)",
        "gradient-purple-light": "linear-gradient(133deg, #2F2546 0%, #A456F6 100%)",
        "gradient-blue-soft": "linear-gradient(103deg, #292A44 1%, #6B80ED 100%)",
        "gradient-banner": "linear-gradient(to bottom, #6B80ED 0%, #292A44 100%)",
        "gradient-fog": "linear-gradient(to bottom, rgba(0,0,0,0) 9%, rgba(0,0,0,0.4) 61%)",
      },
    },
  },
  plugins: [],
};

export default config;
