export default {
  methods: {
    isInternalLink(linktype) {
      return linktype === "story"
    },
    isEmail(linktype) {
      return linktype === "email"
    },
    prependHttpToUrl(url) {
      if (url.startsWith("http")) {
        return url
      }
      return `https://${url}`
    },
    translateInternalUrl(story) {
      const url = story === "home" ? "" : story

      if (url.startsWith("/")) {
        return url
      }
      return `/${url}`
    },
    compileExternalLink(link) {
      return this.prependHttpToUrl(link.url || link)
    }
  }
}
