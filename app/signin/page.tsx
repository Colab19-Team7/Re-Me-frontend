"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Icons } from "~components/icons";
import { Button } from "~components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~components/ui/form";
import { Input } from "~components/ui/input";
import { cn } from "~lib/utils";

const formSchema = z.object({
  email: z
    .string({
      required_error: "Please enter your email address.",
    })
    .email({
      message: "Please enter a valid email address.",
    }),
  password: z
    .string({
      required_error: "Please enter your password.",
    })
    .min(8, {
      message: "Please enter a password of at least 8 characters.",
    })
    .max(15, {
      message: "Please enter a password of at most 15 characters.",
    }),
});

function SignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        callbackUrl: "/",
        redirect: false,
      });

      if (res?.error) {
        if (res?.error === "CredentialsSignin") {
          setError("Invalid email or password.");
        } else {
          setError("Unable to sign in.");
        }
      }
      router.push("/");
    } catch (error) {
      console.error(error);
      setError("Unable to sign in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    // <Form {...form}>
    //   <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

    //     <FormMessage>{error}</FormMessage>
    //     <Button type="submit">{loading ? "Loading..." : "Sign In"}</Button>
    //   </form>
    // </Form>
    <div className="grid min-h-screen grid-cols-12 bg-gradient-to-b from-[#0D0B25] from-20% via-[#261C92] via-100% to-[#93A3B6] to-100%">
      <div className="col-span-3 flex flex-col items-center justify-center gap-4 bg-[url('/auth-bg.jpg')] bg-cover text-[#FFE169]">
        <h1 className="text-5xl font-semibold">Welcome to</h1>
        <Icons.logo className="h-64 w-52" />
        <h1 className="text-8xl uppercase">re-me</h1>
      </div>
      <div className="col-span-9 grid place-content-center gap-8">
        <h1 className="text-2xl font-semibold text-[#FFE169]">SIGN IN</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-96 space-y-1"
          >
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
            {/* {error.length > 0 && (
              <div className="text-red-500">
                {error.map((e) => (
                  <p key={e}>{e}</p>
                ))}
              </div>
            )} */}
            <FormMessage>{error}</FormMessage>
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
                SIGN IN
              </Button>

              <Button
                type="button"
                asChild
                variant="link"
                className="w-full text-center text-lg text-[#93A3B6]"
              >
                <Link href="/signup">Click here to Sign Up</Link>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default SignIn;
