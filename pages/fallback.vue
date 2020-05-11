<template>
  <div>
    <div class="container mx-auto">
      <h1>{{ page.content.title }}</h1>
    </div>
    <main class="pt-8">
      <component
        :is="blok.component"
        v-for="blok in page.content.content"
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
      page: ""
    }
  },
  apollo: {
    page: {
      query: gql`
        query getPageDefault($id: ID!) {
          PagedefaultItem(id: $id) {
            id
            content {
              title
              content
            }
          }
        }
      `,
      update: (data) => data.PagedefaultItem,
      variables() {
        return {
          id: this.$route.path
        }
      }
    }
  }
}
</script>
