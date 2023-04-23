<template>
  <header
    v-editable="blok"
    class="relative w-full min-h-screen mb-8 overflow-x-hidden md:mb-24"
  >
    <div
      class="container absolute inset-0 flex items-center justify-center mx-auto"
    >
      <div class="pb-16">
        <h1
          class="mb-4 text-6xl font-bold lg:text-8xl font-headline text-headline"
        >
          {{ blok.title }}
        </h1>
        <component
          :is="blok.stream[0].component"
          v-if="blok.stream.length"
          :blok="blok.stream[0]"
          class="mb-4"
        />
        <ul class="flex flex-wrap -mx-2 md:flex-no-wrap">
          <li
            v-for="btn in blok.stream_btns"
            :key="btn._uid"
            class="w-full px-2 mb-2 md:w-1/2"
          >
            <BaseButton :blok="btn" class="block w-full" />
          </li>
        </ul>
        <BaseButton
          v-if="blok.cta_btn.length"
          :blok="blok.cta_btn[0]"
          class="block w-full text-xl"
        />
      </div>
    </div>
    <div class="absolute bottom-0 w-full h-16 text-center">
      <button class="mx-auto" @click="scrollToContent">
        <span class="sr-only">Zum Inhalt scrollen</span>
        <IconChevron class="w-12 h-12 text-primary" />
      </button>
    </div>
  </header>
</template>

<script>
import IconChevron from "@/assets/icons/chevron-down.svg"
import BaseButton from "@/components/Base/BaseButton"

export default {
  name: "AppLivestreamHeader",
  components: {
    IconChevron,
    BaseButton
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
  @apply text-4xl font-bold text-center text-white tracking-wider leading-none mb-4 md:text-6xl md:mb-6 xl:text-7xl;

  text-shadow: 0.2rem 0 theme("colors.secondary");

  @screen md {
    text-shadow: 0.3rem 0 theme("colors.secondary");
  }
}
</style>
