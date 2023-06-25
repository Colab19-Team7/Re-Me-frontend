import { Clock } from "lucide-react";

import { CustomDateDialog } from "./CustomDateDialog";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

function SchedulePopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="group p-0 hover:bg-transparent"
          title="Snooze"
        >
          <Clock
            size={24}
            strokeWidth={2}
            className="p-0 text-[#FEF8FD] transition duration-300 ease-out group-hover:text-[#6D7885] group-active:text-[#434A52]"
          />
          <span className="sr-only">Open popover</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-72 border-0 bg-white">
        <div className="flex flex-col gap-2">
          <Button
            variant="ghost"
            className="justify-between p-0 hover:bg-transparent"
          >
            <span className="sr-only">Snooze for later today</span>
            <span className="uppercase text-black">Later Today</span>
            <span className="text-xs uppercase text-[#93A3B6]">
              FRIDAY, 04:00 AM
            </span>
          </Button>

          <Button
            variant="ghost"
            className="justify-between p-0 hover:bg-transparent"
          >
            <span className="sr-only">Snooze for tomorrow</span>
            <span className="uppercase text-black">Tomorrow</span>
            <span className="text-xs uppercase text-[#93A3B6]">
              SATURDAY, 12:00 AM
            </span>
          </Button>

          <Button
            variant="ghost"
            className="justify-between p-0 hover:bg-transparent"
          >
            <span className="sr-only">Snooze in 3 days</span>
            <span className="uppercase text-black">In 3 days</span>
            <span className="text-xs uppercase text-[#93A3B6]">
              TUESDAY, 12:00 AM
            </span>
          </Button>

          <CustomDateDialog />
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default SchedulePopover;
