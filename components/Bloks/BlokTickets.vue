<template>
  <div
    v-editable="blok"
    class="container mx-auto flex items-center flex-col justify-center mb-8"
  >
    <p class="text-2xl font-headline font-bold text-headline mb-4">
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
        class="text-white bg-headline font-headline font-semibold uppercase px-4 py-2 text-center rounded tracking-wider mb-1"
        type="button"
      >
        {{ blok.label }}
      </button>
      <p>
        <a
          :href="blok.eventbrite_link"
          rel="noopener noreferrer"
          target="_blank"
          class="italic text-xs"
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
        onOrderComplete: () => {
          console.log("success")
        }
      })
    }
    script.src = "https://www.eventbrite.ch/static/widgets/eb_widgets.js"

    document.head.appendChild(script)
  }
}
</script>
