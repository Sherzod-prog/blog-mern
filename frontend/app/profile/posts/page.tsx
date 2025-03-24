"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { PostStore } from "@/types";
import { usePostStore } from "@/store/posts";
import { toast } from "sonner";
import axios from "axios";

const DashboardPostsPage = () => {
  const router = useRouter();
  const { posts, fetchAllPosts, page, loading, error, numOfPages } =
    usePostStore<PostStore>((state) => state);

  useEffect(() => {
    fetchAllPosts(page, 10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleEdit = (id: string) => {
    router.push(`/post/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URI}/posts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(data.message);
      fetchAllPosts(page, 10);
      return data;
    } catch (error) {
      console.log(error);
    }
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
          {posts &&
            posts.map((post, index) => (
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
                  <span className="w-1/4 line-clamp-2">{post.title}</span>
                </TableCell>
                <TableCell>{post.cat}</TableCell>
                <TableCell className="text-end">
                  {post.createdAt.slice(0, 10)}
                </TableCell>
                <TableCell className="text-center">
                  {post.views.length}
                </TableCell>
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
      <div className=" w-full flex justify-center gap-4 p-5">
        <button
          onClick={() => fetchAllPosts(page - 1, 10)}
          disabled={page === 1}
        >
          ⬅️ Previous
        </button>
        |
        <button
          onClick={() => fetchAllPosts(page + 1, 10)}
          disabled={page === numOfPages}
        >
          Next ➡️
        </button>
      </div>
    </div>
  );
};

export default DashboardPostsPage;
