"use client";
import { useAuthStore } from "@/store/auth";
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
          src={user?.image ?? ""}
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
