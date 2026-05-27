import { StoryblokServerComponent, type SbBlokData } from "@storyblok/react/rsc";

import PageGallery from "@/components/app/PageGallery";
import type {
  BaseBlok,
  PageContent,
  PageDefaultContent,
  PageGalleryContent,
  PageHomeContent,
} from "@/types/storyblok";

interface StoryRendererProps {
  content: PageContent;
}

function PageHome({ content }: { content: PageHomeContent }) {
  const header = content.header?.[0];
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
      <main className="pt-8">
        {content.content?.map((blok) => (
          <StoryblokServerComponent
            key={blok._uid}
            blok={blok as unknown as SbBlokData}
          />
        ))}
      </main>
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
