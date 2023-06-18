"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { Button } from "~components/ui/button";
import { useToast } from "~components/ui/use-toast";

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
            <svg
              width="96"
              height="96"
              viewBox="0 0 96 96"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M48 0C74.4375 0 96 21.5625 96 48C96 74.625 74.4375 96 48 96C21.375 96 0 74.625 0 48C0 21.5625 21.375 0 48 0ZM48 24C40.5 24 34.5 30.1875 34.5 37.5C34.5 45 40.5 51 48 51C55.3125 51 61.5 45 61.5 37.5C61.5 30.1875 55.3125 24 48 24ZM48 84C57.75 84 66.75 80.0625 73.3125 73.5C70.3125 65.625 62.8125 60 54 60H42C33 60 25.5 65.625 22.5 73.5C29.0625 80.0625 38.0625 84 48 84Z"
                fill="#FEF8FD"
              />
            </svg>
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
        className="mx-auto block min-w-[185px] rounded-sm bg-white text-lg font-bold uppercase text-black hover:bg-white hover:text-black hover:opacity-80"
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
