require("dotenv").config()

export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["@/plugins/components.js", "@/plugins/filters.js"],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    "@nuxtjs/eslint-module",
    "@nuxtjs/tailwindcss",
    "@wearewondrous/nuxt-storyblok-router",
    "nuxt-webfontloader"
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // "@nuxtjs/pwa",
    "@nuxtjs/dotenv",
    "@nuxtjs/apollo",
    "storyblok-nuxt"
  ],

  /*
   * Apollo settings
   */
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: "https://gapi.storyblok.com/v1/api",
        httpLinkOptions: {
          headers: {
            token: process.env.STORYBLOK_TOKEN,
            version: process.env.STORYBLOK_VERSION
          }
        }
      }
    }
  },
  /*
   * Apollo settings
   */
  storyblokRouter: {
    accessToken: process.env.STORYBLOK_TOKEN,
    version: process.env.STORYBLOK_VERSION,
    exclude: ["_settings"]
  },

  webfontloader: {
    custom: {
      families: ["Montserrat:n6,n7", "Raleway:n4"],
      urls: [
        "https://fonts.googleapis.com/css?family=Montserrat:600,700&display=swap",
        "https://fonts.googleapis.com/css?family=Raleway:400&display=swap"
      ]
    }
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      const svgRule = config.module.rules.find((rule) => rule.test.test(".svg"))

      svgRule.test = /\.(png|jpe?g|gif|webp)$/

      config.module.rules.push({
        test: /\.svg$/,
        use: [
          "babel-loader",
          {
            loader: "vue-svg-loader",
            options: {
              svgo: {
                plugins: [
                  { prefixIds: true },
                  { removeDimensions: true },
                  { removeViewBox: false },
                  { removeTitle: true }
                ]
              }
            }
          }
        ]
      })
    },
    babel: {
      presets({ isServer }) {
        return [
          [
            require.resolve("@nuxt/babel-preset-app"),
            {
              buildTarget: isServer ? "server" : "client",
              corejs: { version: 3 }
            }
          ]
        ]
      }
    }
  }
}
