<template>
  <footer v-editable="footer" class="bg-secondary py-8 lg:py-12">
    <div class="container mx-auto">
      <ul class="mb-4 lg:mb-12">
        <li v-for="item in footer.main_menu" :key="item._uid">
          <BaseLink
            :link="item.link"
            class="font-headline text-headline font-bold text-2xl lg:text-3xl"
            >{{ item.title }}</BaseLink
          >
        </li>
      </ul>
      <hr class="border-t-2 border-headline mb-4 lg:mb-12" />
      <div
        class="flex flex-wrap text-white md:flex-no-wrap md:justify-between md:items-center"
      >
        <div
          class="flex w-full font-headline font-bold items-center text-xl tracking-wider mb-4 md:w-auto md:mb-0 lg:text-2xl"
        >
          <FreiluftLogoWhite class="h-8 w-auto mr-4 lg:h-12" /> freiluft
          festival
        </div>
        <ul>
          <li
            v-for="(item, i) in footer.legal_menu"
            :key="item._uid"
            class="inline-block"
          >
            <BaseLink
              :link="item.link"
              class="font-headline uppercase font-semibold tracking-wider md:text-xl"
              >{{ item.title }}</BaseLink
            >
            <span v-if="i + 1 !== footer.legal_menu.length" class="mx-2">
              •
            </span>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
import get from "lodash/get"
import BaseLink from "@/components/Base/BaseLink"
import FreiluftLogoWhite from "@/assets/images/freiluft_logo_white.svg"
import query from "@/queries/getFooter.gql"

export default {
  components: {
    BaseLink,
    FreiluftLogoWhite
  },
  data() {
    return {
      footer: {}
    }
  },
  async fetch() {
    const response = await this.$apollo.query({ query })
    this.footer = get(response, "data.SettingsItem.content.footer[0]", false)
  }
}
</script>
