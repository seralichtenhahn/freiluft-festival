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
      <p v-if="page.date">📅: {{ page.date }}</p>
      <ul class="flex flex-wrap -mx-1 pt-8 lg:-mx-6">
        <li
          v-for="image in computedImages"
          :key="image.name"
          class="w-1/3 p-1 lg:p-6"
        >
          <a :href="image.src">
            <BaseImage :image="image" :options="imageOptions" />
          </a>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import gql from "graphql-tag"
import SimpleLightbox from "simplelightbox"
import storyBlokPage from "@/mixins/storyBlokPage"
import BaseImage from "@/components/Base/BaseImage"

export default {
  components: {
    BaseImage
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
      ]
    }
  },
  computed: {
    computedImages() {
      return this.page.images.map((image) => ({
        src: image.filename,
        alt: this.getAltName(image),
        crop: "1x1"
      }))
    }
  },
  apollo: {
    page: {
      query: gql`
        query getPageGallery($id: ID!) {
          PagegalleryItem(id: $id) {
            content {
              title
              subtitle
              photographer
              date
              images {
                filename
                name
              }
              meta
            }
          }
        }
      `,
      update: (data) => data.PagegalleryItem.content,
      variables() {
        return {
          id: this.$route.path
        }
      }
    }
  },
  mounted() {
    const lightboxes = new SimpleLightbox("main li a")
    console.log(lightboxes)
  },
  methods: {
    getAltName(image) {
      if (image.name) {
        return image.name
      }

      const name = image.filename.split("/")

      return name[name.length - 1]
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
