import { storyblokEditable, type SbBlokData } from "@storyblok/react/rsc";

import BaseLink from "@/components/base/BaseLink";
import FreiluftLogoWhite from "@/components/icons/FreiluftLogoWhite";
import type { FooterBlok } from "@/types/storyblok";

export default function AppFooter({ footer }: { footer?: FooterBlok | null }) {
  if (!footer) return null;

  const mainMenu = footer.main_menu ?? [];
  const legalMenu = footer.legal_menu ?? [];

  return (
    <footer
      {...storyblokEditable(footer as unknown as SbBlokData)}
      className="bg-secondary py-8 lg:py-12"
    >
      <div className="container mx-auto">
        <ul className="mb-4 lg:mb-12">
          {mainMenu.map((item) => (
            <li key={item._uid}>
              <BaseLink
                link={item.link}
                className="font-headline text-headline font-bold text-2xl lg:text-3xl"
              >
                {item.title}
              </BaseLink>
            </li>
          ))}
        </ul>
        <hr className="border-t-2 border-headline mb-4 lg:mb-12" />
        <div className="flex flex-wrap text-white md:flex-nowrap md:justify-between md:items-center">
          <div className="flex w-full font-headline font-bold items-center text-xl tracking-wider mb-4 md:w-auto md:mb-0 lg:text-2xl">
            <FreiluftLogoWhite className="h-8 w-auto mr-4 lg:h-12 text-white" />{" "}
            freiluft festival
          </div>
          <ul>
            {legalMenu.map((item, i) => (
              <li key={item._uid} className="inline-block">
                <BaseLink
                  link={item.link}
                  className="font-headline uppercase font-semibold tracking-wider md:text-xl"
                >
                  {item.title}
                </BaseLink>
                {i + 1 !== legalMenu.length && (
                  <span className="mx-2">•</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
