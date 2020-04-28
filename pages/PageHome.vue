<template>
  <div class="container">
    <div>
      {{ page }}
      <logo />
      <h1 class="title">
        freiluft-festival
      </h1>
      <h2 class="subtitle">
        rebuild of the freiluftfestival.ch website
      </h2>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag"
import Logo from "~/components/Logo.vue"

export default {
  components: {
    Logo
  },
  data() {
    return {
      page: ""
    }
  },
  apollo: {
    page: {
      query: gql`
        query getPagehome {
          PagehomeItem(id: "home") {
            id
            slug
          }
        }
      `,
      update: (data) => data.PagehomeItem
    }
  }
}
</script>

<style lang="postcss">
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
</style>
