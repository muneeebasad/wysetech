import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-blue": "#1A4F8A",
        "accent-teal": "#0F6E56",
        "danger-red": "#A32D2D",
        "bg-dark": "#0D1117",
        surface: "#161B22",
        "border-dark": "#21262D",
        "text-primary": "#E6EDF3",
        "text-muted": "#8B949E",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        "scroll-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "scroll-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        shimmer: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(26,79,138,0.4)" },
          "50%": { boxShadow: "0 0 0 8px rgba(26,79,138,0)" },
        },
      },
      animation: {
        "scroll-left": "scroll-left 35s linear infinite",
        "scroll-right": "scroll-right 42s linear infinite",
        shimmer: "shimmer 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
