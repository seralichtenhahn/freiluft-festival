<template>
  <BaseMedia
    v-editable="blok"
    :container="blok.container"
    :size="blok.size"
    :aspect-ratio="blok.aspect_ratio"
  >
    <LazyYoutubeVideo
      class="absolute inset-0 w-full h-full"
      :src="src"
      :iframe-attributes="iframeAttributes"
    />
  </BaseMedia>
</template>

<script>
import BaseMedia from "@/components/Base/BaseMedia"
import LazyYoutubeVideo from "vue-lazy-youtube-video"

export default {
  components: {
    BaseMedia,
    LazyYoutubeVideo
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
    },
    iframeAttributes() {
      return {
        frameborder: "0",
        allow:
          "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
        allowfullscreen: true,
        class: "absolute inset-0 w-full h-full"
      }
    }
  }
}
</script>

<style lang="postcss">
@import "vue-lazy-youtube-video/dist/style.css";
</style>
