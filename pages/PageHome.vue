<template>
  <div>
    <AppHeader />
    <div class="container">
      content
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag"
import AppHeader from "@/components/App/AppHeader"

export default {
  components: {
    AppHeader
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
