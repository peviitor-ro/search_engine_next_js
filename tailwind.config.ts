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
        border_light_grey: "#e3e5e6",
        border_grey: "#dbdcdc",
        border_grey_lighter: "#dfe3e6",
        text_orange: "#f3781d",
        text_ink_black: "#090a0a",
        text_grey: "#979c9e",
        text_grey_darker: "#6f777a",
        background_green: "#048a81",
        background_grey: "#f0f3f6",
        background_dark_blue: "#032239",
        white: "#ffffff",
      },
      // background:{}
    },
  },
  plugins: [],
};
export default config;
