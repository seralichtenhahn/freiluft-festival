<template>
  <header
    v-editable="blok"
    class="relative w-full min-h-screen overflow-x-hidden mb-8 md:mb-24"
  >
    <GradientSVG
      class="pb-16 h-screen min-w-full max-w-screen-lg md:max-w-none transform -translate-x-32 md:translate-x-0"
    />
    <div
      class="absolute inset-0 flex justify-center container items-center mx-auto"
    >
      <div class="flex flex-col md:flex-row pb-16 md:items-center">
        <div
          class="flex-1 pb-8 md:pb-0 md:pr-8 lg:max-w-md xl:pr-16 lg:max-w-lg"
        >
          <LogoSVG class="w-8/12 md:w-auto mx-auto" />
        </div>
        <div class="flex-1">
          <h1>{{ blok.title }}</h1>
          <p
            v-if="blok.date"
            class="w-full text-center bg-white px-4 leading-none"
          >
            <time
              class=" text-justify text-4xl md:text-5xl lg:text-6xl font-headline text-cyan-darker"
              >{{ blok.date }}</time
            >
          </p>
        </div>
      </div>
    </div>
    <div class="absolute text-center bottom-0 w-full h-16">
      <button class="mx-auto" @click="scrollToContent">
        <span class="sr-only">Zum Inhalt scrollen</span>
        <IconChevron class="text-primary w-12 h-12" />
      </button>
    </div>
  </header>
</template>

<script>
import GradientSVG from "@/assets/images/gradient_bg.svg"
import LogoSVG from "@/assets/images/freiluft_logo.svg"
import IconChevron from "@/assets/icons/chevron-down.svg"

export default {
  name: "AppHeader",
  components: {
    GradientSVG,
    LogoSVG,
    IconChevron
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
  @apply text-6xl font-bold text-center text-white tracking-wider leading-none;

  text-shadow: 0.3rem 0 theme("colors.secondary");

  @screen md {
    @apply text-9xl;

    text-shadow: 0.5rem 0 theme("colors.secondary");
  }

  @screen lg {
    @apply text-12xl;
  }
}
</style>
