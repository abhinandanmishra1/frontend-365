import React, { useCallback, useEffect, useState } from "react";

import { Flame } from "lucide-react";
import axios from "axios";

interface StreakResponse {
  success: boolean;
  count: number;
  isTodayMarked: boolean;
}

export const StreakCounter = () => {
  const [streak, setStreak] = useState(0);
  const [markedToday, setMarkedToday] = useState(false);

  const fetchStreak = useCallback(async () => {
    try {
      const { data } = await axios.get<StreakResponse>("/api/streak");

      setStreak(data.count);
      setMarkedToday(data.isTodayMarked);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const markTodayCompleted = async () => {
    try {
      const { data } = await axios.post<StreakResponse>("/api/streak");
      setMarkedToday(true);
      if(data.success) setStreak((streak) => streak + 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStreak();
  }, [fetchStreak]);

  return (
    <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2">
      <button
        onClick={markTodayCompleted}
        className="flex items-center gap-2 transition-all hover:scale-105"
        title="Click to increment streak"
      >
        <Flame
          size={24}
          className={`${
            markedToday ? "text-orange-500 fill-orange-500" : "text-gray-400"
          } transition-colors`}
        />
        <span className="font-semibold text-lg">
          {streak} day{streak !== 1 ? "s" : ""}
        </span>
      </button>
    </div>
  );
};
