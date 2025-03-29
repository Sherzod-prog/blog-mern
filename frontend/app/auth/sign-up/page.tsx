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
import { useAuthStore } from "@/store/auth";
import { signUpFormSchema } from "@/lib/validation";
import { toast } from "sonner";

const SignUpPage = () => {
  const login = useAuthStore((state) => state.login);

  const router = useRouter();

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpFormSchema>) => {
    try {
      await login(values);
      toast.success("Login successful!");
      router.push("/");
    } catch (error) {
      console.error("Error login:", error);
    }
  };

  return (
    <div className="py-20 m-auto w-96">
      <div className="text-4xl font-semibold text-center my-5">
        Log in to your account
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <div className="py-10">
        You need register?{" "}
        <Link
          href="/auth/sign-in"
          className="text-blue-600 hover:font-semibold"
        >
          sign in ?
        </Link>
      </div>
    </div>
  );
};
export default SignUpPage;
