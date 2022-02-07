<template>
  <div>
    <div class="container mx-auto">
      <h1
        class="text-6xl lg:text-8xl mb-4 font-bold font-headline text-headline"
      >
        {{ page.title }}
      </h1>
    </div>
    <main v-if="page.content" class="pt-8">
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
