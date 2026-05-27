import { storyblokEditable, type SbBlokData } from "@storyblok/react/rsc";

import BaseMedia from "@/components/base/BaseMedia";
import type { BaseBlok } from "@/types/storyblok";

interface BlokSpotifyPlayerProps extends BaseBlok {
  embed_url: string;
  height?: string;
  container?: boolean;
  size?: string;
  aspect_ratio?: string;
}

export default function BlokSpotifyPlayer({
  blok,
}: {
  blok: BlokSpotifyPlayerProps;
}) {
  return (
    <div {...storyblokEditable(blok as unknown as SbBlokData)}>
      <BaseMedia
        container={blok.container}
        size={blok.size}
        aspectRatio={blok.aspect_ratio}
      >
        <iframe
          src={blok.embed_url}
          height={blok.height}
          className="w-full"
          frameBorder="0"
          allowTransparency
          allow="encrypted-media"
        />
      </BaseMedia>
    </div>
  );
}
