import gql from "graphql-tag"

export default {
  apollo: {
    defaultMeta: {
      query: gql`
        query getDefaultMeta {
          SettingsItem(id: "_settings") {
            content {
              meta
            }
          }
        }
      `,
      update: (data) => data.SettingsItem.content.meta[0]
    }
  },
  head() {
    const head = {}
    let meta =
      this.page.meta !== undefined && this.page.meta.length !== 0
        ? this.page.meta[0]
        : false
    if (meta) {
      meta = {
        ...meta,
        ...meta.tags
      }
    }

    const defaultMeta = this.defaultMeta

    const currentLanguage = "de-CH"
    const rootDomain = "https://freiluftfestival.ch/"

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

    function createMetaImage(name, prefix = "") {
      const url =
        meta && meta.og_image !== "" ? meta.og_image : defaultMeta.og_image

      if (url !== undefined && url !== "") {
        const ogImgUrl = url.startsWith("http") ? url : `https:${url}`
        return {
          name: prefix + name,
          content: ogImgUrl,
          hid: name
        }
      } else {
        return {}
      }
    }

    function createMetaTag(name, content, prefix = "") {
      if (content && content !== "") {
        return {
          name: prefix + name,
          content,
          hid: name
        }
      } else if (defaultMeta[name] !== "") {
        return {
          name: prefix + name,
          content: defaultMeta[name]
        }
      } else {
        return {}
      }
    }

    // title template
    if (meta && meta.title_template !== "") {
      head.titleTemplate = meta.title_template
    } else {
      head.titleTemplate = defaultMeta.title_template
    }

    // title
    if (meta && meta.title !== "") {
      head.title = meta.title
    } else {
      head.title = defaultMeta.title
    }

    let thisPath = ""
    const links = []

    if (this.$route.matched.length) {
      thisPath = this.$route.matched[0].path
    }

    // meta tags
    const metaTags = []

    metaTags.push(createMetaTag("description", meta.description))
    metaTags.push(createMetaTag("keywords", meta.keywords))

    metaTags.push(createOgTag("title", meta.title))
    metaTags.push(createOgTag("description", meta.description))
    metaTags.push(createOgTag("site_name", meta.site_name))
    metaTags.push(createOgTag("type", meta.type))
    metaTags.push(createOgTag("url", rootDomain + thisPath))
    metaTags.push(createOgTag("locale", currentLanguage))
    metaTags.push(createOgImage())

    // Twitter meta tags
    metaTags.push(createMetaTag("title", meta.title, "twitter:"))
    metaTags.push(createMetaTag("description", meta.description, "twitter:"))
    metaTags.push(createMetaTag("card", "summary_large_image", "twitter:"))
    metaTags.push(createMetaImage("image", "twitter:"))

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
