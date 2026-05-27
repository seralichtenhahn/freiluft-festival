import { storyblokEditable, type SbBlokData } from "@storyblok/react/rsc";

import BaseImage, { type BaseImageData } from "@/components/base/BaseImage";
import BaseLink from "@/components/base/BaseLink";
import SocialLink from "@/components/app/SocialLink";
import type {
  BaseBlok,
  SocialLinkBlok,
  StoryblokLink,
} from "@/types/storyblok";

interface BlokArtistProps extends BaseBlok {
  title: string;
  time?: string;
  image: BaseImageData[];
  link: StoryblokLink;
  social_links?: SocialLinkBlok[];
  lazyload_image?: boolean;
}

export default function BlokArtist({
  blok,
  index = 0,
}: {
  blok: BlokArtistProps;
  index?: number;
}) {
  const image = blok.image?.[0];
  const reverse = index % 2 === 0;
  const socials = blok.social_links ?? [];

  return (
    <div
      {...storyblokEditable(blok as unknown as SbBlokData)}
      className="container mx-auto mb-16 md:mb-32"
    >
      <div
        className={`flex flex-wrap md:flex-nowrap md:items-center md:space-x-16 md:justify-between ${
          reverse ? "md:flex-row-reverse md:space-x-reverse" : ""
        }`}
      >
        {image && (
          <div
            className="w-full mb-8 md:w-1/2 lg:w-5/12 md:mb-0 bg-secondary preserve-3d p-3 shadow-xl"
            style={{ transform: "perspective(1000px)" }}
          >
            <BaseImage
              image={image}
              lazy={blok.lazyload_image}
              className="block"
              style={{ transform: "translateZ(45px)" }}
            />
          </div>
        )}
        <div className="w-full md:flex-1">
          {blok.time && <p>{blok.time}</p>}
          <h3 className="text-4xl font-bold leading-none mb-2 md:text-6xl lg:text-9xl md:mb-6">
            {blok.title}
          </h3>
          <div className="flex items-center">
            <BaseLink
              link={blok.link}
              className="text-primary font-headline font-semibold uppercase border-primary border-b-2"
            >
              Mehr infos
            </BaseLink>
            {socials.length > 0 && <span className="mx-2">•</span>}
            {socials.map((social) => (
              <SocialLink
                key={social._uid}
                blok={social}
                className="opacity-50 text-headline mr-2"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
