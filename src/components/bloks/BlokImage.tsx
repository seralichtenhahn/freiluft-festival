import { storyblokEditable, type SbBlokData } from "@storyblok/react/rsc";

import BaseImage, { type ImageSourceOption } from "@/components/base/BaseImage";
import type { BaseBlok, StoryblokImage } from "@/types/storyblok";

interface BlokImageProps extends BaseBlok {
  image: StoryblokImage[];
  caption?: string;
  lazyload_image?: boolean;
}

const options: ImageSourceOption[] = [
  { type: "image/webp", media: "(min-width: 768px)", width: 1280 },
  { type: "image/webp", media: false, width: 768 },
  { type: false, media: "(min-width: 768px)", width: 1280 },
  { type: false, media: false, width: 768 },
];

export default function BlokImage({ blok }: { blok: BlokImageProps }) {
  const image = blok.image?.[0];
  if (!image) return null;

  return (
    <div
      {...storyblokEditable(blok as unknown as SbBlokData)}
      className="container mx-auto mb-8 md:mb-24"
    >
      <BaseImage
        image={{ src: image.filename, alt: image.alt }}
        lazy={blok.lazyload_image}
        options={options}
        className="block w-full"
      />
      {blok.caption && (
        <p className="mt-4 italic text-sm text-center">{blok.caption}</p>
      )}
    </div>
  );
}
