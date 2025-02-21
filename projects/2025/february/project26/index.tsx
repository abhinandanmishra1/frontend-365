import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { use, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CalendarView = "day" | "month" | "year";

interface CalendarProps {
  onDateSelect?: (date: Date) => void;
  initialDate?: Date;
  views?: CalendarView[];
}

interface CalendarYearSelectProps {
  onYearSelect: (year: number) => void;
}

const CalendarYearSelect = ({ onYearSelect }: CalendarYearSelectProps) => {
  const startYear = 1900;
  const currentYear = new Date().getFullYear();

  return (
    <div className="grid grid-cols-4 gap-1 overflow-y-auto max-h-[150px]">
      {[...Array(1100)].map((_, index) => {
        const year = startYear + index;
        return (
          <Button
            key={year}
            variant="ghost"
            size="sm"
            className={cn(
              "h-8",
              year === currentYear && "bg-primary text-primary-foreground"
            )}
            onClick={() => onYearSelect(year)}
          >
            {year}
          </Button>
        );
      })}
    </div>
  );
};

interface CalendarMonthSelectProps {
  onMonthSelect: (month: number) => void;
  date: Date;
}

const CalendarMonthSelect = ({ onMonthSelect, date = new Date() }: CalendarMonthSelectProps) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="grid grid-cols-3 gap-1">
      {months.map((month, index) => (
        <Button
          key={month}
          variant="ghost"
          size="sm"
          className={cn(
            "h-8",
            index === date.getMonth() &&
              "bg-primary text-primary-foreground"
          )}
          onClick={() => onMonthSelect(index)}
        >
          {month.slice(0, 3)}
        </Button>
      ))}
    </div>
  );
};

interface CalendarMonthYearProps {
  views: CalendarView[];
  date?: Date;
  onChange?: (date: Date) => void;
}

const CalendarMonthYear = ({
  views,
  onChange,
  date = new Date(),
}: CalendarMonthYearProps) => {
  const [currentDate, setCurrentDate] = useState(date);
  const [view, setView] = useState<"month" | "year">(
    views.includes("year") ? "year" : "month"
  );

  const handleYearSelect = (year: number) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(year);
    setCurrentDate(newDate);
    onChange?.(newDate);
    setView("month");
  };

  const handleMonthSelect = (monthIndex: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(monthIndex);
    setCurrentDate(newDate);
    onChange?.(newDate);
  };

  useEffect(() => {
    setCurrentDate(date);
  }, [date]);

  const hasYearView = views.includes("year");
  const hasMonthView = views.includes("month");
  const showPopover = hasYearView || hasMonthView;

  return (
    <Popover>
      <PopoverTrigger
        asChild
        aria-disabled={views.length === 0 || (!hasYearView && !hasMonthView)}
      >
        <Button variant="ghost" className="h-auto p-2">
          <h2 className="text-lg font-semibold">
            {currentDate.toLocaleString("default", { month: "long" })}{" "}
            {currentDate.getFullYear()}
          </h2>
        </Button>
      </PopoverTrigger>
      {showPopover && (
        <PopoverContent className="w-64 p-0">
          <div className="p-2">
            {hasYearView && hasMonthView && (
              <div className="flex justify-between mb-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setView(view === "year" ? "month" : "year")}
                >
                  {view === "year" ? "Select Month" : "Select Year"}
                </Button>
              </div>
            )}

            {view === "year" ? (
              <CalendarYearSelect onYearSelect={handleYearSelect} />
            ) : (
              <CalendarMonthSelect onMonthSelect={handleMonthSelect} date={currentDate} />
            )}
          </div>
        </PopoverContent>
      )}
    </Popover>
  );
};

const Calendar: React.FC<CalendarProps> = ({
  onDateSelect,
  initialDate = new Date(),
  views = ["day"],
}) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const handlePreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setSelectedDate(newDate);
    onDateSelect?.(newDate);
  };

  const isCurrentMonth = (date: Date) => {
    const today = new Date();
    return (
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && isCurrentMonth(currentDate);
  };

  const isSelected = (day: number) => {
    return (
      selectedDate?.getDate() === day &&
      selectedDate?.getMonth() === currentDate.getMonth() &&
      selectedDate?.getFullYear() === currentDate.getFullYear()
    );
  };

  const onMonthYearChange = (date: Date) => {
    setCurrentDate(date);
    setSelectedDate(null);
  };

  return (
    <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePreviousMonth}
          className="p-2 hover:bg-gray-100 rounded-full"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <CalendarMonthYear
          date={currentDate}
          views={views}
          onChange={onMonthYearChange}
        />
        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-gray-100 rounded-full"
          aria-label="Next month"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 p-2"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {[...Array(firstDayOfMonth)].map((_, index) => (
          <div key={`empty-${index}`} className="p-2" />
        ))}

        {[...Array(daysInMonth)].map((_, index) => {
          const day = index + 1;
          return (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              className={cn(
                "p-2 w-full rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300",
                {
                  "bg-blue-200 hover:bg-blue-200 focus:ring-blue-100":
                    isSelected(day),
                  "hover:bg-gray-200": !isSelected(day) && !isToday(day),
                  "bg-blue-500 text-white": isToday(day) && !isSelected(day),
                }
              )}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default function Project26() {
  return (
    <div className="max-w-7xl mx-auto p-4 pt-6 flex justify-between">
      <div className="flex flex-col gap-3 items-center">
        <h2>Month and Year Select</h2>
        <Calendar onDateSelect={console.log} views={["year", "month"]} />
      </div>

      <div className="flex flex-col gap-3 items-center">
        <h2>Month Select</h2>
        <Calendar onDateSelect={console.log} views={["month"]} />
      </div>

      <div className="flex flex-col gap-3 items-center">
        <h2>Day Select</h2>
        <Calendar onDateSelect={console.log} views={["day"]} />
      </div>
    </div>
  );
}
