<template>
  <a
    v-editable="blok"
    :href="blok.link"
    target="_blank"
    rel="noopener"
    class="w-5 opacity-50 text-headline"
  >
    <component :is="blok.type" />
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
    }
  }
}
</script>
