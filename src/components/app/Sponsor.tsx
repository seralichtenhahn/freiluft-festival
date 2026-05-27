import BaseImage, {
  type BaseImageData,
  type ImageSourceOption,
} from "@/components/base/BaseImage";
import { compileExternalLink } from "@/lib/utils";
import type { BaseBlok } from "@/types/storyblok";

interface SponsorBlok extends BaseBlok {
  link: { url?: string };
  image: BaseImageData[];
}

const options: ImageSourceOption[] = [
  { type: "image/webp", media: false, width: 240 },
  { type: false, media: false, width: 240 },
];

export default function Sponsor({ blok }: { blok: SponsorBlok }) {
  const image = blok.image?.[0];
  if (!image) return null;

  if (blok.link?.url) {
    return (
      <a
        href={compileExternalLink(blok.link.url)}
        rel="noopener"
        target="_blank"
      >
        <BaseImage image={image} options={options} />
      </a>
    );
  }

  return <BaseImage image={image} options={options} />;
}
