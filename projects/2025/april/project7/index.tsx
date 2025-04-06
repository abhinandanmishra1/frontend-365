import React, { useEffect, useState } from "react";
// learn again how to make it

interface DualRangeSliderProps {
  showDirectRangeInputs?: boolean;
  rangeValues?: number[];
  onRangeChange?: (values: number[]) => void;
}
const DualRangeSlider = ({
  showDirectRangeInputs = false,
  rangeValues = [0, 1000],
  onRangeChange,
}: DualRangeSliderProps) => {
  const initialMinPrice = rangeValues[0] || 0;
  const initialMaxPrice = rangeValues[1] || 1000;

  const [sliderMinValue] = useState(initialMinPrice);
  const [sliderMaxValue] = useState(initialMaxPrice);

  const [minVal, setMinVal] = useState(initialMinPrice);
  const [maxVal, setMaxVal] = useState(initialMaxPrice);
  const [minInput, setMinInput] = useState(initialMinPrice);
  const [maxInput, setMaxInput] = useState(initialMaxPrice);

  const [isDragging, setIsDragging] = useState(false);
  const rangeRef = React.useRef<HTMLInputElement>(null);
  const minGap = 5;

  useEffect(() => {
    const range = rangeRef.current;
    if (range) {
      const minPercent =
        ((minVal - sliderMinValue) / (sliderMaxValue - sliderMinValue)) * 100;
      const maxPercent =
        ((maxVal - sliderMinValue) / (sliderMaxValue - sliderMinValue)) * 100;

      range.style.left = `${minPercent}%`;
      range.style.right = `${100 - maxPercent}%`;
    }
  }, [minVal, maxVal, sliderMinValue, sliderMaxValue]);

  const slideMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value >= sliderMinValue && maxVal - value >= minGap) {
      setMinVal(value);
      setMinInput(value);
    }
  };

  const slideMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value <= sliderMaxValue && value - minVal >= minGap) {
      setMaxVal(value);
      setMaxInput(value);
    }
  };

  const handleMinInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.value === "" ? sliderMinValue : parseInt(e.target.value, 10);
    if (value >= sliderMinValue && value < maxVal - minGap) {
      setMinInput(value);
      setMinVal(value);
    }
  };

  const handleMaxInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.value === "" ? sliderMaxValue : parseInt(e.target.value, 10);
    if (value <= sliderMaxValue && value > minVal + minGap) {
      setMaxInput(value);
      setMaxVal(value);
    }
  };

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    type: "min" | "max"
  ) => {
    if (e.key === "Enter") {
      const value = parseInt((e.target as HTMLInputElement).value, 10);
      if (
        type === "min" &&
        value >= sliderMinValue &&
        value < maxVal - minGap
      ) {
        setMinVal(value);
      } else if (
        type === "max" &&
        value <= sliderMaxValue &&
        value > minVal + minGap
      ) {
        setMaxVal(value);
      }
    }
  };

  const startDrag = () => {
    setIsDragging(true);
  };

  const stopDrag = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (onRangeChange) {
      onRangeChange([minVal, maxVal]);
    }
  }, [minVal, maxVal, onRangeChange]);
  return (
    <div className="bg-white rounded-xl p-5 w-full max-w-xs mx-auto">
      {showDirectRangeInputs && (
        <div className="flex justify-between w-full mb-8">
          <div className="w-[48%]">
            <input
              type="number"
              value={minInput}
              onChange={handleMinInput}
              onKeyDown={(e) => handleInputKeyDown(e, "min")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-center"
              min={sliderMinValue}
              max={maxVal - minGap}
            />
          </div>
          <div className="w-[48%]">
            <input
              type="number"
              value={maxInput}
              onChange={handleMaxInput}
              onKeyDown={(e) => handleInputKeyDown(e, "max")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-center"
              min={minVal + minGap}
              max={sliderMaxValue}
            />
          </div>
        </div>
      )}

      <div className="relative h-1 bg-gray-400 rounded-full my-8">
        <div
          ref={rangeRef}
          className="slider-track absolute h-full bg-blue-500 rounded-full"
        ></div>
        <input
          type="range"
          min={sliderMinValue}
          max={sliderMaxValue}
          value={minVal}
          onChange={slideMin}
          onMouseDown={startDrag}
          onMouseUp={stopDrag}
          onTouchStart={startDrag}
          onTouchEnd={stopDrag}
          className="absolute w-full top-0 -translate-y-1/2 appearance-none h-1 bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:z-10"
        />
        <input
          type="range"
          min={sliderMinValue}
          max={sliderMaxValue}
          value={maxVal}
          onChange={slideMax}
          onMouseDown={startDrag}
          onMouseUp={stopDrag}
          onTouchStart={startDrag}
          onTouchEnd={stopDrag}
          className="absolute w-full top-0 -translate-y-1/2 appearance-none h-1 bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:z-10"
        />

        {isDragging && (
          <div className="absolute top-[-35px] left-0 text-xs text-gray-600 bg-white px-2 py-1 border border-gray-200 rounded whitespace-nowrap -translate-x-1/2">
            {minVal}
          </div>
        )}
        {isDragging && (
          <div className="absolute top-[-35px] right-0 text-xs text-gray-600 bg-white px-2 py-1 border border-gray-200 rounded whitespace-nowrap translate-x-1/2">
            {maxVal}
          </div>
        )}
      </div>
    </div>
  );
};

export default function Project7() {
  const [rangeValues, setRangeValues] = useState([100, 10000]);

  const handleRangeChange = (values: number[]) => {
    setRangeValues(values);
  };
  return (
    <div className="max-w-2xl mx-auto p-4 pt-6">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <DualRangeSlider
          showDirectRangeInputs={true}
          rangeValues={rangeValues}
          onRangeChange={handleRangeChange}
        />

        <div className="p-4 mt-6 bg-gray-100 rounded-md">
          <p className="text-sm font-medium">
            Selected range: {rangeValues[0]} - {rangeValues[1]}
          </p>
        </div>
      </div>
    </div>
  );
}
