"use client";

import { storyblokEditable, StoryblokComponent, type SbBlokData } from "@storyblok/react";

import BaseButton, { type ButtonBlok } from "@/components/base/BaseButton";
import IconChevronDown from "@/components/icons/IconChevronDown";
import type { BaseBlok } from "@/types/storyblok";

interface LivestreamHeaderBlok extends BaseBlok {
  title: string;
  stream?: BaseBlok[];
  stream_btns?: ButtonBlok[];
  cta_btn?: ButtonBlok[];
}

function scrollToMain() {
  const main = document.querySelector("main");
  main?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function AppLivestreamHeader({
  blok,
}: {
  blok: LivestreamHeaderBlok;
}) {
  const stream = blok.stream?.[0];
  const cta = blok.cta_btn?.[0];

  return (
    <header
      {...storyblokEditable(blok as unknown as SbBlokData)}
      className="relative w-full min-h-screen mb-8 overflow-x-hidden md:mb-24"
    >
      <div className="container absolute inset-0 flex items-center justify-center mx-auto">
        <div className="pb-16">
          <h1
            className="mb-4 text-4xl font-bold text-center text-white tracking-wider leading-none md:text-6xl md:mb-6 xl:text-7xl font-headline"
            style={{ textShadow: "0.2rem 0 #F7AD54" }}
          >
            {blok.title}
          </h1>
          {stream && (
            <StoryblokComponent blok={stream as unknown as SbBlokData} />
          )}
          <ul className="flex flex-wrap -mx-2 md:flex-nowrap">
            {blok.stream_btns?.map((btn) => (
              <li key={btn._uid} className="w-full px-2 mb-2 md:w-1/2">
                <BaseButton blok={btn} className="block w-full" />
              </li>
            ))}
          </ul>
          {cta && <BaseButton blok={cta} className="block w-full text-xl" />}
        </div>
      </div>
      <div className="absolute bottom-0 w-full h-16 text-center">
        <button className="mx-auto" onClick={scrollToMain}>
          <span className="sr-only">Zum Inhalt scrollen</span>
          <IconChevronDown className="w-12 h-12 text-primary" />
        </button>
      </div>
    </header>
  );
}
