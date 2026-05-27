import { storyblokEditable, type SbBlokData } from "@storyblok/react/rsc";

import BaseRichText from "@/components/base/BaseRichText";
import type { BaseBlok } from "@/types/storyblok";

interface BlokTitleSectionProps extends BaseBlok {
  title: string;
  text?: unknown;
}

export default function BlokTitleSection({
  blok,
}: {
  blok: BlokTitleSectionProps;
}) {
  return (
    <div
      {...storyblokEditable(blok as unknown as SbBlokData)}
      className="container mx-auto md:px-24 lg:px-56 mb-8 md:mb-32"
    >
      <h2 className="text-headline text-2xl md:text-3xl">{blok.title}</h2>
      {blok.text != null && (
        <BaseRichText
          content={blok.text}
          fontSize="2xl"
          className="md:max-w-screen-sm text-2xl"
        />
      )}
    </div>
  );
}
