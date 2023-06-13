"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { cn } from "~lib/utils";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

function ConfirmDelModal({ id }: { id: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const deleteItem = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://re-me-api.onrender.com/api/v1/items/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: session!.user.token,
          },
        }
      );
    } catch (error) {
      console.log(error);
      throw new Error("Failed to delete item");
    } finally {
      router.refresh();
      setOpen(false);
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent"
          title="Delete"
        >
          <X size={28} color="#FF2D2D" strokeWidth={3} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-white px-2 text-black">
        <DialogHeader>
          <DialogTitle className="ml-4 text-xl font-semibold uppercase">
            Delete
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-8 uppercase text-black">
            <span className="border-[0.8px] border-[#E4E5E7]" />
            <span className="ml-4 font-medium">
              Are you sure you want to delete this item?
            </span>
            <span className="border-[0.8px] border-[#E4E5E7]" />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="">
          <div className="flex w-full justify-around">
            <Button
              onClick={() => setOpen(false)}
              className={cn(
                "border-0 bg-[#93A3B6] px-7 font-bold uppercase text-[#FEF8FD]",
                "hover:bg-slate-500"
              )}
            >
              Cancel
            </Button>
            <Button
              onClick={() => deleteItem(id)}
              disabled={loading}
              className={cn(
                "border-0 bg-[#FF2D2D] px-7 font-bold uppercase text-[#FEF8FD]",
                "hover:bg-red-600"
              )}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{" "}
              Delete
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmDelModal;
