import type { Metadata, Viewport } from "next";
import { Montserrat, Raleway } from "next/font/google";

import AppBanner from "@/components/app/AppBanner";
import AppFooter from "@/components/app/AppFooter";
import AppNavigation from "@/components/app/AppNavigation";
import StoryblokProvider from "@/components/StoryblokProvider";
import { fetchSettings } from "@/lib/storyblok";
import { transformOgImage } from "@/lib/utils";
import type {
  BannerBlok,
  FooterBlok,
  MetaBlok,
  NavigationBlok,
  SettingsContent,
} from "@/types/storyblok";

import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-raleway",
  display: "swap",
});

const ROOT_DOMAIN = "https://freiluftfestival.ch";

export async function generateMetadata(): Promise<Metadata> {
  const settings = (await fetchSettings()) as SettingsContent | null;
  const meta = settings?.meta?.[0];
  const title = meta?.title ?? "freiluft festival";
  const description = meta?.description ?? "";
  const ogImage = meta?.og_image ? transformOgImage(meta.og_image) : undefined;

  return {
    title: {
      default: title,
      template: meta?.title_template ?? `%s | ${title}`,
    },
    description,
    keywords: meta?.keywords,
    metadataBase: new URL(ROOT_DOMAIN),
    openGraph: {
      title,
      description,
      siteName: meta?.site_name ?? title,
      type: "website",
      locale: "de_CH",
      url: ROOT_DOMAIN,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#8BD2F5",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = (await fetchSettings()) as SettingsContent | null;
  const banner = settings?.banner?.[0] as BannerBlok | undefined;
  const navigation = settings?.navigation?.[0] as NavigationBlok | undefined;
  const footer = settings?.footer?.[0] as FooterBlok | undefined;

  return (
    <html
      lang="de-CH"
      className={`${montserrat.variable} ${raleway.variable}`}
    >
      <body className="font-body">
        <StoryblokProvider>
          <AppBanner banner={banner ?? null} />
          <AppNavigation navigation={navigation ?? null} />
          {children}
          <AppFooter footer={footer ?? null} />
        </StoryblokProvider>
      </body>
    </html>
  );
}

export type { MetaBlok };
