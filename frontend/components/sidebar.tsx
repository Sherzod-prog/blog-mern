"use client";

import React from "react";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import Item from "./sidebaritem";
import { SettingsIcon } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-fit px-3 left-0 bg-[#F6F9FC] dark:bg-[#1f1f1f]">
      <div className="flex flex-col p-3 gap-96">
        <div className="flex flex-col space-y-8 mt-2">
          {sidebarLinks.map((link) => (
            <Link href={link.path} key={link.path}>
              <Item icon={link.icon} label={link.label} path={link.path} />
            </Link>
          ))}
        </div>
        <div className="mt-14 border-t-2 py-2">
          <Link href="/profile/settings">
            <Item
              icon={SettingsIcon}
              label="Settings"
              path="/profile/settings"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
