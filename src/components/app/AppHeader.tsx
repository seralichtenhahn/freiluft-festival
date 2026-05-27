"use client";

import { storyblokEditable, type SbBlokData } from "@storyblok/react/rsc";

import FreiluftSignet from "@/components/icons/FreiluftSignet";
import IconChevronDown from "@/components/icons/IconChevronDown";
import type { BaseBlok } from "@/types/storyblok";

interface AppHeaderBlok extends BaseBlok {
  title?: string;
  date?: string;
}

function scrollToMain() {
  const main = document.querySelector("main");
  main?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function AppHeader({ blok }: { blok: AppHeaderBlok }) {
  return (
    <header
      {...storyblokEditable(blok as unknown as SbBlokData)}
      className="mb-8 flex min-h-[80vh] w-full flex-col overflow-x-hidden px-4 pt-2 md:mb-24 md:px-8 md:pt-4 2xl:min-h-screen-90 2xl:px-20"
    >
      <div className="relative flex items-center justify-center flex-1 h-full overflow-hidden rounded-xl">
        <picture className="absolute inset-0 w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero.jpg"
            alt="Background"
            className="object-cover object-center w-full h-full"
          />
        </picture>
        <div className="container flex items-center justify-center lg:px-16 xl:px-24">
          <div className="relative w-full xl:max-w-xl">
            <h1 className="sr-only">{blok.title}</h1>
            <FreiluftSignet className="text-secondary w-full h-auto" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full h-20 text-center">
        <button className="mx-auto" onClick={scrollToMain}>
          <span className="sr-only">Zum Inhalt scrollen</span>
          <IconChevronDown className="w-12 h-12 text-headline" />
        </button>
      </div>
    </header>
  );
}
