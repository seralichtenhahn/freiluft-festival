<template>
  <nav
    v-editable="navigation"
    class="absolute top-0 w-full z-10 flex justify-end p-2"
  >
    <ul
      class="flex items-center border-r-2 pr-2 mr-1 lg:pr-4 lg:mr-2"
      :class="[navClasses]"
    >
      <li
        v-for="socialLink in navigation.social_menu"
        :key="socialLink._uid"
        class="p-1 py-2"
      >
        <SocialLink :blok="socialLink" height="h-5 lg:h-10" />
      </li>
    </ul>
    <button class="p-2" @click="toggleMenu">
      <span class="sr-only">Navigation öffnen</span>
      <span
        v-for="i in 3"
        :key="i"
        :class="[buttonClasses]"
        class="block w-6 h-1 my-1 rounded-sm lg:w-8 lg:my-2"
      ></span>
    </button>
    <transition
      @enter="onEnter"
      @leave="onLeave"
      @after-leave="afterTransition"
      @after-enter="afterTransition"
    >
      <div v-show="showNav" class="fixed inset-0">
        <div class="absolute w-full h-full bg-secondary" />
        <div
          class="absolute bg-white w-full h-full p-4 flex flex-col justify-between"
        >
          <button class="absolute top-0 right-0 w-8 h-8 m-2" @click="closeMenu">
            <span class="sr-only">Navigation schliessen</span>
            <IconX class="text-headline" />
          </button>
          <ul class="pt-16 container mx-auto">
            <li v-for="linkItem in navigation.main_menu" :key="linkItem._uid">
              <BaseLink
                :link="linkItem.link"
                class="text-headline font-headline text-5xl font-bold md:text-7xl lg:text-9xl xl:text-12xl"
                @click.native="closeMenu"
              >
                {{ linkItem.title }}
              </BaseLink>
            </li>
          </ul>
          <ul class="pb-8 container mx-auto">
            <li
              v-for="linkItem in navigation.secondary_menu"
              :key="linkItem._uid"
              class="inline-block pr-4"
            >
              <BaseLink
                :link="linkItem.link"
                class="text-headline font-headline"
                @click.native="closeMenu"
              >
                {{ linkItem.title }}
              </BaseLink>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script>
import gql from "graphql-tag"
import anime from "animejs/lib/anime.es.js"
import BaseLink from "@/components/Base/BaseLink"
import SocialLink from "@/components/SocialLink/SocialLink"
import IconX from "@/assets/icons/x.svg"

export default {
  components: {
    BaseLink,
    SocialLink,
    IconX
  },
  props: {
    mode: {
      type: String,
      default: "dark"
    }
  },
  data() {
    return {
      showNav: false
    }
  },
  apollo: {
    navigation: {
      query: gql`
        query getNavigation {
          SettingsItem(id: "_settings") {
            content {
              navigation
            }
          }
        }
      `,
      update: (data) => data.SettingsItem.content.navigation[0]
    }
  },
  computed: {
    navClasses() {
      return this.mode === "dark"
        ? "text-headline border-headline"
        : "text-white border-white"
    },
    buttonClasses() {
      return this.mode === "dark" ? "bg-headline" : "bg-white"
    }
  },
  methods: {
    toggleMenu() {
      this.showNav = !this.showNav
    },
    closeMenu(e) {
      this.showNav = false
    },
    onEnter(el, done) {
      const childNodes = el.querySelectorAll("div")

      anime({
        targets: childNodes,
        translateX: ["100%", "0"],
        duration: 500,
        delay: anime.stagger(200),
        easing: "easeInOutCirc",
        complete: done
      })
    },
    onLeave(el, done) {
      const childNodes = el.querySelectorAll("div")

      anime({
        targets: childNodes,
        translateX: "100%",
        duration: 500,
        delay: anime.stagger(200, { direction: "reverse" }),
        easing: "easeInOutCirc",
        complete: done
      })
    },
    afterTransition(el) {
      const childNodes = el.querySelectorAll("div")
      anime.remove(childNodes)
      for (const el of childNodes) {
        el.style.removeProperty("transform")
      }
    }
  }
}
</script>

<style lang="postcss">
nav {
  & .nuxt-link-exact-active.nuxt-link-active {
    @apply text-secondary;
  }
}
</style>
