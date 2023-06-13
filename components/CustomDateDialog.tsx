"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { cn } from "~lib/utils";

import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const repeatOptions = [
  { label: "No-repeat", value: "no-repeat" },
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
];

export function CustomDateDialog() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="justify-between p-0 hover:bg-transparent"
        >
          <span className="sr-only">Set a custom snooze</span>
          <span className="uppercase text-black">Custom</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        // @ts-ignore
        showCloseButton={false}
        className="w-96 bg-white py-3 text-black"
      >
        <DialogHeader>
          <DialogTitle className="mb-2">
            <div className="flex items-center justify-center gap-4">
              <Clock size={20} strokeWidth={2} />
              <h2 className="text-sm font-normal">TODAY, 12:00 AM, REPEAT</h2>
            </div>
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-3">
            {/* date picker start */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "h-18 w-full justify-start rounded-xl border-[#93A3B6] py-2 text-left font-normal",
                    "hover:bg-[#F5F7FA] hover:text-black",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto rounded-xl bg-white p-0 shadow-xl">
                <Calendar
                  mode="single"
                  classNames={{
                    day_selected:
                      "bg-[#1F95AF] text-white rounded-full hover:bg-[#1F95AF] hover:text-white",
                    day_today: "bg-[#F5F7FA] text-black rounded-full font-bold",
                    cell: "bg-white text-black hover:bg-[#F5F7FA]",
                  }}
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {/* date picker end */}

            <Input
              type="time"
              className="h-18 rounded-xl border-[#93A3B6] py-1.5"
            />

            <Select>
              <SelectTrigger className="h-18 rounded-xl border-[#93A3B6]">
                <SelectValue
                  placeholder="Choose an option"
                  defaultValue="no-repeat"
                />
              </SelectTrigger>
              <SelectContent className="border-none bg-white">
                {repeatOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => setOpen(!open)}
            className="p-0 uppercase hover:bg-transparent hover:text-black"
          >
            save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
