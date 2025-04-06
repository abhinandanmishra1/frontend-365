import { useCallback, useEffect, useRef, useState } from "react";

interface RollingNumberProps {
  value: number;
  duration?: number;
  delay?: number;
  previousValue?: number;
}

interface useRollingNumberProps {
  value: number;
  duration?: number;
  delay?: number;
  previousValue?: number;
}
const useRollingNumber = ({
  value,
  duration = 1000,
  delay = 0,
  previousValue,
}: useRollingNumberProps) => {
  const [maxValue, setMaxValue] = useState(value);
  const ref = useRef<HTMLDivElement>(null);
  const prevValueRef = useRef(previousValue || value);

  useEffect(() => {
    setMaxValue((curr) => Math.max(curr, value));
  }, [value]);

  // Calculate the target scroll position for a specific value
  const getPositionForValue = useCallback((targetValue: number) => {
    if (!ref.current) return 0;

    // Each number takes up h-16 (64px) of height
    const itemHeight = 64;
    return targetValue * itemHeight;
  }, []);

  // Scroll smoothly to the target value position
  const scrollToValue = useCallback(
    (targetValue: number) => {
      if (ref.current) {
        const startTime = performance.now();
        const startPosition = ref.current.scrollTop;
        const targetPosition = getPositionForValue(targetValue);

        console.log({ startPosition, targetPosition });
        const animateScroll = (currentTime: number) => {
          const elapsedTime = currentTime - startTime;
          const progress = Math.min(elapsedTime / duration, 1);

          const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
          const easedProgress = easeOutCubic(progress);

          const position =
            startPosition + (targetPosition - startPosition) * easedProgress;
          ref.current!.scrollTop = position;

          if (progress < 1) {
            requestAnimationFrame(animateScroll);
          }
        };

        requestAnimationFrame(animateScroll);
      }
    },
    [duration, getPositionForValue]
  );

  useEffect(() => {
    if (value !== prevValueRef.current) {
      const timer = setTimeout(() => {
        scrollToValue(value);

        prevValueRef.current = value;
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [delay, value, scrollToValue]);

  useEffect(() => {
    scrollToValue(value);
  }, []);

  return {
    ref,
    scrollToValue,
    maxValue,
  };
};

const RollingNumber = ({
  value,
  duration,
  delay,
  previousValue,
}: RollingNumberProps) => {
  const { ref, scrollToValue, maxValue } = useRollingNumber({
    value,
    duration,
    delay,
    previousValue,
  });

  return (
    <div className="relative w-16 h-16 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
      <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>

      <div
        ref={ref}
        className="w-full h-full overflow-hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex flex-col items-center">
          {Array.from({ length: maxValue + 1 }, (_, i) => {
            return (
              <div
                key={i}
                className="flex items-center justify-center w-full h-16 bg-white"
              >
                <span className="text-4xl font-bold text-gray-800">{i}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>
    </div>
  );
};

export default function Project8() {
  const [count, setCount] = useState(10);
  const [previousCount, setPreviousCount] = useState(0);

  const handleCountChange = (newCount: number) => {
    setPreviousCount(count);
    setCount(newCount);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 pt-6">
      <div className="flex flex-col items-center space-y-8">
        <div className="flex items-center space-x-4">
          <RollingNumber
            value={count}
            duration={2000}
            delay={500}
            previousValue={previousCount}
          />
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleCountChange(Math.max(0, count - 5))}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          >
            -5
          </button>

          <button
            onClick={() => handleCountChange(Math.max(0, count - 1))}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          >
            -1
          </button>

          <div className="px-4 py-2 bg-gray-100 rounded-md min-w-16 text-center">
            {count}
          </div>

          <button
            onClick={() => handleCountChange(count + 1)}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          >
            +1
          </button>

          <button
            onClick={() => handleCountChange(count + 5)}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          >
            +5
          </button>
        </div>
      </div>
    </div>
  );
}
