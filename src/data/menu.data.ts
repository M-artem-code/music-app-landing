import { PagesConfig } from "../config/pages.config";
import { Home, Compass, Radio } from "lucide-react";

export const MENU_ITEMS = [
  {
    name: "Home",
    link: PagesConfig.HOME,
    icon: Home,
  },
  {
    name: "Discover",
    link: PagesConfig.DISCOVER,
    icon: Compass,
  },
  {
    name: "Radio",
    link: PagesConfig.RADIO,
    icon: Radio,
  },
];

export type TMenuItem = (typeof MENU_ITEMS)[number];

export const LIBRARY_MENU_ITEMS = [
  {
    name: "MADE_FOR_YOU",
    link: PagesConfig.MADE_FOR_YOU,
  },
  {
    name: "Recently Played",
    link: PagesConfig.RECENTLY_PLAYED,
  },
  {
    name: "Liked Songs",
    link: PagesConfig.LIKED_SONGS,
  },
  {
    name: "Albums",
    link: PagesConfig.ALBUMS,
  },
  {
    name: "Artists",
    link: PagesConfig.ARTISTS,
  },
];
