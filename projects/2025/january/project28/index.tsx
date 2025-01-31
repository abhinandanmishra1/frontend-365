import { Minus, Pause, Play, Plus, TimerReset } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(360); // 6 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [initialTime, setInitialTime] = useState(360);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("00:06:00");

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (!isEditing) {
      setInputValue(formatTime(timeLeft));
    }
  }, [timeLeft, isEditing]);

  const handleStart = () => {
    setShowProgress(true);
    setIsRunning(true);
  };

  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setShowProgress(false);
    setIsRunning(false);
    setTimeLeft(initialTime);
  };

  const togglePlay = () => {
    if (!isEditing) {
      if (timeLeft === 0) {
        handleReset();
        setIsRunning(true);
      } else {
        setIsRunning((prevIsRunning) => !prevIsRunning);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const parseTimeInput = (input: string) => {
    const [hours, minutes, seconds] = input
      .split(":")
      .map((num) => parseInt(num) || 0);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const handleTimeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 5) {
      setInputValue(value);
    }
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    const newSeconds = parseTimeInput(inputValue);
    if (newSeconds > 0) {
      setTimeLeft(newSeconds);
      setInitialTime(newSeconds);
    } else {
      setInputValue(formatTime(timeLeft));
    }
  };

  const handleInputFocus = (e: React.MouseEvent) => {
    setIsEditing(true);
    (e.target as HTMLInputElement).select();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      (e.target as HTMLInputElement).blur();
    } else if (e.key === "Backspace") {
      if (inputValue === "00:00:00") {
        return;
      } else {
        setInputValue((curr) => {
          let [hh, mm, ss] = curr.split(":");
          if (hh !== "00") {
            ss = `${mm[1]}${ss[0]}`;
            mm = `${hh[1]}${mm[0]}`;
            hh = `0${hh[0]}`;
          } else if (mm !== "00") {
            ss = `${mm[1]}${ss[0]}`;
            mm = `0${mm[0]}`;
          } else {
            ss = `0${ss[0]}`;
          }

          return `${hh.padStart(2, "0")}:${mm.padStart(2, "0")}:${ss.padStart(
            2,
            "0"
          )}`;
        });
      }
    }
    // add logic for number keys to update input value
    else if (e.key.match(/[0-9]/)) {
      setInputValue((prev) => {
        let [hh, mm, ss] = prev.split(":");
        hh = `${hh[1]}${mm[0]}`;
        mm = `${mm[1]}${ss[0]}`;
        ss = `${ss[1]}${e.key}`;
        return `${hh}:${mm}:${ss}`;
      });
    }
  };

  const addTime = (seconds: number) => {
    if (!isRunning) {
      const newTime = timeLeft + seconds;
      setTimeLeft(newTime);
      setInitialTime(newTime);
    }
  };

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const progress = 1 - timeLeft / initialTime;
  const strokeDashoffset = circumference * (1 - progress);

  const displayValue = useMemo(() => {
    if (!isEditing) {
      const [hh, mm, ss] = inputValue.split(":");
      // I want to remove initial zeros from the input value
      // if input is 00:30:00
      // then display value should be 30:00 only
      if (hh === "00") {
        if (mm === "00") {
          if (ss[0] === "0") {
            return ss.slice(1);
          }
          return ss;
        } else if (mm[0] === "0") {
          return `${mm.slice(1)}:${ss}`;
        }

        return `${mm}:${ss}`;
      }

      if (hh[0] === "0") {
        return `${hh.slice(1)}:${mm}:${ss}`;
      }

      return `${hh}:${mm}:${ss}`;
    }
  }, [inputValue, isEditing]);

  return (
    <div className={cn("flex flex-col items-center justify-center p-8 rounded-2xl shadow-lg bg-[#2c303d]", {
      "bg-[#432a04]": !isRunning && showProgress,
    })}>
      <div
        className="relative mb-6 w-96 h-96"
        onClick={() => {
          if (showProgress) togglePlay();
        }}
      >
        {showProgress && (
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full transform -rotate-90"
          >
            <circle
              cx="50"
              cy="50"
              r={radius}
              className={
                cn("fill-none stroke-[3px] stroke-[#3a3f50]", {
                  "stroke-[#704e00]": !isRunning
                })
              }
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              className={`fill-none stroke-[3px] transition-all duration-1000 ease-linear ${
                isRunning ? "stroke-[#b1c5ff]" : "stroke-[#f7bd54]"
              }`}
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
              }}
            />
          </svg>
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          {isEditing && (
            <input
              type="text"
              value={inputValue}
              onChange={handleTimeInput}
              // onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onKeyDown={handleKeyDown}
              className="text-4xl w-40 text-center leading-4 text-white bg-transparent focus:outline-none focus:border-b-2 focus:border-white"
              // pattern="[0-9]*"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                handleInputFocus(e);
              }}
            />
          )}
          {!isEditing && (
            <p
              className={
                cn("text-4xl w-40 text-center leading-4 text-white", {
                  "text-white": !isRunning && showProgress,
                })
              }
              onClick={() => setIsEditing(true)}
            >
              {displayValue}
            </p>
          )}

          <div className="absolute top-2/3 -translate-y-2/3 flex space-x-2 w-[300px] justify-center mb-4">
            {!isRunning && (
              <>
                <button
                  onClick={() => addTime(30)}
                  className="flex w-24 hover:opacity-80 cursor-pointer justify-center rounded-full items-center bg-[#3a3f50] p-3 text-[#eef0ff] transition text-sm font-medium"
                >
                  +0:30
                </button>
                <button
                  onClick={() => addTime(60)}
                  className="flex w-24 hover:opacity-80 cursor-pointer justify-center rounded-full items-center bg-[#3a3f50] p-3 text-[#eef0ff] transition text-sm font-medium"
                >
                  +1:00
                </button>
              </>
            )}
            {!showProgress && (
              <button
                onClick={() => addTime(300)}
                className="flex w-24 hover:opacity-80 cursor-pointer justify-center rounded-full items-center bg-[#3a3f50] p-3 text-[#eef0ff] transition text-sm font-medium"
              >
                +5:00
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex space-x-4 w-full justify-between">
        {!isRunning && timeLeft > 0 && (
          <button
            onClick={handleStart}
            className={
              cn("flex hover:opacity-80 cursor-pointer w-full justify-center rounded-full items-center bg-[#a8c7fa] p-3 text-black transition", {
                "bg-[#704e00] text-white": !isRunning && showProgress
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
            className={
              cn("flex hover:opacity-80 cursor-pointer w-full justify-center rounded-full items-center bg-[#a8c7fa] p-3 text-black transition", {
                "bg-[#704e00] text-white": !isRunning && showProgress
              })
            }
            aria-label="Pause"
          >
            <Pause className="w-6 h-6" />
          </button>
        )}

        {showProgress && (
          <button
            onClick={handleReset}
            className={
              cn("flex hover:opacity-80 cursor-pointer w-full justify-center rounded-full items-center bg-[#a8c7fa] p-3 text-black transition", {
                "bg-[#704e00] text-white": !isRunning && showProgress
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

export default function Project28() {
  return (
    <div className="w-full p-4 relative space-y-4">
      <h1 className="text-2xl font-bold">Project 28</h1>
      <Timer />
    </div>
  );
}
