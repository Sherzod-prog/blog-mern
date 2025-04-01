"use client";
import { usePathname } from "next/navigation";
import React from "react";

const Footer = () => {
  const pathname = usePathname();

  if (pathname.startsWith("/auth")) {
    return null;
  }
  return (
    <div className="flex justify-between items-center border-t-2 py-4">
      <div>All rights reserved © {new Date().getFullYear()}</div>
      <div className="font-semibold text-2xl">
        Bl<span className="text-red-600">o</span>g.
      </div>
      <div>
        <ul className="flex gap-4">
          <li className="cursor-pointer hover:text-red-600">Privacy Policy</li>
          <li className="cursor-pointer hover:text-red-600">Contact</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
