import { storyblokEditable, type SbBlokData } from "@storyblok/react/rsc";

import BaseMedia from "@/components/base/BaseMedia";
import type { BaseBlok } from "@/types/storyblok";

interface BlokIframeProps extends BaseBlok {
  src: string;
  height?: string;
  allow?: string;
  container?: boolean;
  size?: string;
}

export default function BlokIframe({ blok }: { blok: BlokIframeProps }) {
  return (
    <div {...storyblokEditable(blok as unknown as SbBlokData)}>
      <BaseMedia container={blok.container} size={blok.size}>
        <iframe
          src={blok.src}
          height={blok.height}
          className="w-full"
          frameBorder="0"
          allowTransparency
          allow={blok.allow}
        />
      </BaseMedia>
    </div>
  );
}
