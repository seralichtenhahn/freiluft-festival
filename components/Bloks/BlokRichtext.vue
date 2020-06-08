<template>
  <div
    v-editable="blok"
    class="container mx-auto mb-8 md:mb-24"
    :class="[smallerContainerClass]"
  >
    <BaseRichText :content="blok.text" class="w-full mx-auto" />
  </div>
</template>

<script>
import BaseRichText from "@/components/Base/BaseRichText"

export default {
  components: {
    BaseRichText
  },
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  computed: {
    smallerContainerClass() {
      if (!this.blok.smaller_container) {
        return ""
      }

      return "md:px-24 lg:px-56"
    }
  }
}
</script>
