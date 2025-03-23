"use client";
import CommentInput from "@/components/CommentInput";
import { usePostStore } from "@/store/posts";
import { IComment, PostStore } from "@/types";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const { slug } = useParams();
  const { posts, fetchAllPosts, page } = usePostStore<PostStore>(
    (state) => state
  );

  useEffect(() => {
    fetchAllPosts(page, 10);
  }, [page]);

  const post = posts.find(
    (post) => post.title.toLowerCase().split(" ").join("-") === slug
  );

  return (
    <div className="flex flex-col justify-center items-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      {post && (
        <div className="my-4">
          <h1 className="text-3xl font-semibold uppercase text-center py-4">
            {post.title}
          </h1>
          <div>
            <Image
              src={post.image || "../vercel.svg"}
              alt="post image"
              className="rounded-2xl object-cover my-2"
              width={600}
              height={600}
            />
          </div>
          <div className="my-4 flex flex-col gap-2">
            <span>
              Category: <span className="font-semibold">{post.cat} </span>{" "}
            </span>
            <span>
              Author: <span className="font-semibold">{post.author.name} </span>
            </span>
            <span className="text-gray-500">
              Create date: {post.createdAt.slice(0, 10)}
            </span>
          </div>
          <div className="my-4">
            <p>{post.description}</p>
          </div>
          <div className="my-4">
            <span>Views: {post.views.length}</span>
          </div>
          <div className="pl-3 border-t-2 font-medium text-2xl pb-3 pt-5">
            Comments ...
          </div>

          <CommentInput />

          <div className="pl-3">
            {post.comments.map((com: IComment) => (
              <div key={com._id} className="my-4 odd:bg-secondary py-3 px-1">
                <div className="font-semibold text-xl ml-2 my-1">
                  {com.user}
                </div>
                <div>{com.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
