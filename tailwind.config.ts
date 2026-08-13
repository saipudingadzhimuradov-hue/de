import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        milk: "#F6F3EC",
        graphite: "#2E2C29",
        ink: "#141312",
        wood: "#A47551",
        wooddark: "#6E4A32",
        beige: "#DCCFB8",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        wrap: "1440px",
      },
    },
  },
  plugins: [],
};

export default config;
