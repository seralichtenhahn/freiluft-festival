<template>
  <div v-editable="blok" class="container mx-auto mb-16 md:mb-32">
    <div
      :class="{ 'md:flex-row-reverse md:space-x-reverse': index % 2 === 0 }"
      class="flex flex-wrap md:flex-nowrap md:items-center md:space-x-16 md:justify-between"
    >
      <div
        ref="image"
        class="w-full mb-8 md:w-1/2 lg:w-5/12 md:mb-0 bg-secondary preserve-3d p-3 shadow-xl"
        style="transform: perspective(1000px)"
      >
        <BaseImage
          :image="blok.image[0]"
          :lazy="blok.lazyload_image"
          class="block"
          style="transform: translateZ(45px)"
        />
      </div>
      <div class="w-full md:flex-1">
        <p v-if="blok.time">{{ blok.time }}</p>
        <h3
          class="text-4xl font-bold leading-none mb-2 md:text-6xl lg:text-9xl md:mb-6"
        >
          {{ blok.title }}
        </h3>
        <div class="flex items-center">
          <BaseLink
            :link="blok.link"
            class="text-primary font-headline font-semibold uppercase border-primary border-b-2"
            >Mehr infos</BaseLink
          >
          <span v-if="blok.social_links.length" class="mx-2">•</span>
          <SocialLink
            v-for="social_link in blok.social_links"
            :key="social_link._uid"
            :blok="social_link"
            class="opacity-50 text-headline mr-2"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VanillaTilt from "vanilla-tilt"
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
  mounted() {
    VanillaTilt.init(this.$refs.image, {
      glare: true,
      reverse: true,
      max: 10,
      startX: this.index % 2 === 0 ? -6 : 6
    })
  }
}
</script>
