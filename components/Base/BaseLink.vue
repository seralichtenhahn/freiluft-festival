<template>
  <nuxt-link
    v-if="isInternalLink(link.linktype)"
    :target="target"
    :to="translateInternalUrl(link.cached_url)"
  >
    <slot />
  </nuxt-link>
  <Mailto v-else-if="isEmail(link.linktype)" :mail="link.email" />
  <a v-else rel="noopener" :href="compileExternalLink(link)" target="_blank">
    <slot />
  </a>
</template>

<script>
import Mailto from "nuxt-protected-mailto/components/Mailto"
import links from "@/mixins/links"

export default {
  components: {
    Mailto
  },
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
