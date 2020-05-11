<template>
  <a
    v-if="blok.link.url"
    rel="noopener"
    :href="compileExternalLink(blok.link.url)"
    target="_blank"
  >
    <BaseImage :image="blok.image[0]" :options="options" />
  </a>
  <BaseImage v-else :image="blok.image[0]" :options="options" />
</template>

<script>
import links from "@/mixins/links"
import BaseImage from "@/components/Base/BaseImage"

export default {
  components: {
    BaseImage
  },
  mixins: [links],
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      options: [
        { type: "image/webp", media: false, width: "240" },
        { type: false, media: false, width: "240" }
      ]
    }
  }
}
</script>
