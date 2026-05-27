import { Metadata } from "next";
import { StoryblokLiveEditing, type ISbStoryData } from "@storyblok/react/rsc";

import StoryRenderer from "@/components/app/StoryRenderer";
import { fetchStory } from "@/lib/storyblok";
import { transformOgImage } from "@/lib/utils";
import type { MetaBlok, PageContent } from "@/types/storyblok";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const story = await fetchStory<PageContent>("home");
  const meta = (story?.content as { meta?: MetaBlok[] } | undefined)?.meta?.[0];
  if (!meta) return {};
  const ogImage = meta.og_image ? transformOgImage(meta.og_image) : undefined;
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
  };
}

export default async function HomePage() {
  const story = await fetchStory<PageContent>("home");
  if (!story?.content) {
    return (
      <main className="container mx-auto py-32 text-center">
        <h1 className="text-4xl font-headline text-headline">
          freiluft festival
        </h1>
        <p>Inhalt kann nicht geladen werden. Storyblok ist nicht konfiguriert.</p>
      </main>
    );
  }
  return (
    <>
      <StoryRenderer content={story.content} />
      <StoryblokLiveEditing story={story as unknown as ISbStoryData} />
    </>
  );
}
