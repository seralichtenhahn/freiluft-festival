/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    fontFamily: {
      headline: ["Montserrat", "sans-serif"],
      body: ["Raleway", "Roboto", "Helvetica", "Arial", "sans-serif"]
    },
    container: {
      padding: "2rem"
    },
    extend: {
      colors: {
        primary: "#8BD2F5",
        secondary: "#F7AD54",
        headline: "#203B52",
        body: "#303138",
        cyan: {
          default: "#00F2FE",
          darker: "#16E0FE"
        }
      },
      fontSize: {
        "7xl": "5rem",
        "9xl": "6rem",
        "12xl": "8rem"
      },
      minHeight: {
        "screen-90": "90vh"
      },
      spacing: {
        "9/16": "56.25%",
        "1/1": "100%"
      }
    }
  },
  variants: {},
  plugins: [],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === "production",
    content: [
      "components/**/*.vue",
      "layouts/**/*.vue",
      "pages/**/*.vue",
      "plugins/**/*.js",
      "nuxt.config.js"
    ]
  }
}
