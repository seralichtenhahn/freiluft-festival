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
  appheader: AppHeader,
  applivestreamheader: AppLivestreamHeader,
  blokartist: BlokArtist,
  blokfacebookplayer: BlokFacebookPlayer,
  blokiframe: BlokIframe,
  blokimage: BlokImage,
  blokimagewithtext: BlokImageWithText,
  bloklineup: BlokLineUp,
  blokrichtext: BlokRichtext,
  bloksponsors: BlokSponsors,
  blokspotifyplayer: BlokSpotifyPlayer,
  bloktickets: BlokTickets,
  bloktitlesection: BlokTitleSection,
  blokyoutubeplayer: BlokYoutubePlayer,
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
