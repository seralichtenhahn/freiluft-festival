<template>
  <div v-editable="blok" class="container mx-auto mb-8 md:mb-48">
    <div class="flex flex-wrap md:flex-no-wrap md:items-start">
      <BaseRichText :content="blok.text" class="w-full md:w-1/2 md:flex-none" />
      <BaseImage
        :image="blok.image[0]"
        :class="[imageStyle]"
        class="w-full md:flex-1 mb-6 mr-2"
      />
    </div>
  </div>
</template>

<script>
import BaseImage from "@/components/Base/BaseImage"
import BaseRichText from "@/components/Base/BaseRichText"

export default {
  components: {
    BaseImage,
    BaseRichText
  },
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  computed: {
    imageStyle() {
      const styles = {
        "image-left": "md:order-first md:mr-16",
        "image-right": "md:ml-16"
      }
      return styles[this.blok.style]
    }
  }
}
</script>

<style lang="postcss" scoped>
>>> picture {
  box-shadow: 0.5rem 0.5rem 0 0 theme("colors.secondary");
}
</style>
