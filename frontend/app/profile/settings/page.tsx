"use client";
import { useAuthStore } from "@/store/auth";
import { useUserStore } from "@/store/users";
import Image from "next/image";
import React from "react";

const ProfilePage = () => {
  const user = useAuthStore((state) => state.account);

  return (
    <div className=" flex flex-col justify-center items-center gap-6">
      <div className="text-xl my-3 ">
        <span className="text-muted-foreground">Name:</span>{" "}
        <span>{user?.name}</span>
      </div>
      <div className="my-3">
        <Image
          src={
            user?.avatar ||
            "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt="profile image"
          width={300}
          height={300}
        />
      </div>
      <div>
        <span className="text-muted-foreground items-start">Email:</span> :
        {user?.email}
      </div>
      <div>
        <span className="text-muted-foreground">Followers:</span> :{" "}
        {user?.followers.length}
      </div>
    </div>
  );
};

export default ProfilePage;
