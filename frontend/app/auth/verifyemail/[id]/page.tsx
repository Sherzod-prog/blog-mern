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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Countdown from "@/components/Countdown";
import { useAuthStore } from "@/store/auth";
import { toast } from "sonner";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const VerifyEmailPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const { verify, resendotp } = useAuthStore((state) => state);

  const [isDisabled, setIsDisabled] = useState(true);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  async function onSubmit() {
    try {
      await verify(id, form.getValues().pin);
      router.push("/auth/login");
    } catch (error) {
      console.log(error);
    }
  }

  const resendOTP = async () => {
    try {
      const resData = await resendotp(`${id}`);
      toast.success("resend otp successfully");
      return resData;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDisabled(false);
    }, 120000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="box-content h-96 w-96 p-10 mx-auto my-28 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-96 space-y-6">
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verification email</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Please enter the verification code sent to your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <div className="flex items-center gap-3">
        <div
          aria-disabled={isDisabled}
          tabIndex={isDisabled ? -1 : 0}
          onClick={() => {
            if (!isDisabled) {
              resendOTP();
            }
          }}
          className={`my-6 ${
            isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          Resend verification code
        </div>
        <div>
          <Countdown />
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
