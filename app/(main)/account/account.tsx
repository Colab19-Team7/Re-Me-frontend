"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { Icons } from "~components/icons";
import { Button } from "~components/ui/button";
import { useToast } from "~components/ui/use-toast";
import { cn } from "~lib/utils";

export default function Account({ session }: { session: Session }) {
  const { toast } = useToast();

  async function handleSignOut() {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been signed out.",
    });
  }

  return (
    <div className="mx-auto max-w-screen-2xl px-4 md:px-10">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 className="text-2xl font-bold uppercase text-[#FFEC78] lg:text-3xl">
          account
        </h2>
      </div>

      <div className="flex flex-col gap-6">
        {/* divider */}
        <div className="h-[3px] w-full bg-[#2A2A2A]" />

        <div className="flex items-center gap-8">
          {session.user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="h-16 w-16 rounded-full"
              src={session.user.image}
              alt="profile"
            />
          ) : (
            <Icons.account size={96} />
          )}
          <div>
            <p className="text-lg font-semibold uppercase">
              {session.user.fullname}
            </p>
            <p className="text-sm uppercase text-[#93A3B6]">
              {session.user.email}
            </p>
          </div>
        </div>

        <div className="mb-6 h-[3px] w-full bg-[#2A2A2A]" />
      </div>

      <Button
        className={cn(
          "mx-auto block h-12 min-w-[185px] rounded bg-white text-lg font-bold uppercase text-black",
          "hover:bg-[#D4DAE0] active:bg-[#9B9D9F]"
        )}
        onClick={() =>
          signOut({
            callbackUrl: "/signin",
          })
        }
      >
        Sign out
      </Button>
    </div>
  );
}
