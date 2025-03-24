import { BookOpenCheck, ChartNoAxesCombined, UserCheck } from "lucide-react";
export const NavbarItems = [
  { id: 1, label: "Home", href: "/" },
  { id: 2, label: "Trending", href: "/trending" },
  { id: 3, label: "Most Popular", href: "/most-popular" },
  { id: 4, label: "About", href: "/about" },
];

export const Categories = [
  { id: 1, label: "coding" },
  { id: 2, label: "music" },
  { id: 3, label: "gaming" },
  { id: 4, label: "news" },
  { id: 5, label: "sports" },
];

export const sidebarLinks = [
  {
    label: "Analytics",
    icon: ChartNoAxesCombined,
    path: "/profile/dashboard",
  },
  {
    label: "Posts",
    icon: BookOpenCheck,
    path: "/profile/posts",
  },
  {
    label: "Followers",
    icon: UserCheck,
    path: "/profile/followers",
  },
];
