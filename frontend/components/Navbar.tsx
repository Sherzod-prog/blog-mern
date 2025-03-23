"use client";
import React from "react";
import { LayoutDashboard, LogOutIcon, Settings } from "lucide-react";
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

  const { account } = useAuthStore((state) => state);

  if (pathname.startsWith("/auth")) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/auth/logout`, {
        method: "POST",
      });
      localStorage.removeItem("token");
      toast.success("Logout successfully");
      router.push("/auth/sign-up");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    }
  };

  return (
    <div className="flex justify-between py-4 border-b-2 mb-2 bg-slate-200 dark:bg-background px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="font-semibold text-2xl">
        <Link href="/">
          Sherz<span className="text-red-600 tex">Blog.</span>
        </Link>
      </div>
      <div className="flex justify-end items-center">
        <div>
          <ul className="flex justify-center items-center gap-5 mr-20">
            {NavbarItems.map((item: INavbarItems) => (
              <li
                key={item.id}
                className="transition-all ease-out duration-200 hover:font-medium hover:border-b-2 hover:border-blue-600 py-1 px-2"
              >
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
            <Link
              className="border-2 border-red-600 p-2 rounded-lg hover:rounded-xl hover:transition-all hover:ease-in-out hover:bg-red-600 hover:text-white"
              href="/create-post"
            >
              Create Post
            </Link>
          </ul>
        </div>
        <div className="flex gap-4">
          <div className="hover:scale-105">
            <ModeToggle />
          </div>
          <div className="flex justify-center items-center hover:scale-105">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src={account?.avatar} />
                  <AvatarFallback>Sherzod</AvatarFallback>
                  <span className="sr-only">Avatar</span>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" style={{ padding: 15 }}>
                <DropdownMenuItem
                  onClick={() => router.push("/profile/dashboard")}
                >
                  <LayoutDashboard /> Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/profile/settings")}
                >
                  <Settings /> Settings
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600"
                >
                  <LogOutIcon /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
