<template>
  <div v-editable="blok" class="container mx-auto mb-16 md:mb-24">
    <div class="flex flex-wrap md:flex-no-wrap md:items-center">
      <BaseImage
        :image="blok.image[0]"
        :class="[imageStyle]"
        class="w-full mb-8 md:w-1/2 lg:w-5/12 md:mb-0"
      />
      <div class="w-full md:w-1/2 lg:w-7/12">
        <p v-if="blok.time">{{ blok.time }}</p>
        <h3
          class="text-4xl font-bold leading-none mb-2 md:text-6xl lg:text-9xl"
        >
          {{ blok.title }}
        </h3>
        <div class="flex items-center">
          <BaseLink
            :link="blok.link"
            class="text-primary font-headline font-semibold uppercase border-primary border-b-2 text-primary"
            >Mehr infos</BaseLink
          >
          <span class="mx-2">•</span>
          <SocialLink
            v-for="social_link in blok.social_links"
            :key="social_link._uid"
            :blok="social_link"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseImage from "@/components/Base/BaseImage"
import BaseLink from "@/components/Base/BaseLink"
import SocialLink from "@/components/SocialLink/SocialLink"

export default {
  components: {
    BaseImage,
    BaseLink,
    SocialLink
  },
  props: {
    blok: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      default: 0
    }
  },
  computed: {
    imageStyle() {
      const styles = ["md:order-last md:ml-16", "md:mr-16"]

      if (this.index === 0) {
        return styles[0]
      }

      return styles[this.index % 2]
    }
  }
}
</script>

<style lang="postcss" scoped>
>>> picture {
  box-shadow: 0.5rem 0.5rem 0 0 theme("colors.secondary");
}
</style>
