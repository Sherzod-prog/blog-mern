"use client";
import { useEffect } from "react";
import { usePostStore } from "@/store/posts";
import { IPost, PostStore } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

const DashboardPage = () => {
  const { analiticData, fetchAnaliticData } = usePostStore<PostStore>(
    (state) => state
  );
  console.log(analiticData);

  useEffect(() => {
    fetchAnaliticData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <h1>Dashboard</h1>
      <div></div>
      <h1>User: </h1>
      <h1>Posts: {analiticData?.totalPosts}</h1>
      <h1>Followers: {analiticData?.followers}</h1>
      <div>
        <p className="font-semibold my-3">Last 5 posts:</p>
        <Table className="border-y-2">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/2">Title</TableHead>
              <TableHead className="w-1/3">Category</TableHead>
              <TableHead className="w-1/6">Comments</TableHead>
              <TableHead className="w-1/6">Views</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {analiticData?.last5Posts.map((post: IPost, index) => (
              <TableRow key={index}>
                <TableCell className="w-1/2 flex items-center ">
                  {post.image && (
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={40}
                      height={40}
                      className="rounded-md mr-2"
                    />
                  )}
                  {post.title}
                </TableCell>
                <TableCell className="w-1/3">{post.cat}</TableCell>
                <TableCell className="w-1/6">{post.comments.length}</TableCell>
                <TableCell className="w-1/6">{post.views.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DashboardPage;
