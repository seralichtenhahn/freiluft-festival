<template>
  <div :class="[containerClasses]">
    <div :class="[itemClasses]" class="w-full">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    container: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: "max-w-none"
    },
    aspectRatio: {
      type: String,
      default: "ratio-16-by-9"
    }
  },
  computed: {
    containerClasses() {
      return {
        container: this.container,
        "mx-auto": this.container,
        "mb-16": true
      }
    },
    itemClasses() {
      return {
        [this.size]: true,
        [this.aspectRatio]: true
      }
    }
  }
}
</script>

<style scoped>
.ratio-16-by-9 {
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 0;
  height: 0;
  overflow: hidden;
}
</style>
