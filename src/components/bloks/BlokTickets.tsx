"use client";

import { useEffect } from "react";
import { storyblokEditable, type SbBlokData } from "@storyblok/react/rsc";

import type { BaseBlok } from "@/types/storyblok";

interface BlokTicketsProps extends BaseBlok {
  text: string;
  label: string;
  eventbrite_link: string;
  eventbrite_id: string;
}

declare global {
  interface Window {
    EBWidgets?: {
      createWidget: (config: {
        widgetType: string;
        eventId: string;
        modal: boolean;
        modalTriggerElementId: string;
        onOrderComplete?: () => void;
      }) => void;
    };
  }
}

export default function BlokTickets({ blok }: { blok: BlokTicketsProps }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.eventbrite.ch/static/widgets/eb_widgets.js";
    script.onload = () => {
      window.EBWidgets?.createWidget({
        widgetType: "checkout",
        eventId: blok.eventbrite_id,
        modal: true,
        modalTriggerElementId: "ticketButton",
        onOrderComplete: () => {},
      });
    };
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, [blok.eventbrite_id]);

  return (
    <div
      {...storyblokEditable(blok as unknown as SbBlokData)}
      className="container flex flex-col items-center justify-center mx-auto mb-8"
    >
      <p className="mb-4 text-2xl font-bold font-headline text-headline">
        {blok.text}
      </p>
      <noscript>
        <a
          href={blok.eventbrite_link}
          rel="noopener noreferrer"
          target="_blank"
        >
          {blok.label}
        </a>
      </noscript>
      <button
        id="ticketButton"
        type="button"
        className="px-4 py-2 mb-1 font-semibold tracking-wider text-center text-white uppercase rounded bg-headline font-headline"
      >
        {blok.label}
      </button>
      <p>
        <a
          href={blok.eventbrite_link}
          rel="noopener noreferrer"
          target="_blank"
          className="text-xs italic"
        >
          Bei Schwierigkeiten, benutze diesen Link.
        </a>
      </p>
    </div>
  );
}
