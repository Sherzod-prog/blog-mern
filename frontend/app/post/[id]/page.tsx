"use client";
import React, { useEffect } from "react";
import CommentInput from "@/components/CommentInput";
import { usePostStore } from "@/store/posts";
import { PostStore } from "@/types";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const PostPage = () => {
  const { id } = useParams();
  const { post, fetchPostById, fetchAllComments, comments } =
    usePostStore<PostStore>((state) => state);

  useEffect(() => {
    fetchPostById(id);
    fetchAllComments(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comments?.length]);

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

          <div className="pl-3">
            {comments &&
              comments
                .map((com) => (
                  <div
                    key={com._id}
                    className="my-1 odd:bg-secondary py-3 px-1 rounded-sm"
                  >
                    <div className=" flex justify-start items-center gap-2 font-semibold text-sm  my-1">
                      <Avatar>
                        <AvatarImage src={com.user?.avatar} />
                        <AvatarFallback>{com.user?.name}</AvatarFallback>
                      </Avatar>
                      <div>{com.user?.name}</div>
                    </div>
                    <div>{com.description}</div>
                  </div>
                ))
                .slice(0, 5)}
          </div>
          <CommentInput postId={id} />
        </div>
      )}
    </div>
  );
};

export default PostPage;
