<template>
  <!-- eslint-disable-next-line -->
  <div class="rich-text" v-html="renderedHtml" />
</template>

<script>
export default {
  props: {
    content: {
      type: [Object, String],
      required: true
    }
  },
  computed: {
    renderedHtml() {
      if (!this.content) {
        return ""
      }
      return this.$storyapi.richTextResolver.render(this.content)
    }
  }
}
</script>
