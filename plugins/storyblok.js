import Vue from "vue"
import StoryblokVue from "storyblok-vue"

const loadScript = function(src, cb) {
  if (document.getElementById("storyblok-javascript-bridge")) {
    return cb()
  }

  const script = document.createElement("script")
  script.async = true
  script.src = src
  script.id = "storyblok-javascript-bridge"

  script.onerror = function() {
    cb(new Error("Failed to load" + src))
  }

  script.onload = function() {
    cb()
  }

  document.getElementsByTagName("head")[0].appendChild(script)
}

const Client = {
  install() {
    Vue.prototype.$storybridge = {
      doLoadScript: true,
      proxy: null,
      on: (events, cb, _options) => {
        const options = _options || {}
        options.accessToken = process.env.STORYBLOK_TOKEN

        this.load(() => {
          window.storyblok.init(options)
          window.storyblok.on(events, (event) => {
            if (event.action === "input") {
              event.story.content = this.proxy.addComments(
                event.story.content,
                event.story.id
              )
            }
            cb(event)
          })
        })
      }
    }
  },
  load(cb, errorCb) {
    if (typeof errorCb !== "function") {
      errorCb = function() {}
    }

    if (window.location === window.parent.location) {
      errorCb("You are not in the edit mode.")
      return
    }

    if (!this.doLoadScript) {
      if (!window.storyblok) {
        errorCb("The Storyblok bridge script is already loading.")
        return
      }
      cb()
      return
    }

    this.doLoadScript = false
    loadScript("https://app.storyblok.com/f/storyblok-latest.js", () => {
      Vue.prototype.$storybridge.proxy = window.storyblok
      cb()
    })
  }
}

Vue.use(Client)
Vue.use(StoryblokVue)

export default (ctx) => {
  const { app } = ctx

  app.$storybridge = Vue.prototype.$storybridge
  ctx.$storybridge = Vue.prototype.$storybridge
}
