import CommentInput from "@/components/CommentInput";
import { allPosts } from "@/lib/constants";
import Image from "next/image";
import React from "react";

const PostDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;
  console.log(slug);

  const PostDetail = allPosts.find(
    (post) => post.title.toLocaleLowerCase().split(" ").join("-") === slug
  );
  return (
    <div className="flex flex-col justify-center items-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      {PostDetail && (
        <div className="my-4">
          <h1 className="text-3xl font-semibold uppercase text-center">
            {PostDetail.title}
          </h1>
          <div>
            <Image
              src={PostDetail.image}
              alt="post image"
              className="rounded-2xl object-cover my-2"
              width={600}
              height={600}
            />
          </div>
          <div className="my-4 flex flex-col gap-2">
            <span>
              Category:{" "}
              <span className="font-semibold">{PostDetail.category} </span>{" "}
            </span>
            <span>
              Author:{" "}
              <span className="font-semibold">{PostDetail.author} </span>
            </span>
            <span className="text-gray-500">
              Create date: {PostDetail.createdAt}
            </span>
          </div>
          <div className="my-4">
            <p>{PostDetail.description}</p>
          </div>
          <div className="my-4">
            <span>Views: {PostDetail.views}</span>
          </div>
          <div className="pl-3 border-t-2 font-medium text-2xl pb-3 pt-5">
            Comments ...
          </div>

          <CommentInput />

          <div className="pl-3">
            {PostDetail.comments.map((com, i) => (
              <div key={i} className="my-4 odd:bg-secondary py-3 px-1">
                <div className="font-semibold text-xl ml-2 my-1">
                  {com.user}
                </div>
                <div>{com.comment}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetailPage;
