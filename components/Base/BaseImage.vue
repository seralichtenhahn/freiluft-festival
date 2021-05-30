<template>
  <picture class="mx-auto">
    <source
      v-for="(option, i) in options"
      :key="i"
      :srcset="getSourceSet(option)"
      :data-srcset="getSourceSet(option)"
      :media="option.media"
      :type="option.type"
    />
    <img
      :src="getPath({ width: 1200 })"
      :data-src="getPath({ width: 1200 })"
      :alt="image.alt"
      :loading="lazy ? 'lazy' : 'auto'"
      class="w-full"
    />
  </picture>
</template>

<script>
export default {
  props: {
    image: {
      type: Object,
      required: true
    },
    placeholder: {
      type: Boolean,
      default: false
    },
    lazy: {
      type: Boolean,
      default: true
    },
    options: {
      type: Array,
      default: () => [
        { type: "image/webp", media: "(min-width: 768px)", width: "768" },
        { type: "image/webp", media: false, width: "568" },
        { type: false, media: "(min-width: 768px)", width: "768" },
        { type: false, media: false, width: "568" }
      ]
    }
  },
  computed: {
    hasPlaceholder() {
      if (!this.placeholder) {
        return false
      }

      return "/placeholder/lqip-1x1.jpg"
    },
    imgClasses() {
      return { preview: this.placeholder }
    }
  },
  methods: {
    getSourceSet(options) {
      const sizes = [1, 2]

      return sizes.map(
        (size) =>
          `${this.getPath({
            ...options,
            width: options.width * size
          })} ${size}x`
      )
    },
    getPath(options) {
      const imageService = "https://img2.storyblok.com/"
      const src = this.image.src

      let path = src.replace("https://a.storyblok.com", "")
      path = path === src ? src.replace("//a.storyblok.com", "") : path

      const filters = this.getFilters(options)
      const dimensions = this.getDimensions(options)

      return [imageService, dimensions, filters, path].join("")
    },
    getFilters(options) {
      const filters = ["/filters"]

      if (options.type) {
        filters.push(":format(webp)")
      }

      return filters.length > 1 ? filters.join("") : ""
    },
    getDimensions(options) {
      if (!this.image.crop) {
        return `${options.width}x0/smart`
      }

      const [width, height] = this.image.crop.split("x")

      const ratio = width / height

      return `${options.width}x${Math.floor(options.width * ratio)}/smart`
    }
  }
}
</script>

<style lang="postcss" scoped>
.preview {
  @apply bg-primary absolute h-full w-full object-cover;
}
</style>
