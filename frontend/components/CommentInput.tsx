"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { commentFormSchema } from "@/lib/validation";
import { ParamValue } from "next/dist/server/request/params";
import { usePostStore } from "@/store/posts";
import { PostStore } from "@/types";

const CommentInput = ({ postId: postId }: { postId: ParamValue }) => {
  const { fetchCreatComment, fetchAllComments } = usePostStore<PostStore>(
    (state) => state
  );
  const form = useForm<z.infer<typeof commentFormSchema>>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      description: "",
    },
  });

  function onSubmitComment(value: z.infer<typeof commentFormSchema>) {
    fetchCreatComment(postId, value);
    fetchAllComments(postId);
    form.reset();
  }

  function onResetComment() {
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitComment)}
        onReset={onResetComment}
        className="space-y-2"
      >
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your comment</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <div className="flex justify-end gap-2">
          <Button type="reset">Cancel</Button>
          <Button variant="default" className=" bg-primary" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CommentInput;
