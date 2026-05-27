import type { ReactNode } from "react";

import BaseLink from "@/components/base/BaseLink";
import IconFacebook from "@/components/icons/IconFacebook";
import IconHeart from "@/components/icons/IconHeart";
import IconYoutube from "@/components/icons/IconYoutube";
import type { BaseBlok, StoryblokLink } from "@/types/storyblok";

export interface ButtonBlok extends BaseBlok {
  title: string;
  link: StoryblokLink;
  external_tab?: boolean;
  style?: "default" | "youtube" | "facebook" | "donate";
}

interface BaseButtonProps {
  blok: ButtonBlok;
  className?: string;
}

const styles: Record<string, string> = {
  default: "bg-secondary",
  youtube: "bg-youtube",
  facebook: "bg-facebook",
  donate: "bg-secondary",
};

const icons: Record<string, ReactNode> = {
  youtube: <IconYoutube className="h-5 inline-block" />,
  facebook: <IconFacebook className="h-5 inline-block" />,
  donate: <IconHeart className="h-5 inline-block" />,
};

export default function BaseButton({ blok, className }: BaseButtonProps) {
  const styleClass = styles[blok.style ?? "default"] ?? styles.default;
  const icon = blok.style ? icons[blok.style] : null;

  return (
    <BaseLink
      link={blok.link}
      externalTab={blok.external_tab}
      className={`text-white font-headline font-semibold uppercase px-4 py-2 text-center rounded tracking-wide ${styleClass} ${className ?? ""}`}
    >
      {icon}
      {blok.title}
    </BaseLink>
  );
}
