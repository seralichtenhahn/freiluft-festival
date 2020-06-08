<template>
  <BaseMedia
    v-editable="blok"
    :container="blok.container"
    :size="blok.size"
    :aspect-ratio="blok.aspect_ratio"
  >
    <iframe
      :src="blok.embed_url"
      :height="blok.height"
      class="w-full"
      frameborder="0"
      allowtransparency="true"
      allow="encrypted-media"
    ></iframe>
  </BaseMedia>
</template>

<script>
import BaseMedia from "@/components/Base/BaseMedia"

export default {
  components: {
    BaseMedia
  },
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  computed: {
    src() {
      const youtube = "https://www.youtube.com/embed/"
      const controls = "?controls=0"

      if (!this.blok.controls) {
        return youtube + this.blok.id + controls
      }

      return youtube + this.blok.id
    }
  }
}
</script>
