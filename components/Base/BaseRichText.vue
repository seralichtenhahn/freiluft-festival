<template>
  <!-- eslint-disable-next-line -->
  <div
    ref="richText"
    class="rich-text"
    :class="[classFontSize]"
    v-html="renderedHtml"
  />
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
  },
  mounted() {
    const linksEl = this.$refs.richText.querySelectorAll(
      ".rich-text a[linktype='story']"
    )

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
      const to = e.target.pathname
      this.$router.push(to)
    }
  }
}
</script>
