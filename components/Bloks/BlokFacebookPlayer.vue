<template>
  <BaseMedia
    v-editable="blok"
    :container="blok.container"
    :size="blok.size"
    :aspect-ratio="blok.aspect_ratio"
  >
    <iframe
      :src="blok.src"
      frameborder="0"
      allow="accelerometer; autoplay; picture-in-picture"
      allowfullscreen
      class="absolute inset-0 w-full h-full"
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
  }
}
</script>
