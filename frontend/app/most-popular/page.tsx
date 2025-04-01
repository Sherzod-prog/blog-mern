"use client";
import React, { useEffect } from "react";
import { usePostStore } from "@/store/posts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { PostStore } from "@/types";

const MostPopularPage = () => {
  const { fetchGetPopular, popularPosts, popularWriters } =
    usePostStore<PostStore>((state) => state);

  useEffect(() => {
    fetchGetPopular();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className=" min-h-screen w-11/12 mx-auto">
      <h1 className=" text-center text-2xl my-3">Most Popular posts</h1>
      <Table className="border-y-2">
        <TableHeader>
          <TableRow className="bg-muted  ">
            <TableHead className="w-1/12 text-center ">N</TableHead>
            <TableHead className="w-2/12 text-center border-x-2">
              Image
            </TableHead>
            <TableHead className="w-5/12 ">Title</TableHead>
            <TableHead className="w-5/12 text-end border-x-2">
              Create date
            </TableHead>
            <TableHead className="w-1/12 text-center">Views</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {popularPosts &&
            popularPosts.map((post, index: number) => (
              <TableRow className="even:bg-muted" key={index}>
                <TableCell className="w-1/12 text-center">
                  {index + 1}
                </TableCell>
                <TableCell className="w-3/12 text-center border-x-2">
                  <Image
                    className="rounded-md mx-auto"
                    src={post.image}
                    alt="post image"
                    width={50}
                    height={50}
                  />
                </TableCell>
                <TableCell className="w-3/12">
                  <span className="line-clamp-2">{post.title}</span>
                </TableCell>
                <TableCell className="w-3/12 text-end border-x-2">
                  {post.createdAt.slice(0, 10)}
                </TableCell>
                <TableCell className="w-1/12 text-center">
                  {post.views}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <h1 className=" text-2xl text-center my-4">Most Popular writers</h1>
      <Table className="border-y-2">
        <TableHeader>
          <TableRow className="bg-muted  ">
            <TableHead className="w-1/12 text-center ">N</TableHead>
            <TableHead className="w-9/12 ">Name</TableHead>
            <TableHead className="w-1/12 text-center">Followers</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {popularWriters &&
            popularWriters.map((post, index: number) => (
              <TableRow className="even:bg-muted" key={index}>
                <TableCell className="w-1/12 text-center">
                  {index + 1}
                </TableCell>
                <TableCell className="w-9/12">
                  <span className="line-clamp-2">{post.name}</span>
                </TableCell>
                <TableCell className="w-1/12 text-center">
                  {post.followers}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MostPopularPage;
