<template>
  <nuxt-link
    v-if="isInternalLink(link.linktype)"
    :target="target"
    :to="translateInternalUrl(link.cached_url)"
  >
    <slot />
  </nuxt-link>
  <a
    v-else
    rel="noopener"
    :href="compileExternalLink(link.url)"
    target="_blank"
  >
    <slot />
  </a>
</template>

<script>
import links from "@/mixins/links"

export default {
  mixins: [links],
  props: {
    link: {
      type: Object,
      required: true
    },
    externalTab: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    target() {
      return this.externalTab ? "_blank" : false
    }
  }
}
</script>
