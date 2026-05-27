import { storyblokEditable, type SbBlokData } from "@storyblok/react/rsc";

import BaseImage from "@/components/base/BaseImage";
import BaseLink from "@/components/base/BaseLink";
import BaseRichText from "@/components/base/BaseRichText";
import type { BaseBlok, StoryblokImage, StoryblokLink } from "@/types/storyblok";

interface BlokImageWithTextProps extends BaseBlok {
  image: StoryblokImage[];
  text: unknown;
  cta_link?: StoryblokLink;
  cta_name?: string;
  content_center?: boolean;
  style?: "image-left" | "image-right";
  lazyload_image?: boolean;
}

export default function BlokImageWithText({
  blok,
}: {
  blok: BlokImageWithTextProps;
}) {
  const image = blok.image?.[0];
  const reverse = blok.style === "image-right";

  return (
    <div
      {...storyblokEditable(blok as unknown as SbBlokData)}
      className="container mx-auto mb-8 md:mb-24 lg:mb-36 xl:mb-48"
    >
      <div
        className={`flex flex-wrap md:flex-nowrap md:space-x-16 ${
          blok.content_center ? "md:items-center" : "md:items-start"
        } ${reverse ? "md:flex-row-reverse md:space-x-reverse" : ""}`}
      >
        {image && (
          <div
            className="w-full md:flex-1 mb-4 md:mb-0 bg-secondary preserve-3d p-3 shadow-xl"
            style={{ transform: "perspective(1000px)" }}
          >
            <BaseImage
              image={{ src: image.filename, alt: image.alt }}
              lazy={blok.lazyload_image}
              className="block"
              style={{ transform: "translateZ(40px)" }}
            />
          </div>
        )}
        <div className="w-full md:w-1/2 md:flex-none mb-4 md:mb-0">
          <BaseRichText content={blok.text} />
          {blok.cta_link && blok.cta_name && (
            <BaseLink
              link={blok.cta_link}
              className="text-primary font-headline font-semibold uppercase border-primary border-b-2"
            >
              {blok.cta_name}
            </BaseLink>
          )}
        </div>
      </div>
    </div>
  );
}
