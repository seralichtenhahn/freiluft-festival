<template>
  <!-- eslint-disable-next-line -->
  <div class="rich-text" :class="[classFontSize]" v-html="renderedHtml" />
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
    renderedHtml() {
      if (!this.content) {
        return ""
      }
      return this.$storyapi.richTextResolver.render(this.content)
    },
    classFontSize() {
      return `text-${this.fontSize}`
    }
  }
}
</script>
