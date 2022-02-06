<template>
  <div
    v-editable="blok"
    class="container flex flex-col items-center justify-center mx-auto mb-8"
  >
    <p class="mb-4 text-2xl font-bold font-headline text-headline">
      {{ blok.text }}
    </p>
    <client-only>
      <noscript
        ><a
          :href="blok.eventbrite_link"
          rel="noopener noreferrer"
          target="_blank"
          >{{ blok.label }}
        </a></noscript
      >
      <button
        id="ticketButton"
        class="px-4 py-2 mb-1 font-semibold tracking-wider text-center text-white uppercase rounded bg-headline font-headline"
        type="button"
      >
        {{ blok.label }}
      </button>
      <p>
        <a
          :href="blok.eventbrite_link"
          rel="noopener noreferrer"
          target="_blank"
          class="text-xs italic"
          >Bei Schwierigkeiten, benutze diesen Link.</a
        >
      </p>
    </client-only>
  </div>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  mounted() {
    const script = document.createElement("script")
    script.onload = () => {
      window.EBWidgets.createWidget({
        widgetType: "checkout",
        eventId: this.blok.eventbrite_id,
        modal: true,
        modalTriggerElementId: "ticketButton",
        onOrderComplete: () => {}
      })
    }
    script.src = "https://www.eventbrite.ch/static/widgets/eb_widgets.js"

    document.head.appendChild(script)
  }
}
</script>
