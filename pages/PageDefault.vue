<template>
  <div class="min-h-screen-90">
    <header class="container mx-auto pt-16">
      <h1 class="text-4xl md:text-5xl lg:text-6xl">{{ page.title }}</h1>
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
import gql from "graphql-tag"
import storyBlokPage from "@/mixins/storyBlokPage"

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
  apollo: {
    page: {
      query: gql`
        query getPageDefault($id: ID!) {
          PagedefaultItem(id: $id) {
            content {
              title
              content
            }
          }
        }
      `,
      update: (data) => data.PagedefaultItem.content,
      variables() {
        return {
          id: this.$route.path
        }
      }
    }
  }
}
</script>
