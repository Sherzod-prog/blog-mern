"use client";
import React, { useEffect, useState } from "react";
import PostListItem from "@/components/PostListItem";
import { usePostStore } from "@/store/posts";
import { PostStore } from "@/types";

export default function Home() {
  const { posts, fetchPosts, page, numOfPages, loading, error } =
    usePostStore<PostStore>((state) => state);
  const [category, setCategory] = useState("");

  const categoryList = posts
    .map((post) => post.cat)
    .filter((value, index, self) => self.indexOf(value) === index);

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="md:flex md:items-center gap-6 my-4 mx-2 border-b-2 px-1 py-2">
        <div
          onClick={() => setCategory("")}
          className="px-2 py-1 rounded-lg m-auto w-fit hover:font-medium active:text-primary hover:cursor-pointer"
        >
          All Post
        </div>
        {categoryList.map((category, index) => (
          <div
            onClick={() => setCategory(category)}
            key={index}
            className=" px-2 py-1 rounded-lg w-fit m-auto hover:font-medium active:text-primary hover:cursor-pointer"
          >
            {category}
          </div>
        ))}
      </div>
      <div></div>
      <div className="grid grid-cols-2 gap-4">
        {posts
          .filter((post) => post.cat === category || category === "")
          .map((post: any, index: number) => (
            <PostListItem key={index} {...post} />
          ))}
      </div>
      {/* Pagination controls */}
      <div className=" w-full flex justify-center gap-4 p-5">
        <button onClick={() => fetchPosts(page - 1)} disabled={page === 1}>
          ⬅️ Previous
        </button>
        |
        <button
          onClick={() => fetchPosts(page + 1)}
          disabled={page === numOfPages}
        >
          Next ➡️
        </button>
      </div>
    </div>
  );
}
