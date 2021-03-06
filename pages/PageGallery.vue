<template>
  <div class="min-h-screen-90">
    <header class="container mx-auto pt-16">
      <h1 class="text-4xl md:text-5xl lg:text-6xl">{{ page.title }}</h1>
      <p v-if="page.subtitle">
        {{ page.subtitle }}
      </p>
    </header>
    <main class="container mx-auto mb-8 md:mb-16">
      <p v-if="page.photographer">📷: {{ page.photographer }}</p>
      <p v-if="page.date">📅: {{ date }}</p>
      <ul class="flex flex-wrap -mx-1 pt-8 lg:-mx-6">
        <li
          v-for="image in computedImages"
          :key="image.name"
          class="w-1/3 p-1 lg:p-6"
        >
          <a
            ref="lightboxElements"
            :href="image.src | transformImage('1200x0/smart')"
            class="block w-full relative pb-1/1"
            @click="showLightbox"
          >
            <BaseImage
              :image="image"
              :options="imageOptions"
              :placeholder="true"
            />
          </a>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import SimpleLightbox from "simplelightbox/dist/simple-lightbox.esm.js"
import storyBlokPage from "@/mixins/storyBlokPage"
import BaseImage from "@/components/Base/BaseImage"
import query from "@/queries/getPageGallery.gql"

export default {
  components: {
    BaseImage
  },
  mixins: [storyBlokPage],
  async fetch() {
    const variables = { id: this.$route.path }
    const response = await this.$apollo.query({ query, variables })

    this.page = response.data.PagegalleryItem.content
  },
  data() {
    return {
      page: {
        title: "",
        subtitle: "",
        photographer: "",
        date: "",
        images: [],
        meta: []
      },
      imageOptions: [
        { type: "image/webp", media: "(min-width: 768px)", width: "480" },
        { type: "image/webp", media: false, width: "256" },
        { type: false, media: "(min-width: 768px)", width: "480" },
        { type: false, media: false, width: "256" }
      ],
      lightboxes: null
    }
  },
  computed: {
    computedImages() {
      return this.page.images.map((image) => ({
        src: image.filename,
        alt: this.getAltName(image),
        crop: "1x1"
      }))
    },
    date() {
      if (!this.page.date) {
        return ""
      }

      const date = new Date(this.page.date)
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      }

      return date.toLocaleDateString("de-DE", options)
    }
  },
  methods: {
    getAltName(image) {
      if (image.name) {
        return image.name
      }

      const name = image.filename.split("/")

      return name[name.length - 1]
    },
    showLightbox(e) {
      e.preventDefault()
      if (!this.lightboxes) {
        this.lightboxes = new SimpleLightbox(this.$refs.lightboxElements)

        const target = e.path.find((el) => el.nodeName === "A")
        this.lightboxes.open(target)
      }
    }
  }
}
</script>

<style lang="postcss">
@import "simplelightbox/dist/simple-lightbox.min.css";

.sl-overlay {
  @apply bg-primary opacity-75;
}
</style>
