import { storyblokEditable, type SbBlokData } from "@storyblok/react/rsc";

import IconFacebook from "@/components/icons/IconFacebook";
import IconInstagram from "@/components/icons/IconInstagram";
import IconTwitter from "@/components/icons/IconTwitter";
import IconYoutube from "@/components/icons/IconYoutube";
import type { SocialLinkBlok } from "@/types/storyblok";

const icons = {
  instagram: IconInstagram,
  facebook: IconFacebook,
  twitter: IconTwitter,
  youtube: IconYoutube,
};

interface SocialLinkProps {
  blok: SocialLinkBlok;
  height?: string;
  className?: string;
}

export default function SocialLink({
  blok,
  height = "h-5",
  className,
}: SocialLinkProps) {
  const Icon = icons[blok.type];
  if (!Icon) return null;

  return (
    <a
      {...storyblokEditable(blok as unknown as SbBlokData)}
      href={blok.link}
      target="_blank"
      rel="noopener"
      className={className}
    >
      <Icon className={`${height} w-auto`} />
      <span className="sr-only">{blok.type}</span>
    </a>
  );
}
