"use client";
import { useUserStore } from "@/store/users";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const AuthorPage = () => {
  const { id } = useParams();
  const { user, getUser } = useUserStore((state) => state);

  console.log(id);
  useEffect(() => {
    getUser(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col mx-auto justify-center items-center gap-2">
      AuthorPage : {id}
      <div>{user?.firstName}</div>
      <div>{user?.lastName}</div>
      <button onClick={() => console.log(`follow ${id}`)}> Follow +</button>
      <div>{user?.accountType}</div>
      <div>{user?.email}</div>
      <div>
        <Image
          src={user?.avatar || "./vercel.svg"}
          alt="profile image"
          width={200}
          height={200}
        />
      </div>
      <div>{user?.followers.length}</div>
    </div>
  );
};

export default AuthorPage;
