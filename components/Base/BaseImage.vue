<template>
  <picture>
    <source
      :srcset="image.src | transformImage('0x720/smart')"
      media="(max-width: 768px)"
    />
    <source
      :srcset="image.src | transformImage('0x1200/smart')"
      media="(min-width: 740px)"
    />
    <img :src="image.src | transformImage('0x1200/smart')" :alt="image.alt" />
  </picture>
</template>

<script>
export default {
  props: {
    image: {
      type: Object,
      required: true
    }
  }
}
</script>
