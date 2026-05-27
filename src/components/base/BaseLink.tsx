import Link from "next/link";
import type { ReactNode } from "react";

import type { StoryblokLink } from "@/types/storyblok";
import {
  compileExternalLink,
  isEmail,
  isInternalLink,
  translateInternalUrl,
} from "@/lib/utils";

interface BaseLinkProps {
  link: StoryblokLink;
  externalTab?: boolean;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

export default function BaseLink({
  link,
  externalTab = false,
  className,
  children,
  onClick,
}: BaseLinkProps) {
  if (!link) return null;

  if (isInternalLink(link.linktype)) {
    return (
      <Link
        href={translateInternalUrl(link.cached_url)}
        className={className}
        target={externalTab ? "_blank" : undefined}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  if (isEmail(link.linktype)) {
    return (
      <a
        href={`mailto:${link.email ?? link.url ?? ""}`}
        className={className}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={compileExternalLink(link)}
      rel="noopener"
      target="_blank"
      className={className}
      onClick={onClick}
    >
      {children}
    </a>
  );
}
