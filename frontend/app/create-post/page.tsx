"use client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Categories } from "@/constants";
import { createPostFormSchema } from "@/lib/validation";
import { usePostStore } from "@/store/posts";
import { PostStore } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const CreatePostPage = () => {
  const router = useRouter();

  const { fetchCreatePost } = usePostStore<PostStore>((state) => state);

  const form = useForm<z.infer<typeof createPostFormSchema>>({
    resolver: zodResolver(createPostFormSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      cat: "",
    },
  });

  function onSubmit(values: z.infer<typeof createPostFormSchema>) {
    if (!values.title || !values.description || !values.image || !values.cat) {
      toast.error("Please fill all the fields!");
    } else {
      fetchCreatePost(values);
      toast.success("Post created successfully!");
      router.push("/");
    }
  }
  const onResetSubmit = () => {
    form.reset();
    router.push("/");
  };

  return (
    <div className="h-[calc(100vh-30px)] md:h-[calc(100vh-80px)] py-10 m-auto px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 ">
      <h1 className="text-2xl text-center font-semibold">Create a New Post</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onReset={onResetSubmit}
          className="space-y-5"
        >
          <FormField
            control={form.control}
            name="cat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Categories.map((category) => (
                      <SelectItem key={category.id} value={category.label}>
                        <span className="capitalize"> {category.label} </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Select a category.</FormDescription>
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
            <Button variant="destructive" type="reset">
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreatePostPage;
