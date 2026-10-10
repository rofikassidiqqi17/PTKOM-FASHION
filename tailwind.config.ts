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
        fitcamp: {
          bg: "#f7f4f0",
          card: "#ffffff",
          primary: "#8c3f56",
          primaryHover: "#732f44",
          primaryDark: "#5a2335",
          primaryLight: "#ead9de",
          primarySoft: "#fcf7f8",
          text: "#292525",
          muted: "#76706c",
          border: "#e5ded8",
          borderLight: "#efeae5",
          success: "#628b69",
          danger: "#b04b5b",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
