import Vue from "vue"
import StoryblokVue from "storyblok-vue"
import VueCompositionApi from "@vue/composition-api"
import VueRichTextRenderer from "@marvr/storyblok-rich-text-vue-renderer"
import { Mark } from "@marvr/storyblok-rich-text-types"

import MarkLink from "@/components/Marks/MarkLink"

Vue.use(VueCompositionApi)
Vue.use(StoryblokVue)
Vue.use(VueRichTextRenderer, {
  resolvers: {
    marks: {
      [Mark.LINK]: MarkLink
    }
  }
})
