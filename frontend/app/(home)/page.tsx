"use client";
import React, { useEffect, useState } from "react";
import PostListItem from "@/components/PostListItem";
import { usePostStore } from "@/store/posts";
import { IPost, PostStore } from "@/types";
import LoadingPage from "@/components/LoadingPage";
import { Categories } from "@/constants";

export default function Home() {
  const { posts, fetchAllPosts, page, numOfPages, loading, error } =
    usePostStore<PostStore>((state) => state as PostStore);
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchAllPosts(page, 10, category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, category]);

  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <>
        <div className="flex flex-wrap justify-center mx-2 my-1 border-b-2 px-1 py-4">
          <div
            onClick={() => setCategory("")}
            className="px-2 py-1 rounded-lg hover:font-medium active:text-primary hover:cursor-pointer font-semibold"
          >
            All Post
          </div>
          {Categories.map((category) => (
            <div
              onClick={() => setCategory(category.label)}
              key={category.id}
              className="px-2 py-1 rounded-lg"
            >
              <span className="hover:font-medium active:text-primary hover:cursor-pointer capitalize font-semibold w-full">
                {category.label}
              </span>
            </div>
          ))}
        </div>
        <div></div>
        {loading ? (
          <LoadingPage />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {posts.map((post) => (
              <PostListItem key={post._id} post={post as IPost} />
            ))}
          </div>
        )}
        {/* Pagination controls */}
        <div className=" w-full flex justify-center gap-4 p-5">
          <button
            onClick={() => fetchAllPosts(page - 1, 10, category)}
            disabled={page === 1}
          >
            ⬅️ Previous
          </button>
          |
          <button
            onClick={() => fetchAllPosts(page + 1, 10, category)}
            disabled={page === numOfPages}
          >
            Next ➡️
          </button>
        </div>
      </>
    </div>
  );
}
