<template>
  <div>
    <AppHeader
      v-if="page.content.header.length"
      :blok="page.content.header[0]"
    />
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
import AppHeader from "@/components/App/AppHeader"
import storyBlokPage from "@/mixins/storyBlokPage"

export default {
  components: {
    AppHeader
  },
  mixins: [storyBlokPage],
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
            content {
              header
              content
            }
          }
        }
      `,
      update: (data) => data.PagehomeItem
    }
  }
}
</script>
