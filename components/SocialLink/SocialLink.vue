<template>
  <a
    v-editable="blok"
    :href="blok.link"
    target="_blank"
    rel="noopener"
    class="opacity-50 text-headline mr-2"
  >
    <component :is="blok.type" class="h-5 w-auto" />
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
