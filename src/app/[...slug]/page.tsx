import type { Metadata } from "next";
import { notFound } from "next/navigation";

import StoryRenderer from "@/components/app/StoryRenderer";
import { fetchStory, getStoryblokApi, storyblokVersion } from "@/lib/storyblok";
import { transformOgImage } from "@/lib/utils";
import type { MetaBlok, PageContent } from "@/types/storyblok";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  const api = getStoryblokApi();
  if (!api) return [];
  try {
    const { data } = await api.get("cdn/links", { version: storyblokVersion() });
    const links = data?.links as
      | Record<string, { slug: string; is_folder: boolean }>
      | undefined;
    if (!links) return [];
    return Object.values(links)
      .filter(
        (link) =>
          !link.is_folder &&
          link.slug !== "home" &&
          link.slug !== "_settings"
      )
      .map((link) => ({ slug: link.slug.split("/") }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = await fetchStory<PageContent>(slug.join("/"));
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

export default async function CatchAllPage({ params }: PageProps) {
  const { slug } = await params;
  const story = await fetchStory<PageContent>(slug.join("/"));
  if (!story?.content) notFound();
  return <StoryRenderer content={story.content} />;
}
