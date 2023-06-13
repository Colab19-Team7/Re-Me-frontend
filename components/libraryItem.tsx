"use client";

import { Check, Clock } from "lucide-react";
import { Item } from "~types/item";

import ConfirmDelModal from "./ConfirmDelModal";
import { Button } from "./ui/button";

interface LibraryItemProps {
  item: Item;
  onDelete: (id: string) => void;
  onMarkAsRead: (id: string) => void;
}

function LibraryItem({ item, onDelete, onMarkAsRead }: LibraryItemProps) {
  return (
    <div className="overflow-hidden rounded-3xl border-4 border-[#93A3B6] bg-[#202124]">
      <div className="group relative mb-2 block h-52 overflow-hidden bg-gray-100 lg:mb-3">
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

      <div className="space-y-3">
        <div className="px-3 text-center">
          <h2 className="hover:gray-800 mb-1 line-clamp-1 font-bold uppercase text-[#FEF8FD] transition duration-100 lg:text-lg">
            {item.title}
          </h2>
          <a
            className="line-clamp-1 cursor-pointer text-[#93A3B6] underline lg:text-lg"
            href={item.item_link}
            target="_blank"
            rel="noreferrer"
          >
            {item.item_link}
          </a>
        </div>

        <div className="border-2 border-[#2A2A2A]" />

        <div className="flex justify-between gap-2 px-3 pb-3">
          <div className="flex items-center justify-center gap-5">
            <Button variant="ghost" className="p-0">
              <Check color="#FEF8FD" size={32} strokeWidth={2} />
            </Button>

            <Button variant="ghost" className="p-0">
              <Clock
                color="#FEF8FD"
                size={32}
                strokeWidth={2}
                className="p-0"
              />
            </Button>
          </div>

          <ConfirmDelModal id={item.id} />
        </div>
      </div>
    </div>
  );
}

export default LibraryItem;
