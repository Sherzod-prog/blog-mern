"use client";
import React, { useState } from "react";
import {
  LayoutDashboard,
  LogOutIcon,
  MenuIcon,
  Settings,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ModeToggle } from "./ModeToggle";
import { NavbarItems } from "@/constants";
import { INavbarItems } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track menu visibility

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); // Toggle the menu state
  };

  const { account } = useAuthStore((state) => state);

  if (pathname.startsWith("/auth")) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logout successfully");
      router.push("/auth/sign-up");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    }
  };

  return (
    <div className="flex justify-between py-2 border-b-2 bg-slate-200 dark:bg-background px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      {/* Logo */}
      <div className="font-semibold text-xl my-auto">
        <Link href="/">
          Bl<span className="text-red-600">o</span>g.
        </Link>
      </div>

      {/* Menu Items */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute top-14 left-0 w-full bg-slate-200 md:static md:block md:w-auto`}
      >
        <ul className="flex flex-col md:ml-44 justify-center md:flex-row md:items-center gap-4 p-4 md:p-0">
          {NavbarItems.map((item: INavbarItems) => (
            <li
              key={item.id}
              className="transition-all text-center ease-out duration-200 hover:font-medium hover:border-b-2 hover:border-blue-600 py-1 px-2"
            >
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Section */}
      <div className="flex gap-2 md:w-fit w-full justify-end items-center mx-2">
        <Link
          className="border-2 border-red-600 text-center p-2 rounded-lg mx-2 hover:rounded-xl hover:transition-all hover:ease-in-out hover:bg-red-600 hover:text-white"
          href="/create-post"
        >
          Add Post
        </Link>
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src={account?.avatar} />
              <AvatarFallback>Sherzod</AvatarFallback>
              <span className="sr-only">Avatar</span>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" style={{ padding: 15 }}>
            <DropdownMenuItem onClick={() => router.push("/profile/dashboard")}>
              <LayoutDashboard /> Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/profile/settings")}>
              <Settings /> Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
              <LogOutIcon /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Hamburger Button */}
      <div className="flex md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
          {isMenuOpen ? (
            <XIcon size={30} className="block" />
          ) : (
            <MenuIcon size={30} className="block" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
