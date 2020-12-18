<template>
  <div
    v-editable="blok"
    class="container mx-auto mb-8 md:mb-24 lg:mb-36 xl:mb-48"
  >
    <div class="flex flex-wrap md:flex-no-wrap md:items-start">
      <div class="w-full md:w-1/2 md:flex-none mb-4 md:mb-0">
        <BaseRichText :content="blok.text" />
        <BaseLink
          v-if="blok.cta_link && blok.cta_name"
          :link="blok.cta_link"
          class="text-primary font-headline font-semibold uppercase border-primary border-b-2"
        >
          {{ blok.cta_name }}
        </BaseLink>
      </div>
      <BaseImage
        :image="blok.image[0]"
        :lazy="blok.lazyload_image"
        :class="[imageStyle]"
        class="w-full md:flex-1 mb-6 mr-2"
      />
    </div>
  </div>
</template>

<script>
import BaseImage from "@/components/Base/BaseImage"
import BaseLink from "@/components/Base/BaseLink"
import BaseRichText from "@/components/Base/BaseRichText"

export default {
  components: {
    BaseImage,
    BaseLink,
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
