<template>
  <header
    v-editable="blok"
    class="
      mb-8
      flex
      min-h-[80vh]
      w-full
      flex-col
      overflow-x-hidden
      px-4
      pt-2
      md:mb-24 md:px-8 md:pt-4
      2xl:min-h-screen-90 2xl:px-20
    "
  >
    <div
      class="
        relative
        flex
        h-full
        flex-1
        items-center
        justify-center
        overflow-hidden
        rounded-xl
      "
    >
      <picture class="absolute inset-0 h-full w-full">
        <source
          media="(min-width: 768px)"
          :srcset="require('@/assets/images/ff_bg_2021.jpg')"
        />
        <source :srcset="require('@/assets/images/ff_bg_2021_1x1.jpg')" />
        <img
          :src="require('@/assets/images/ff_bg_2021.jpg')"
          class="h-full w-full object-cover object-center"
          alt="Background Image"
        />
      </picture>
      <div
        aria-hidden="true"
        class="
          absolute
          inset-0
          bg-gray-500 bg-opacity-30
          backdrop-blur-sm
          md:hidden
        "
      />
      <div
        class="
          container
          md:flex md:items-center md:justify-start
          lg:px-16
          xl:px-24
        "
      >
        <div class="relative w-full md:w-1/2 xl:w-full xl:max-w-xl">
          <h1 class="sr-only">{{ blok.title }}</h1>
          <FreiluftSignet />
          <p
            class="
              ml-2
              bg-gradient-to-br
              from-secondary
              to-[#fc9842]
              bg-clip-text
              font-headline
              text-5xl
              font-bold
              text-transparent
              drop-shadow-lg
              lg:text-6xl
              xl:ml-4 xl:text-7xl xl:leading-none
            "
          >
            {{ blok.date }}
          </p>
        </div>
      </div>
    </div>
    <div class="flex h-20 w-full items-center justify-center text-center">
      <button class="mx-auto" @click="scrollToContent">
        <span class="sr-only">Zum Inhalt scrollen</span>
        <IconChevron class="h-12 w-12 text-headline" />
      </button>
    </div>
  </header>
</template>

<script>
import IconChevron from "@/assets/icons/chevron-down.svg"
import FreiluftSignet from "@/assets/images/freiluft_signet.svg"

export default {
  name: "AppHeader",
  components: {
    IconChevron,
    FreiluftSignet
  },
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  methods: {
    scrollToContent(e) {
      const mainEl = document.querySelector("main")

      if (mainEl) {
        mainEl.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }
}
</script>
