import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      PoppinsLight: ["PoppinsLight", "sans-serif"],
      JustMandrone: ["JustMandrone", "sans-serif"],
      PoppinsRegular: ["PoppinsRegular", "sans-serif"],
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        border_light_grey: "#e3e5e6",
        border_grey: "#dbdcdc",
        border_grey_lighter: "#dfe3e6",
        text_orange: "#f3781d",
        text_ink_black: "#090a0a",
        text_grey: "#4b4646",
        text_grey_darker: "#6f777a",
        background_green: "#048a81",
        background_grey: "#f0f3f6",
        background_dark_blue: "#032239",
        white: "#ffffff",
      },
    },
  },
  plugins: [],
};
export default config;
