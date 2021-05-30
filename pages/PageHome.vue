<template>
  <div>
    <component
      :is="headerComponent"
      v-if="page.header.length"
      :blok="page.header[0]"
    />
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
import AppHeader from "@/components/App/AppHeader"
import AppLivestreamHeader from "@/components/App/AppLivestreamHeader"
import storyBlokPage from "@/mixins/storyBlokPage"
import query from "@/queries/getPageHome"

export default {
  components: {
    AppHeader,
    AppLivestreamHeader
  },
  mixins: [storyBlokPage],
  data() {
    return {
      page: {
        header: [],
        banner: [],
        content: [],
        meta: []
      }
    }
  },
  async fetch() {
    const response = await this.$apollo.query({ query })
    const { header, content, meta, banner } = response.data.PagehomeItem.content
    this.page = {
      header,
      content,
      meta,
      banner
    }
  },
  computed: {
    headerComponent() {
      if (!this.page.header.length) {
        return false
      }

      return this.page.header[0].component.replace("page", "app")
    }
  },
  mounted() {
    console.log(this.page)
  }
}
</script>
