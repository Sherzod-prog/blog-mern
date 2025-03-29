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

  // if (loading) return <LoadingPage />;
  if (error) return <div>{error}</div>;

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <div className="md:flex md:items-center gap-6 my-4 mx-2 border-b-2 px-1 py-2">
            <div
              onClick={() => setCategory("")}
              className="px-2 py-1 rounded-lg m-auto w-fit hover:font-medium active:text-primary hover:cursor-pointer font-semibold"
            >
              All Post
            </div>
            {Categories.map((category) => (
              <div
                onClick={() => setCategory(category.label)}
                key={category.id}
                className=" px-2 py-1 rounded-lg w-fit m-auto"
              >
                <span className="hover:font-medium active:text-primary hover:cursor-pointer capitalize font-semibold">
                  {category.label}
                </span>
              </div>
            ))}
          </div>
          <div></div>
          <div className="grid grid-cols-2 gap-4">
            {posts.map((post) => (
              <PostListItem key={post._id} post={post as IPost} />
            ))}
          </div>
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
      )}
    </div>
  );
}
