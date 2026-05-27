import { storyblokEditable, type SbBlokData } from "@storyblok/react/rsc";

import BlokArtist from "@/components/bloks/BlokArtist";
import BlokTitleSection from "@/components/bloks/BlokTitleSection";
import type { BaseBlok } from "@/types/storyblok";

interface BlokLineUpProps extends BaseBlok {
  title_section?: BaseBlok[];
  artists?: BaseBlok[];
}

export default function BlokLineUp({ blok }: { blok: BlokLineUpProps }) {
  const title = blok.title_section?.[0];
  return (
    <div {...storyblokEditable(blok as unknown as SbBlokData)}>
      {title && <BlokTitleSection blok={title as never} />}
      {blok.artists?.map((artist, i) => (
        <BlokArtist key={artist._uid} blok={artist as never} index={i} />
      ))}
    </div>
  );
}
