import { storyblokEditable, type SbBlokData } from "@storyblok/react/rsc";

import BlokTitleSection from "@/components/bloks/BlokTitleSection";
import Sponsor from "@/components/app/Sponsor";
import type { BaseBlok } from "@/types/storyblok";

interface BlokSponsorsProps extends BaseBlok {
  title_section?: BaseBlok[];
  sponsors?: BaseBlok[];
}

export default function BlokSponsors({ blok }: { blok: BlokSponsorsProps }) {
  const title = blok.title_section?.[0];
  return (
    <div {...storyblokEditable(blok as unknown as SbBlokData)}>
      {title && <BlokTitleSection blok={title as never} />}
      <div className="container mx-auto overflow-x-hidden">
        <ul className="flex flex-wrap -mx-8 md:-mx-16 md:items-center">
          {blok.sponsors?.map((sponsor) => (
            <li
              key={sponsor._uid}
              className="w-1/2 px-8 mb-8 md:w-1/4 md:px-16 md:mb-16"
            >
              <Sponsor blok={sponsor as never} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
