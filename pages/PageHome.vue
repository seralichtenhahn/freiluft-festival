<template>
  <div>
    <AppHeader v-if="page.header.length" :blok="page.header[0]" />
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
import AppHeader from "@/components/App/AppHeader"
import storyBlokPage from "@/mixins/storyBlokPage"

export default {
  components: {
    AppHeader
  },
  mixins: [storyBlokPage],
  data() {
    return {
      page: {
        header: [],
        content: [],
        meta: []
      }
    }
  },
  apollo: {
    page: {
      query: gql`
        query getPagehome {
          PagehomeItem(id: "home") {
            content {
              header
              content
              meta
            }
          }
        }
      `,
      update: (data) => data.PagehomeItem.content
    }
  }
}
</script>
