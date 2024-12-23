"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const FormSchema = z.object({
  bio: z
    .string()
    .min(2, {
      message: "Comment must not be longer than 2 characters.",
    })
    .max(200, {
      message: "Comment must not be longer than 200 characters.",
    }),
});

const CommentInput = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      bio: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Bio</FormLabel> */}
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
