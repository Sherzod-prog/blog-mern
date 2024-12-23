import Sidebar from "@/components/sidebar";
import React, { ReactNode } from "react";

const LayoutDashboard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 ">
      <main className="bg-[#F6F9FC] dark:bg-[#1f1f1f] flex pr-4">
        <Sidebar />
        <div className="w-full rounded-xl bg-white dark:bg-black p-4">
          {children}
        </div>
      </main>
    </div>
  );
};

export default LayoutDashboard;
