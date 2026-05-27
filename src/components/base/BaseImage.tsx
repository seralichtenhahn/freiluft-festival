import type { CSSProperties } from "react";

export interface BaseImageData {
  src: string;
  alt?: string;
  crop?: string;
}

export interface ImageSourceOption {
  type?: string | false;
  media?: string | false;
  width: number | string;
}

interface BaseImageProps {
  image: BaseImageData;
  lazy?: boolean;
  placeholder?: boolean;
  options?: ImageSourceOption[];
  className?: string;
  style?: CSSProperties;
}

const defaultOptions: ImageSourceOption[] = [
  { type: "image/webp", media: "(min-width: 768px)", width: 768 },
  { type: "image/webp", media: false, width: 568 },
  { type: false, media: "(min-width: 768px)", width: 768 },
  { type: false, media: false, width: 568 },
];

function getDimensions(image: BaseImageData, width: number): string {
  if (!image.crop) return `${width}x0/smart`;
  const [w, h] = image.crop.split("x").map(Number);
  const ratio = w / h;
  return `${width}x${Math.floor(width * ratio)}/smart`;
}

function getFilters(option: ImageSourceOption): string {
  return option.type ? "/filters:format(webp)" : "";
}

function getPath(image: BaseImageData, option: ImageSourceOption): string {
  const imageService = "https://img2.storyblok.com/";
  const src = image.src;
  let path = src.replace("https://a.storyblok.com", "");
  path = path === src ? src.replace("//a.storyblok.com", "") : path;
  const width = Number(option.width);
  return `${imageService}${getDimensions(image, width)}${getFilters(option)}${path}`;
}

function getSourceSet(image: BaseImageData, option: ImageSourceOption): string {
  const sizes = [1, 2];
  return sizes
    .map((size) => {
      const w = Number(option.width) * size;
      return `${getPath(image, { ...option, width: w })} ${size}x`;
    })
    .join(", ");
}

export default function BaseImage({
  image,
  lazy = true,
  options = defaultOptions,
  className,
  style,
}: BaseImageProps) {
  if (!image?.src) return null;

  return (
    <picture className={className} style={style}>
      {options.map((option, i) => (
        <source
          key={i}
          srcSet={getSourceSet(image, option)}
          media={option.media || undefined}
          type={(option.type as string) || undefined}
        />
      ))}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={getPath(image, { width: 1200 })}
        alt={image.alt ?? ""}
        loading={lazy ? "lazy" : "eager"}
      />
    </picture>
  );
}
