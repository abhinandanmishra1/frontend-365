import React, { useState } from "react";

interface RangeSliderProps {
  min: number;
  max: number;
  name: string;
  step: number;
  initialValue: { min: number; max: number };
  onChange: (value: { min: number; max: number }) => void;
  className?: string;
}

const RangeSlider = ({
  name,
  max = 10000,
  step = 100,
  initialValue,
  onChange,
  className = "",
}: RangeSliderProps) => {
  const [localMin, setLocalMin] = useState(initialValue?.min ?? 0);
  const [localMax, setLocalMax] = useState(initialValue?.max ?? max);

  const handleChange = (newMin: number, newMax: number) => {
    const rangeValue = { min: newMin, max: newMax };
    setLocalMin(newMin);
    setLocalMax(newMax);
    onChange?.({ min: newMin, max: newMax });
  };

  return (
    <div className={`w-full px-4 py-6 ${className}`}>
      <input type="hidden" name={`${name}-min`} value={localMin} />
      <input type="hidden" name={`${name}-max`} value={localMax} />

      <div className="flex justify-between text-xs text-gray-600 mb-2">
        <span>₹{localMin}</span>
        <span>₹{localMax}</span>
      </div>

      <svg className="w-full h-8" viewBox="0 0 100 10">
        <rect x="0" y="4" width="100" height="2" fill="#D1D5DB" />

        <rect
          x={(localMin / max) * 100}
          y="4"
          width={((localMax - localMin) / max) * 100}
          height="2"
          fill="#10B981"
        />

        <circle
          cx={(localMin / max) * 100}
          cy="5"
          r="4"
          fill="#10B981"
          onMouseDown={(e) => {
            const startX = e.clientX;
            const handleMouseMove = (moveEvent: MouseEvent) => {
              const diff = moveEvent.clientX - startX;
              const rect = (e.target as Element).closest("svg")!.getBoundingClientRect();
              const newMin = Math.max(
                0,
                Math.min(
                  localMin +
                    Math.round(((diff / rect.width) * max) / step) * step,
                  localMax - step
                )
              );
              handleChange(newMin, localMax);
            };
            const handleMouseUp = () => {
              document.removeEventListener("mousemove", handleMouseMove);
              document.removeEventListener("mouseup", handleMouseUp);
            };
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
          }}
          style={{ cursor: "pointer" }}
        />

        <circle
          cx={(localMax / max) * 100}
          cy="5"
          r="4"
          fill="#10B981"
          onMouseDown={(e) => {
            const startX = e.clientX;
            const handleMouseMove = (moveEvent: MouseEvent) => {
              const diff = moveEvent.clientX - startX;
              const rect = (e.target as Element).closest("svg")!.getBoundingClientRect();
              const newMax = Math.min(
                max,
                Math.max(
                  localMax +
                    Math.round(((diff / rect.width) * max) / step) * step,
                  localMin + step
                )
              );
              handleChange(localMin, newMax);
            };
            const handleMouseUp = () => {
              document.removeEventListener("mousemove", handleMouseMove);
              document.removeEventListener("mouseup", handleMouseUp);
            };
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
          }}
          style={{ cursor: "pointer" }}
        />
      </svg>
    </div>
  );
};

export default function Project23() {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  return (
    <div className="flex p-4">
      <RangeSlider
        min={0}
        max={10000}
        step={100}
        name="price"
        initialValue={priceRange}
        onChange={(value) => setPriceRange((curr) => ({ ...curr, ...value }))}
      />
    </div>
  );
}
