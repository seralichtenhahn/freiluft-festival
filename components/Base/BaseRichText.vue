<template>
  <div class="rich-text" :class="[classFontSize]">
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
        xs: "text-xs",
        sm: "text-sm",
        base: "text-base",
        lg: "text-lg",
        xl: "text-xl"
      }
      return sizes[this.fontSize]
    }
  }
}
</script>
