import Vue from "vue"
import VueLazyload from "vue-lazyload"
import StoryblokVue from "storyblok-vue"

Vue.use(StoryblokVue)
Vue.use(VueLazyload, {
  lazyComponent: true,
  preLoad: 1.3,
  error: "dist/error.png",
  loading: "dist/loading.gif",
  attempt: 1
})
