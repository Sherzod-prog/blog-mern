"use client";
import React, { useEffect } from "react";
import { usePostStore } from "@/store/posts";
import { PostStore } from "@/types";

const FollersPage = () => {
  const { posts, fetchUserFollowers, page } = usePostStore<PostStore>(
    (state) => state
  );

  useEffect(() => {
    fetchUserFollowers(page, 10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div>
      <div>Followers: {posts.length}</div>
    </div>
  );
};

export default FollersPage;
