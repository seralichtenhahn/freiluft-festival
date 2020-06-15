<template>
  <BaseMedia v-editable="blok" :container="blok.container" :size="blok.size">
    <iframe
      :src="blok.src"
      :height="blok.height"
      class="w-full"
      frameborder="0"
      allowtransparency="true"
      :allow="blok.allow"
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
