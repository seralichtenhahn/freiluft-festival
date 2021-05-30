<template>
  <div class="min-h-screen-90">
    <header class="container mx-auto pt-8 md:mb-4">
      <h1 class="text-4xl md:text-6xl lg:text-8xl">{{ page.title }}</h1>
    </header>
    <main class="pt-8">
      <component
        :is="blok.component"
        v-for="blok in page.content"
        :key="blok._uid"
        :blok="blok"
      />
    </main>
  </div>
</template>

<script>
import storyBlokPage from "@/mixins/storyBlokPage"
import query from "@/queries/getPageDefault.gql"

export default {
  mixins: [storyBlokPage],
  data() {
    return {
      page: {
        title: "",
        content: []
      }
    }
  },
  async fetch() {
    const variables = { id: this.$route.path }
    const response = await this.$apollo.query({ query, variables })

    this.page = response.data.PagedefaultItem.content
  }
}
</script>
