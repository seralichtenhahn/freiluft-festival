<template>
  <picture>
    <source
      v-for="(option, i) in options"
      :key="i"
      :srcset="getSourceSet(option)"
      :media="option.media"
      :type="option.type"
    />
    <img :src="image.src | transformImage('0x1200/smart')" :alt="image.alt" />
  </picture>
</template>

<script>
export default {
  props: {
    image: {
      type: Object,
      required: true
    },
    options: {
      type: Array,
      default: () => [
        { type: "image/webp", media: "(min-width: 768px)", width: "1080" },
        { type: "image/webp", media: false, width: "720" },
        { type: false, media: "(min-width: 768px)", width: "1080" },
        { type: false, media: false, width: "720" }
      ]
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

      const [width, , height] = this.image.crop.split("")

      const ratio = width / height

      return `${options.width}x${Math.floor(options.width * ratio)}/smart`
    }
  }
}
</script>
