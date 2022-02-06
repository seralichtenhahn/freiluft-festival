<template>
  <div
    class="
      rich-text
      prose
      prose-h2:text-4xl prose-h2:mt-0 prose-h2:text-headline
      md:prose-h2:text-5xl md:prose-h2:leading-tight
      lg:prose-h2:mb-8 lg:prose-h2:text-6xl
      prose-p:mt-0
    "
    :class="[classFontSize]"
  >
    <rich-text-renderer v-if="content" :document="content" />
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: [Object, String],
      required: true
    },
    fontSize: {
      type: String,
      default: "lg"
    }
  },
  computed: {
    classFontSize() {
      const sizes = {
        xs: "prose-xs",
        sm: "prose-sm",
        base: "prose-base",
        lg: "prose-lg",
        xl: "prose-xl"
      }
      return sizes[this.fontSize]
    }
  }
}
</script>
