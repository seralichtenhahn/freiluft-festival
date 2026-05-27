"use client";

import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";

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

const components = {
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

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
  apiOptions: { region: "eu" },
  components,
  bridge: process.env.NEXT_PUBLIC_STORYBLOK_VERSION !== "published",
});

export default function StoryblokProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
