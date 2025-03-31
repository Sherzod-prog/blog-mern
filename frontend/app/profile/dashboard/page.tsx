"use client";
import { useEffect } from "react";
import { usePostStore } from "@/store/posts";
import { IPost, PostStore } from "@/types";

const DashboardPage = () => {
  const { analiticData, fetchAnaliticData } = usePostStore<PostStore>(
    (state) => state
  );
  console.log(analiticData);

  useEffect(() => {
    fetchAnaliticData();
  }, []);
  return (
    <div>
      <h1>Dashboard</h1>
      <div></div>
      <h1>User: </h1>
      <h1>Posts: {analiticData?.totalPosts}</h1>
      <h1>Followers: {analiticData?.followers}</h1>
      <div>
        <span className="font-semibold">Last 5 posts:</span>
        {analiticData?.last5Posts.map((post: IPost, index) => (
          <div key={index} className=" flex justify-start items-center gap-2">
            <div>{post.title}</div>
            <div>{post.cat}</div>
            <div>{post.comments.length}</div>
            <div>{post.views.length}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
