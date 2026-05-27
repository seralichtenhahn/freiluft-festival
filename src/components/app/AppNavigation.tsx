"use client";

import { useState } from "react";
import { storyblokEditable, type SbBlokData } from "@storyblok/react/rsc";

import BaseLink from "@/components/base/BaseLink";
import IconX from "@/components/icons/IconX";
import SocialLink from "@/components/app/SocialLink";
import type { NavigationBlok } from "@/types/storyblok";

interface AppNavigationProps {
  navigation?: NavigationBlok | null;
  mode?: "dark" | "light";
}

export default function AppNavigation({
  navigation,
  mode = "dark",
}: AppNavigationProps) {
  const [showNav, setShowNav] = useState(false);

  if (!navigation) return null;

  const navClasses =
    mode === "dark"
      ? "text-headline border-headline"
      : "text-white border-white";
  const buttonClasses = mode === "dark" ? "bg-headline" : "bg-white";

  const closeMenu = () => setShowNav(false);

  return (
    <nav
      {...storyblokEditable(navigation as unknown as SbBlokData)}
      className="relative top-0 w-full z-10 flex justify-end p-2"
    >
      <ul
        className={`flex items-center border-r-2 pr-2 mr-1 lg:pr-4 lg:mr-2 ${navClasses}`}
      >
        {navigation.social_menu?.map((social) => (
          <li key={social._uid} className="p-1 py-2">
            <SocialLink blok={social} height="h-5 lg:h-10" />
          </li>
        ))}
      </ul>
      <button className="p-2" onClick={() => setShowNav((v) => !v)}>
        <span className="sr-only">Navigation öffnen</span>
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className={`block w-6 h-1 my-1 rounded-sm lg:w-8 lg:my-2 ${buttonClasses}`}
          />
        ))}
      </button>
      {showNav && (
        <div className="fixed inset-0 z-50">
          <div className="absolute w-full h-full bg-secondary" />
          <div className="absolute bg-white w-full h-full p-4 flex flex-col justify-between">
            <button
              className="absolute top-0 right-0 w-8 h-8 m-2 mt-4 lg:h-12 lg:w-12"
              onClick={closeMenu}
            >
              <span className="sr-only">Navigation schliessen</span>
              <IconX className="text-headline" />
            </button>
            <ul className="pt-16 container overflow-y-auto mx-auto space-y-2 md:space-y-6">
              {navigation.main_menu?.map((item) => (
                <li key={item._uid}>
                  <BaseLink
                    link={item.link}
                    onClick={closeMenu}
                    className="text-headline font-headline text-5xl font-bold md:text-7xl lg:text-9xl xl:text-12xl"
                  >
                    {item.title}
                  </BaseLink>
                </li>
              ))}
            </ul>
            <ul className="pb-8 container mx-auto">
              {navigation.secondary_menu?.map((item) => (
                <li key={item._uid} className="inline-block pr-4">
                  <BaseLink
                    link={item.link}
                    onClick={closeMenu}
                    className="text-headline font-headline"
                  >
                    {item.title}
                  </BaseLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
