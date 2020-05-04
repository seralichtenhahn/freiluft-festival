<template>
  <header class="relative w-full min-h-screen overflow-x-hidden">
    <GradientSVG
      class="pb-16 h-screen min-w-full max-w-screen-lg md:max-w-none transform -translate-x-32 md:translate-x-0"
    />
    <div
      class="absolute inset-0 flex justify-center container items-center mx-auto"
    >
      <div class="flex flex-col md:flex-row pb-16 md:items-center">
        <div class="flex-1 pb-8 md:pb-0 md:pr-8">
          <LogoSVG class="w-8/12 md:w-auto mx-auto" />
        </div>
        <div class="flex-1">
          <h1>freiluft festival</h1>
          <p class="w-full text-center bg-white px-4 leading-none">
            <time
              class=" text-justify text-4xl md:text-5xl lg:text-6xl font-headline text-cyan-darker"
              >19. Juni 2020</time
            >
          </p>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import GradientSVG from "@/assets/images/gradient_bg.svg"
import LogoSVG from "@/assets/images/freiluft_logo.svg"

export default {
  name: "AppHeader",
  components: {
    GradientSVG,
    LogoSVG
  }
}
</script>

<style lang="postcss" scoped>
h1 {
  @apply text-6xl font-bold text-center text-white tracking-wider leading-none;

  text-shadow: 0.5rem 0 theme("colors.secondary");

  @screen md {
    @apply text-9xl;
  }

  @screen lg {
    @apply text-12xl;
  }
}
</style>
