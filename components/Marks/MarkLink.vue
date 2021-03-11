<template>
  <BaseLink :link="link" :external-tab="externalTab" class="font-bold"
    ><slot
  /></BaseLink>
</template>

<script>
import BaseLink from "@/components/Base/BaseLink"

export default {
  components: {
    BaseLink
  },
  props: {
    attrs: {
      type: Object,
      required: true
    }
  },
  computed: {
    link() {
      return {
        ...this.attrs,
        cached_url: this.attrs.href,
        email: this.attrs.href,
        url: this.attrs.href
      }
    },
    externalTab() {
      return this.attrs.target === "_blank"
    }
  },
  created() {
    // console.log(this.attrs)
  }
}
</script>
