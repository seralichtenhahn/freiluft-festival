import { storyblokEditable, type SbBlokData } from "@storyblok/react/rsc";

import BaseRichText from "@/components/base/BaseRichText";
import type { BaseBlok } from "@/types/storyblok";

interface BlokRichtextProps extends BaseBlok {
  text: unknown;
  smaller_container?: boolean;
}

export default function BlokRichtext({ blok }: { blok: BlokRichtextProps }) {
  const smaller = blok.smaller_container ? "md:px-24 lg:px-56" : "";
  return (
    <div
      {...storyblokEditable(blok as unknown as SbBlokData)}
      className={`container mx-auto mb-8 md:mb-24 ${smaller}`}
    >
      <BaseRichText content={blok.text} className="w-full mx-auto" />
    </div>
  );
}
