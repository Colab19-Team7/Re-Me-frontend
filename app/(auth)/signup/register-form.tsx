"use client";

import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Icons } from "~components/icons";
import { Button } from "~components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "~components/ui/form";
import { Input } from "~components/ui/input";
import { useToast } from "~components/ui/use-toast";
import { cn } from "~lib/utils";

const formSchema = z
  .object({
    name: z.string({
      required_error: "Please enter your name",
    }),
    email: z
      .string({
        required_error: "Please enter your email address",
      })
      .email({
        message: "Please enter a valid email address",
      }),
    password: z
      .string({
        required_error: "Please enter your password",
      })
      .min(8, {
        message: "Please enter a password of at least 8 characters",
      })
      .max(15, {
        message: "Please enter a password of at most 15 characters",
      }),
    confirmPassword: z.string({
      required_error: "Please confirm your password",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default function RegisterForm() {
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState<Array<string>>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const signInWithGoogle = async () => {
    setLoading(true);
    setError([]);

    try {
      await signIn("google", {
        callbackUrl: "/",
        redirect: false,
      });
    } catch (error) {
      console.error(error);
      setError(["An error occurred while trying to sign in"]);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError([]);
    const { confirmPassword, name: fullname, ...rest } = values;

    try {
      const res = await fetch("https://re-me-api.onrender.com/api/v1/users", {
        method: "POST",
        body: JSON.stringify({
          fullname,
          ...rest,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        setError((await res.json()).errors);
        setLoading(false);
        return;
      }

      toast({
        title: "Account created.",
        description: "We've created your account for you.",
      });

      // signIn(undefined, { callbackUrl: "/" });
      await signIn("credentials", {
        email: values.email,
        password: values.password,
        callbackUrl: "/",
        redirect: false,
      });
    } catch (error: any) {
      setLoading(false);

      toast({
        title: "An error occurred.",
        description: "An error occurred while trying to create your account.",
      });
      setError(["An error occurred while trying to sign up"]);
      console.error(error);
    }
  };

  return (
    <div className="flex w-[335px] flex-col gap-6">
      <h1 className="text-2xl font-semibold text-[#FFE169]">SIGN UP</h1>

      <div>
        <Button
          type="button"
          onClick={signInWithGoogle}
          className="relative flex h-[60px] w-full bg-[#FEF8FD] font-bold uppercase text-[#130F40] hover:bg-[#FEF8FD] hover:opacity-80"
        >
          <Icons.google className="absolute left-5 h-6 w-6" />
          Sign in with Google
        </Button>
      </div>

      <div className="flex items-center">
        <span className="h-[0.8px] flex-1 bg-[#E4E5E7]" />
        <span className="px-4 text-sm text-white">OR</span>
        <span className="h-[0.8px] flex-1 bg-[#E4E5E7]" />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-96 space-y-1">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="NAME"
                    className="h-[58px] w-[335px] rounded-[8px] border-[#FEF8FD] bg-[#130F40] pl-10 text-[#FEF8FD] placeholder:text-[#FEF8FD]"
                    {...field}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="EMAIL"
                    className="h-[58px] w-[335px] rounded-[8px] border-[#FEF8FD] bg-[#130F40] pl-10 text-[#FEF8FD] placeholder:text-[#FEF8FD]"
                    {...field}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="PASSWORD"
                    className="h-[58px] w-[335px] rounded-[8px] border-[#FEF8FD] bg-[#130F40] pl-10 text-[#FEF8FD] placeholder:text-[#FEF8FD]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="REPEAT PASSWORD"
                    className="h-[58px] w-[335px] rounded-[8px] border-[#FEF8FD] bg-[#130F40] pl-10 text-[#FEF8FD] placeholder:text-[#FEF8FD]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error.length > 0 && (
            <div className="text-red-500">
              {error.map((e) => (
                <p key={e}>{e}</p>
              ))}
            </div>
          )}
          <div className="w-[335px] pt-6">
            <Button
              disabled={loading}
              className={cn(
                "h-[58px] w-full rounded-full bg-[#FFE169] text-xl font-semibold text-[#130F40]",
                // loading && "cursor-not-allowed opacity-50",
                "hover:bg-[#FFE169] hover:opacity-80"
              )}
              type="submit"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              SIGN UP
            </Button>

            <Button
              variant="link"
              className="mx-auto block w-fit text-center text-lg text-[#93A3B6]"
              asChild
            >
              <Link href="/signin">Click here to Sign In</Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
