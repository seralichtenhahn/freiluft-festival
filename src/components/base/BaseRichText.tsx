import {
  render,
  MARK_LINK,
  NODE_PARAGRAPH,
} from "storyblok-rich-text-react-renderer";

import BaseLink from "@/components/base/BaseLink";
import type { StoryblokLink } from "@/types/storyblok";

interface BaseRichTextProps {
  content: unknown;
  fontSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl";
  className?: string;
}

const sizes: Record<NonNullable<BaseRichTextProps["fontSize"]>, string> = {
  xs: "prose-xs",
  sm: "prose-sm",
  base: "prose-base",
  lg: "prose-lg",
  xl: "prose-xl",
  "2xl": "prose-xl",
};

interface LinkAttrs {
  href: string;
  target?: string;
  linktype?: string;
  uuid?: string;
  anchor?: string | null;
}

export default function BaseRichText({
  content,
  fontSize = "lg",
  className,
}: BaseRichTextProps) {
  if (!content) return null;

  const rendered = render(content, {
    markResolvers: {
      [MARK_LINK]: (children, props) => {
        const attrs = props as LinkAttrs;
        const link: StoryblokLink = {
          linktype: (attrs.linktype as StoryblokLink["linktype"]) || "url",
          cached_url: attrs.href,
          url: attrs.href,
          email: attrs.href,
          target: attrs.target,
        };
        return (
          <BaseLink link={link} externalTab={attrs.target === "_blank"} className="font-bold">
            {children}
          </BaseLink>
        );
      },
    },
    nodeResolvers: {
      [NODE_PARAGRAPH]: (children) => <p>{children}</p>,
    },
  });

  return (
    <div
      className={`rich-text prose prose-h2:text-4xl prose-h2:mt-0 prose-h2:text-headline md:prose-h2:text-5xl md:prose-h2:leading-tight lg:prose-h2:mb-8 lg:prose-h2:text-6xl prose-p:mt-0 ${sizes[fontSize]} ${className ?? ""}`}
    >
      {rendered}
    </div>
  );
}
