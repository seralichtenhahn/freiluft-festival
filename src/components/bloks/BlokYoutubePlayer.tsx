import { storyblokEditable, type SbBlokData } from "@storyblok/react/rsc";

import BaseMedia from "@/components/base/BaseMedia";
import type { BaseBlok } from "@/types/storyblok";

interface BlokYoutubePlayerProps extends BaseBlok {
  id: string;
  controls?: boolean;
  container?: boolean;
  size?: string;
  aspect_ratio?: string;
}

export default function BlokYoutubePlayer({
  blok,
}: {
  blok: BlokYoutubePlayerProps;
}) {
  const base = `https://www.youtube.com/embed/${blok.id}`;
  const src = blok.controls ? base : `${base}?controls=0`;

  return (
    <div {...storyblokEditable(blok as unknown as SbBlokData)}>
      <BaseMedia
        container={blok.container}
        size={blok.size}
        aspectRatio={blok.aspect_ratio}
      >
        <iframe
          src={src}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </BaseMedia>
    </div>
  );
}
