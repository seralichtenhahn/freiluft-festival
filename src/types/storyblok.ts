import type { ISbStoryData } from "@storyblok/react/rsc";

export interface StoryblokLink {
  id?: string;
  url?: string;
  email?: string;
  linktype?: "story" | "url" | "email" | "asset";
  fieldtype?: string;
  cached_url?: string;
  target?: string;
}

export interface StoryblokImage {
  id?: number;
  alt?: string;
  name?: string;
  focus?: string;
  title?: string;
  filename: string;
  copyright?: string;
  fieldtype?: string;
}

export interface BaseBlok {
  _uid: string;
  component: string;
  _editable?: string;
}

export interface SocialLinkBlok extends BaseBlok {
  component: "social_link";
  type: "instagram" | "facebook" | "twitter" | "youtube";
  link: string;
}

export interface NavLinkBlok extends BaseBlok {
  title: string;
  link: StoryblokLink;
}

export interface NavigationBlok extends BaseBlok {
  social_menu?: SocialLinkBlok[];
  main_menu?: NavLinkBlok[];
  secondary_menu?: NavLinkBlok[];
}

export interface FooterBlok extends BaseBlok {
  main_menu?: NavLinkBlok[];
  legal_menu?: NavLinkBlok[];
}

export interface BannerBlok extends BaseBlok {
  text: unknown;
}

export interface MetaBlok extends BaseBlok {
  title?: string;
  title_template?: string;
  description?: string;
  keywords?: string;
  site_name?: string;
  type?: string;
  og_image?: string;
}

export interface SettingsContent {
  banner?: BannerBlok[];
  navigation?: NavigationBlok[];
  footer?: FooterBlok[];
  meta?: MetaBlok[];
}

export interface PageHomeContent {
  component: "page-home";
  header?: BaseBlok[];
  content?: BaseBlok[];
  meta?: MetaBlok[];
  banner?: BaseBlok[];
}

export interface PageDefaultContent {
  component: "page-default";
  title: string;
  content?: BaseBlok[];
  meta?: MetaBlok[];
}

export interface GalleryImage {
  filename: string;
  name?: string;
}

export interface PageGalleryContent {
  component: "page-gallery";
  title: string;
  subtitle?: string;
  photographer?: string;
  date?: string;
  images: GalleryImage[];
  meta?: MetaBlok[];
}

export type PageContent =
  | PageHomeContent
  | PageDefaultContent
  | PageGalleryContent;

export type StoryData<C = PageContent> = ISbStoryData<C>;
