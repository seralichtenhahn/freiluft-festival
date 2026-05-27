import { storyblokEditable, type SbBlokData } from "@storyblok/react/rsc";

import BaseRichText from "@/components/base/BaseRichText";
import type { BannerBlok } from "@/types/storyblok";

export default function AppBanner({ banner }: { banner?: BannerBlok | null }) {
  if (!banner?.text) return null;

  return (
    <div
      {...storyblokEditable(banner as unknown as SbBlokData)}
      className="bg-secondary text-headline text-center py-2 px-4"
    >
      <BaseRichText className="max-w-none prose-p:mb-0" content={banner.text} />
    </div>
  );
}
