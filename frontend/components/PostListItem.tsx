import { IPost } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// const PostListItem: React.FC<{ post: IPost }> = ({ post })
const PostListItem: React.FC<{ post: IPost }> = ({ post }) => {
  return (
    <div className="flex flex-col xl:flex-row gap-4 my-3 shadow rounded-md p-2">
      <div className="xl:block xl:w-1/3">
        <Image
          src={post.image || "../vercel.svg"}
          alt="post image"
          className="rounded-2xl object-cover"
          width={500}
          height={500}
        />
      </div>
      <div className="flex flex-col gap-4 xl:w-2/3">
        <div className="text-3xl font-semibold uppercase">{post.title}</div>
        <div className="xl:flex xl:items-center gap-2 text-gray-400 text-sm xl:gap-2">
          <div>
            <span>Written by </span>
            <Link
              className="text-blue-800"
              href={`/posts?author=${post.author.id}`}
            >
              {post.author.name}
            </Link>
            <span> on </span>
            <Link href={`/${post.cat}`} className="text-blue-800">
              {post.cat}
            </Link>
          </div>
          <div>
            <span>{post.createdAt.split("T")[0]}</span>
          </div>
        </div>
        <p className="text-gray-600 dark:text-current line-clamp-2">
          {post.description}
        </p>
        <Link
          href={`post/${post.title.split(" ").join("-")}`}
          className="underline text-blue-800 text-sm"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostListItem;
