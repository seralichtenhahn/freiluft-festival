<template>
  <div v-editable="blok" class="container mx-auto mb-8 md:mb-24">
    <BaseRichText :content="blok.text" class="w-full" />
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
  }
}
</script>
