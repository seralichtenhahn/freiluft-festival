import Vue from "vue"

Vue.filter("transformImage", function(image, option) {
  if (!image) return ""
  if (!option) return ""

  const imageService = "https://img2.storyblok.com/"

  let path = image.replace("https://a.storyblok.com", "")
  path = path === image ? image.replace("a.storyblok.com", "") : path

  return imageService + option + path
})
