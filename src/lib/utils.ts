import type { StoryblokLink } from "@/types/storyblok";

export function isInternalLink(linktype?: string): boolean {
  return linktype === "story";
}

export function isEmail(linktype?: string): boolean {
  return linktype === "email";
}

export function prependHttpToUrl(url: string): string {
  if (url.startsWith("http")) return url;
  return `https://${url}`;
}

export function translateInternalUrl(slug?: string): string {
  if (!slug) return "/";
  const url = slug === "home" ? "" : slug;
  if (url.startsWith("/")) return url;
  return `/${url}`;
}

export function compileExternalLink(link: StoryblokLink | string): string {
  const url = typeof link === "string" ? link : link.url || link.cached_url || "";
  return prependHttpToUrl(url);
}

export interface TransformImageOptions {
  width: number;
  height?: number;
  webp?: boolean;
  smart?: boolean;
}

export function transformImage(src: string, opts: TransformImageOptions): string {
  if (!src) return "";
  const imageService = "https://img2.storyblok.com/";
  let path = src.replace("https://a.storyblok.com", "");
  path = path === src ? src.replace("//a.storyblok.com", "") : path;

  const dim = `${opts.width}x${opts.height ?? 0}`;
  const smart = opts.smart === false ? "" : "/smart";
  const filters = opts.webp ? "/filters:format(webp)" : "";

  return `${imageService}${dim}${smart}${filters}${path}`;
}

export function transformOgImage(url: string): string {
  if (!url) return "";
  const imageService = "//img2.storyblok.com/";
  const path = url.replace("//a.storyblok.com", "");
  const options = "1200x630/smart/filters:format(jpeg):quality(70)";
  const fullUrl = `${imageService}${options}${path}`;
  return fullUrl.startsWith("http") ? fullUrl : `https:${fullUrl}`;
}
