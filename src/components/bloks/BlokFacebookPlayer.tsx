import { storyblokEditable, type SbBlokData } from "@storyblok/react/rsc";

import BaseMedia from "@/components/base/BaseMedia";
import type { BaseBlok } from "@/types/storyblok";

interface BlokFacebookPlayerProps extends BaseBlok {
  src: string;
  container?: boolean;
  size?: string;
  aspect_ratio?: string;
}

export default function BlokFacebookPlayer({
  blok,
}: {
  blok: BlokFacebookPlayerProps;
}) {
  return (
    <div {...storyblokEditable(blok as unknown as SbBlokData)}>
      <BaseMedia
        container={blok.container}
        size={blok.size}
        aspectRatio={blok.aspect_ratio}
      >
        <iframe
          src={blok.src}
          frameBorder="0"
          allow="accelerometer; autoplay; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </BaseMedia>
    </div>
  );
}
