import {
  LEOSIA_DARK_THEME,
  LEOSIA_LIGHT_THEME,
  ZOSIA_DARK_THEME,
  ZOSIA_LIGHT_THEME,
} from "@client/utils/themes/themes";
import { Context } from "@reactivated";
import { useContext } from "react";

// Frontend part of the site config, backend part is SITES in server/settings/common.py.
// The current site is picked by the server based on the domain of the request.
export interface SiteConfig {
  code: string;
  name: string;
  // "Zosi"/"Leosi" - Polish genitive, e.g. "najbliższa edycja ZOSI"
  nameGenitive: string;
  fullName: string;
  fullNameGenitive: string;
  domain: string;
  logo: string;
  facebookUrl: string;
  lightTheme: string;
  darkTheme: string;
  darkenBanner: boolean;
  showShirtType: boolean;
  showDiscountInfo: boolean;
  termsTitle: string;
  // Dates used in the terms and conditions and signup rules
  cancellationDeadline: string;
  invitedRoomsDeadline: string;
}

const SITES: Record<string, SiteConfig> = {
  zosia: {
    code: "zosia",
    name: "ZOSIA",
    nameGenitive: "ZOSI",
    fullName: "Zimowy Obóz Studentów Informatyki A",
    fullNameGenitive: "Zimowego Obozu Studentów Informatyki A",
    domain: "zosia.org",
    logo: "imgs/zosia.svg",
    facebookUrl: "https://www.facebook.com/ZOSIA.KSI",
    lightTheme: ZOSIA_LIGHT_THEME,
    darkTheme: ZOSIA_DARK_THEME,
    darkenBanner: true,
    showShirtType: true,
    showDiscountInfo: true,
    termsTitle:
      "Regulamin Zimowego Obozu Studentów Informatyki A oraz warunki sprzedaży",
    cancellationDeadline: "31/01/2027 r.",
    invitedRoomsDeadline: "31 stycznia",
  },
  leosia: {
    code: "leosia",
    name: "LEOSIA",
    nameGenitive: "LEOSI",
    fullName: "LEtni Obóz Studentów Informatyki",
    fullNameGenitive: "LEtniego Obozu Studentów Informatyki",
    domain: "leosia.org",
    logo: "imgs/leosia-logo.png",
    facebookUrl: "https://www.facebook.com/ksi.uwr",
    lightTheme: LEOSIA_LIGHT_THEME,
    darkTheme: LEOSIA_DARK_THEME,
    darkenBanner: false,
    showShirtType: false,
    showDiscountInfo: false,
    termsTitle: "Regulamin LEtniego Obozu Studentów Informatyki",
    cancellationDeadline: "1 września 2026 r.",
    invitedRoomsDeadline: "1 września",
  },
};

export const useSite = (): SiteConfig => {
  const { site } = useContext(Context);
  return SITES[site.code] ?? SITES.zosia;
};
