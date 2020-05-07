export default {
  head() {
    const head = { titleTemplate: "%s | Pfadi Falkenstein Basel - Binningen" }
    let meta =
      this.story.content.meta !== undefined &&
      this.story.content.meta.length !== 0
        ? this.story.content.meta[0]
        : false
    if (meta) {
      meta = {
        ...meta,
        ...meta.tags
      }
    }

    let defaultMeta = this.$store.state.storyBlok.settings.meta[0]

    if (defaultMeta) {
      defaultMeta = {
        ...this.$store.state.storyBlok.settings.meta[0],
        ...this.$store.state.storyBlok.settings.meta[0].tags
      }
    }

    const currentLanguage = "de-CH"
    const rootDomain = "https://www.falkenstein.ch/"

    function createOgTag(property, content) {
      if (content && content !== "") {
        return {
          property: `og:${property}`,
          content
        }
      } else if (defaultMeta[`${property}`] !== "") {
        return {
          property: `og:${property}`,
          content: defaultMeta[`${property}`]
        }
      } else {
        return {}
      }
    }

    function createOgImage() {
      const url =
        meta && meta.og_image !== "" ? meta.og_image : defaultMeta.og_image

      if (url !== undefined && url !== "") {
        const ogImgUrl = url.startsWith("http") ? url : `https:${url}`
        return {
          property: `og:image`,
          content: ogImgUrl
        }
      } else {
        return {}
      }
    }

    function createMetaTag(name, content) {
      if (content && content !== "") {
        return {
          name,
          content,
          hid: name
        }
      } else if (defaultMeta[name] !== "") {
        return {
          name,
          content: defaultMeta[name]
        }
      } else {
        return {}
      }
    }

    // title
    if (meta && meta.title !== "") {
      head.title = meta.title
    } else {
      head.title = defaultMeta.title
    }

    // meta tags
    const metaTags = []

    metaTags.push(createMetaTag("description", meta.description))
    metaTags.push(createMetaTag("keywords", meta.keywords))

    metaTags.push(createOgTag("title", meta.title))
    metaTags.push(createOgTag("description", meta.description))
    metaTags.push(createOgImage())

    let thisPath = ""
    const links = []

    if (this.$route.matched.length) {
      thisPath = this.$route.matched[0].path
    }

    metaTags.push({
      property: "og:url",
      content: rootDomain + thisPath
    })

    links.push({
      rel: "revision",
      href: rootDomain + thisPath
    })

    links.push({
      rel: "canonical",
      href: rootDomain + thisPath
    })

    links.push({
      rel: "shortlink",
      href: rootDomain + thisPath
    })

    // links.push({
    //   rel: "icon",
    //   type: "image/x-icon",
    //   href: this.$icon(64)
    // })

    head.meta = metaTags
    head.link = links
    head.htmlAttrs = {
      lang: currentLanguage
    }

    return head
  }
}
