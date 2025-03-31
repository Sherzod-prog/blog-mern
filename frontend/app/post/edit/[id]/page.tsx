"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createPostFormSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useParams, useRouter } from "next/navigation";
import { usePostStore } from "@/store/posts";
import { PostStore } from "@/types";
import { toast } from "sonner";

const PostEditPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { post, fetchEditPost, fetchPostById } = usePostStore<PostStore>(
    (state) => state
  );

  const form = useForm<z.infer<typeof createPostFormSchema>>({
    resolver: zodResolver(createPostFormSchema),
    defaultValues: {
      title: post?.title || "",
      description: post?.description || "",
      image: post?.image || "",
      cat: post?.cat || "",
    },
  });

  const onSubmit = async (value: z.infer<typeof createPostFormSchema>) => {
    fetchEditPost(id, value);
    toast.success("Post updated successfully!");
    router.push("/profile/posts");
  };

  useEffect(() => {
    fetchPostById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <div className="h-[calc(100vh-30px)] md:h-[calc(100vh-80px)] py-10 m-auto px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 ">
        <h1 className="text-3xl text-center my-3 font-semibold uppercase">
          Post Edit
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="cat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="category" {...field} />
                  </FormControl>
                  <FormDescription>Editing category</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post image</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example/image.com"
                      type="url"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Post image url.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="title" {...field} />
                  </FormControl>
                  <FormDescription>This is post title.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="description"
                      maxLength={1000}
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="flex justify-between">
                    This is description.
                    <span className="text-end">{field.value.length}/1000</span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-3">
              <Button
                variant="destructive"
                type="reset"
                onClick={() => router.push("/profile/posts")}
              >
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PostEditPage;
