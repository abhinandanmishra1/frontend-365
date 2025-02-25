import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { Calendar } from "../project26";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const DatePicker = () => {
  const [date, setDate] = useState<Date>();

  const getDateString = (date: Date) => {
    // format -> February 23rd, 2025
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? getDateString(date) : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar onDateSelect={setDate} />
      </PopoverContent>
    </Popover>
  );
}

export default function Project27() {
  return (
    <div className="max-w-7xl mx-auto p-4 pt-6">
      <DatePicker />
    </div>
  );
}
