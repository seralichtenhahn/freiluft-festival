import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";
import type { ISbStoryParams } from "@storyblok/react/rsc";

import BlokArtist from "@/components/bloks/BlokArtist";
import BlokFacebookPlayer from "@/components/bloks/BlokFacebookPlayer";
import BlokIframe from "@/components/bloks/BlokIframe";
import BlokImage from "@/components/bloks/BlokImage";
import BlokImageWithText from "@/components/bloks/BlokImageWithText";
import BlokLineUp from "@/components/bloks/BlokLineUp";
import BlokRichtext from "@/components/bloks/BlokRichtext";
import BlokSponsors from "@/components/bloks/BlokSponsors";
import BlokSpotifyPlayer from "@/components/bloks/BlokSpotifyPlayer";
import BlokTickets from "@/components/bloks/BlokTickets";
import BlokTitleSection from "@/components/bloks/BlokTitleSection";
import BlokYoutubePlayer from "@/components/bloks/BlokYoutubePlayer";
import AppHeader from "@/components/app/AppHeader";
import AppLivestreamHeader from "@/components/app/AppLivestreamHeader";

export const blokComponents = {
  "app-header": AppHeader,
  "app-livestream-header": AppLivestreamHeader,
  "blok-artist": BlokArtist,
  "blok-facebook-player": BlokFacebookPlayer,
  "blok-iframe": BlokIframe,
  "blok-image": BlokImage,
  "blok-image-with-text": BlokImageWithText,
  "blok-line-up": BlokLineUp,
  "blok-richtext": BlokRichtext,
  "blok-sponsors": BlokSponsors,
  "blok-spotify-player": BlokSpotifyPlayer,
  "blok-tickets": BlokTickets,
  "blok-title-section": BlokTitleSection,
  "blok-youtube-player": BlokYoutubePlayer,
};

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
  apiOptions: { region: "eu" },
  components: blokComponents,
});

export const storyblokVersion = (): "draft" | "published" =>
  (process.env.NEXT_PUBLIC_STORYBLOK_VERSION as "draft" | "published") || "draft";

export async function fetchStory<T = unknown>(slug: string) {
  const api = getStoryblokApi();
  if (!api) return null;

  const params: ISbStoryParams = {
    version: storyblokVersion(),
    resolve_links: "url",
  };

  try {
    const { data } = await api.get(`cdn/stories/${slug}`, params);
    return data?.story as { content: T; slug: string; full_slug: string } | null;
  } catch {
    return null;
  }
}

export async function fetchSettings() {
  const api = getStoryblokApi();
  if (!api) return null;
  try {
    const { data } = await api.get("cdn/stories/_settings", {
      version: storyblokVersion(),
    });
    return data?.story?.content ?? null;
  } catch {
    return null;
  }
}
