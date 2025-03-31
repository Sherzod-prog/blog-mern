import { z } from "zod";

export const createPostFormSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string(),
  cat: z.string(),
});

export const signInFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email().min(5, {
    message: "Email must be at least 5 characters.",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
  image: z.string({
    message: "Profile picture",
  }),
  accountType: z.string({
    required_error: "Account type",
  }),
});

export const signUpFormSchema = z.object({
  email: z.string().email({
    message: "Email is required and must be a valid email.",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
});

export const commentFormSchema = z.object({
  description: z
    .string()
    .min(2, {
      message: "Comment must not be longer than 2 characters.",
    })
    .max(200, {
      message: "Comment must not be longer than 200 characters.",
    }),
});
