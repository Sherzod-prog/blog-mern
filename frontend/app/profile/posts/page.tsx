"use client";
import Image from "next/image";
import React from "react";
import { allPosts } from "@/lib/constants";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditIcon, Trash2Icon } from "lucide-react";

const DashboardPostsPage = () => {
  const handleEdit = (id: string) => {
    console.log(id);
  };

  const handleDelete = (id: string) => {
    console.log(id);
  };
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/12 text-center">N</TableHead>
            <TableHead className="w-1/12 text-center">Image</TableHead>
            <TableHead className="w-1/4 text-center">Title</TableHead>
            <TableHead className="w-1/12 ">Category</TableHead>
            <TableHead className="w-1/12 text-end">Create date</TableHead>
            <TableHead className="w-1/12 text-center">Views</TableHead>
            <TableHead style={{ width: "3%" }}>Edit</TableHead>
            <TableHead style={{ width: "3%" }}>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allPosts &&
            allPosts.map((post, index) => (
              <TableRow key={index}>
                <TableCell className="w-1/12 text-center">
                  {index + 1}
                </TableCell>
                <TableCell className="w-1/12 text-center">
                  <Image
                    className="rounded-md"
                    src={post.image}
                    alt="post image"
                    width={50}
                    height={50}
                  />
                </TableCell>
                <TableCell>
                  <span className="w-1/4 line-clamp-1">{post.title}</span>
                </TableCell>
                <TableCell>{post.category}</TableCell>
                <TableCell className="text-end">{post.createdAt}</TableCell>
                <TableCell className="text-center">{post.views}</TableCell>
                <TableCell
                  className="text-green-600 text-center cursor-pointer"
                  onClick={() => handleEdit(post._id)}
                >
                  <EditIcon size={20} />
                </TableCell>
                <TableCell
                  className="text-red-600 text-center"
                  onClick={() => handleDelete(post._id)}
                >
                  <Trash2Icon
                    size={20}
                    className="text-center cursor-pointer"
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DashboardPostsPage;
