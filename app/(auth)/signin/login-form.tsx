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
import { useToast } from "~components/ui/use-toast";
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

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();
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
        if (res.error === "CredentialsSignin") {
          setError("Invalid email or password.");
        } else {
          setError("Unable to sign in.");
        }

        return;
      }

      toast({
        title: "Success",
        description: "You have successfully signed in.",
      });
      router.push("/");
    } catch (error) {
      console.error(error);

      toast({
        title: "Error",
        description: "Unable to sign in.",
      });
      setError("Unable to sign in.");
    } finally {
      setLoading(false);
    }
  }

  const signInWithGoogle = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await signIn("google", {
        callbackUrl: "/",
        redirect: false,
      });
    } catch (error) {
      console.error(error);
      setError("Unable to sign in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-[335px] flex-col gap-6">
      <h1 className="text-2xl font-semibold text-[#FFE169]">SIGN IN</h1>

      <div>
        <Button
          disabled={loading}
          onClick={signInWithGoogle}
          type="button"
          className="relative flex h-[60px] w-full bg-[#FEF8FD] font-bold uppercase text-[#130F40] transition duration-300 ease-out hover:bg-[#D4DAE0] active:bg-[#9B9D9F]"
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
                "transition duration-300 ease-out hover:bg-[#C1B35C] active:bg-[#766F44]"
                // loading && "cursor-not-allowed opacity-50",
              )}
              type="submit"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              SIGN IN
            </Button>

            <Button
              type="button"
              asChild
              variant="ghost"
              className="mx-auto block w-fit text-center text-lg text-[#93A3B6] transition duration-300 ease-out hover:bg-transparent hover:text-[#6D7885] active:bg-transparent active:text-[#434A52]"
            >
              <Link href="/signup">Click here to Sign Up</Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default LoginForm;
