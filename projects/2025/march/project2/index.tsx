import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface CustomSliderProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  className?: string;
  thumbClassName?: string;
  trackClassName?: string;
}

interface CustomSliderProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  className?: string;
  thumbClassName?: string;
  trackClassName?: string;
  rangeClassName?: string;
}

export const CustomSlider: React.FC<CustomSliderProps> = ({
  value,
  min,
  max,
  step = 1,
  onChange,
  className = "",
  thumbClassName = "",
  trackClassName = "",
  rangeClassName = "",
}) => {
  const handleValueChange = (values: number[]) => {
    onChange(values[0]);
  };

  return (
    <SliderPrimitive.Root
      className={`relative flex items-center select-none touch-none w-full h-5 ${className}`}
      value={[value]}
      min={min}
      max={max}
      step={step}
      onValueChange={handleValueChange}
    >
      <SliderPrimitive.Track className={cn("bg-gray-700 relative grow rounded-full h-1.5", trackClassName)}>
        <SliderPrimitive.Range
          className={cn("absolute h-full rounded-full", rangeClassName)}
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className={cn(
          "block w-3 h-3 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
          thumbClassName
        )}
      />
    </SliderPrimitive.Root>
  );
};

export default function Project3() {
  const [value, setValue] = useState(10);
  return (
    <div className="w-[80%] m-auto p-4 pt-6 bg-gray-200">
      <CustomSlider
        value={value}
        min={0}
        max={100}
        onChange={setValue}
        trackClassName="bg-blue-200"
        thumbClassName="bg-blue-600"
        rangeClassName="bg-blue-400"
      />
    </div>
  );
}
