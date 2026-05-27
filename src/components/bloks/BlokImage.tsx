import { storyblokEditable, type SbBlokData } from "@storyblok/react/rsc";

import BaseImage, {
  type ImageSourceOption,
} from "@/components/base/BaseImage";
import type { BaseBlok } from "@/types/storyblok";

interface BlokImageProps extends BaseBlok {
  image: string;
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
  if (!blok.image) return null;

  return (
    <div
      {...storyblokEditable(blok as unknown as SbBlokData)}
      className="container mx-auto mb-8 md:mb-24"
    >
      <BaseImage
        image={{ src: blok.image, alt: blok.caption }}
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
