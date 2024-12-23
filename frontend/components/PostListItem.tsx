import { IPost } from "@/types";
import Image from "next/image";
import Link from "next/link";

const PostListItem = (post: IPost) => {
  return (
    <div className="flex flex-col xl:flex-row gap-4 my-3">
      {post.image && (
        <div className="xl:block xl:w-1/3">
          <Image
            src={post.image}
            alt="post image"
            className="rounded-2xl object-cover"
            width={500}
            height={500}
          />
        </div>
      )}
      {/* details */}
      <div className="flex flex-col gap-4 xl:w-2/3">
        <div className="text-3xl font-semibold uppercase">{post.title}</div>
        <div className="xl:flex xl:items-center gap-2 text-gray-400 text-sm xl:gap-2">
          <div>
            <span>Written by </span>
            <Link
              className="text-blue-800"
              href={`/posts?author=${post.author}`}
            >
              {post.author}
            </Link>
            <span> on </span>
            <Link href={`/${post.category}`} className="text-blue-800">
              {post.category}
            </Link>
          </div>
          <div>
            <span>{post.createdAt}</span>
          </div>
        </div>
        <p className="text-gray-600 dark:text-current line-clamp-2">
          {post.description}
        </p>
        <Link
          href={`/post/${post.title.toLocaleLowerCase().split(" ").join("-")}`}
          className="underline text-blue-800 text-sm"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostListItem;
