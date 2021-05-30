<template>
  <header
    v-editable="blok"
    class="flex flex-col pt-2 px-4 w-full min-h-[80vh] overflow-x-hidden mb-8 md:px-8 md:pt-4 md:mb-24 2xl:px-20 2xl:min-h-screen-90"
  >
    <div
      class="relative flex-1 flex justify-center items-center h-full rounded-xl overflow-hidden"
    >
      <picture class="absolute inset-0 w-full h-full">
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
        class="absolute md:hidden inset-0 backdrop-filter backdrop-blur-sm bg-gray-500 bg-opacity-10 backdrop-brightness-90"
      />
      <div
        class="container md:flex md:justify-start md:items-center lg:px-16 xl:px-24"
      >
        <div class="relative w-full md:w-1/2 xl:w-full xl:max-w-xl">
          <FreiluftSignet />
        </div>
      </div>
    </div>
    <div class="text-center w-full h-20 flex justify-center items-center">
      <button class="mx-auto" @click="scrollToContent">
        <span class="sr-only">Zum Inhalt scrollen</span>
        <IconChevron class="text-headline w-12 h-12" />
      </button>
    </div>
  </header>
</template>

<script>
import IconChevron from "@/assets/icons/chevron-down.svg"
import FreiluftSignet from "@/assets/images/freiluft_signet_mit_jahr.svg"

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

<style lang="postcss" scoped>
h1 {
  @apply text-6xl font-bold text-center text-white tracking-wider leading-none md:text-9xl lg:text-12xl;

  text-shadow: 0.3rem 0 theme("colors.secondary");

  @screen md {
    text-shadow: 0.5rem 0 theme("colors.secondary");
  }
}
</style>
