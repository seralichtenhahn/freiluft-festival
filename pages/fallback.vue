<template>
  <div>
    <div class="container mx-auto">
      <h1>{{ page.title }}</h1>
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
