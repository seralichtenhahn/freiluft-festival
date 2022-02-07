<template>
  <div class="min-h-screen-90">
    <header class="container mx-auto pt-8">
      <h1
        class="text-6xl lg:text-8xl mb-4 font-bold font-headline text-headline"
      >
        {{ page.title }}
      </h1>
      <p v-if="page.subtitle">
        {{ page.subtitle }}
      </p>
    </header>
    <main class="container mx-auto mb-8 md:mb-16">
      <p v-if="page.photographer">📷: {{ page.photographer }}</p>
      <p v-if="page.date">📅: {{ date }}</p>
      <ul class="grid grid-cols-3 pt-8 gap-2 md:gap-4">
        <li
          v-for="(image, i) in computedImages"
          :key="image.name"
          class="bg-primary aspect-square"
        >
          <button
            type="button"
            class="block w-full relative"
            @click="openLightbox(i)"
          >
            <BaseImage
              :image="image"
              :options="imageOptions"
              :placeholder="true"
            />
          </button>
        </li>
      </ul>
      <client-only>
        <VueEasyLightbox
          :visible="visible"
          :imgs="lighboxImages"
          :index="index"
          @hide="handleHide"
        />
      </client-only>
    </main>
  </div>
</template>

<script>
import VueEasyLightbox from "vue-easy-lightbox"
import storyBlokPage from "@/mixins/storyBlokPage"
import BaseImage from "@/components/Base/BaseImage"
import query from "@/queries/getPageGallery.gql"

export default {
  components: {
    BaseImage,
    VueEasyLightbox
  },
  mixins: [storyBlokPage],
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
      visible: false,
      index: 0
    }
  },
  async fetch() {
    const variables = { id: this.$route.path }
    const response = await this.$apollo.query({ query, variables })

    this.page = response.data.PagegalleryItem.content
  },
  computed: {
    computedImages() {
      return this.page.images.map((image) => ({
        src: image.filename,
        alt: this.getAltName(image),
        crop: "1x1"
      }))
    },
    lighboxImages() {
      return this.page.images.map((image) => ({
        src: this.$options.filters.transformImage(
          image.filename,
          "1200x0/smart"
        ),
        title: `${this.page.title} - Foto von ${this.page.photographer}`
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
    handleHide() {
      this.visible = false
    },
    openLightbox(index) {
      this.index = index
      this.visible = true
    }
  }
}
</script>

<style lang="postcss">
.sl-overlay {
  @apply bg-primary opacity-75;
}
</style>
