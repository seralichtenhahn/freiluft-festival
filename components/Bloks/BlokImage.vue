<template>
  <div v-editable="blok" class="container mx-auto mb-8 md:mb-24">
    <BaseImage
      :image="blok.image[0]"
      :lazy="blok.lazyload_image"
      :options="imageOptions"
      class="w-full"
    />
    <p v-if="blok.caption" class="mt-4 italic text-sm text-center">
      {{ blok.caption }}
    </p>
  </div>
</template>

<script>
import BaseImage from "@/components/Base/BaseImage"

export default {
  components: {
    BaseImage
  },
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      imageOptions: [
        { type: "image/webp", media: "(min-width: 768px)", width: "1280" },
        { type: "image/webp", media: false, width: "768" },
        { type: false, media: "(min-width: 768px)", width: "1280" },
        { type: false, media: false, width: "768" }
      ]
    }
  }
}
</script>

<style lang="postcss" scoped>
>>> picture {
  box-shadow: 0.5rem 0.5rem 0 0 theme("colors.secondary");
}
</style>
