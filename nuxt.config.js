export default {
  ssr: true,
  target: "static",
  /*
   ** Headers of the page
   */
  head: {
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#8BD2F5" }
    ],
    link: [
      { rel: "shortcut icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#8BD2F5" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "@/plugins/components.js",
    "@/plugins/filters.js",
    "@/plugins/imports.js"
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    "@nuxtjs/eslint-module",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-analytics",
    ["@nuxtjs/pwa", { workbox: false, meta: false }],
    "@wearewondrous/nuxt-storyblok-router",
    "nuxt-webfontloader"
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/apollo", "storyblok-nuxt"],

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

  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID
  },

  /*
   * Storyblok Router settings
   */
  storyblokRouter: {
    accessToken: process.env.STORYBLOK_TOKEN,
    version: process.env.STORYBLOK_VERSION,
    exclude: ["_settings"],
    useFallback: true,
    sitemap: {
      hostname: "https://freiluftfestival.ch",
      cacheTime: 10000000000
    }
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

  pwa: {
    manifest: {
      name: "freiluft festival",
      lang: "de-CH"
    }
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    transpile: ["animejs"],
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
