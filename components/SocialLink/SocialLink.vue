<template>
  <a v-editable="blok" :href="blok.link" target="_blank" rel="noopener">
    <component :is="blok.type" :class="[height]" class="w-auto" />
    <span class="sr-only">{{ blok.type }}</span>
  </a>
</template>

<script>
import Instagram from "@/assets/icons/instagram.svg"
import Facebook from "@/assets/icons/facebook.svg"
import Twitter from "@/assets/icons/twitter.svg"
import Youtube from "@/assets/icons/youtube.svg"

export default {
  components: {
    Instagram,
    Facebook,
    Twitter,
    Youtube
  },
  props: {
    blok: {
      type: Object,
      required: true
    },
    height: {
      type: String,
      default: "h-5"
    }
  }
}
</script>
