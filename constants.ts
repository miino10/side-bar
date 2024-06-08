import { SideNavItem } from "./types";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Projects",
    path: "/projects",

    submenu: true,
    subMenuItems: [
      { title: "All", path: "/projects" },
      { title: "Web Design", path: "/projects/web-design" },
    ],
  },
  {
    title: "Messages",
    path: "/messages",
  },
  {
    title: "Settings",
    path: "/settings",

    submenu: true,
    subMenuItems: [
      { title: "Graphic Design", path: "/projects/graphic-design" },
    ],
  },
  {
    title: "Help",
    path: "/help",
  },
];
