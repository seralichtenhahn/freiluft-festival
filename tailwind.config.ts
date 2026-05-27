import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      headline: ["var(--font-montserrat)", "sans-serif"],
      body: ["var(--font-raleway)", "Roboto", "Helvetica", "Arial", "sans-serif"],
    },
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        primary: "#8BD2F5",
        secondary: "#F7AD54",
        headline: "#203B52",
        body: "#303138",
        cyan: {
          DEFAULT: "#00F2FE",
          darker: "#16E0FE",
        },
        youtube: "#FF0000",
        facebook: "#4267B2",
      },
      fontSize: {
        "7xl": "5rem",
        "9xl": "6rem",
        "12xl": "8rem",
      },
      minHeight: {
        "screen-90": "90vh",
      },
      spacing: {
        "9/16": "56.25%",
        "1/1": "100%",
      },
    },
  },
  plugins: [typography],
};

export default config;
