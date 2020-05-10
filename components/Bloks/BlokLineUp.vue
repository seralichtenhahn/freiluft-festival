<template>
  <div v-editable="blok">
    <BlokTitleSection
      v-if="blok.title_section.length"
      :blok="blok.title_section[0]"
    />
    <BlokArtist
      v-for="(artist, i) in blok.artists"
      :key="artist._uid"
      :blok="artist"
      :index="i"
    />
  </div>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true
    }
  }
}
</script>
