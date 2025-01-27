import {
  Pause,
  Play,
  TimerReset,
} from "lucide-react";
import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 0.01);
      }, 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const togglePlay = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const radius = 45;
  const progress = (time % 60) / 4;
  const angle = progress * 360;
  const x = 50 + radius * Math.cos(((angle - 90) * Math.PI) / 180);
  const y = 50 + radius * Math.sin(((angle - 90) * Math.PI) / 180);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center  p-8 rounded-2xl shadow-lg dark:bg-[#2c303d]",
        {
          "dark:bg-[#ffeed9] text-black": !isRunning && time > 0,
        }
      )}
    >
      <div className="relative mb-6 w-96 h-96 cursor-pointer" onClick={togglePlay}>
        {time > 0 && (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              className={cn("fill-none stroke-black/10 stroke-[2px]", {
                "stroke-blue-500": isRunning,
              })}
            />
            <circle
              cx={x + "%"}
              cy={y + "%"}
              r={4}
              className={cn(
                "fill-blue-500 transition-all duration-[10ms] ease-linear",
                {
                  "fill-yellow-800": !isRunning,
                }
              )}
            />
          </svg>
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={cn("text-4xl leading-7 text-blue-600 dark:text-white", {
              "dark:text-black": !isRunning && time > 0,
            })}
          >
            {time.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="flex space-x-4 w-full justify-between">
        {!isRunning && (
          <button
            onClick={handleStart}
            className={
              cn("flex space-x-4 hover:opacity-80 cursor-pointer w-full justify-center rounded-full items-center bg-[#a8c7fa] p-3 text-black  transition", {
                "bg-[#ffcd6c]": time > 0 && !isRunning,
              })
            }
            aria-label="Start"
          >
            <Play fill="currentColor" className="w-6 h-6" />
          </button>
        )}

        {isRunning && (
          <button
            onClick={handlePause}
            className="flex space-x-4 hover:opacity-80 cursor-pointer w-full justify-center rounded-full items-center bg-[#a8c7fa] p-3 text-black  transition"
            aria-label="Pause"
          >
            <Pause className="w-6 h-6" />
          </button>
        )}
        
        {time > 0 && (
          <button
            onClick={handleReset}
            className={
              cn("flex space-x-4 hover:opacity-80 cursor-pointer w-full justify-center rounded-full items-center bg-[#a8c7fa] p-3 text-black  transition", {
                "bg-[#ffcd6c]": time > 0 && !isRunning,
              })
            }
            aria-label="Reset"
          >
            <TimerReset className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default function Project27() {
  return (
    <div className="w-full p-4 relative space-y-4">
      <h1 className="text-2xl font-bold">Project 27</h1>
      <Stopwatch />
    </div>
  );
}
