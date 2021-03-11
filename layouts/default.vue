<template>
  <div>
    <AppNavigation :mode="hasHeader" />
    <nuxt />
    <AppFooter />
    <CookieLaw
      v-if="showCookieBanner"
      theme="ff-banner"
      class="bg-secondary bg-opacity-75"
      @accept="enableCookies"
    >
      <div
        slot-scope="props"
        class="flex flex-wrap md:flex-no-wrap md:w-full md:justify-around md:mx-16 md:items-center"
      >
        <p class="w-full text-center mb-2 md:text-left md:w-auto">
          Diese Seite benutzt Cookies um richtig zu funktionieren.
        </p>
        <div>
          <button
            class="bg-secondary text-white px-4 py-2 rounded mx-auto md:mx-0 md:my-4"
            @click="props.close"
          >
            <span>schliessen</span>
          </button>
          <button
            class="bg-primary text-white px-4 py-2 rounded mx-auto md:mx-0 md:my-4"
            @click="props.accept"
          >
            <span>akzeptieren</span>
          </button>
        </div>
      </div>
    </CookieLaw>
  </div>
</template>

<script>
import AppFooter from "@/components/App/AppFooter"
import AppNavigation from "@/components/App/AppNavigation"

export default {
  components: {
    AppFooter,
    AppNavigation,
    CookieLaw: () => import("vue-cookie-law")
  },
  data() {
    return {
      showCookieBanner: false
    }
  },
  computed: {
    hasHeader() {
      if (this.$route.name === "index") {
        return "light"
      }
      return "dark"
    }
  },
  mounted() {
    this.$ga.disable()
    const isCookieAccepted = localStorage.getItem("cookie:accepted")

    if (!isCookieAccepted) {
      this.showCookieBanner = true
    } else {
      this.enableCookies()
    }
  },
  methods: {
    enableCookies() {
      this.$ga.enable()
    }
  }
}
</script>
