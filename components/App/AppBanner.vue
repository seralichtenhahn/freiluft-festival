<template>
  <div
    v-if="banner.text"
    v-editable="banner"
    class="bg-secondary text-headline text-center py-2 px-4"
  >
    <BaseRichText class="max-w-none prose-p:mb-0" :content="banner.text" />
  </div>
</template>

<script>
import get from "lodash/get"
import BaseRichText from "@/components/Base/BaseRichText"
import query from "@/queries/getBanner.gql"

export default {
  name: "AppBanner",
  components: {
    BaseRichText
  },
  data() {
    return {
      banner: {
        text: ""
      }
    }
  },
  async fetch() {
    const response = await this.$apollo.query({ query })
    this.banner = get(response, "data.SettingsItem.content.banner[0]", false)
  }
}
</script>

