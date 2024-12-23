"use client";
import React from "react";
import PostListItem from "@/components/PostListItem";
import { allPosts } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Home() {
  const categoryList = allPosts
    .map((post) => post.category)
    .filter((value, index, self) => self.indexOf(value) === index);
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="md:flex md:items-center gap-6 my-4 mx-2 border-b-2 px-1 py-2">
        <div className="px-2 py-1 rounded-lg m-auto w-fit hover:font-medium active:text-primary hover:cursor-pointer">
          All Post
        </div>
        {categoryList.map((category, index) => (
          <div
            key={index}
            className=" px-2 py-1 rounded-lg w-fit m-auto hover:font-medium active:text-primary hover:cursor-pointer"
          >
            {category}
          </div>
        ))}
      </div>
      <div>
        <Button
          variant="outline"
          onClick={() => {
            toast("", {
              description: "Your message has been sent.",
            });
          }}
        >
          Show Toast
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {allPosts.map((post) => (
          <PostListItem key={post._id} {...post} />
        ))}
      </div>
    </div>
  );
}
