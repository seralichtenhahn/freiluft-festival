<template>
  <div>
    <AppNavigation :mode="hasHeader" />
    <nuxt />
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from "@/components/App/AppFooter"
import AppNavigation from "@/components/App/AppNavigation"

export default {
  components: {
    AppFooter,
    AppNavigation
  },
  computed: {
    hasHeader() {
      if (this.$route.name === "index") {
        return "light"
      }
      return "dark"
    }
  }
}
</script>
