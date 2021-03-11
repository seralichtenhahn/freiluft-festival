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
      return `text-${this.fontSize}`
    }
  }
}
</script>
