import { BookOpenCheck, ChartNoAxesCombined, UserCheck } from "lucide-react";
export const NavbarItems = [
  { id: 1, label: "Home", href: "/" },
  { id: 2, label: "Trending", href: "/trending" },
  { id: 3, label: "Most Popular", href: "/most-popular" },
  { id: 4, label: "About", href: "/about" },
];

export const Categories = [
  { id: 1, label: "All" },
  { id: 2, label: "Music" },
  { id: 3, label: "Gaming" },
  { id: 4, label: "News" },
  { id: 5, label: "Sports" },
  { id: 6, label: "Coding" },
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
