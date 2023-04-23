<template>
  <header
    v-editable="blok"
    class="mb-8 flex min-h-[80vh] w-full flex-col overflow-x-hidden px-4 pt-2 md:mb-24 md:px-8 md:pt-4 2xl:min-h-screen-90 2xl:px-20"
  >
    <div
      class="relative flex items-center justify-center flex-1 h-full overflow-hidden rounded-xl"
    >
      <picture class="absolute inset-0 w-full h-full">
        <source :srcset="require('@/assets/images/hero.jpg')" />
        <img
          :src="require('@/assets/images/hero.jpg')"
          class="object-cover object-center w-full h-full"
          alt="Background Image"
        />
      </picture>
      <div class="container flex items-center justify-center lg:px-16 xl:px-24">
        <div class="relative w-full xl:max-w-xl">
          <h1 class="sr-only">{{ blok.title }}</h1>
          <FreiluftSignet />
          <!-- <p
            class="ml-2 text-right bg-gradient-to-br from-secondary to-[#fc9842] bg-clip-text font-headline text-5xl font-bold text-transparent drop-shadow-lg lg:text-6xl xl:ml-4 xl:text-7xl xl:leading-none"
          >
            {{ blok.date }}
          </p> -->
        </div>
      </div>
    </div>
    <div class="flex items-center justify-center w-full h-20 text-center">
      <button class="mx-auto" @click="scrollToContent">
        <span class="sr-only">Zum Inhalt scrollen</span>
        <IconChevron class="w-12 h-12 text-headline" />
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
