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
      }
    }
  },
  variants: {},
  plugins: []
}
