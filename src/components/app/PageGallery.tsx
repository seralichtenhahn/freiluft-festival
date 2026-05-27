"use client";

import { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import BaseImage, { type ImageSourceOption } from "@/components/base/BaseImage";
import { transformImage } from "@/lib/utils";
import type { PageGalleryContent } from "@/types/storyblok";

const thumbnailOptions: ImageSourceOption[] = [
  { type: "image/webp", media: "(min-width: 768px)", width: 480 },
  { type: "image/webp", media: false, width: 256 },
  { type: false, media: "(min-width: 768px)", width: 480 },
  { type: false, media: false, width: 256 },
];

function getAltName(image: { filename: string; name?: string }): string {
  if (image.name) return image.name;
  const parts = image.filename.split("/");
  return parts[parts.length - 1] ?? "";
}

function formatDate(value?: string): string {
  if (!value) return "";
  return new Date(value).toLocaleDateString("de-DE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function PageGallery({
  content,
}: {
  content: PageGalleryContent;
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides = useMemo(
    () =>
      content.images.map((image) => ({
        src: transformImage(image.filename, { width: 1200, smart: true }),
        alt: `${content.title} - Foto von ${content.photographer ?? ""}`,
      })),
    [content.images, content.title, content.photographer]
  );

  return (
    <div className="min-h-screen-90">
      <header className="container mx-auto pt-8">
        <h1 className="text-6xl lg:text-8xl mb-4 font-bold font-headline text-headline">
          {content.title}
        </h1>
        {content.subtitle && <p>{content.subtitle}</p>}
      </header>
      <main className="container mx-auto mb-8 md:mb-16">
        {content.photographer && <p>📷: {content.photographer}</p>}
        {content.date && <p>📅: {formatDate(content.date)}</p>}
        <ul className="grid grid-cols-3 pt-8 gap-2 md:gap-4">
          {content.images.map((image, i) => (
            <li
              key={image.filename + i}
              className="bg-primary aspect-square"
            >
              <button
                type="button"
                className="block w-full relative"
                onClick={() => {
                  setIndex(i);
                  setOpen(true);
                }}
              >
                <BaseImage
                  image={{
                    src: image.filename,
                    alt: getAltName(image),
                    crop: "1x1",
                  }}
                  options={thumbnailOptions}
                  placeholder
                />
              </button>
            </li>
          ))}
        </ul>
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={slides}
        />
      </main>
    </div>
  );
}
