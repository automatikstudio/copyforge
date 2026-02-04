import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#2563EB",
          pink: "#EC4899",
          bg: "#F8FAFC",
          surface: "#FFFFFF",
          text: "#111827",
        },
      },
      fontFamily: {
        heading: ["Syne", "sans-serif"],
        body: ["Work Sans", "sans-serif"],
      },
      borderRadius: {
        btn: "8px",
        card: "14px",
      },
    },
  },
  plugins: [],
};
export default config;
