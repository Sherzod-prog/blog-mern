"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInFormSchema } from "@/lib/validation";
import { useAuthStore } from "@/store/auth";

const SignInPage = () => {
  const router = useRouter();
  const register = useAuthStore((state) => state.register);

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      image: "",
      accountType: "Writer",
    },
  });

  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    try {
      const data = (await register(values)) as unknown as {
        user: { _id: string };
      };
      router.push(`/auth/verifyemail/${data?.user?._id}`);
    } catch (err) {
      console.log("Error:", err);
      alert(err);
    }
  }

  return (
    <div className="py-16 m-auto w-96">
      <div className="text-4xl font-semibold text-center my-5">
        Create your account
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fist name</FormLabel>
                <FormControl>
                  <Input placeholder="Fist name" {...field} />
                </FormControl>
                <FormDescription>This is your first name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input placeholder="Last name" {...field} />
                </FormControl>
                <FormDescription>This is your Last name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Eamil</FormLabel>
                <FormControl>
                  <Input placeholder="example@gmailcom" {...field} />
                </FormControl>
                <FormDescription>This is your email.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>This is your Password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image link</FormLabel>
                <FormControl>
                  <Input placeholder="Image link" {...field} />
                </FormControl>
                <FormDescription>This is your image link.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <div className="py-10">
        You have an account? Do you need to{" "}
        <Link
          href="/auth/sign-up"
          className="text-blue-600 hover:font-semibold"
        >
          sign up ?
        </Link>
      </div>
    </div>
  );
};
export default SignInPage;
