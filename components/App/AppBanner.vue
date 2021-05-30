<template>
  <div
    v-editable="banner"
    class="bg-secondary text-headline text-center py-2 px-4"
  >
    <BaseRichText :content="banner.text" />
  </div>
</template>

<script>
import BaseRichText from "@/components/Base/BaseRichText"
import get from "lodash/get"
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
  },
  methods: {
    //
  }
}
</script>

<style lang="postcss" scoped>
>>> p {
  margin-bottom: 0 !important;
  max-width: 100%;
}
</style>
