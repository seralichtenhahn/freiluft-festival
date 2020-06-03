export default {
  methods: {
    isInternalLink(linktype) {
      return linktype === "story"
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
      if (link.linktype === "email") {
        return `mailto:${link.email}`
      }

      return this.prependHttpToUrl(link.url || link)
    }
  }
}
