import type { ReactNode } from "react";

import { StoryblokServerComponent, storyblokEditable, type SbBlokData } from "@storyblok/react/rsc";

import PageGallery from "@/components/app/PageGallery";
import BaseRichText from "@/components/base/BaseRichText";
import type {
  BaseBlok,
  PageContent,
  PageDefaultContent,
  PageGalleryContent,
  PageHomeContent,
} from "@/types/storyblok";

interface TitleSectionBlok extends BaseBlok {
  title: string;
  text?: unknown;
}

interface StoryRendererProps {
  content: PageContent;
}

function PageHome({ content }: { content: PageHomeContent }) {
  const header = content.header?.[0];
  const bloks = content.content ?? [];
  const rendered: ReactNode[] = [];

  for (let i = 0; i < bloks.length; i += 1) {
    const blok = bloks[i];
    const next = bloks[i + 1];
    if (blok.component === "base-image" && next?.component === "blok-title-section") {
      const titleBlok = next as TitleSectionBlok;
      rendered.push(
        <div
          key={blok._uid}
          className="container mx-auto px-4 mb-8 md:mb-32 flex flex-wrap md:flex-nowrap md:items-center md:space-x-12 lg:space-x-16"
        >
          <div className="w-full md:w-5/12 lg:w-1/3 mb-4 md:mb-0">
            <StoryblokServerComponent blok={blok as unknown as SbBlokData} />
          </div>
          <div
            {...storyblokEditable(titleBlok as unknown as SbBlokData)}
            className="w-full md:flex-1"
          >
            <h2 className="text-headline text-2xl md:text-3xl">{titleBlok.title}</h2>
            {titleBlok.text != null && (
              <BaseRichText content={titleBlok.text} fontSize="2xl" className="text-2xl" />
            )}
          </div>
        </div>,
      );
      i += 1;
      continue;
    }
    rendered.push(
      <StoryblokServerComponent key={blok._uid} blok={blok as unknown as SbBlokData} />,
    );
  }

  return (
    <div>
      {header && (
        <StoryblokServerComponent
          blok={
            {
              ...header,
              component: header.component.replace("page", "app"),
            } as unknown as SbBlokData
          }
        />
      )}
      <main className="pt-8">{rendered}</main>
    </div>
  );
}

function PageDefault({ content }: { content: PageDefaultContent }) {
  return (
    <div className="min-h-screen-90">
      <header className="container mx-auto pt-8 md:mb-4">
        <h1 className="text-6xl lg:text-8xl mb-4 font-bold font-headline text-headline">
          {content.title}
        </h1>
      </header>
      <main className="pt-8">
        {content.content?.map((blok: BaseBlok) => (
          <StoryblokServerComponent
            key={blok._uid}
            blok={blok as unknown as SbBlokData}
          />
        ))}
      </main>
    </div>
  );
}

export default function StoryRenderer({ content }: StoryRendererProps) {
  switch (content.component) {
    case "page-home":
      return <PageHome content={content as PageHomeContent} />;
    case "page-gallery":
      return <PageGallery content={content as PageGalleryContent} />;
    case "page-default":
    default:
      return <PageDefault content={content as PageDefaultContent} />;
  }
}
