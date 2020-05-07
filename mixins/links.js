export default {
  methods: {
    isInternalLink(linktype) {
      if (linktype === "url") {
        return false
      }
      return true
    },
    prependHttpToUrl(url) {
      if (url.startsWith("http") || url.startsWith("mailto")) {
        return url
      }
      return `https://${url}`
    },
    translateInternalUrl(url) {
      if (url.startsWith("/")) {
        return url
      }
      return `/${url}`
    },
    compileExternalLink(url) {
      return this.prependHttpToUrl(url)
    }
  }
}
