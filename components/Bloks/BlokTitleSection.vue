<template>
  <div
    v-editable="blok"
    class="container mx-auto md:px-24 lg:px-56 mb-8 md:mb-32"
  >
    <h2 class="text-headline text-2xl md:text-3xl">
      {{ blok.title }}
    </h2>
    <BaseRichText
      :content="blok.text"
      font-size="2xl"
      class="md:max-w-screen-sm text-2xl"
    />
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
