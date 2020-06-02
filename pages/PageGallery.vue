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
          <a
            ref="lightboxElements"
            :href="image.src | transformImage('1200x0/smart')"
            class="block w-full relative pb-1/1 w-full"
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
.sl-overlay {
  @apply bg-primary opacity-75;
}
</style>
