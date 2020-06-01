<template>
  <!-- eslint-disable -->
  <div
    ref="richText"
    class="rich-text"
    :class="[classFontSize]"
    v-html="renderedHtml" 
  />
  <!-- eslint-enable -->
</template>

<script>
import RichTextResolver from "storyblok-js-client/source/richTextResolver"

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
      const richTextResolver = new RichTextResolver()
      return richTextResolver.render(this.content)
    },
    classFontSize() {
      return `text-${this.fontSize}`
    }
  },
  mounted() {
    const linksEl = this.$refs.richText.querySelectorAll("a[linktype='story']")

    if (!linksEl.length) {
      return
    }

    linksEl.forEach((el) => {
      el.addEventListener("click", this.onLinkClick)
    })

    this.$once("hook:beforeDestroy", () => {
      linksEl.forEach((el) => {
        el.removeEventListener("click", this.onLinkClick)
      })
    })
  },
  methods: {
    onLinkClick(e) {
      e.preventDefault()
      this.$router.push(e.target.pathname)
    }
  }
}
</script>
