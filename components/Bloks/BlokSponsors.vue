<template>
  <div v-editable="blok">
    <BlokTitleSection
      v-if="blok.title_section.length"
      :blok="blok.title_section[0]"
    />
    <div class="container mx-auto overflow-x-hidden">
      <ul class="flex flex-wrap -mx-8 md:-mx-16 md:items-center">
        <li
          v-for="sponsor in blok.sponsors"
          :key="sponsor._uid"
          class="w-1/2 px-8 mb-8 md:w-1/4 md:px-16 md:mb-16"
        >
          <Sponsor :blok="sponsor" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Sponsor from "@/components/Sponsor/Sponsor"

export default {
  components: {
    Sponsor
  },
  props: {
    blok: {
      type: Object,
      required: true
    }
  }
}
</script>
