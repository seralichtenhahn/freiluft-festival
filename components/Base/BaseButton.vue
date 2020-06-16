<template>
  <BaseLink
    :link="blok.link"
    :external-tab="blok.external_tab"
    class="text-white font-headline font-semibold uppercase px-4 py-2 text-center rounded tracking-wide"
    :class="[btnStyle]"
  >
    <component :is="prefixIcon" v-if="prefixIcon" class="h-5 inline-block" />
    {{ blok.title }}
  </BaseLink>
</template>

<script>
import BaseLink from "@/components/Base/BaseLink"
import IconYoutube from "@/assets/icons/youtube.svg"
import IconFacebook from "@/assets/icons/facebook.svg"
import IconHeart from "@/assets/icons/heart.svg"

export default {
  components: {
    BaseLink,
    IconYoutube,
    IconFacebook,
    IconHeart
  },
  props: {
    blok: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    btnStyle() {
      const styles = {
        default: "bg-secondary",
        youtube: "bg-youtube",
        facebook: "bg-facebook",
        donate: "bg-secondary"
      }

      return styles[this.blok.style]
    },
    prefixIcon() {
      const icons = {
        youtube: "IconYoutube",
        facebook: "IconFacebook",
        donate: "IconHeart"
      }

      return icons[this.blok.style] || false
    }
  }
}
</script>
