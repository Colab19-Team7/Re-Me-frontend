"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Item } from "~types/item";

import ConfirmDelModal from "./ConfirmDelModal";
import { Icons } from "./icons";
import { Button } from "./ui/button";

interface ArchiveItemProps {
  item: Item;
}

function ArchiveItem({ item }: ArchiveItemProps) {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="flex overflow-hidden rounded-3xl border-4 border-[#93A3B6] bg-[#202124]">
      <div className="group mb-2 block h-full w-3/12 bg-gray-100 lg:mb-3">
        {/* TODO: create an imageProxy API use Image component */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.item_image}
          loading="lazy"
          // width={500}
          // height={500}
          alt={item.title}
          className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
        />
      </div>
      <div className="flex w-8/12 flex-col gap-2">
        <div className="px-3 text-center">
          <h2
            title={item.title}
            className="hover:gray-800 mb-1 line-clamp-1 font-bold uppercase text-[#FEF8FD] transition duration-100 lg:text-lg"
          >
            {item.title}
          </h2>
          <a
            className="line-clamp-1 cursor-pointer text-[#93A3B6] underline lg:text-lg"
            href={item.item_link}
            target="_blank"
            rel="noreferrer"
            title={item.item_link}
          >
            {item.item_link}
          </a>
        </div>

        <div className="border-2 border-[#2A2A2A]" />

        <div className="flex justify-between gap-2 px-3">
          <Button
            variant="ghost"
            className="p-0 hover:bg-transparent"
            title="Archive"
          >
            <Icons.archive color="white" size={26} />
          </Button>

          <ConfirmDelModal id={item.id} />
        </div>
      </div>
    </div>
  );
}

export default ArchiveItem;
